export const DASH_ROUTES = {
  SUMMARY: '/',
  FAQ: '/faq',
  CATALOGUE: '/catalogue',
  PRODUCTS: '/catalogue/products',
  CATEGORY: '/catalogue/category',
  BRANDS: '/catalogue/brands'
};

export const USER_ROUTES = {
  SIGNIN: '/sigin',
  SIGNUP: '/signup',
  SIGNOUT: '/signout'
};

export const API_ROUTES = {
  DOMAIN: process.env.API_DOMAIN || 'http://127.0.0.1:8000',
  TOKEN_AUTH: '/token-auth/',
  TOKEN_REFRESH: '/token-refresh/',
  USERS: '/users/',
};
