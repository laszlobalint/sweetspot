import React, { useState, useCallback, useRef } from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../UI/Button/Button';

const Cropper = (props) => {
  const [uploadedImage, setUploadedImage] = useState();
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 70, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUploadedImage(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((img) => {
    imageRef.current = img;
  }, []);

  const uploadImageHandler = (event) => {
    event.preventDefault();
    console.log(completedCrop);
  };

  return (
    <Aux>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      <ReactCrop
        src={uploadedImage}
        onImageLoaded={onImageLoaded}
        crop={crop}
        onChange={(cropped) => setCrop(cropped)}
        onComplete={(cropped) => setCompletedCrop(cropped)}
      />
      <Button clicked={uploadImageHandler}>Képfeltöltés</Button>
    </Aux>
  );
};

export default Cropper;
