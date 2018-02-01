import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { Residence } from '../../models/residence';
import { ResidenceServiceProvider } from '../../providers/residence-service/residence-service';

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
  
  // residencesList: Residence[] = [
  //   {id: '1', name:'Edificio Victoria', image:'imagen', address: 'Av. Santa Cruz #1500', phone:'4545444',slogan:'Mejor no hay'},
  //   {id: '2', name:'Edificio Trinidad 3', image:'imagen', address: 'Juan Capriles #454', phone:'54545444',slogan:'Cerca de ti'}
  // ];

  residencesList: Residence[];
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public residenceServiceProvider: ResidenceServiceProvider,
              public alertCtrl: AlertController) {
//     residenceServiceProvider.getResidences().subscribe(data => {
//       this.residencesList = data;
//     });

    residenceServiceProvider.getResidences().subscribe(data => {
     
      this.residencesList = new Array();

      for (let i = 0; i < data.length; i++) {
//        console.log(data[i].payload.val());
        this.residencesList.push(data[i].payload.val());
        this.residencesList[i].id = data[i].key;
      }
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
}
