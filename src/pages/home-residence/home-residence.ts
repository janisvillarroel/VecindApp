import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserResidence } from '../../models/user_residence';
import { Resident } from '../../models/resident';

/**
 * Generated class for the HomeResidencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-residence',
  templateUrl: 'home-residence.html',
})
export class HomeResidencePage {

  public userResidence: UserResidence;
  public resident: Resident;
  residenceViewRoot = 'ResidenceViewPage';
  residentViewRoot = 'ResidentViewPage';
  notificationRoot = 'NotificationListPage';
  reqlistResidenceRoot = 'ReqlistResidencePage';
  //exitRoot = 'WelcomePage';
  resParams = {
    'resident':null,
    'userResidence':null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resident = this.navParams.get('resi');
    this.userResidence =this.navParams.get('userResi');
    this.resParams.resident = this.resident;
    this.resParams.userResidence = this.userResidence;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeResidencePage');
  }
  
  goHome(){
    this.navCtrl.push('HomeResidencePage',{'resi':this.resident, 'userResi':this.userResidence});
  }

  goRequestList(){
    this.navCtrl.push('ReqlistResidencePage',{'resident':this.resident,'userResidence':this.userResidence});
  }

  goExit(){
    this.navCtrl.setRoot('WelcomePage');
    //this.navCtrl.push('WelcomePage');
  }
}
