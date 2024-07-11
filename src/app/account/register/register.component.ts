import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({});
  submitted = false ;
  errorMessages: string[]= [];

  constructor(private AccountService: AccountService,
    private formBuilder:FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      phoneNumber:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      cin:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      birthday:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")]],
      password:['',[Validators.required,Validators.minLength(8)]],
      imf:[''],
      mcc:['',[Validators.minLength(4),Validators.maxLength(4)]],
    })
  }

  showBusinessFields: boolean = false;

  formData: any = {
    firstname: '',
    lastname: '',
    imf: '',
    mcc: '',
    birthday: '',
    email: '',
    cin: '',
    password: '',
    phoneNumber:''
  };


  toggleFieldsOn() {
    this.showBusinessFields = true;
  }
  toggleFieldsOff() {
    this.showBusinessFields = false;
  }


  register() {
    this.submitted = true;
    this.errorMessages= [];

    this.AccountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    });
    console.log(this.registerForm.value)
  }


}
