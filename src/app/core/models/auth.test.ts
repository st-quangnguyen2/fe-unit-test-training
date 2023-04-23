import { AuthStorageService } from '../services/authStorage.service';
import { Auth } from './auth';

const spyAuthStorageServiceSetToken = jest.spyOn(AuthStorageService.prototype, 'setToken');
const spyAuthStorageServiceRemoveToken = jest.spyOn(AuthStorageService.prototype, 'removeToken');

describe('Test Auth Class', () => {
  const auth = new Auth();

  describe('Login', () => {
  
    it('SetItem method should be called!', async () => {
      await auth.login();
      expect(spyAuthStorageServiceSetToken).toBeCalled();
    });

    it('SetItem method should be called width token', () => {
      expect(spyAuthStorageServiceSetToken).toBeCalledWith('token');
    });
  });

  describe('Logout', () => {
  
    it('SetItem method should be called!', async () => {
      await auth.logout();
      expect(spyAuthStorageServiceRemoveToken).toBeCalled();
    });
  });
});
