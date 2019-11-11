import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToLogout() {
    this.router.navigateByUrl('/logout');
  }
  goToSecret() {
    this.router.navigateByUrl('/secret');
  }

  isLogged() {
    return this.auth.isLogged();
  }

  isNotLogged() {
    return this.auth.isLogged().pipe(
      map(isLogged => !isLogged)
    );
  }
}
