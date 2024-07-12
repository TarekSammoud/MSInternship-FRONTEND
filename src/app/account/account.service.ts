import { Router } from '@angular/router';
import { User } from './../shared/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/models/register';
import { environment } from 'src/environments/environment.development';
import { Login } from '../shared/models/login';
import { map, of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();


  constructor(private Http: HttpClient,private router: Router) { }

  register(model: Register){
    return this.Http.post(`${environment.appUrl}/api/Account/register`,model);
  }

  refreshUser(jwt:string | null){
    if (jwt===null){
      this.userSource.next(null);
      console.log("no jwt");
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);
    console.log(" jwt");


    return this.Http.get<User>(`${environment.appUrl}/api/Account/refresh-user-token`,{headers}).pipe(
      map((user: User) => {
        if (user){
          this.setUser(user);
        }
      })
    )

  }

  login(model: Login){
    return this.Http.post<User>(`${environment.appUrl}/api/Account/login`,model).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }

  getJWT(){
    const key = localStorage.getItem(environment.userKey);
    if (key){
      console.log(key);
      const user: User = JSON.parse(key);
      console.log(user.jwt);

      return user.jwt;
    }
    return null;
  }

  private setUser(user: User){
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
}
