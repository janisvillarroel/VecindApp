import { Camera } from '@ionic-native/camera';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { ResidenceServiceProvider } from '../providers/residence-service/residence-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResidentServiceProvider } from '../providers/resident-service/resident-service';
import { RequestProvider } from '../providers/request/request';
/* Giovo Database */
/*export const configFirebase = {
  apiKey: "AIzaSyDgwtrPA9_vLwRO459eqP1mNDdGErvbzOo",
  authDomain: "ionic-chat-bbe23.firebaseapp.com",
  databaseURL: "https://ionic-chat-bbe23.firebaseio.com",
  projectId: "ionic-chat-bbe23",
  storageBucket: "ionic-chat-bbe23.appspot.com",
  messagingSenderId: "306849589842"
};*/
/* Janis Database */
export const configFirebase = {
  apiKey: "AIzaSyAhtRFkrV0k_zOcwcJbUyOGqHNs7kAmr7U",
  authDomain: "finalproject-a0e01.firebaseapp.com",
  databaseURL: "https://finalproject-a0e01.firebaseio.com",
  projectId: "finalproject-a0e01",
  storageBucket: "finalproject-a0e01.appspot.com",
  messagingSenderId: "445318475144"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(configFirebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    HttpClient,
    AngularFireDatabase,
    AngularFireAuth,
    ResidenceServiceProvider,
    ResidentServiceProvider,
    RequestProvider
  ]
})
export class AppModule {}
