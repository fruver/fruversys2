/* eslint-disable @typescript-eslint/explicit-member-accessibility */

class CatAPI {
  domain: string | undefined;

  constructor() {
    this.domain = process.env.API_DOMAIN;
    this.fetch = this.fetch;
  }


  listView = async (url: string) => {
    const fullUrl = `${this.domain}${url}`;
    try {
      return await this.fetch(fullUrl, {method: 'GET'});
    } catch(reason) {
      throw reason.message;
    }
  };

  brands = async () => {
    const url = `${this.domain}/brands`;
    try {
      return await this.fetch(url, {method: 'GET'});
    } catch(reason) {
      throw reason;
    }
  };

  createBrand = async (name: string) => {
    const url = `${this.domain}/brands/create`;
    try {
      return await this.fetch(url, {
        method: 'POST',
        body: JSON.stringify({name})
      });
    } catch(reason) {
      throw reason;
    }
  };

  fetch = async (url: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  
    const response = await fetch(url, {
      headers,
      ...options
    });

    return await response.json();
  };

  _checkStatus = (response: any) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.message = response;
      throw error;
    }
  };

}

export default new CatAPI();