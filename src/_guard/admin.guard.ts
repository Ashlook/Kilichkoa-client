import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private admin: boolean;

  constructor(
    private auth: AuthService,
    private sb: MatSnackBar,
    private router: Router
  ) {
    this.auth.isAdmin.subscribe(res => this.admin = res);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.admin) {
      this.sb.open('Vous devez être administrateur pour acceder à cette page.', null, { duration: 3000 });
      this.router.navigateByUrl('/accueil');
      return false;
    }
    return true;
  }
}
