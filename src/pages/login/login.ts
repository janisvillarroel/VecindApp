import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  loginFormGroup: FormGroup;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth, 
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController) {
      this.role = this.navParams.get('role');

      this.loginFormGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(50), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.setBackButtonAction();
  }

  login(){
    console.log(this.user);
    
    if (this.loginFormGroup.valid){

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
    }else {
      let toast = this.toastCtrl.create({
        message: 'Por favor revisar la información ingresada.',
        duration: 3000
      });
      toast.present();
    }
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
