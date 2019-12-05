import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCommissionAddComponent } from './sales-commission-add.component';

describe('SalesCommissionAddComponent', () => {
  let component: SalesCommissionAddComponent;
  let fixture: ComponentFixture<SalesCommissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCommissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCommissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
