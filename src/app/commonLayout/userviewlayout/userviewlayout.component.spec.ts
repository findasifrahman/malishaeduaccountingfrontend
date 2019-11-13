import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewlayoutComponent } from './userviewlayout.component';

describe('UserviewlayoutComponent', () => {
  let component: UserviewlayoutComponent;
  let fixture: ComponentFixture<UserviewlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserviewlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
