import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
