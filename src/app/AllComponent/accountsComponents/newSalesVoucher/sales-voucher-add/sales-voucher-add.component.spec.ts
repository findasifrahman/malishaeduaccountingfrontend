import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVoucherAddComponent } from './sales-voucher-add.component';

describe('SalesVoucherAddComponent', () => {
  let component: SalesVoucherAddComponent;
  let fixture: ComponentFixture<SalesVoucherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesVoucherAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVoucherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
