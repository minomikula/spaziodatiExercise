import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    login: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  private readLoginForm(): User {
    return new User(this.loginForm.value);
  }

  login() {
    if (this.loginForm.valid) {
      const user = this.readLoginForm();
      console.log(user);
    } else {
      // shoud not get there, button will be disabled
      alert('Invalid mail or password')
    }
  }

  private checkError(field: Fields<User>, validator: string): boolean {
    const control = this.loginForm.controls[field];
    return control.touched && control.hasError(validator);
  }
  showLoginEmailError() {
    return this.checkError('login', 'email');
  }
  showLoginRequiredError() {
    return this.checkError('login', 'required');
  }
  showPasswordRequiredError() {
    return this.checkError('password', 'required');
  }
}
type Fields<T> = keyof T & string;