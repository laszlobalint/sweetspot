import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import classes from './Summary.module.css';
import i18n from '../../shared/i18n';
import deleteIcon from '../../assets/ingredients/delete.png';
import { numberWithDots } from '../../shared/utility';

const Summary = ({ items, basket, grandTotal, onClickedDelete }) => {
  const { t } = useTranslation();

  const initializeBasket = () => {
    const b = [];
    basket.forEach((element) => {
      let item = items.find((i) => i.id === element.id);
      let title = '';
      let description = '';
      if (i18n.language === 'hu') {
        title = item.titleHun;
        description = item.descriptionHun;
      } else if (i18n.language === 'sr') {
        title = item.titleSer;
        description = item.descriptionSer;
      } else {
        title = item.titleEng;
        description = item.descriptionEng;
      }
      b.push({ id: item.id, title, description, price: item.price, quantity: element.quantity });
    });

    return b;
  };

  const basketItems = initializeBasket();

  let summary = <Redirect to="/offers" />;

  if (basketItems.length > 0) {
    summary = basketItems.map((item) => (
      <ul key={item.id} className={classes.Summary}>
        <li>
          <details>
            <summary>{item.title}</summary>
            {item.description}
          </details>
        </li>
        <li>
          {numberWithDots(item.price)} {t('currency')}
        </li>
        <li className={classes.MinContainer}>
          <p>
            {item.quantity} {t('piece')}
          </p>
          <img className={classes.DeleteIcon} src={deleteIcon} alt={t('delete')} onClick={() => onClickedDelete(item.id)} />
        </li>
      </ul>
    ));

    let grandTotalItem = (
      <ul key={grandTotal} className={classes.Summary}>
        <li>
          <b className={classes.Upper}>{t('summary')}:</b>
        </li>
        <li></li>
        <li className={classes.MinContainer}>
          <b>{numberWithDots(grandTotal)}</b>
          <b>&nbsp;{t('currency')}</b>
        </li>
      </ul>
    );

    summary = [summary, grandTotalItem];
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    items: state.ordersReducer.items,
    basket: state.ordersReducer.basket,
    grandTotal: state.ordersReducer.grandTotal,
  };
};

Summary.propTypes = {
  items: PropTypes.array,
  basket: PropTypes.array,
  grandTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Summary);
