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


  fnGetAllPackage(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([],APIS_ENUM.GET_ALL_PACKAGE)
      .then((res) => {
        console.log(res);
        resolve(res['congresos']);
      })
      .catch(err =>{
        reject();
      }) 
    })
  }
PostNewPackage(obj:any): Promise<any>{
    return new Promise((resolve,reject)=>{
      console.log(obj);
      this.apiCallService.fnPostPromise(obj, APIS_ENUM.POST_NEW_PACKAGE)
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
  
  fnPostDeletePackage(id): Promise<any>{
    return new Promise((resolve, reject) => {
      this.apiCallService.fnPostWithParamsPromise({},[id],APIS_ENUM.POST_DELETE_PACKAGE)
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

  fnGetPackageById(id): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([id],APIS_ENUM.GET_PACKAGE_BY_ID)
      .then(res => {
        resolve(res['tipoPago'])
      })
      .catch(() => {
        reject("Error de conexión");
      })
    })
  }


  fnPostEditPackage(id, obj): Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnPostWithParamsPromise(obj,[id],APIS_ENUM.POST_EDIT_PACKAGE)
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
  fnGetPackageByCongress(idCongress) : Promise<any>{
    return new Promise((resolve,reject) => {
      this.apiCallService.fnGetPromise([idCongress], APIS_ENUM.GET_PACKAGE_BY_CONGRESS)
      .then(res => {
        console.log(res);
        resolve(res['tipoPagos']);
      })
      .catch(err => {
        reject("Error de conexion");
      })
    })
  }
}
