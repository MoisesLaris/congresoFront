import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  industrySelected: string = "-1";

  constructor() { }

  fnSetIndustry( industry ){
    this.industrySelected = industry;
  }

  fnGetIndustry(){
    return this.industrySelected;
  }

}
