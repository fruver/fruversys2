import * as routes from './constants/routes';

const getFetch = (url: string, options: any) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch(url, {
    headers,
    ...options
  });
};


export const createBrand = async (name: string) => {
  const path = `${routes.DOMAIN}${routes.BRAND_CREATE}`;

  try {
    return await getFetch(path, {
      method: 'POST',
      body: JSON.stringify({name})
    });
  } catch(reason) {
    throw reason;
  }
};