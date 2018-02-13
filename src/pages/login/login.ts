import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ToastController } from 'ionic-angular';
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

  @ViewChild(Navbar) navBar: Navbar;
  public user: User = new User();
  public role: String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, public toastCtrl: ToastController) {
      console.log('ROLL: '+this.navParams.get('role'));
      this.role = this.navParams.get('role');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.setBackButtonAction();
  }

  login(){
    console.log(this.user);
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(result => {
      if (this.role == 'admin'){
        this.navCtrl.push('MyResidencesPage',{'user':this.user});
      }else if (this.role == 'user'){
        this.navCtrl.push('InvitationListPage',{'user':this.user});
      }
      
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000
      });
      toast.present();
      console.error(err);
    });

  }

   //Method to override the default back button action
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
    //Write here wherever you wanna do
     //this.navCtrl.pop();
     console.log('Back Button');
     this.navCtrl.push('WelcomePage');
    }
  }

}
