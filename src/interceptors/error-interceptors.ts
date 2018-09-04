import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storege.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // console.log("Passou");
        return next.handle(req)
        .catch((error, caught) => {
            
            let errorOBJ = error;

            if(errorOBJ.error){
                errorOBJ = errorOBJ.error;
            }

            if(!errorOBJ.status){
                errorOBJ = JSON.parse(errorOBJ);
            }

            switch(errorOBJ.status){
                case 403:
                this.handle403();
            }

            console.log("Erro Detectado pelo interceptor: ");
            console.log(errorOBJ);

            return Observable.throw(errorOBJ);
        }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErroInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};