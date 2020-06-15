import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enum/apis.enum';

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

}
