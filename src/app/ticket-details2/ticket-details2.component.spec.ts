import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetails2Component } from './ticket-details2.component';

describe('TicketDetails2Component', () => {
  let component: TicketDetails2Component;
  let fixture: ComponentFixture<TicketDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
