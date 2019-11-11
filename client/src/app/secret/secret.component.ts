import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { SecretService, Secret } from './secret.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {
  serverData: Secret = null;
  constructor(
    private titleService: TitleService,
    private secretService: SecretService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Secret');
  }


  getData() {
    this.secretService.getSecretData().subscribe(
      secret => this.serverData = secret,
      err => {
        alert('Geting data from server failed');
        console.error(err);
      }
    )

  }

}
