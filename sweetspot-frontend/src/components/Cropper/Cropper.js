import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import { useTranslation } from 'react-i18next';

import 'react-image-crop/dist/ReactCrop.css';
import classes from './Cropper.module.css';
import * as actions from '../../store/actions';
import { generateFilename } from '../../shared/utility';
import Button from '../UI/Button/Button';

const Cropper = ({ alt, onSaveItemImage }) => {
  const { t } = useTranslation();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imageRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUploadedImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((img) => {
    imageRef.current = img;
  }, []);

  const onSendUploadableImage = (image, cropValues, event) => {
    event.preventDefault();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropValues.width;
    canvas.height = cropValues.height;

    ctx.drawImage(
      image,
      cropValues.x * scaleX,
      cropValues.y * scaleY,
      cropValues.width * scaleX,
      cropValues.height * scaleY,
      0,
      0,
      cropValues.width,
      cropValues.height,
    );

    canvas.toBlob(
      async (blob) => {
        const file = new File([blob], generateFilename(alt), {
          lastModified: new Date(),
        });
        const formData = new FormData();
        formData.append('file', file);
        onSaveItemImage(formData);
        setUploadedImage(null);
        setCompletedCrop(null);
      },
      'image/png',
      1,
    );
  };

  return (
    <div className={classes.Cropper}>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={uploadedImage}
        onImageLoaded={onImageLoaded}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <Button
        type="button"
        onClick={(event) => onSendUploadableImage(imageRef.current, completedCrop, event)}
        disabled={!completedCrop?.width || !completedCrop?.height || !alt}
      >
        {t('picture-upload')}
      </Button>
    </div>
  );
};

const mapStateToProps = (props) => {
  return {
    picture: props.adminReducer.picture,
    error: props.adminReducer.error,
    loading: props.adminReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveItemImage: (file) => dispatch(actions.saveItemImage(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cropper);
