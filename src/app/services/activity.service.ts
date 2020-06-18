import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnPostNewActivity(obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_ACTIVITY)
      .then((res: ResponseModel) => {
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
  
  fnGetActivityByCongress(idCongress): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idCongress],APIS_ENUM.GET_ACTIVITY_BY_CONGRESS)
      .then(res => {
        resolve(res['actividades']);
      })
      .catch(() => {
        reject("Error en la conexión");
      })
    })
  }

  fnPostDeleteActivity(idActivity): Promise<any> {
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise({},[idActivity],APIS_ENUM.POST_DELETE_ACTIVITY)
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

  fnGetActivityById(idActivity): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idActivity],APIS_ENUM.GET_ACTIVITY_BY_ID)
      .then(res => {
        resolve(res['actividad']);
      })
      .catch(() => {
        reject("Error en la conexión");
      })
    })
  }

  fnPostEditActivity(idActivity, obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise(obj,[idActivity],APIS_ENUM.POST_EDIT_ACTIVITY)
      .then((res: ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message)
        }
      })
      .catch(() => {
        reject("Error en la conexión");
      })
    })
  }

}
