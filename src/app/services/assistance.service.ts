import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnPostNewAssistance(obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_ASSITANCE)
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

  fnGetAssistancesByActivity(idActividad): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idActividad],APIS_ENUM.GET_ASSISTANCE_BY_ACTIVITY)
      .then(res => {
        resolve(res['actividades']);
      })
      .catch(() =>{
        reject();
      });
    })
  }

}
