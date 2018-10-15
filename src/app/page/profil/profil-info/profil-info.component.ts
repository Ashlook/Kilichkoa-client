import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { compareValidator } from '../../../../_validator/validators';
import { User } from '../../../../_model/user.model';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../../../../_service/api.service';
import { forkJoin } from 'rxjs';
import { ErrorResponse } from '../../../../_model/response/error-response.model';

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent implements OnInit {

  @Input()
  user: User;

  public submitted = false;

  public userForm = this.fb.group({
    username: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    newPassword: ['', [
      Validators.minLength(8)
    ]],
    newPasswordCheck: ['', [
      Validators.minLength(8),
      compareValidator('newPassword')
    ]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.userForm.patchValue({ username: this.user.username });
    this.userForm.patchValue({ firstname: this.user.firstname });
    this.userForm.patchValue({ lastname: this.user.lastname });
    this.newPassword.valueChanges.subscribe(
      pwd => {
        (pwd.length !== 0)
          ? this.newPasswordCheck.setValidators([
            Validators.required,
            Validators.minLength(8),
            compareValidator('newPassword')
          ])
          : this.newPasswordCheck.setValidators([
            Validators.minLength(8),
            compareValidator('newPassword')
          ]);
        this.newPasswordCheck.updateValueAndValidity();
      }
    );
  }

  public onSubmit() {
    const pwdMod = !(this.newPassword.value.length === 0 && this.newPasswordCheck.value.length === 0);
    const infoMod = !(this.lastname.value === this.user.lastname && this.firstname.value === this.user.firstname);
    if (pwdMod || infoMod) {
      this.submitted = true;
      const user =  this.userForm.value;
      this.userForm.disable();
      const sources = [];
      if (pwdMod) {
        sources.push(this.api.updatePassword(user));
      }
      if (infoMod) {
        sources.push(this.api.updateInfo(user));
      }
      forkJoin(...sources).subscribe(
        ok => {
          console.log(ok);
          this.sb.open('Données mises à jour', null, { duration: 2000 });
          this.submitted = false;
          this.userForm.enable();
        },
        (err: ErrorResponse) => {
          this.sb.open(err.message, null, {
            panelClass: 'sb-error',
            duration: 2000
          });
          this.submitted = false;
          this.userForm.enable();
        }
      );
    } else {
      this.sb.open('Aucune donnnées n\'a été modifiées', null, { duration: 2000 });
    }
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

  get newPassword() {
    return this.userForm.get('newPassword') as FormControl;
  }

  get newPasswordCheck() {
    return this.userForm.get('newPasswordCheck') as FormControl;
  }

  get password() {
    return this.userForm.get('password') as FormControl;
  }

  get valuesChanged() {
    return this.lastname.value !== this.user.lastname
      && this.firstname.value !== this.user.firstname;
  }

  get status() {
    return (this.user.active) ? 'Compte actif' : 'Compte inactif';
  }

  get statusTooltipMsg() {
    return (this.user.active) ? 'Vous pouvez ajouter des tournées' : 'Vous devez être actif pour ajouter des tournées, contactez un admin';
  }

}
