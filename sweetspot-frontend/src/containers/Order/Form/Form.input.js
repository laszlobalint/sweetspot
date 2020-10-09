export const formControls = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Írja be a nevét...',
    },
    label: 'Teljes név (kötelező)',
    value: '',
    validation: {
      required: true,
      minLength: 8,
      maxLength: 30,
    },
    valid: false,
    touched: false,
  },
  phone: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Írja be a telefonszámát...',
    },
    value: '',
    label: 'Telefonszám (kötelező)',
    validation: {
      required: true,
      minLength: 8,
      maxLength: 30,
    },
    valid: false,
    touched: false,
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Írja be az e-mail címét...',
    },
    value: '',
    label: 'E-mail cím (kötelező)',
    validation: {
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    valid: true,
    touched: false,
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Írja be a közterületet és házszámot...',
    },
    value: '',
    label: 'Közterülete neve és száma',
    validation: {
      required: false,
      minLength: 3,
      maxLength: 100,
    },
    valid: true,
    touched: false,
  },
  settlement: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Írja be a települést...',
    },
    value: '',
    label: 'Település',
    validation: {
      required: false,
      minLength: 3,
      maxLength: 100,
    },
    valid: true,
    touched: false,
  },
  postalCode: {
    elementType: 'input',
    elementConfig: {
      type: 'number',
      placeholder: 'Írja be az irányítószámot...',
      min: 11000,
      max: 38999,
      step: 1,
    },
    value: '',
    label: 'Irányítószám',
    validation: {
      required: false,
    },
    valid: true,
    touched: false,
  },
  delivery: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'SHIPPING', displayValue: 'Házhozszállítás' },
        { value: 'PICK_UP', displayValue: 'Személyes átvétel' },
      ],
    },
    value: 'SHIPPING',
    label: 'Átvétel módja',
    validation: {
      required: false,
    },
    valid: true,
    touched: false,
  },
  notes: {
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'Díszítés, szín és egyéb kérés leírása...',
      rows: 4,
      cols: 36,
    },
    value: '',
    label: 'Megjegyzések',
    validation: {
      required: false,
    },
    valid: true,
    touched: false,
  },
};