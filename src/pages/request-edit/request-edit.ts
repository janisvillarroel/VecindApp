import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { User } from '../../models/user';
import { Residence } from '../../models/residence';
import { RequestObject } from '../../models/request';
import { UserResidence } from '../../models/user_residence';

/**
 * Generated class for the RequestEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-edit',
  templateUrl: 'request-edit.html',
})
export class RequestEditPage {

  public request: RequestObject;
  public residence: Residence;
  public user: UserResidence;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestProvider: RequestProvider) {
      this.residence = this.navParams.get('residence');
      this.user = this.navParams.get('userResidence');
      this.request= this.navParams.get('request');
      this.request.timestamp= Date.now();
      requestProvider.setRequestsFromResidenceAndUserOwner(this.user.residence_id,this.user.residence_owner_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  save(){
      this.requestProvider.updateRequest(this.request.id,this.request);
      this.navCtrl.pop();
  }

}
