import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Drink } from '../../../../_model/drink.model';
import { User } from '../../../../_model/user.model';
import { AuthService } from '../../../../_service/auth.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../../../../_service/api.service';
import { DrinkResponse } from '../../../../_model/response/drink-response.model';
import { ErrorResponse } from '../../../../_model/response/error-response.model';

@Component({
  selector: 'app-drink-table',
  templateUrl: './drink-table.component.html',
  styleUrls: ['./drink-table.component.scss']
})
export class DrinkTableComponent implements OnInit {

  @Input() drinks: Drink[];
  @Output() deleted = new EventEmitter<boolean>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['price', 'user', 'date', 'drinkers', 'edit', 'remove'];
  dataSource: MatTableDataSource<Drink>;
  active: boolean;
  admin: boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    private api: ApiService,
    private sb: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Drink>(this.drinks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.auth.isActive.subscribe(res => this.active = res);
    this.auth.isAdmin.subscribe(res => this.admin = res);
  }

  public formatDrinkers(drinkers: User[]): string {
    return drinkers
      .map(e => e.username)
      .join(', ');
  }

  public canEdit(user: User): boolean {
    return (this.auth.isAuth() && this.auth.getDecodedToken().id === user._id);
  }

  public goToNewDrink() {
    this.router.navigateByUrl('/new-drink');
  }

  public deleteDrink(drink: Drink): void {
    window.confirm('Supprimer la tournée ?');
    this.api.deleteDrink(drink).subscribe(
      (res: DrinkResponse) => {
        this.sb.open(res.message, null, { duration: 2000 });
        const i = this.drinks.findIndex(e => e._id === drink._id);
        // On supprime et maj du tableau des tournées
        this.drinks.splice(i, 1);
        this.dataSource.paginator = this.paginator;
        // Maj du tableau des utilisateurs
        this.deleted.emit(true);
      },
      (err: ErrorResponse) => {
        this.sb.open(err.message, null, { duration: 2000 });
      }
    );
  }

  get tooltipMsg(): string {
    if (!this.auth.isAuth()) {
      return 'Vous devez être connecté.';
    }
    if (!this.active) {
      return 'Vous devez être actif.';
    }
    return '';
  }

  get hasDrink(): boolean {
    return this.drinks.length > 0;
  }

}
