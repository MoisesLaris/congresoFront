import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOGIN_STATE_ENUM } from '../enum/login-state.enum';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private $num_hasAccess:BehaviorSubject<number> = new BehaviorSubject<number>(LOGIN_STATE_ENUM.CHECKING);
  _num_hasAccess:Observable<number> = this.$num_hasAccess.asObservable();

  private $permissions:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  _permissions:Observable<any> = this.$permissions.asObservable();

  $logged:BehaviorSubject<LoginResponseModel> = new BehaviorSubject<LoginResponseModel>(null);
  _logged:Observable<LoginResponseModel> = this.$logged.asObservable();

  constructor() { }

  fnSaveSession(any_logindata:LoginResponseModel,saveToken:boolean = true):void{
    this.$permissions.next(any_logindata);
    this.$num_hasAccess.next(LOGIN_STATE_ENUM.LOGGED);
    if(saveToken){
      localStorage.setItem("authorization",any_logindata.token);
    }
    
    this.$logged.next(any_logindata);
  }

  fnGetSessionToken(): string{
    let token = localStorage.getItem("authorization"); 
    if(token){
      return (token == undefined)?null:token;
    }
    return null;
  }

  fnSetLoginStateValue(num_state:number):void{
    this.$num_hasAccess.next(num_state);
  }

  fnLogout():void{
    this.$logged.next(null)
    this.$permissions.next(null);
    localStorage.removeItem("authorization");
  }
}
