export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const numberWithDots = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

export const formatAddress = (address) => address.split(';')[0].replace('null ,', '');

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) return true;

  if (rules.required) isValid = value.trim() !== '' && isValid;

  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

  if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

  if (rules.isEmail)
    isValid =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value,
      ) && isValid;

  if (rules.isPostalcode) isValid = Number(value) >= 11000 && Number(value) <= 38999 && isValid;

  if (rules.isPositive) isValid = Number(value) > 0 && isValid;

  if (rules.isBoolean) isValid = 'boolean' === typeof value && isValid;

  return isValid;
};

export const generateFilename = (title) => {
  return `${title
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\s/g, '_')
    .replace(/[\u0300-\u036f]/g, '')}.png`;
};
