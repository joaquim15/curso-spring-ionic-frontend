import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storege.service";
import { AlertController } from 'ionic-angular';
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alertCtrl: AlertController){

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

                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorOBJ);
                break;

                default:
                this.handleDefaultError(errorOBJ);
            }

            console.log("Erro Detectado pelo interceptor: ");
            console.log(errorOBJ);

            return Observable.throw(errorOBJ);
        }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401:  Falha de autenticação',
            message: 'Email ou Senha Inválidos',

            // opcional obriga o usuaria a clicar no botão de sair
            // caso contrario ele pode clicar em qualquer area da tela e sair
            enableBackdropDismiss: false,
            buttons: [{
                text: 'OK'
            }]
        });
        alert.present();
    }

    handle422(errorOBJ){
        let alert = this.alertCtrl.create({
            title : 'Erro 422: Validação',
            message : this.listErrors(errorOBJ.errors),
            // opcional obriga o usuaria a clicar no botão de sair
            // caso contrario ele pode clicar em qualquer area da tela e sair
            enableBackdropDismiss: false,
            buttons: [{
                text: 'OK'
            }]
        });
        alert.present();
    }

    handleDefaultError(errorOBJ){

        let alert = this.alertCtrl.create({
            title: 'Erro ' +  errorOBJ.status + ' : ' + errorOBJ.error,
            message: errorOBJ.message,
            // opcional obriga o usuaria a clicar no botão de sair
            // caso contrario ele pode clicar em qualquer area da tela e sair
            enableBackdropDismiss: false,
            buttons: [{
                text: 'OK'
            }]
        });
        alert.present();

    }

    private listErrors(messages : FieldMessage[]) : string { 
        let s : string = '';
        for ( var i=0; i<messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>' + messages[i].message + '</p>'
        }
        return s;
    };
}

export const ErroInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};