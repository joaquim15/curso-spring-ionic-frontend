import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou");
        return next.handle(req)
        .catch((error, caught) => {
            
            let errorOBJ = error;

            if(errorOBJ.error){
                errorOBJ = errorOBJ.error;
            }

            if(!errorOBJ.status){
                errorOBJ = JSON.parse(errorOBJ);
            }

            console.log("Erro Detectado pelo interceptor: ");
            console.log(errorOBJ);

            return Observable.throw(errorOBJ);
        }) as any;
    }
}

export const ErroInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};