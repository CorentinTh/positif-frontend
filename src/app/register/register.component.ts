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
  infoFormGroup: FormGroup;
  credentialsFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  success : boolean;

  constructor(private formBuilder: FormBuilder, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.infoFormGroup = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/\d+/)]],
      gender: ['', Validators.required],

    });

    this.credentialsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmed: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'passwordConfirmed')
    });
    this.locationFormGroup = this.formBuilder.group({
      addressField1: ['', [Validators.required, Validators.pattern(/\d+/)]],
      addressField2: ['', Validators.required],
      addressField3: ['', [Validators.required, Validators.pattern(/\d+/)]],
      addressField4: ['', Validators.required],
    });

  }

  submit() {

    if (this.infoFormGroup.invalid || this.credentialsFormGroup.invalid || this.locationFormGroup.invalid) {
      console.log('form invalid');
    } else {
      this.authService.register({
        gender: this.infoFormGroup.controls.gender.value,
        birthDate: new Date(this.infoFormGroup.controls.birthDate.value).toISOString(),
        lastname: this.infoFormGroup.controls.lastname.value,
        firstname: this.infoFormGroup.controls.firstname.value,
        password: this.credentialsFormGroup.controls.password.value,
        passwordConfirmed: this.credentialsFormGroup.controls.passwordConfirmed.value,
        email: this.credentialsFormGroup.controls.email.value,
        phoneNumber: this.infoFormGroup.controls.phone.value,
        address: [this.locationFormGroup.controls.addressField1.value, this.locationFormGroup.controls.addressField2.value, this.locationFormGroup.controls.addressField3.value, this.locationFormGroup.controls.addressField4.value].join(' ')
      }).subscribe(result => {
          this.success = result && result.status;
      })
    }
  }
}
