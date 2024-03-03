import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ISignupRequest } from '../interfaces/signupinterface';
import { ILogin } from '../interfaces/logininterface';
import { ISignUpResponse } from '../interfaces/isign-up-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(registerData: ISignupRequest): Observable<ISignUpResponse> {
    console.log(registerData);
    return this.http.post<ISignUpResponse>(
      environment.BASEURL + 'api/Authentication/Register',
      registerData
    );
  }

  verificationCode(otp: string):Observable<any> {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
      otp: otp.toString(),
      token: sessionStorage.getItem('token')?.toString(),
    };
     console.log(obj);
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ConfirmEmail`,
      obj
    );
  }

  resendOTP() {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
    };
    console.log(obj);
    return this.http.post(
      environment.BASEURL + `api/Authentication/ResendOTP?email=${obj.email}`,
      {}
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setTokenInSessionStorage(token: string) {
    sessionStorage.setItem('token', token);
  }

  get isLoggedIn(): boolean {
    // return true;
    const userData = localStorage.getItem(localStorage['token'].userSession);
    if (userData) {
      const jsonUserData = JSON.parse(userData);
      const token = jsonUserData[localStorage['token']];
      const tokenExpireDate =
        jsonUserData[localStorage['token'].tokenExpireDate];
      return token && new Date(tokenExpireDate) >= new Date();
    }
    return false;
  }

  saveUserSession(applicationUser: any) {
    localStorage.setItem(
      localStorage['userSession'],
      JSON.stringify(applicationUser)
    );
  }

  logout() {
    localStorage.removeItem(localStorage['userSession']);
  }

  get Name() {
    if (this.isLoggedIn) {
      let userData = localStorage.getItem(localStorage['userSession']);
      if (userData) return JSON.parse(userData)[localStorage['fullName']];
      return null;
    }
  }

  get Token() {
    if (this.isLoggedIn) {
      let userData = localStorage.getItem(localStorage['userSession']);
      if (userData) return JSON.parse(userData)[localStorage['token']];
      return null;
    }
  }
  
  
  sendMail(email: string): Observable<any> {
    console.log(email);
    return this.http.post(
      environment.BASEURL + `api/Authentication/ForgetPassword?email=${email}`,
      {}
    );
  }


  resetVerificationCode(res: string):Observable<any> {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
      otp: res.toString(),
      //token: sessionStorage.getItem('token')?.toString(),
    };
     console.log(obj);
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ConfirmForgetPasswordOTP`,
      obj
    );
  }


  Login(request: ILogin): Observable<any> {
    console.log(request);
    return this.http.post<any>(
      environment.BASEURL + 'api/Authentication/Login',
      request
    );
  }


  

  // setNewPass(res:IForgetPassRequest){
  //   var obj={
  //     email: sessionStorage.getItem('email')?.toString(),
  //     token: sessionStorage.getItem('token')?.toString(),
  //     message: sessionStorage.getItem('message')?.toString(),
  //     password: res.password.toString(),
  //     confirmNewPassword: res.confirmNewPassword.toString()
  //   }
  //   console.log(obj);
  //   return this.http.post(
  //     environment.BASEURL + `api/Authentication/ConfirmForgetPassword`, obj);
  // }

  forgetPassword(email: string) {
    console.log(email);
    return this.http.post<any>(
      `${environment.BASEURL}api/Authentication/ForgetPassword?email=${email}`,
      {}
    );
  }
}
