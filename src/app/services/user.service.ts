import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  arrayKey = 'users';
  objKey = 'user';

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnGetAllUsers() : Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([],APIS_ENUM.GET_ALL_USERS)
      .then((res)=> {
        resolve(res[this.arrayKey]);
      })
      .catch((err)=>{
        reject(err);
      })
    })
  }

  fnGetUserById(id: string) : Promise<any> {
    return new Promise((resolve, reject) =>{
      this.apiCallService.fnGetPromise([id],APIS_ENUM.GET_USER_BY_ID)
      .then(res => {
        resolve(res[this.objKey]);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
  fnPostNewUser(obj) : Promise<any> {
    return new Promise((resolve, reject) =>{
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_USER)
      .then( (res: ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
      })
      .catch(err => {
        reject("Error de conexión");
      })
    })
  }

  fnPostEditUser(id,obj): Promise<any> {
    return new Promise((resolve, reject) =>{
      this.apiCallService.fnPostWithParamsPromise(obj,[id],APIS_ENUM.POST_EDIT_USER)
      .then( (res: ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
      })
      .catch(err => {
        reject("Error de conexión");
      })
    })
  }

  fnPostDeleteUser(id): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise({},[id],APIS_ENUM.POST_DELETE_USER)
      .then((res: ResponseModel)=> {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
      })
      .catch(err => {
        reject("Error en la conexión");
      })
    })
  }


}
