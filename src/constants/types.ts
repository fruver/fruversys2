import {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface ProductProp {
  id: number|string;
  name: string;
  sku: string;
  brand?: string;
  brand_id: number|string;
  category?: string;
  category_id: number|string;
}

export interface CategoryProp {
  id: number;
  name: string;
  children: CategoryProp[];
}

export interface BrandProp {
  id: number;
  name: string;
  description?: string;
  date?: Date;
}

export interface SideNavItemProp {
  id: number;
  labelName: string;
  iconName: IconProp;
  urlName: string;
}

export interface TableHeadProp {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}