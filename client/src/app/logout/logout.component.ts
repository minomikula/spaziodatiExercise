import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Logout');
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
