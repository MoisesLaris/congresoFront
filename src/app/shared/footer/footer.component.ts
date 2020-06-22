import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();
    sub_user: Subscription;
    constructor(
        private sessionService: SessionService
     ) {}
     tipoUsuario = 1;
     
    ngOnInit() {
        this.fnSubscribeToUser();
    }
    fnSubscribeToUser(){
        this.sub_user = this.sessionService._permissions.subscribe(
            data => {
                if(data){
                    this.tipoUsuario = data.tipoUsuario;

                }
            }
        )
    }
}
