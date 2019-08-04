class CatAPI {
  domain: string | undefined;

  constructor() {
    this.domain = process.env.API_DOMAIN;
  }

  Fetch = async (url: string, options: any) => {
    try {
      return await this.fetch(url, options)
    } catch(reason) {
      throw reason;
    }
  }

  fetch = async (url: string, options: object) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const response = await fetch(`${this.domain}${url}`, {
      headers,
      ...options
    });

    return await response.json();
  };
}

export default new CatAPI();