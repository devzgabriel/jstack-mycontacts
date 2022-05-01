import { APIError } from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    const contentType = response.headers.get('Content-Type');

    let body;
    if (contentType && contentType.includes('application/json')) {
      body = response.json();
    }

    if (response.ok) return body;
    throw new APIError(response, body);
  }

  async post(path, data) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default HttpClient;
