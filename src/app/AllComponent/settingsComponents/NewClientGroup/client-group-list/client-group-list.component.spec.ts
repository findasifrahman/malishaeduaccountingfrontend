import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupListComponent } from './client-group-list.component';

describe('ClientGroupListComponent', () => {
  let component: ClientGroupListComponent;
  let fixture: ComponentFixture<ClientGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
