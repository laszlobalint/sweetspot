import i18n from '../../shared/i18n';

const managementControls = {
  id: {
    elementType: 'input',
    elementConfig: {
      type: 'hidden',
    },
    value: 0,
    validation: {
      required: true,
    },
    valid: true,
    disabled: true,
    touched: true,
  },
  title: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Add meg a termék elnevezését...',
    },
    label: 'Termék neve',
    value: '',
    validation: {
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    valid: false,
    disabled: false,
    touched: false,
  },
  description: {
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'Add meg a termék leírását...',
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
  price: {
    elementType: 'input',
    elementConfig: {
      type: 'number',
    },
    value: 0,
    label: 'Termék ára (RSD)',
    validation: {
      required: true,
      isPositive: true,
    },
    valid: false,
    disabled: false,
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
    disabled: false,
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
    disabled: false,
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
    disabled: false,
    touched: false,
  },
  picture: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
    },
    value: '',
    label: 'Feltöltött fájlnév',
    validation: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    valid: false,
    disabled: true,
    touched: false,
  },
};

const translate = () => {
  managementControls.title.elementConfig.placeholder = i18n.t('title-placeholder');
  managementControls.title.label = i18n.t('title');
  managementControls.description.elementConfig.placeholder = i18n.t('description-placeholder');
  managementControls.description.label = i18n.t('description');
  managementControls.price.label = i18n.t('price');
  managementControls.glutenfree.label = `${i18n.t('glutenfree')}?`;
  managementControls.sugarfree.label = `${i18n.t('sugarfree')}?`;
  managementControls.lactosefree.label = `${i18n.t('lactosefree')}?`;
  managementControls.picture.label = i18n.t('picture');
};

translate();

i18n.on('languageChanged init', () => translate());

export default managementControls;
