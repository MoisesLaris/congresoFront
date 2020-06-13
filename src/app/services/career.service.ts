import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(
    private apiCallService: ApiCallService
  ) { }

  fnGetAllCareers(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([],APIS_ENUM.GET_ALL_CAREERS)
      .then((res) => {
        resolve(res['carreras']);
      })
      .catch(err =>{
        reject();
      }) 
    })
  }

  fnPostNewCareer(obj:any): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_CAREER)
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
  
  fnPostDeleteCareer(id): Promise<any>{
    return new Promise((resolve, reject) => {
      this.apiCallService.fnPostWithParamsPromise({},[id],APIS_ENUM.POST_DELETE_CAREER)
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

  fnGetCareerById(id): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([id],APIS_ENUM.GET_CAREER_BY_ID)
      .then(res => {
        resolve(res['carrera']);
      
      })
      .catch(() => {
        reject("Error de conexión");
      })
    })
  }

  fnPostEditCarrer(id, obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise(obj,[id],APIS_ENUM.POST_EDIT_CAREER)
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

}
