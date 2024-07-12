import { SharedService } from './../../shared/shared.service';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgModel, ValidationErrors, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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
    private formBuilder:FormBuilder,
    private SharedService : SharedService,
    private router : Router
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      cin:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      birthday: ['', [Validators.required, this.ageValidator]],
      email: ['', [Validators.required, Validators.pattern("^[\\w._%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")]],
      password:['',[Validators.required,Validators.minLength(8)]],
      imf:['',],
      mcc:['',],

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
    this.registerForm.get('mcc')?.setValidators([Validators.required,Validators.minLength(4),Validators.maxLength(4)]);
    this.registerForm.get('imf')?.setValidators([Validators.required]);

  }
  toggleFieldsOff() {
    this.showBusinessFields = false;
  }


   ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 18 ? null : { ageInvalid: true };
  }


  register() {
    this.submitted = true;
    this.errorMessages= [];
    this.registerForm.value.birthday = new Date(this.registerForm.value.birthday).toISOString(); // Ensure correct date format

    if (this.registerForm.valid){
      this.AccountService.register(this.registerForm.value).subscribe({
        next: (response : any) => {
          this.SharedService.showNotification(true,response.value.title,response.value.message)
          this.router.navigateByUrl('/account/login');
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
