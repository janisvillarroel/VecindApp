import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Resident } from '../../models/resident';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ResidentServiceProvider } from '../../providers/resident-service/resident-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserResidence } from '../../models/user_residence';
import { Residence } from '../../models/residence';
import { UserResidenceProvider } from '../../providers/user-residence-service/user-residence-service';

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
  aux: String;
  public userResidence: UserResidence;
  public residence: Residence;

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
              public userResidenceProvider: UserResidenceProvider,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public afAuth: AngularFireAuth) {

    this.operation = navParams.get('operation');

    if (this.operation == 'add'){
      this.residentFormGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])]
      });
    } else if (this.operation == 'edit'||this.operation == 'complete'){
      this.residentFormGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'),Validators.required])],
        last_name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*'),Validators.required])],
        phone: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('([2,3,4,5,6,7])[0-9 ]*'),Validators.required])],
        apartment_number: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-ZÀ-ÿ0-9. ]*')])],
        car_identifier: ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[0-9][0-9][0-9][0-9][a-zA-Z][a-zA-Z][a-zA-Z]')])],
        pets: [''],
        owner: ['']
      });
    }

    
    if (this.operation == 'add'){
      this.title = 'Generar Invitación';
      this.processButton = 'Generar';
      this.resident = new Resident();
      this.residence = navParams.get('residence');
      this.resident.residence_id = this.residence.id;
      this.resident.pets = false;
      this.resident.owner = false;
      this.addMode = true;
      this.userResidence = new UserResidence();
      this.userResidence.residence_id = this.resident.residence_id;
      this.userResidence.residence_owner_id = afAuth.auth.currentUser.uid;
      this.userResidence.residence_name = this.residence.name;
      this.userResidence.residence_photo = this.residence.image?this.residence.image:null;
      this.userResidence.residence_slogan = this.residence.slogan;
      this.userResidence.residence_address = this.residence.address;
      this.userResidence.residence_phone = this.residence.phone;

    } else if (this.operation == 'edit'){
      this.title = 'Editar Residente';
      this.processButton = 'Guardar';
      this.resident = navParams.get('resi');
    } else if (this.operation == 'complete') {
      this.title = 'Completar Información Residente';
      this.processButton = 'Guardar';
      this.resident = navParams.get('resi');
      this.userResidence = navParams.get('userResi');
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

    this.aux = null;

    this.residentServiceProvider.checkEmail(resident.residence_id, resident.email as string)
    .forEach (response => {
      if(response.length === 0 && this.aux === null) {
        this.aux = '1';
        //console.log("User does not exist");
        //console.log('Guardara');
        this.userResidence.email = resident.email;
        this.userResidence.resident_id = this.residentServiceProvider.addResident(resident);
        this.userResidenceProvider.addUserResident(this.userResidence);
        this.navCtrl.pop();
      } else if (this.aux !== '1' && this.aux === null) {
        //console.log("Users exists");
        this.aux = '0';
        let toast = this.toastCtrl.create({
          message: 'El correo electrónico esta asociado a un residente.',
          duration: 3000
        });
        toast.present();
      }
    });

    this.aux = null;
  }

  editResident(key: string, resident: Resident){
      this.residentServiceProvider.updateResident(key, resident);
      this.navCtrl.pop();
  }

  completeResident(key: string, resident: Resident){
      this.residentServiceProvider.updateOnlyResident(resident)
      this.userResidence.status = 'Active';
      this.userResidenceProvider.updateUserResident(this.userResidence.id, this.userResidence);
//      this.navCtrl.push('WelcomePage',{'resi':this.resident, 'userResi':this.userResidence});
      this.navCtrl.setRoot('HomeResidencePage',{'resi':this.resident, 'userResi':this.userResidence});
  }

  process(){
    
    if (this.residentFormGroup.valid){
      if (this.operation == 'add'){
        this.saveResident(this.resident);
      } else if (this.operation == 'edit' || this.operation == 'complete'){

        this.resident.car_identifier = this.resident.car_identifier ? this.resident.car_identifier : null;

        if (this.operation == 'edit'){
          this.editResident(this.resident.id, this.resident);
        }else{
          this.completeResident(this.resident.id, this.resident);
        }
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
