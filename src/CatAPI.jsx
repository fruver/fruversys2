class CatAPI {
  constructor() {
    this.domain = process.env.API_DOMAIN;
  }

  listView = async (url) => {
    const fullUrl = `${this.domain}${url}`;
    try {
      return await this.fetch(fullUrl, {method: 'GET'});
    } catch(reason) {
      throw reason;
    }
  };

  detailView = async(url) => {
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

  createBrand = async (name) => {
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

  fetch = async (url, options) => {
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