import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-system',
  templateUrl: './home-system.component.html',
  styleUrls: ['./home-system.component.css']
})
export class HomeSystemComponent implements OnInit {

  user: Subscription;
  userData;
    
  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.fnSubscribeUser();
  }

  ngOnDestroy(): void {
    if(this.user){
      this.user.unsubscribe();
    }
    
  }

  fnSubscribeUser(){
    this.user = this.sessionService._permissions.subscribe(data => {
      console.log(data);
      this.userData = data.user;
    })
  }

}
