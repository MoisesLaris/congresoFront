import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private sessionService: SessionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token:string = this.sessionService.fnGetSessionToken()
    if(token){
        req = req.clone({
            setHeaders: {
                'authorization': token
            }
        });
    }
    return next.handle(req);
}

}
