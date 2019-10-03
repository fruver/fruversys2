export const ROUTES = {
  SUMMARY: '/',
  SIGNIN: '/sigin',
  SIGNUP: '/signup',
  SIGNOUT: '/signout',
  FAQ: '/faq',
  CATALOGUE: '/catalogue',
  PRODUCTS: '/catalogue/products',
  DEPARTAMENTS: '/catalogue/departaments',
  BRANDS: '/catalogue/brands',
  CUSTOMER: '/customer',
  USER: '/customer/users',
  USERADDRESS: '/customer/userAdress'
};

export const API_ROUTES = {
  DOMAIN: process.env.API_DOMAIN || 'http://127.0.0.1:8000',
  TOKEN_AUTH: '/token-auth/',
  TOKEN_REFRESH: '/token-refresh/',
  USERS: '/users/',
  PRODUCTS: '/products/',
  CATEGORY: '/category/'
};
