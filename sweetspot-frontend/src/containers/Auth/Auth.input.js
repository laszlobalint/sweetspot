export const formControls = {
  username: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Add meg a felhasználónevet...',
    },
    label: 'Felhasználónév',
    value: '',
    validation: {
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    valid: false,
    touched: false,
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Add meg a jelszót...',
    },
    value: '',
    label: 'Jelszó',
    validation: {
      required: true,
      minLength: 8,
      maxLength: 30,
    },
    valid: false,
    touched: false,
  },
};
