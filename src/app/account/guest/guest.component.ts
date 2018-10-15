import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../../_model/user.model';
import { AuthService } from '../../../_service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenResponse } from '../../../_model/response/token-response.model';
import { ErrorResponse } from '../../../_model/response/error-response.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private sb: MatSnackBar
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.loginForm.enable();
  }

  public onSubmit() {
    if (this.submitted || !this.loginForm.valid) {
      return;
    }
    this.submitted = true;
    this.loginForm.disable();
    this.authService.authenticate(this.loginForm.value).subscribe(
      (res: TokenResponse) => {
        this.authService.setToken(res.token);
        this.sb.open(`${res.message}.`, null, {duration: 2000});
        // Si on est sur la page register on renvoie vers l'accueil
        if (this.router.url === '/register') {
          this.router.navigateByUrl('/accueil');
        }
      },
      (err: ErrorResponse) => {
        this.sb.open(`${err.message}.`, null, {
          duration: 2000,
          panelClass: 'sb-error'
        });
        this.submitted = false;
        this.loginForm.enable();
      }
    );
  }

  public goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
