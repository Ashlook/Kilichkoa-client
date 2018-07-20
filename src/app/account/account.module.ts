import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest/guest.component';
import { SignedComponent } from './signed/signed.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GuestComponent,
    SignedComponent
  ]
})
export class AccountModule { }
