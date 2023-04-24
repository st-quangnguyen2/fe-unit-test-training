import { AuthStorageService } from './authStorage.service';

const spyLocalStorageSetIem = jest.spyOn(Storage.prototype, 'setItem');
const spyLocalStorageGetIem = jest.spyOn(Storage.prototype, 'getItem');
const spyLocalStorageRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

describe('Test AuthStorageService Class', () => {
  const authStorageService = new AuthStorageService();
  const testToken = 'token';

  describe('Test setToken method', () => {
    authStorageService.setToken(testToken);
    it('setItem should be called', () =>{
      expect(spyLocalStorageSetIem).toBeCalled();
    });
    
    it('setItem should be called with value tokenTest', () =>{
      expect(spyLocalStorageSetIem).toBeCalledWith(authStorageService.ACCESS_TOKEN, testToken);
    });
  });

  describe('Test getToken method', () => {
    authStorageService.getToken();
    it('getItem should be called', () =>{
      expect(spyLocalStorageGetIem).toBeCalled();
    });

    it('getItem should be called with value access_token', () =>{
      expect(spyLocalStorageGetIem).toBeCalledWith(authStorageService.ACCESS_TOKEN);
    });
  });

  describe('Test removeToken method', () => {
    authStorageService.removeToken();
    it('romoveItem should be called', () =>{
      expect(spyLocalStorageRemoveItem).toBeCalled();
    });
    
    it('removeItem should be called with value access_token', () =>{
      expect(spyLocalStorageRemoveItem).toBeCalledWith(authStorageService.ACCESS_TOKEN);
    });
  });
});
