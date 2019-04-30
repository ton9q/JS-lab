import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosListPageComponent } from './videos-list-page.component';

describe('VideosListPageComponent', () => {
  let component: VideosListPageComponent;
  let fixture: ComponentFixture<VideosListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
