export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const numberWithDots = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) return true;

  if (rules.required) isValid = value.trim() !== '' && isValid;

  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

  if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPostalcode) isValid = parseInt(value) >= 11000 && parseInt(value) <= 38999 && isValid;

  return isValid;
};
