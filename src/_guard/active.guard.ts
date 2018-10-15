import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {
  private active: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private sb: MatSnackBar
  ) {
    this.auth.isActive.subscribe(res => {
      this.active = res;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.active);
    if (!this.active) {
      this.sb.open('Vous devez être un utilisateur actif, contactez un administrateur.', null, { duration: 3000 });
      this.router.navigateByUrl('/accueil');
      return false;
    }
    return true;
  }
}
