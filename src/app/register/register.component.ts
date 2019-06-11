import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../_helpers/must-match.validator";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmed: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'passwordConfirmed')
    });

    this.secondFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/\d+/)]]
    });
    this.thirdFormGroup = this.formBuilder.group({
      addressField1: ['', [Validators.required, Validators.pattern(/\d+/)]],
      addressField2: ['', Validators.required],
      addressField3: ['', [Validators.required, Validators.pattern(/\d+/)]],
      addressField4: ['', Validators.required],
    });

  }

  submit() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
      console.log('form invalid');
    } else {
      this.authService.register({
        lastname: this.firstFormGroup.controls.lastname.value,
        firstname: this.firstFormGroup.controls.firstname.value,
        password: this.firstFormGroup.controls.password.value,
        email: this.secondFormGroup.controls.email.value,
        phone: this.secondFormGroup.controls.phone.value,
        address: [this.thirdFormGroup.controls.addressField1.value, this.thirdFormGroup.controls.addressField2.value, this.thirdFormGroup.controls.addressField3.value, this.thirdFormGroup.controls.addressField4.value].join(' ')
      });
    }
  }
}
