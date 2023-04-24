import { AuthStorageService } from '../services/authStorage.service';

export class Auth {
  authStorage = new AuthStorageService();

  async login() {
    return await Promise.resolve(this.authStorage.setToken('token'));
  }

  async logout() {
    return await Promise.resolve(this.authStorage.removeToken());
  }

  isLogged() {
    return this.authStorage.getToken();
  }
}

