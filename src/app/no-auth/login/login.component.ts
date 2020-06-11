import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { LOGIN_STATE_ENUM } from 'src/app/enum/login-state.enum';
import { ToastrService } from 'ngx-toastr';
import { LoginResponseModel } from 'src/app/models/login-response.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  sub_auth: Subscription;

  loginForm = new FormGroup({
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnSubscribeToAuth();
  }
  ngOnDestroy(): void {
    if(this.sub_auth){
      this.sub_auth.unsubscribe();
    }
  }

  fnSubscribeToAuth(){
    this.sub_auth = this.sessionService._num_hasAccess.subscribe(
      num_state => {
        switch(num_state){
          case LOGIN_STATE_ENUM.LOGGED:
            this.router.navigate(["system/home"]); //Redirigimos a la ruta principal 
            break;
          case LOGIN_STATE_ENUM.VALIDATION_ERROR:
            break;
          case LOGIN_STATE_ENUM.NO_LOGGED:
            console.log("Usuario no ingresado");
            break;
        }
      }
    )
  }

  navigate(){
    this.router.navigateByUrl("/auth/register");
  }

  onSubmit(){
    let data = this.loginForm.value;
    console.log(this.loginForm.value)
    console.log(this.loginForm);
    
    this.loginService.fnPostLogin(data)
    .then(() => {
    })
    .catch( err => {
      this.toastr.error(err);
      this.sessionService.fnSetLoginStateValue(LOGIN_STATE_ENUM.VALIDATION_ERROR);
    })
    
  }


}
