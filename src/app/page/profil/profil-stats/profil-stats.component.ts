import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../_service/api.service';
import { DrinksResponse } from '../../../../_model/response/drinks-response.model';

@Component({
  selector: 'app-profil-stats',
  templateUrl: './profil-stats.component.html',
  styleUrls: ['./profil-stats.component.scss']
})
export class ProfilStatsComponent implements OnInit {

  @Input()
  paidDrink: number;

  @Input()
  balance: number;

  drankDrink: number;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getDrinksByDrinker().subscribe(
      (res: DrinksResponse) => {
        this.drankDrink = res.drinks.length;
      }
    );
  }

}
