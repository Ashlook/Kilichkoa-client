import { Component, OnInit } from '@angular/core';
import { User } from '../../../_model/user.model';
import { Drink } from '../../../_model/drink.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../_service/api.service';
import { UsersResponse } from '../../../_model/response/users-response.model';
import { DrinksResponse } from '../../../_model/response/drinks-response.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public users: User[];
  public drinks: Drink[];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {users: UsersResponse, drinks: DrinksResponse}) => {
      this.users = (data.users) ? data.users.users : [];
      this.drinks = (data.drinks) ? data.drinks.drinks : [];
    });
  }

  public updateUsers() {
    this.api.getAllUsers().subscribe(
      (res: UsersResponse) => {
        this.users = res.users;
      }
    );
  }
}
