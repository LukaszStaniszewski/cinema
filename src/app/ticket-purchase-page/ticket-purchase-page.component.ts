import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-ticket-purchase-page',
  templateUrl: './ticket-purchase-page.component.html',
  styleUrls: ['./ticket-purchase-page.component.css'],
})
export class TicketPurchasePageComponent implements OnInit {
  userCredentials = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    surname: ['', Validators.required],
    phoneNumber: ['', [Validators.minLength(9), Validators.maxLength(9)]],
    email: ['', Validators.required],
    confirmEmail: ['', Validators.required],
  });
  message: ValidationErrors | null;
  constructor(private fb: FormBuilder) {
    this.message = null;
  }

  ngOnInit(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userCredentials.value);
    const { name, surname } = this.userCredentials.value;
    if (name !== surname) return;
  }
  onChange(event: Event) {
    console.log('hi', event);
    //@ts-ignore
    this.message = this.userCredentials.controls.name.errors['minLength'];
    console.warn(this.userCredentials.controls.name.errors);
  }
}
