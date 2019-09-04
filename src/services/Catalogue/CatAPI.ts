import {DOMAIN_API} from '../../constants/routes';

class CatAPI {

  Fetch = async (url: string, options: any) => {
    try {
      return await this.fetch(url, options);
    } catch(reason) {
      throw reason;
    }
  }

  fetch = async (path: string, options: object) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const response = await fetch(`${DOMAIN_API}/${path}`, {
      headers,
      ...options
    });

    return await response.json();
  };
}

export default new CatAPI();