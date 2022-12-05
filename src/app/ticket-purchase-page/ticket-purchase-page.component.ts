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
  errorMessage: string | null = null;
  regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  userCredentials = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.max(999999999), Validators.pattern(/[0-9]{9}/g)],
    ],
    email: ['', [Validators.required, Validators.pattern(this.regex)]],
    confirmEmail: ['', [Validators.required, Validators.pattern(this.regex)]],
  });
  message: ValidationErrors | null;
  constructor(private fb: FormBuilder) {
    this.message = null;
  }

  ngOnInit(): void {}

  onSubmit() {
    const { email, confirmEmail } = this.userCredentials.controls;
    if (email.value !== confirmEmail.value) {
      this.errorMessage = 'Adresy email nie są jednakowe';
      return;
    }
    // TODO: Use EventEmitter with form value
    console.warn(this.userCredentials.value);
  }
  onChange(event: Event) {
    const { email, confirmEmail } = this.userCredentials.controls;
    if (email.value !== confirmEmail.value) {
      this.userCredentials.controls.confirmEmail.invalid;
      this.errorMessage = 'Adresy email nie są jednakowe';
      return;
    }
    console.log('hi', event);
    //@ts-ignore
    // this.message = this.userCredentials.controls.name.errors['minLength'];
    // console.warn(this.userCredentials.controls.name.errors);
  }
}
