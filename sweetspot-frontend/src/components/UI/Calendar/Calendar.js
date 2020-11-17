import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addYears } from 'date-fns';
import hu from 'date-fns/locale/hu';
import sr from 'date-fns/locale/sr-Latn';
import en from 'date-fns/locale/en-GB';
import { useTranslation } from 'react-i18next';

import classes from '../Input/Input.module.css';
import i18n from '../../../shared/i18n';

registerLocale('hu', hu);
registerLocale('sr-Latn', sr);
registerLocale('en-GB', en);
registerLocale('hu', hu);

const Calendar = React.memo((props) => {
  const { label, onDateChangedHandler } = props;

  const { t } = useTranslation();

  const [date, setDate] = useState(null);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 5 || day === 6;
  };

  const dateChangedHandler = (newDate) => {
    setDate(newDate);
    onDateChangedHandler(newDate);
  };

  const getLocale = () => {
    if (i18n.language === 'en') return 'en-GB';
    else if (i18n.language === 'sr') return 'sr-Latn';
    else return 'hu';
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      <DatePicker
        className={classes.InputElement}
        selected={date}
        filterDate={isWeekend}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
        locale={getLocale()}
        dateFormat="yyyy. MMMM d."
        dateFormatCalendar={'yyyy. MMMM'}
        onChange={(newDate) => dateChangedHandler(newDate)}
        monthsShown={2}
        placeholderText={t('choose-date')}
      />
    </div>
  );
});

export default Calendar;
