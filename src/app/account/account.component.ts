import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  constructor(authService: AuthService) { }

  ngOnInit() {
    // Check if user is logged
  }

}
