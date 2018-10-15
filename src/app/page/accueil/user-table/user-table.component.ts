import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../_model/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input() users: User[];
  displayedColumns: string[] = ['user', 'balance'];

  constructor() { }

  ngOnInit() {
  }

  get balanceM(): number {
    return this.users.reduce((somme, user) => somme + user.balance, 0);
  }

}
