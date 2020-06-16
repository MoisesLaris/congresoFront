import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private apiCallService: ApiCallService
  ) { }


  fnGetPackageById(id): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise({},[id],APIS_ENUM.POST_EDIT_PACKAGE)
      .then((res:ResponseModel) => {
        if(res.success){
          resolve(res.success);
        }else{
          reject(res.message);
        }
      })
      .catch(err => {
        reject("Error de conexión");
      })
    })
  }

}
