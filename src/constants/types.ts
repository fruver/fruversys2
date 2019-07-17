export interface ProductProps {
  id: number;
  name: string;
  description: string;
  sku: number;
  brand: BrandProps;
  category: CategoryProps;
  date?: Date;
}

export interface CategoryProps {
  id: number;
  name: string;
  description?: string;
  date?: Date;
}

export interface BrandProps {
  id: number;
  name: string;
  description?: string;
  date?: Date;
}