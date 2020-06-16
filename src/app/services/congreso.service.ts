import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CongresoService {

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnGetAllCongress(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([],APIS_ENUM.GET_ALL_CONGRESS)
      .then((res) => {
        resolve(res['congresos']);
      })
      .catch(err =>{
        reject();
      }) 
    })
  }

  fnPostNewCongress(obj:any): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_CONGRESS)
      .then((res:ResponseModel) => {
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
  
  fnPostDeleteCongress(id): Promise<any>{
    return new Promise((resolve, reject) => {
      this.apiCallService.fnPostWithParamsPromise({},[id],APIS_ENUM.POST_DELETE_CONGRESS)
      .then((res:ResponseModel) => {
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

  fnGetCongressById(id): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([id],APIS_ENUM.GET_CONGRESS_BY_ID)
      .then(res => {
        resolve(res['congreso']);
      
      })
      .catch(() => {
        reject("Error de conexión");
      })
    })
  }

  fnPostEditCongress(id, obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise(obj,[id],APIS_ENUM.POST_EDIT_CONGRESS)
      .then((res:ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
      })
      .catch(() => {
        reject("Error en la conexión");
      })
    })
  }

  fnGetCongressByCareer(idCareer) : Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idCareer], APIS_ENUM.GET_CONGRESS_BY_CAREER)
      .then(res => {
        resolve(res['congresos']);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

}
