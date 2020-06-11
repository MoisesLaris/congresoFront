import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { LoginResponseModel } from '../models/login-response.model';
import { SessionService } from './session.service';
import { LOGIN_STATE_ENUM } from '../enum/login-state.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiCallService: ApiCallService,
    private sessionService: SessionService
  ) { }

  fnPostNewUser(obj:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_USER)
      .then((res:ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
        
      })
      .catch(()=>{
        reject("Error en la conexión");
      })
    })
  }

  fnPostLogin(obj:any): Promise<any> {
    this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.CHECKING);
    return new Promise((resolve, reject) => {
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_LOGIN)
      .then( (res: LoginResponseModel) => {
         if(res.success){
           this.sessionService.fnSaveSession(res);
           resolve();
         }else{
           this.sessionService.fnLogout();
           this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.NO_LOGGED);
           reject(res.message);
         }
      })
      .catch( err => {
          this.sessionService.fnLogout();
          this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.NO_LOGGED);
          reject("Error con la conexión");
      })
    });
  }

  fnTokenLoginUser() : Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCallService.fnGetPromise([],APIS_ENUM.GET_USER_BY_TOKEN)
      .then((res:LoginResponseModel) => {
        if(res.success){
          this.sessionService.fnSaveSession(res,false);
          resolve();
        }else{
          this.sessionService.fnLogout();
          this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.EXPIRED_TOKEN);
          reject();
        }
      })
      .catch((rej) => {
          this.sessionService.fnLogout();
          this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.VALIDATION_ERROR);
          reject();
      })
    });
  }

}
