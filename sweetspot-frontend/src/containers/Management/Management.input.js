export const managementControls = {
  title: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Írd be a megnevezését...',
    },
    label: 'Termék címe',
    value: '',
    validation: {
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    valid: false,
    touched: false,
  },
  description: {
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'Írd le a termék leírását...',
      rows: 2,
      cols: 36,
    },
    value: '',
    label: 'Leírás',
    validation: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    valid: false,
    touched: false,
  },
  picture: {
    elementType: 'input',
    elementConfig: {
      type: 'file',
    },
    value: '',
    label: 'Kép URL-je',
    validation: {
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    valid: false,
    touched: true,
  },
  price: {
    elementType: 'input',
    elementConfig: {
      type: 'number',
      placeholder: 'Add meg a termék árát...',
    },
    value: 0,
    label: 'Termék ára (RSD)',
    validation: {
      required: true,
      isPositive: true,
    },
    valid: false,
    touched: false,
  },
  glutenfree: {
    elementType: 'input',
    elementConfig: {
      type: 'checkbox',
    },
    value: false,
    label: 'Gluténmentes?',
    validation: {
      isBoolean: true,
    },
    valid: true,
    touched: false,
  },
  sugarfree: {
    elementType: 'input',
    elementConfig: {
      type: 'checkbox',
    },
    value: false,
    label: 'Cukromentes?',
    validation: {
      isBoolean: true,
    },
    valid: true,
    touched: false,
  },
  lactosefree: {
    elementType: 'input',
    elementConfig: {
      type: 'checkbox',
    },
    value: false,
    label: 'Laktózmentes?',
    validation: {
      isBoolean: true,
    },
    valid: true,
    touched: false,
  },
};
