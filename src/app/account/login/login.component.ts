import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup = new FormGroup({});
  submitted = false ;
  errorMessages: string[]= [];

  constructor(private AccountService: AccountService,
    private formBuilder:FormBuilder,
    private router : Router
  ) {
      this.AccountService.user$.pipe(take(1)).subscribe({
        next: (user: User | null) => {
          if (user){
            this.router.navigateByUrl('')
          }
        }
      });
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],

    })
  }

  login(){

    this.submitted = true;
    this.errorMessages= [];

    if (this.loginForm.valid){
      console.log(this.loginForm.value)
      this.AccountService.login(this.loginForm.value).subscribe({
        next: (response : any) => {
          //console.log(response);
        },
        error: (error) => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors
          }
          else {
            this.errorMessages.push(error.error);
          }
        }
      });
    }
  }
}
