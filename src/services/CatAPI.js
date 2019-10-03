import {API_ROUTES} from '../constants/Routes';

class CatAPI {

  products = async (url, options) => {
    try {
      return await this.fetch(url, options);
    } catch(reason) {
      throw reason;
    }
  }

  fetch = async (path, options) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if(options.headers) {
      headers = {...headers, ...options.headers};
    }

    return await fetch(API_ROUTES.DOMAIN + path, {
      cache: 'default',
      headers: headers,
      ...options
    }).then(response => {
      if (response.ok) return response;
      // Raise an exception to reject the promise and trigger the outer .catch() handler.
      // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
      // for security logout user and clear user.
      localStorage.removeItem('auth:user');
      throw new Error(response.statusText);
    }).then( response => response.json());
  };
}

export default new CatAPI();