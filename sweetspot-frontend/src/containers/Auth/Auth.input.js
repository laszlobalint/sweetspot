import i18n from '../../shared/i18n';

const formControls = {
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

const translate = () => {
  formControls.username.elementConfig.placeholder = i18n.t('username-placeholder');
  formControls.username.label = i18n.t('username');
  formControls.password.elementConfig.placeholder = i18n.t('password-placeholder');
  formControls.password.label = i18n.t('password');
};

translate();

i18n.on('languageChanged init', () => translate());

export default formControls;
