import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarCompComponent } from './dashboar-comp.component';

describe('DashboarCompComponent', () => {
  let component: DashboarCompComponent;
  let fixture: ComponentFixture<DashboarCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboarCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboarCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
