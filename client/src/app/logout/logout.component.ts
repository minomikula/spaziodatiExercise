import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout().subscribe(
      res => {
        this.router.navigate(['']);
      },
      err => {
        alert('Logout failed!')
      }
    );

  }
  back() {
    this.location.back();
  }
}
