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
}
