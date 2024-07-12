import { AccountService } from './account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isNavbarExpanded: boolean = false;

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }


  constructor(private AccountService:AccountService){

  }



  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser(){
    const jwt = this.AccountService.getJWT();
    console.log(jwt)
    if (jwt){
      this.AccountService.refreshUser(jwt).subscribe({
        next: _ => {
          console.log("success")
        },
        error: _ => {
          console.log("logging out")
          console.log(_);
          this.AccountService.logout();
        }

      })
    } else {
      this.AccountService.refreshUser(null).subscribe();
    }
  }

  title = 'MSInternship-FRONTEND';
}
