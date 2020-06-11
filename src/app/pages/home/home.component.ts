import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent2 implements OnInit {

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

  constructor(
    private router: Router,
    private serviceIndustry: ContactService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0); 
  }

  fnIndustrySelected(value){
    this.serviceIndustry.fnSetIndustry(value);
    this.router.navigate(['/contact']);

  }

}
