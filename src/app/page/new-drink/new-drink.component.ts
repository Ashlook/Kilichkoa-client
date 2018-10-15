import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from '../../../_model/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_service/auth.service';
import { ApiService } from '../../../_service/api.service';
import { MatSnackBar } from '@angular/material';
import { DrinkResponse } from '../../../_model/response/drink-response.model';
import { ErrorResponse } from '../../../_model/response/error-response.model';
import { UsersResponse } from '../../../_model/response/users-response.model';

@Component({
  selector: 'app-new-drink',
  templateUrl: './new-drink.component.html',
  styleUrls: ['./new-drink.component.scss']
})
export class NewDrinkComponent implements OnInit {

  public drinkForm = this.fb.group({
    user: ['', Validators.required],
    drinkers: ['', Validators.required],
    price: ['', [
      Validators.required,
      (c: AbstractControl): ValidationErrors | null => {
        return c.value <= 0 ? {'greaterZero': true} : null;
      }
    ]],
    date_drink: [(new Date(Date.now())).toISOString().slice(0, 10), Validators.required]
  });

  public userAuth: User;
  public activeUsers: User[];

  public dateMax = new Date(Date.now());

  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private api: ApiService,
    private sb: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: {activeUsers: UsersResponse } ) => {
        this.activeUsers = data.activeUsers.users;
        // Récupération de l'utilisateur courant
        const i = this.activeUsers.map(e => e._id).indexOf(this.auth.getDecodedToken().id);
        this.userAuth = this.activeUsers[i];
        this.drinkForm.patchValue({user : this.activeUsers[i]});
        this.drinkForm.patchValue({drinkers : [this.activeUsers[i]]});
      }
    );
  }

  get drinkers(): FormControl {
    return this.drinkForm.get('drinkers') as FormControl;
  }

  get price(): FormControl {
    return this.drinkForm.get('price') as FormControl;
  }

  getErrorMessage(formControl: FormControl): string {
    if (!formControl.valid && !formControl.disabled) {
      if (formControl.errors.required) {
        return 'Champs obligatoire.';
      }
      if (formControl.errors.greaterZero) {
        return 'Le prix doit être plus grand que zéro.';
      }
    }
  }

  isSelected(user: User): boolean {
    return (user._id === this.userAuth._id);
  }

  public onSubmit() {
    this.submitted = true;
    this.drinkForm.disable();
    this.api.createDrink(this.drinkForm.value).subscribe(
      (res: DrinkResponse) => {
        this.submitted = false;
        this.drinkers.reset();
        this.price.reset();
        this.drinkForm.enable();
        this.sb.open(res.message, 'Close', {duration: 2000});
      },
      (err: ErrorResponse) => {
        this.submitted = false;
        this.drinkForm.enable();
        this.sb.open(err.message, 'Close', {
          duration: 2000,
          panelClass: 'sb-error'
        });
      }
    );
  }
}
