import { of } from 'rxjs';
import { ROUTES } from 'src/app/app.routes';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseListModule } from 'src/app/course-list/course-list.module';
import { NgModuleFactoryLoader } from '@angular/core';
import { userMock } from 'src/app/core/services/user-mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let location: Location;
  let mockAuthService;

  beforeEach(async(() => {
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of(userMock))
    };

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatInputModule,
        FormsModule,
        MatCardModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {courseModule: CourseListModule};

    router.resetConfig([
      {path: 'courses', loadChildren: 'courseModule'},
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', fakeAsync(() => {
    component.userName = 'username';
    component.password = 'p455w0rd';
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    fixture.ngZone.run(() => {
      form.triggerEventHandler('submit', null);
      tick();
      expect(location.path()).toEqual('/');
    });
  }));
});
