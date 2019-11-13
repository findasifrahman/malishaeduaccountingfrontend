import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCostAddComponent } from './office-cost-add.component';

describe('OfficeCostAddComponent', () => {
  let component: OfficeCostAddComponent;
  let fixture: ComponentFixture<OfficeCostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeCostAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeCostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
