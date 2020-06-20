import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnGetPaymentByPackage(idPackage): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idPackage], APIS_ENUM.GET_PAYMENT_BY_PACKAGE)
      .then(res => {
        resolve(res['pagos']);
      })
      .catch(() =>{
        reject("Error en la conexión");
      })
    })
  }

  fnGetPaymentById(idPayment): Promise<any>{
    return new Promise((resolve, reject) =>{
      this.apiCallService.fnGetPromise([idPayment],APIS_ENUM.GET_PAYMENT_BY_ID)
      .then(res => {
        resolve(res['pago']);
      })
      .catch(() => {
        reject();
      })
    })
  }

  fnPostNewPayment(obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostPromise(obj,APIS_ENUM.POST_NEW_PAYMENT)
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

  fnPostEditPayment(obj, idPayment): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise(obj,[idPayment],APIS_ENUM.POST_EDIT_PAYMENT)
      .then((res:ResponseModel) => {
        if(res.success){
          resolve(res.message);
        }else{
          reject(res.message);
        }
      })
      .catch(() => {
        reject("Error de conexión");
      })
    })
  }

}
