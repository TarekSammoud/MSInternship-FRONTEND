import { Component } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {

  constructor(public accountService:AccountService){

  }
}
