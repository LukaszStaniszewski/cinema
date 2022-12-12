import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormArray } from '@angular/forms';
import { SET_UP } from 'src/environments/constants';
import { TicketInfo, TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-ticket-details2',
  templateUrl: './ticket-details2.component.html',
  styleUrls: ['./ticket-details2.component.css'],
})
export class TicketDetails2Component {
  maxTicketAmount = SET_UP.MAX_TICKETS_AMOUT_PER_USER;
  options = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10];
  ticketForm = this.createForm();
  ticketsInfo!: TicketInfo[];
  hide = true;
  ticketType!: string;
  price!: number;
  constructor(
    private builder: NonNullableFormBuilder,
    private ticketService: TicketService
  ) {
    console.log(this.ticketForm);
    //@ts-ignore
    console.log(this.ticketForm.controls.tickets['normal']);
  }

  ngOnInit(): void {
    // console.log(this.seatPosition);
    this.ticketService.getTicketInfo();
    this.ticketService.ticketInfo$.subscribe((ticketInfo) => {
      this.ticketsInfo = ticketInfo;
      // this.biletTypesAmount = ticketInfo.map()
      if (!ticketInfo[0]) return;
      for (let ticketInfo of this.ticketsInfo) {
        this.ticketForm.controls.tickets.push(
          this.builder.control(ticketInfo.type)
        );
        // form.addControl(ticketInfo.type, this.builder.control(''));
      }
      this.mapDefaultValues(ticketInfo);
      //@ts-ignore
      console.log(this.ticketForm.controls.tickets['normal']);
    });
  }
  ngOnChange() {
    //@ts-ignore
    console.log(this.ticketForm.controls.tickets['normal']);
  }

  private mapDefaultValues(ticket: TicketInfo[]) {
    const { price, type } = ticket[0];
    this.price = price;
    this.ticketType = type;
  }

  private createForm() {
    return this.builder.group({
      tickets: this.builder.array([]),
    });
  }
  get tickets() {
    return this.ticketForm.get('tickets');
  }

  submitForm() {
    console.log('hit');
    this.ticketForm.markAllAsTouched();

    if (this.ticketForm.invalid) {
      return;
    }

    // handle...
    console.log(this.ticketForm.value);
  }
}
