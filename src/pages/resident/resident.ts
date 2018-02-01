import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Resident } from '../../models/resident';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ResidentServiceProvider } from '../../providers/resident-service/resident-service';

/**
 * Generated class for the ResidentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resident',
  templateUrl: 'resident.html',
})
export class ResidentPage {

  public resident: Resident;
  public operation: String;
  public title: String;
  public processButton: String;
  public addMode: Boolean = false;
  residentFormGroup: FormGroup;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public camera: Camera, 
              public residentServiceProvider: ResidentServiceProvider,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController) {

    this.operation = navParams.get('operation');

    if (this.operation == 'add'){
      this.residentFormGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])]
      });
    } else if (this.operation == 'edit'){
      this.residentFormGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'),Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'),Validators.required])],
        phone: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('([2,3,4,5,6,7])[0-9 ]*'),Validators.required])],
        apartmentNumber: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*')])],
        car_identifier: ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[0-9][0-9][0-9][0-9][a-zA-Z][a-zA-Z][a-zA-Z]')])],
        pets: [''],
        owner: ['']
      });
    }

    
    if (this.operation == 'add'){
      this.title = 'Generar Invitacion';
      this.processButton = 'Generar';
      this.resident = new Resident();
      this.resident.residence_id = navParams.get('residence_id');
      this.resident.pets = false;
      this.resident.owner = false;
      this.addMode = true;
    } else if (this.operation == 'edit'){
      this.title = 'Editar Residente';
      this.processButton = 'Guardar';
      this.resident = navParams.get('resi');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResidentPage');
  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.resident.photo  = 'data:image/jpeg;base64,' + imageData;
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
      this.resident.photo  = 'data:image/jpeg;base64,' + imageData;
      console.log();
      }, (err) => {
       console.log(err);
     });
  }

  saveResident(resident: Resident){
    this.residentServiceProvider.addResident(resident);
    this.navCtrl.pop();
  }

  editResident(key: string, resident: Resident){
    this.residentServiceProvider.updateResident(key, resident);
    this.navCtrl.pop();
  }

  process(){
    
    if (this.residentFormGroup.valid){
      if (this.operation == 'add'){
        this.saveResident(this.resident);
      } else if (this.operation == 'edit'){
        if (this.resident.car_identifier == undefined){
          this.resident.car_identifier = null;
        }
        this.editResident(this.resident.id, this.resident);
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Por favor revisar la información ingresada.',
        duration: 3000
      });
      toast.present();
    }
  }

  updatePets($event){
    this.resident.pets = $event;
  }

  updateOwner($event){
    this.resident.owner = $event;
  }

  updateCarId(carId){
    this.resident.car_identifier = carId.toUpperCase();
  }
}
