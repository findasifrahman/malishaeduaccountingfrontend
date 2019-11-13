import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCostListComponent } from './office-cost-list.component';

describe('OfficeCostListComponent', () => {
  let component: OfficeCostListComponent;
  let fixture: ComponentFixture<OfficeCostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeCostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
