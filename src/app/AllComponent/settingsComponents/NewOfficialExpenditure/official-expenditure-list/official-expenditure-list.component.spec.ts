import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialExpenditureListComponent } from './official-expenditure-list.component';

describe('OfficialExpenditureListComponent', () => {
  let component: OfficialExpenditureListComponent;
  let fixture: ComponentFixture<OfficialExpenditureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialExpenditureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialExpenditureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
