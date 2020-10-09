import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addYears } from 'date-fns';
import hu from 'date-fns/locale/hu';

import classes from '../Input/Input.module.css';

registerLocale('hu', hu);

const Calendar = React.memo((props) => {
  const [date, setDate] = useState(null);

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
        minDate={new Date()}
        maxDate={addYears(new Date(), 2)}
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
