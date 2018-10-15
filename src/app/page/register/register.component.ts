import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_service/api.service';
import { ErrorResponse } from '../../../_model/response/error-response.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../_service/auth.service';
import { TokenResponse } from '../../../_model/response/token-response.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { compareValidator } from '../../../_validator/validators';
import { MatSnackBar } from '@angular/material';
import { UserResponse } from '../../../_model/response/user-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    passwordCheck: ['', [
      Validators.required,
      Validators.minLength(8),
      compareValidator('password')
    ]]
  });

  public submitted = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private sb: MatSnackBar
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.userForm.enable();
  }

  public onSubmit() {
    this.submitted = true;
    this.userForm.disable();
    this.api.createUser(this.userForm.value).subscribe(
      (res: UserResponse) => {
        this.auth.authenticate(this.userForm.value).subscribe(
          (token: TokenResponse) => {
            this.auth.setToken(token.token);
            this.sb.open(`${res.message}. ${token.message}. Redirection vers l'accueil dans 3s.`, 'Ok', {duration: 3000});
            setTimeout(() => {
              this.router.navigateByUrl('/accueil');
            }, 3000);
          }
        );
      },
      (err: ErrorResponse) => {
        this.sb.open(err.message, null, {
          duration: 2000,
          panelClass: 'sb-error'
        });
        this.submitted = false;
        this.userForm.enable();
      }
    );
  }

  public getErrorMessage(fc: FormControl): string {
    if (!fc.valid && !fc.disabled) {
      if (fc.errors.required) {
        return 'Champs obligatoire';
      }
      if (fc.errors.compare) {
        return 'Les deux mots de passe doivent être identiques';
      }
      if (fc.errors.minlength) {
        if (fc === this.username) {
          return '3 caractères minimum';
        } else {
          return '8 caractères minimum';
        }
      }
    }
    return 'Erreur';
  }

  get username() {
    return this.userForm.get('username') as FormControl;
  }

  get lastname() {
    return this.userForm.get('lastname') as FormControl;
  }

  get firstname() {
    return this.userForm.get('firstname') as FormControl;
  }

  get password() {
    return this.userForm.get('password') as FormControl;
  }

  get passwordCheck() {
    return this.userForm.get('passwordCheck') as FormControl;
  }
}
