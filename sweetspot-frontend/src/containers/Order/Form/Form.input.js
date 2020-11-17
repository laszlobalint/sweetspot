import i18n from '../../../shared/i18n';

const formControls = {
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
      type: 'tel',
      placeholder: '+381 - (  ) /_ _ _ _ - _ _ _',
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
      isEmail: true,
      minLength: 3,
      maxLength: 40,
    },
    valid: false,
    touched: false,
  },
  delivery: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: '', displayValue: '' },
        { value: 'SHIPPING', displayValue: 'Házhozszállítás' },
        { value: 'PICK_UP', displayValue: 'Személyes átvétel' },
      ],
    },
    value: '',
    label: 'Átvétel módja (kötelező)',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Írja be a lakcímét...',
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
      min: '11000',
      max: '38999',
      step: '1',
    },
    value: '',
    label: 'Irányítószám',
    validation: {
      required: false,
      isPostalcode: true,
    },
    valid: true,
    touched: false,
  },
  notes: {
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'Díszítés, szín és egyéb kérések leírása...',
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

const translate = () => {
  formControls.name.elementConfig.placeholder = `${i18n.t('full-name')} ${i18n.t('mandatory')}`;
  formControls.name.label = i18n.t('name-placeholder');
  formControls.phone.label = `${i18n.t('phone-number')} ${i18n.t('mandatory')}`;
  formControls.email.elementConfig.placeholder = i18n.t('email-placeholder');
  formControls.email.label = `${i18n.t('email-address')} ${i18n.t('mandatory')}`;
  formControls.street.elementConfig.placeholder = i18n.t('street-placeholder');
  formControls.street.label = `${i18n.t('street')}?`;
  formControls.settlement.elementConfig.placeholder = `${i18n.t('settlement-placeholder')}?`;
  formControls.settlement.label = `${i18n.t('settlement')}?`;
  formControls.postalCode.elementConfig.placeholder = `${i18n.t('postal-code-placeholder')}?`;
  formControls.postalCode.label = `${i18n.t('postal-code')}?`;
  formControls.notes.elementConfig.placeholder = `${i18n.t('notes-placeholder')}?`;
  formControls.notes.label = `${i18n.t('notes')}?`;
  formControls.delivery.label = `${i18n.t('delivery')} ${i18n.t('mandatory')}`;
  formControls.delivery.elementConfig.options[1].displayValue = `${i18n.t('home-delivery')}?`;
  formControls.delivery.elementConfig.options[2].displayValue = `${i18n.t('pick-up')}?`;
};

translate();

i18n.on('languageChanged init', () => translate());

export default formControls;
