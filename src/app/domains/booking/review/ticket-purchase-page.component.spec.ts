import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPurchasePageComponent } from './ticket-purchase-page.component';

describe('TicketPurchasePageComponent', () => {
  let component: TicketPurchasePageComponent;
  let fixture: ComponentFixture<TicketPurchasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPurchasePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPurchasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
