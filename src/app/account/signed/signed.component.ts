import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signed',
  templateUrl: './signed.component.html',
  styleUrls: ['./signed.component.scss']
})
export class SignedComponent implements OnInit {

  public username: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = this.auth.getDecodedToken().username;
  }

  public signoff() {
    this.auth.signOff();
    this.router.navigateByUrl('/accueil');
  }
}
