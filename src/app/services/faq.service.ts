import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnGetAllFaq() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService.fnGetPromise([],APIS_ENUM.GET_ALL_FAQ)
      .then(res => {
        console.log(res);
        resolve(res['faqs']);
      })
      .catch(err => {
        reject("Error de conexión");
      })
    })
  }

  fnPostNewFaq(obj) : Promise<any> {
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_FAQ)
      .then((res: ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
      })
      .catch(err => {
        reject("Error de conexión");
      });
    })
  }

  fnGetFaqById(id:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService.fnGetPromise([id],APIS_ENUM.GET_FAQ_BY_ID)
      .then(res => {
        resolve(res['faq']);
      })
      .catch(err => {
        reject("Error de conexión");
      })
    })
  }

  fnPostEditFaq(id,obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise(obj,[id],APIS_ENUM.POST_EDIT_FAQ)
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

  fnGetFaqByCongress(idCongress): Promise<any> {
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idCongress],APIS_ENUM.GET_ALL_FAQ_BY_CONGRESS)
      .then(res => {
        resolve(res['faqs']);
      })
      .catch(err => {
        reject("Error en la conexión");
      })
    })
  }

}
