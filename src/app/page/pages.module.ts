import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { NewDrinkComponent } from './new-drink/new-drink.component';
import { RegisterComponent } from './register/register.component';
import { UserTableComponent } from './accueil/user-table/user-table.component';
import { DrinkTableComponent } from './accueil/drink-table/drink-table.component';
import { ProfilComponent } from './profil/profil.component';
import { MaterialModule } from '../material.module';
import { ProfilInfoComponent } from './profil/profil-info/profil-info.component';
import { ProfilStatsComponent } from './profil/profil-stats/profil-stats.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AccueilComponent,
    NewDrinkComponent,
    RegisterComponent,
    UserTableComponent,
    DrinkTableComponent,
    ProfilComponent,
    ProfilInfoComponent,
    ProfilStatsComponent,
    AdminComponent
  ]
})
export class PagesModule { }
