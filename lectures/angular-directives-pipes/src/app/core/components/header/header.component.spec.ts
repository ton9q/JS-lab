import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { ROUTES } from 'src/app/app.routes';
import { Router } from '@angular/router';
import { LoginModule } from 'src/app/login/login.module';
import { Location } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;
  let mockAuthService;
  let isAuthenticated = false;

  const mockUser = {
    id: 1,
    firstName: 'First',
    lastName: 'Last'
  };

  beforeEach(async(() => {
    mockAuthService = {
      logout: jasmine.createSpy('logout').and.returnValue(of(false)),
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(of(isAuthenticated)),
      getUserInfo: jasmine.createSpy('getUserInfo').and.returnValue(mockUser),
    };

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MatButtonModule, RouterTestingModule.withRoutes(ROUTES) ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {loginModule: LoginModule};

    router.resetConfig([
      {path: 'login', loadChildren: 'loginModule'},
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('user is logged out', () => {
    beforeAll(() => {
      isAuthenticated = false;
    });

    it('should retrive login page by login button click', fakeAsync(() => {
      const button = fixture.debugElement.query(By.css('.user-controls button'));
      fixture.ngZone.run(() => {
        button.triggerEventHandler('click', null);
        tick();
        expect(location.path()).toEqual('/login');
      });
    }));
  });

  describe('user is logged in', () => {
    beforeAll(() => {
      isAuthenticated = true;
    });

    it('should show current user first and last name', () => {
      const userInfo = fixture.debugElement.query(By.css('.user-controls__info'));
      expect(userInfo.nativeElement.innerText).toEqual(`${mockUser.firstName} ${mockUser.lastName}`);
    });

    it('should logout by logout button click', () => {
      const button = fixture.debugElement.query(By.css('.user-controls button'));
      button.triggerEventHandler('click', null);
      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });
});
