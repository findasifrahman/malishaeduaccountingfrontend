import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialExpenditureAddComponent } from './official-expenditure-add.component';

describe('OfficialExpenditureAddComponent', () => {
  let component: OfficialExpenditureAddComponent;
  let fixture: ComponentFixture<OfficialExpenditureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialExpenditureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialExpenditureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
