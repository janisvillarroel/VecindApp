import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { RequestObject } from '../../models/request';
import { Residence } from '../../models/residence';
import { UserResidence } from '../../models/user_residence';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  public request: RequestObject;
  public residence: Residence;
  public user: UserResidence;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestProvider: RequestProvider) {
      this.residence = this.navParams.get('residence');
      this.user = this.navParams.get('userResidence');
      this.request= new RequestObject();
      this.request.timestamp = Date.now();
      this.request.status="Registrado"
      this.request.residenceId= this.residence.id;
      this.request.userEmail=this.user.email;
      this.request.userId=this.user.id;
      this.request.progress=10;
      this.requestProvider.setRequestsFromResidenceAndUserOwner(this.residence.id,this.user.residence_owner_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  save(){
      this.requestProvider.addRequest(this.request);
      this.navCtrl.pop();
  }
}
