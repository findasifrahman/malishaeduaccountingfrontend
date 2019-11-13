import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVoucherEditComponent } from './sales-voucher-edit.component';

describe('SalesVoucherEditComponent', () => {
  let component: SalesVoucherEditComponent;
  let fixture: ComponentFixture<SalesVoucherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesVoucherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
