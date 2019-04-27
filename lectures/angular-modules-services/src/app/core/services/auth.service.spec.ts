import { AuthService } from './auth.service';
import { userMock } from './user-mock';

describe('AuthService', () => {
  let service: AuthService;
  let mockLocalStorage;

  const mockUser = userMock;

  beforeEach(() => {
    mockLocalStorage = {

    };
    service = new AuthService();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should log in', (done) => {
      service.login();
      service.isAuthenticated().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toEqual(true);
        done();
      });
    });

    it('should store user data in local storage', () => {
      service.login();
      expect(localStorage.currentUser).toEqual(JSON.stringify(mockUser));
      expect(localStorage.accessToken).toBeTruthy();
    });
  });

  describe('#logout', () => {
    it('should log out', (done) => {
      service.logout();
      service.isAuthenticated().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toEqual(false);
        done();
      });
    });

    it('should remove user info', () => {
      service.login();
      service.logout();
      expect(localStorage.currentUser).toBeFalsy();
      expect(localStorage.accessToken).toBeFalsy();
    });
  });

  describe('#getUserInfo', () => {
    it('should return stored user info', () => {
      service.login();
      expect(service.getUserInfo()).toEqual(mockUser);
    });
  });

  afterAll(() => {
    localStorage.clear();
  });
});
