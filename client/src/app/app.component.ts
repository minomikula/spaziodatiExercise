import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
