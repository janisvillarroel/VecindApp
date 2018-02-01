import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Resident } from '../../models/resident';
import { ResidentServiceProvider } from '../../providers/resident-service/resident-service';
import { Residence } from '../../models/residence';

/**
 * Generated class for the ResidentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resident-list',
  templateUrl: 'resident-list.html',
})
export class ResidentListPage {

  residentsList: Resident[];
  residence: Residence;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public residentServiceProvider: ResidentServiceProvider,
              public alertCtrl: AlertController) {
    if (this.residence == null){
      this.residence = navParams.get('resi');
    }

    residentServiceProvider.setResidentsFromResidence(this.residence.id);

    residentServiceProvider.getResidents().subscribe(data => {
     
      this.residentsList = new Array();

      for (let i = 0; i < data.length; i++) {
        this.residentsList.push(data[i].payload.val());
        this.residentsList[i].id = data[i].key;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResidentListPage');
  }

  addResident(){
    this.navCtrl.push('ResidentPage',{'operation':'add','residence_id':this.residence.id});
  }

  goEditResident(resident: Resident){
    this.navCtrl.push('ResidentPage',{'operation':'edit','resi':resident});
  }

  deleteResident(resident: Resident){
    var auxTitle;
    if (resident.name == undefined){
      auxTitle = 'Residente';
    } else {
      auxTitle = resident.name +' '+resident.lastName;
    }

    let prompt = this.alertCtrl.create({
      title: auxTitle,
      message: "Esta seguro de eliminar al residente?",
      buttons: [
        {
          text: 'Si',
          handler: data => {
            this.residentServiceProvider.deleteResident(resident.id);
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
