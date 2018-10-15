import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { NewDrinkComponent } from './new-drink/new-drink.component';
import { RegisterComponent } from './register/register.component';

import { RegisterGuard } from '../../_guard/register.guard';

import { AccueilUserResolver } from '../../_resolver/accueil-user.resolver';
import { AccueilDrinkResolver } from '../../_resolver/accueil-drink.resolver';
import { AuthGuard } from '../../_guard/auth.guard';
import { ActiveUsersResolver } from 'src/_resolver/active-users.resolver';
import { ProfilComponent } from './profil/profil.component';
import { ActiveGuard } from '../../_guard/active.guard';
import { UserResolver } from '../../_resolver/user.resolver';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../../_guard/admin.guard';

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    resolve: {
      users: AccueilUserResolver,
      drinks: AccueilDrinkResolver
    }
  },
  {
    path: 'new-drink',
    component: NewDrinkComponent,
    canActivate: [
      AuthGuard,
      ActiveGuard
    ],
    resolve: {
      activeUsers: ActiveUsersResolver
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [
      RegisterGuard
    ]
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [
      AuthGuard
    ],
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      AdminGuard
    ],
    resolve: {
      users: AccueilUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AccueilUserResolver,
    AccueilDrinkResolver,
    ActiveUsersResolver,
    UserResolver
  ]
})
export class PagesRoutingModule { }
