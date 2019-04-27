import { of, Subject } from 'rxjs';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth/services/auth.service';
import { LoaderService } from './core/services/loader.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockAuth;
  let mockLoaderService;

  beforeEach(async(() => {
    mockAuth = {
      user$: of({})
    };

    mockLoaderService = {
      loaderState: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: LoaderService, useValue: mockLoaderService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
