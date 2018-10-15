import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private sb: MatSnackBar
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Check if user is already logged
      if (this.auth.isAuth()) {
        this.sb.open('Impossible de s\'enregister, vous êtes déjà connecté.', null, {duration: 3000});
        this.router.navigateByUrl('/accueil');
        return false;
      }
      return true;
  }
}
