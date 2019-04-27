import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {
      get: jasmine.createSpy('http.get'),
      post: jasmine.createSpy('http.post'),
      put: jasmine.createSpy('http.put'),
      delete: jasmine.createSpy('http.delete'),
    };

    service = new AuthService(mockHttp);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should log in', (done) => {
      spyOn(service, 'getUserInfo').and.returnValue(of({}));
      mockHttp.post.and.returnValue(of({ token: 'sometoken' }));
      service.login('username', 'password').subscribe(() => {
        expect(service.getUserInfo).toHaveBeenCalled();
        expect(localStorage.accessToken).toEqual(JSON.stringify('sometoken'));
        done();
      });
    });

    it('should handle regular error', (done) => {
      mockHttp.post.and.returnValue(throwError({ status: 400, message: 'some message' }));
      service.login('username', 'password').subscribe(() => {}, (error) => {
        expect(error).toEqual({ status: 400, message: 'some message' });
        done();
      });
    });

    it('should handle incorrect username or password error', (done) => {
      mockHttp.post.and.returnValue(throwError({ status: 401, message: 'some message' }));
      service.login('username', 'password').subscribe(() => {}, (error) => {
        expect(error).toEqual({ status: 401, message: 'Incorrect username or password' });
        done();
      });
    });
  });

  describe('#logout', () => {
    it('should log out', () => {
      spyOn(localStorage, 'removeItem');
      service.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    });

    it('should remove user info', (done) => {
      service.logout();

      service.user$.subscribe((user) => {
        expect(user).toBeFalsy();
        done();
      });
    });
  });

  afterAll(() => {
    localStorage.clear();
  });
});
