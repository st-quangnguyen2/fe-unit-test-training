import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class UserService {
  http = new ApiService();

  constructor() {}

  getUsers() {
    return this.http.get([`${ENDPOINT.users.index}`]);
  }

  getUser(id: string | number) {
    return this.http.get([`${ENDPOINT.users.index}/${id}`]);
  }
}
