import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() toggleNavbar: EventEmitter<void> = new EventEmitter<void>();


  isNavbarExpanded: boolean = false;

  toggle() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
    this.toggleNavbar.emit(); // Emit event to parent component
    console.log("toggling nav")
  }

  public isCollapsed : boolean = true;


  constructor(public accountService:AccountService){

  }

  logout(){
    this.accountService.logout();
  }


}
