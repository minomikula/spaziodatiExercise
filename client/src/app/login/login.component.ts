import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../auth/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waitingForServer = new BehaviorSubject(false);

  loginForm = this.fb.group({
    login: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  })
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private location: Location,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');
    this.waitingForServer.subscribe(waiting => {
      if (waiting) {
        this.loginForm.disable();
      } else {
        this.loginForm.enable();
      }
    })
  }
  private readLoginForm(): User {
    return new User(this.loginForm.value);
  }

  login() {
    if (!this.loginForm.valid) {
      // shoud not get there, button will be disabled
      alert('Invalid mail or password')
      return;
    }
    const user = this.readLoginForm();
    this.waitingForServer.next(true);
    this.auth.login(user)
      .pipe(finalize(() => this.waitingForServer.next(false)))
      .subscribe(
        res => {
          this.back();
        },
        (err: HttpErrorResponse) => {
          const errMsg = err.error.errorMessage || 'Login failed!';
          alert(errMsg);
          console.log(err);
        }
      )

  }

  back() {
    this.location.back();
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