import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor(path) {
    this.path = path;
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL);
  }

  async loadContacts(orderBy = 'asc') {
    return this.httpClient.get(`${this.path}?orderBy=${orderBy}`);
  }

  async createContacts(contact) {
    return this.httpClient.post(this.path, contact);
  }
}

export default new ContactsService('/contacts');
