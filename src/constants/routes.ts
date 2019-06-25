// FontAwesomes
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {
  faStoreAlt as farStoreAlt,
  faScanner as farScanner,
  faShoppingBasket as farShoppingBasket,
  faTags as farTags
} from '@fortawesome/pro-regular-svg-icons';

const LOGIN = '/login';
const HOME = '/';
const CATALOGUE = '/catalogue';
const CATALOGUE_PRODUCTS = CATALOGUE + '/products';
const CATALOGUE_BRANDS = CATALOGUE + '/brands';
const CATALOGUE_CATEGORIES = CATALOGUE + '/categories';


export interface NavItemProps {
  id: number;
  labelName: string;
  urlName: string;
  iconName: IconProp;
  children?: NavItemProps[]|undefined;
}

const DASHBOARD: NavItemProps[]  = [
  {
    'id': 1,
    'labelName': 'Panel',
    'iconName': farStoreAlt,
    'urlName': HOME,
  },
  {
    'id': 2,
    'labelName': 'Catalogo',
    'iconName': farScanner,
    'urlName': CATALOGUE,
    'children': [
      {
        'id': 3,
        'labelName': 'Productos',
        'iconName': farShoppingBasket,
        'urlName': CATALOGUE_PRODUCTS,
      },
      {
        'id': 4,
        'labelName': 'Departamentos',
        'iconName': farTags,
        'urlName': CATALOGUE_CATEGORIES,
      },
      {
        'id': 5,
        'labelName': 'Marcas',
        'iconName': farTags,
        'urlName': CATALOGUE_BRANDS,
      }
    ]
  },
  {
    'id': 6,
    'labelName': 'Proveedores',
    'urlName': '/partner',
    'iconName': farTags
  }
];

export {
  LOGIN,
  HOME,
  CATALOGUE,
  CATALOGUE_PRODUCTS,
  CATALOGUE_CATEGORIES,
  CATALOGUE_BRANDS,
  DASHBOARD
};