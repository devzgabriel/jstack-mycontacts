import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor(path) {
    this.path = path;
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async loadCategories() {
    return this.httpClient.get(this.path);
  }

  async createCategories(category) {
    return this.httpClient.post(this.path, category);
  }
}

export default new CategoriesService('/categories');
