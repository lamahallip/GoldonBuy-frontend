import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getTokenFromLocalStorage()
        if(token) {
            const requestWithToken = req.clone({
                headers: new HttpHeaders({
                    Authorization: `Bearer + ${token}`,
                    'Content-Type': 'application/json'
                })
            })
            return next.handle(requestWithToken)
        }

        throw new Error("Method not implemented.");
    }

}