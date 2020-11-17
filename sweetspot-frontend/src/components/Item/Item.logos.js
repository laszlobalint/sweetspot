import i18n from '../../shared/i18n';
import glutenLogo from '../../assets/ingredients/gluten.png';
import glutenfreeLogo from '../../assets/ingredients/glutenfree.png';
import sugarLogo from '../../assets/ingredients/sugar.png';
import sugarfreeLogo from '../../assets/ingredients/sugarfree.png';
import lactoseLogo from '../../assets/ingredients/lactose.png';
import lactosefreeLogo from '../../assets/ingredients/lactosefree.png';

const ingredientsLogos = {
  gluten: { title: 'Glutént tartalmaz', logo: glutenLogo },
  glutenfree: { title: 'Gluténmentes', logo: glutenfreeLogo },
  sugar: { title: 'Cukrot tartalmaz', logo: sugarLogo },
  sugarfree: { title: 'Cukormentes', logo: sugarfreeLogo },
  lactose: { title: 'Laktózt tartalmaz', logo: lactoseLogo },
  lactosefree: { title: 'Laktózmentes', logo: lactosefreeLogo },
};

const translate = () => {
  ingredientsLogos.gluten.title = i18n.t('gluten');
  ingredientsLogos.glutenfree.title = i18n.t('glutenfree');
  ingredientsLogos.sugar.title = i18n.t('sugar');
  ingredientsLogos.sugarfree.title = i18n.t('sugarfree');
  ingredientsLogos.lactose.title = i18n.t('lactose');
  ingredientsLogos.lactosefree.title = i18n.t('lactosefree');
};

translate();

i18n.on('languageChanged init', () => translate());

export default ingredientsLogos;
