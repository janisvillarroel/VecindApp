import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  public user: User = new User();
  registerFormGroup: FormGroup;
  aux: String;
  public role: String;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public formBuilder: FormBuilder,
              public userServiceProvider: UserServiceProvider,
              public toastCtrl: ToastController) {

    this.role = this.navParams.get('role');

    this.registerFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'),Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'),Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(50), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  register(){
    //console.log(this.user);
    if (this.registerFormGroup.valid){

      this.aux = null;

      this.userServiceProvider.getUserByEmail(this.user.email).valueChanges()
      .forEach (response => {
        if(response.length === 0 && this.aux === null) {
          this.aux = '1';
          this.registerUser();
        } else if (this.aux !== '1' && this.aux === null) {
          this.aux = '0';
          let toast = this.toastCtrl.create({
            message: 'El correo electrónico ya esta registrado.',
            duration: 3000
          });
          toast.present();
        }
      });

      this.aux = null;

    }else {
      let toast = this.toastCtrl.create({
        message: 'Por favor revisar la información ingresada.',
        duration: 3000
      });
      toast.present();
    }
  }

  registerUser(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(result => {
      this.userServiceProvider.addUser(this.user);
      
      let toast = this.toastCtrl.create({
        message: 'Se registró exitosamente el usuario.',
        duration: 2500
      });
      toast.present();

      this.navCtrl.push('LoginPage',{'role':this.role});
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
