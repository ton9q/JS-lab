import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../auth/services/auth.service';
import { of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';

@Directive({ // tslint:disable-next-line
  selector: '[routerLink]'
})
class NoopRouterLinkDirective {
  @Input() routerLink: any;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService;
  let mockRouter;

  const mockUser = {
    id: 1,
    name: {
      first: 'First',
      last: 'Last'
    }
  };

  beforeEach(async(() => {
    mockAuthService = {
      logout: jasmine.createSpy('logout').and.returnValue(of(false)),
      user$: new BehaviorSubject<User>(null),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, NoopRouterLinkDirective ],
      imports: [ MatButtonModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('user is logged out', () => {
    it('should retrive login page by login button click', () => {
      const button = fixture.debugElement.query(By.css('.user-controls button'));
      button.triggerEventHandler('click', null);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('user is logged in', () => {
    beforeEach(() => {
      component.user$.next(mockUser);
      fixture.detectChanges();
    });

    it('should show current user first and last name', () => {
      const userInfo = fixture.debugElement.query(By.css('.user-controls__info'));
      expect(userInfo.nativeElement.innerText).toEqual(`${mockUser.name.first} ${mockUser.name.last}`);
    });

    it('should logout by logout button click', () => {
      const button = fixture.debugElement.query(By.css('.user-controls button'));
      button.triggerEventHandler('click', null);
      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });
});
