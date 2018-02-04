import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import {HelpPage} from '../pages/help/help';
//import {UserlogPage} from '../pages/userlog/userlog';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'WelcomePage';

  appMenuItems: Array<MenuItem>;
  
  accountMenuItems: Array<MenuItem>;
  
  helpMenuItems: Array<MenuItem>;

  /*constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }*/

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.appMenuItems = [
        {title: 'Mi Residencia', component: LoginPage, icon: 'home'},
        {title: 'Administrar Comunidad', component: LoginPage, icon: 'people'},
    ];

    this.accountMenuItems = [
        {title: 'Cerrar Seción', component: WelcomePage, icon: 'log-out'},
    ];

    this.helpMenuItems = [
        {title: 'Guía', component: HelpPage, icon: 'bookmark'},
        {title: 'Acerca de VecindApp', component: AboutPage, icon: 'information-circle'},
    ];

}

initializeApp() {
  this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
  });
}

openPage(page) {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
}



}

