import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import classes from './Item.module.css';
import * as actions from '../../store/actions';
import i18n from '../../shared/i18n';
import ingredientsLogos from './Item.logos';
import { numberWithDots } from '../../shared/utility';
import Button from '../UI/Button/Button';
import Number from '../UI/Number/Number';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const Item = (props) => {
  const {
    id,
    titleHun,
    titleSer,
    titleEng,
    descriptionHun,
    descriptionSer,
    descriptionEng,
    picture,
    price,
    glutenfree,
    sugarfree,
    lactosefree,
    onAddedItems,
    authenticated,
    onSelectedItem,
  } = props;

  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const setTitleAndDescription = useCallback(() => {
    switch (i18n.language) {
      case 'hu':
        setTitle(titleHun);
        setDescription(descriptionHun);
        break;
      case 'sr':
        setTitle(titleSer);
        setDescription(descriptionSer);
        break;
      case 'en':
        setTitle(titleEng);
        setDescription(descriptionEng);
        break;
      default:
        setTitle(titleHun);
        setDescription(descriptionHun);
        break;
    }
  }, [titleHun, descriptionHun, titleSer, descriptionSer, titleEng, descriptionEng]);

  useEffect(() => {
    setTitleAndDescription();
    i18n.on('languageChanged init', () => setTitleAndDescription());
  }, [setTitleAndDescription]);

  const onIncreasedHandler = () => {
    if (quantity < 100) setQuantity(quantity + 1);
  };

  const onDecreasedHandler = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddedOrderItemsHandler = () => {
    onAddedItems(id, price, quantity);
    toastr.info(t('ordering'), t('item-added'), { timeOut: 1500 });
  };

  const onItemSelectedHandler = () => {
    if (authenticated) {
      setIsSelected(true);
      onSelectedItem();
    }
  };

  return (
    <Aux>
      {isSelected && (
        <Redirect
          to={{
            pathname: '/admin/management/edit',
            state: {
              id,
              titleHun,
              titleSer,
              titleEng,
              descriptionHun,
              descriptionSer,
              descriptionEng,
              picture,
              price,
              glutenfree,
              sugarfree,
              lactosefree,
            },
          }}
        />
      )}
      <div className={classes.Item}>
        <div onClick={onItemSelectedHandler}>
          <img className={classes.Image} src={picture} alt={title} />
          <div className={classes.Content}>
            <div className={classes.Text}>{title}</div>
          </div>
          <div className={classes.ImagePrice}>
            {numberWithDots(price)} {t('currency')}
          </div>
        </div>
        <div>
          <div className={classes.Title}>{title}</div>
          <div className={classes.Description}>{description}</div>
          <div className={classes.Price}>
            {numberWithDots(price)} {t('currency')}
          </div>
          <div className={classes.Icons}>
            {glutenfree ? (
              <img
                src={ingredientsLogos.glutenfree.logo}
                alt={ingredientsLogos.glutenfree.title}
                title={ingredientsLogos.glutenfree.title}
              />
            ) : (
              <img src={ingredientsLogos.gluten.logo} alt={ingredientsLogos.gluten.title} title={ingredientsLogos.gluten.title} />
            )}
            {sugarfree ? (
              <img src={ingredientsLogos.sugarfree.logo} alt={ingredientsLogos.sugarfree.title} title={ingredientsLogos.sugarfree.title} />
            ) : (
              <img src={ingredientsLogos.sugar.logo} alt={ingredientsLogos.sugar.title} title={ingredientsLogos.sugar.title} />
            )}
            {lactosefree ? (
              <img
                src={ingredientsLogos.lactosefree.logo}
                alt={ingredientsLogos.lactosefree.title}
                title={ingredientsLogos.lactosefree.title}
              />
            ) : (
              <img src={ingredientsLogos.lactose.logo} alt={ingredientsLogos.lactose.title} title={ingredientsLogos.lactose.title} />
            )}
          </div>
          <div className={classes.Navigation}>
            <Button type="button" onClick={onAddedOrderItemsHandler}>
              {t('to-basket')}
            </Button>
            <Number onClickedMore={onIncreasedHandler} onClickedLess={onDecreasedHandler} value={quantity} onChanged={() => {}} />
          </div>
        </div>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedItems: (id, price, quantity) => dispatch(actions.addOrderItems(id, price, quantity)),
  };
};

Item.propTypes = {
  quantity: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
