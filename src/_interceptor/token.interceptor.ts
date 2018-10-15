import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';


const APP_URL = environment.appUrl;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // Verification de l'url cible
        if (req.url.startsWith(APP_URL)) {
            // Verification si le token existe
            let token;
            if (token = this.auth.getToken()) {
                req = req.clone({
                    setHeaders: {
                        authorization: `Bearer ${token}`
                    }
                });
            }
        }
        return next.handle(req);
    }
}
