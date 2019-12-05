import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRecieptListComponent } from './sales-reciept-list.component';

describe('SalesRecieptListComponent', () => {
  let component: SalesRecieptListComponent;
  let fixture: ComponentFixture<SalesRecieptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRecieptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRecieptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
