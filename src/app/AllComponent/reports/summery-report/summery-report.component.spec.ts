import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryReportComponent } from './summery-report.component';

describe('SummeryReportComponent', () => {
  let component: SummeryReportComponent;
  let fixture: ComponentFixture<SummeryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
