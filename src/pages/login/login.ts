import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: User = new User();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log(this.user);
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(result => {
      this.navCtrl.push('MyResidencesPage');
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000
      });
      toast.present();
      console.error(err);
    });

  }

}
