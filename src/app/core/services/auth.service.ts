import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient);

  private readonly _Router = inject(Router);

  // baseUrl: string = 'https://ecommerce.routemisr.com'


  UserData: any = null;

  setRegisterForm(data: object): Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  setloginForm(data: object): Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }


  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {

      this.UserData = jwtDecode(localStorage.getItem('userToken')!)
      console.log('userData',this.UserData)
    }
  }

logOut():void {
  localStorage.removeItem('userToken');
  this.UserData = null ;
  this._Router.navigate( ['/login'])
}

setEmailvarify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data )
}

setCodevarify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data )
}


setResetPass(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data )
}

}

