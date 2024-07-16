import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes =
  [
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'settings', component: AccountSettingsComponent}
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
        RouterModule
  ],
})
export class AccountRoutingModule { }
