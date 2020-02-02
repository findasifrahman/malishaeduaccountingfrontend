import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnAddComponent } from './sales-return-add.component';

describe('SalesReturnAddComponent', () => {
  let component: SalesReturnAddComponent;
  let fixture: ComponentFixture<SalesReturnAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
