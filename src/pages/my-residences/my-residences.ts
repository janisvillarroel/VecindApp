import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController, LoadingController } from 'ionic-angular';
import { Residence } from '../../models/residence';
import { ResidenceServiceProvider } from '../../providers/residence-service/residence-service';
import { User } from '../../models/user';
import { UserResidenceProvider } from '../../providers/user-residence-service/user-residence-service';

/**
 * Generated class for the MyResidencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-residences',
  templateUrl: 'my-residences.html',
})
export class MyResidencesPage {

  @ViewChild(Navbar) navBar: Navbar;
  public user: User;

  residencesList: Residence[];
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public residenceServiceProvider: ResidenceServiceProvider,
              public userResidenceProvider: UserResidenceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Recuperando residencias, por favor espere...'
    });
    loading.present();

    this.user=this.navParams.get('user');
    residenceServiceProvider.getResidences().snapshotChanges().subscribe(data => {
   
      this.residencesList = new Array();

      for (let i = 0; i < data.length; i++) {
        this.residencesList.push(data[i].payload.val());
        this.residencesList[i].id = data[i].key;
      }
    
      loading.dismissAll();
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyResidencesPage');
    this.setBackButtonAction()
  }

   //Method to override the default back button action
  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
    //Write here wherever you wanna do
     //this.navCtrl.pop();
     this.navCtrl.push('LoginPage');
    }
  }

  addResidence(){
    this.navCtrl.push('ResidencePage',{'operation':'add'});
  }

  goEdit(resi: Residence){
    this.navCtrl.push('ResidencePage',{'operation':'edit','resi':resi});
  }

  goRequestList(residence: Residence){
    this.navCtrl.push('RequestListPage',{'residence':residence,'user':this.user});
  }

  deleteResidence(residence: Residence){
    var auxResi;
    auxResi = residence.name;
    
    let prompt = this.alertCtrl.create({
      title: auxResi,
      message: "Esta seguro de eliminar la residencia?",
      buttons: [
        {
          text: 'Si',
          handler: data => {
            this.residenceServiceProvider.deleteResidence(residence.id);
            this.deleteUserResident(residence.id);
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  goResidents(resi: Residence){
    this.navCtrl.push('ResidentListPage',{'resi':resi});
  }

  deleteUserResident(residenceId: string){
    this.userResidenceProvider.getUserResidenceByResidence(residenceId).snapshotChanges().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        this.userResidenceProvider.deleteUserResident(data[i].key);
      }
    });
  }
}
