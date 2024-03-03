
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/iuser';



@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor( private _HttpClient:HttpClient) { 

  }
  
  addUser(formData:IUser): Observable<any>{
   return this._HttpClient.post(``,formData);

  }
}
