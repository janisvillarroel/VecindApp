import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Residence } from '../../models/residence';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ResidenceServiceProvider } from '../../providers/residence-service/residence-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ResidencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-residence',
  templateUrl: 'residence.html',
})
export class ResidencePage {

  public residence: Residence;
  public operation: String;
  public title: String;
  residenceFormGroup: FormGroup;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public camera: Camera, 
              public residenceServiceProvider: ResidenceServiceProvider,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController) {

    this.residenceFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'), Validators.required])],
      address: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-ZÀ-ÿ0-9(). ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('([2,3,4,5,6,7])[0-9 ]*'), Validators.required])],
      slogan: ['', Validators.compose([Validators.maxLength(200), Validators.pattern('([a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ0-9. ]*'), Validators.required])]
    });

    this.operation = navParams.get('operation');
    if (this.operation == 'add'){
      this.title = 'Registrar Residencia';
      this.residence = new Residence();
    } else if (this.operation == 'edit'){
      this.title = 'Editar Residencia';
      this.residence = navParams.get('resi');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResidencePage');
  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.residence.image  = 'data:image/jpeg;base64,' + imageData;
      console.log();
     }, (err) => {
      // Handle error
     });
  }

  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
      this.residence.image  = 'data:image/jpeg;base64,' + imageData;
      console.log();
      }, (err) => {
       console.log(err);
     });
  }

  saveResidence(residence: Residence){
    this.residenceServiceProvider.addResidence(residence);
    this.navCtrl.pop();
  }

  editResidence(key: string, residence: Residence){
    this.residenceServiceProvider.updateResidence(key, residence);
    this.navCtrl.pop();
  }

  process(){
    
    if (this.residenceFormGroup.valid){
      console.log('Procesara...');
      if (this.operation == 'add'){
        this.saveResidence(this.residence);
      } else if (this.operation == 'edit'){
        this.editResidence(this.residence.id, this.residence);
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Por favor revisar la información ingresada.',
        duration: 3000
      });
      toast.present();
    }
  }

  goResidents(resi: Residence){
    this.navCtrl.push('ResidentListPage',{'resi':resi});
  }
}
