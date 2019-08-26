export const DOMAIN_API = process.env.API_DOMAIN || 'http://localhost:8000';

export const SUMMARY = '/';
export const LOGIN = '/login';

// Product
export const PRODUCT_LIST = '/products';
export const PRODUCT_CREATE = '/products/create';
export const PRODUCT_UPDATE = '/products/:int';

// Category
export const CATEGORY_LIST = '/categories';
export const CATEGORY_CREATE = CATEGORY_LIST + '/create';
export const CATEGORY_UPDATE = CATEGORY_LIST + '/update';

// Brand
export const BRAND_LIST = '/brands';
export const BRAND_CREATE = BRAND_LIST + '/create';
export const BRAND_UPDATE = BRAND_LIST + '/update';