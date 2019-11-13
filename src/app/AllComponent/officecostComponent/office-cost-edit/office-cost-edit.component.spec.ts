import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCostEditComponent } from './office-cost-edit.component';

describe('OfficeCostEditComponent', () => {
  let component: OfficeCostEditComponent;
  let fixture: ComponentFixture<OfficeCostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeCostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeCostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
