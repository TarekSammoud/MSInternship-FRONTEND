import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/models/register';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private Http: HttpClient) { }

  register(model: Register){
    return this.Http.post(`${environment.appUrl}/api/Account/register`,model);
  }
}
