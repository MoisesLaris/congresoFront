import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  industry = [
    "AIRLINES"
    ,"APPLIANCES"
    ,"BAKERY"                   
    ,"BANK/FINANCIAL"
    ,"BAR & LOUNGE"
    ,"BAR NIGHT REMOTE"           
    ,"BEVERAGE"                   
    ,"BOATS & BOAT SUPPLIES"
    ,"BODY SHOP"
    ,"BOOKSTORES"
    ,"USED CAR DEALER"
    ,"NEW CAR DEALER"
    ,"CAR PARTS"
    ,"CAR RENTALS"
    ,"CAR WASH"
    ,"CARPETING/FLOORING"
    ,"CD'S & TAPES"
    ,"CHEESE/DAIRY"
    ,"COMPUTERS/OFFICE EQPMNT"
    ,"CONCERTS/SHOWS/EXHITNS"
    ,"CONSTRUCTION/LANDSCAPING"
    ,"DEPARTMENT STORE"
    ,"EDUCATION/TRAINING/JOBS"
    ,"FABRIC AND/OR CRAFTS"
    ,"FLORIST/GIFTS/CARDS"
    ,"FROZEN FOODS"
    ,"FURNISHINGS"
    ,"GROCERY STORE"         
    ,"HAIR SALON/BEAUTY PRDCTS"
    ,"HARDWARE/BUILDING/TILE"
    ,"HEALTH PRODUCTS"
    ,"HEALTH SPA/DIET CENTER"
    ,"HEATING/AIR COND/STOVES"
    ,"INSURANCE"
    ,"JANITORIAL"
    ,"JEWELRY STORE"
    ,"LAUNDRY/DRY CLEANING"
    ,"LOTTERY/GAMBLING/BINGO"
    ,"MALLS" 
    ,"MEDICAL/DENTAL/OPTICAL"
    ,"MEXICAN FOOD PRODUCTS"
    ,"MONEY TRANSFER"
    ,"MOTEL/HOTEL"                
    ,"MOTORCYCLE DEALERS"
    ,"MOVIE THEATER"
    ,"MOVING/U-HAUL"
    ,"NEWSPAPER/TV/MAGAZINES"
    ,"PETS/PET SUPPLIES"
    ,"PHARMACY" 
    ,"PHOTOGRAPHER/CAMERAS"
    ,"POLITICAL"
    ,"PRINTING/DELIVERY SERV"
    ,"REAL ESTATE"
    ,"RECYCLING"
    ,"RESTAURANT"             
    ,"RV'S/MBL HMS & SUPPLIES"
    ,"SERVICE STATION/GARAGE"
    ,"SHOES & CLOTHING"
    ,"SKIING/SKI RESORTS"
    ,"SPORTING GOODS/SKI EQUIP"
    ,"STEREO EQUIPMENT & TV"
    ,"TAX/LEGAL SERVICES"
    ,"TIRES"
    ,"TOURIST ATTRACTION"
    ,"TOY/BICYCLE STORES"
    ,"Traffic Report"
    ,"TRAVEL AGENCY"
    ,"UTILITIES/TELEPHONE"
    ,"VIDEO SALES/RENTAL"];

    industrySelected = "-1";

  constructor(
    private industryService: ContactService
  ) { }

  ngOnInit(): void {
    this.industrySelected = this.industryService.fnGetIndustry();
    console.log(this.industrySelected);
  }

  change(){
    this.industryService.fnSetIndustry(this.industrySelected);
  }

}
