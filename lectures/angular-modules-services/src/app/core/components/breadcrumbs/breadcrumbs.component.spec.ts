import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { By } from '@angular/platform-browser';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      imports: [ RouterTestingModule, MatToolbarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should separate segments by slash', () => {
    let separators = fixture.debugElement.queryAll(By.css('.breadcrumbs__item span'));
    expect(separators.length).toEqual(0);
    component.segments = ['one', 'two', 'three'];
    fixture.detectChanges();
    separators = fixture.debugElement.queryAll(By.css('.breadcrumbs__item span'));
    expect(separators.length).toEqual(component.segments.length - 1);
  });
});
