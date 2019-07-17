
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
class CatAPI {
  domain: string | undefined;

  constructor() {
    this.domain = process.env.API_DOMAIN;
  }

  listView = async (url: string) => {
    const fullUrl = `${this.domain}${url}`;
    try {
      return await this.fetch(fullUrl, {method: 'GET'});
    } catch(reason) {
      throw reason;
    }
  };

  detailView = async(url: string) => {
    const absURL = `${this.domain}${url}`;
    try {
      return await this.fetch(absURL, {method: 'GET'});
    } catch(reason) {
      throw reason;
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

  Fetch = async (url: string) => {
    try {
      return await this.fetch(`${this.domain}${url}`, {
        method: 'GET'
      });
    } catch(reason) {
      throw reason;
    }
  };

  fetch = async (url: string, options: object) => {
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
}

export default new CatAPI();