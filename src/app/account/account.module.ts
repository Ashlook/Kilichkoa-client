import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GuestComponent } from './guest/guest.component';
import { SignedComponent } from './signed/signed.component';
import { AccountComponent } from './account.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTooltipModule
  } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  declarations: [
    GuestComponent,
    SignedComponent,
    AccountComponent
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
