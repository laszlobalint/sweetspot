import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './LanguageSelector.module.css';
import english from '../../assets/flags/en.png';
import hungarian from '../../assets/flags/hu.png';
import serbian from '../../assets/flags/se.png';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className={classes.LanguageSelector} onChange={changeLanguage}>
      <label>
        <input type="radio" value="hu" name="language" defaultChecked /> <img src={hungarian} alt={t('language')} />
      </label>
      <label>
        <input type="radio" value="sr" name="language" /> <img src={serbian} alt={t('language')} />
      </label>
      <label>
        <input type="radio" value="en" name="language" /> <img src={english} alt={t('language')} />
      </label>
    </div>
  );
};

export default LanguageSelector;
