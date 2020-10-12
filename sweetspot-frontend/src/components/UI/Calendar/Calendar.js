import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addYears } from 'date-fns';
import hu from 'date-fns/locale/hu';

import classes from '../Input/Input.module.css';

registerLocale('hu', hu);

const Calendar = React.memo((props) => {
  const [date, setDate] = useState(null);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 5 || day === 6;
  };

  const dateChangedHandler = (newDate) => {
    setDate(newDate);
    props.onDateChangedHandler(newDate);
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      <DatePicker
        className={classes.InputElement}
        selected={date}
        filterDate={isWeekend}
        minDate={new Date()}
        maxDate={addYears(new Date(), 1)}
        locale="hu"
        dateFormat="yyyy. MMMM d."
        dateFormatCalendar={'yyyy. MMMM'}
        onChange={(newDate) => dateChangedHandler(newDate)}
        monthsShown={2}
        placeholderText="Válasszon dátumot..."
      />
    </div>
  );
});

export default Calendar;
