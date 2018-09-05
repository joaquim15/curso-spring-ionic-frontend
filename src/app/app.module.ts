import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErroInterceptorProvider } from '../interceptors/error-interceptors';
import { ClienteService } from '../services/domain/cliente.service';
import { StorageService } from '../services/storege.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { AuthService } from '../services/auth.service';
import { ProdutoService } from '../services/domain/produto.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErroInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService
  ]
})
export class AppModule {}
