import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { RequestObject } from '../../models/request';
import { Residence } from '../../models/residence';
import { User } from '../../models/user';

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
  public user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestProvider: RequestProvider) {
      this.residence = this.navParams.get('residence');
      this.user = this.navParams.get('user');
      this.request= new RequestObject();
      this.request.timestamp = Date.now();
      this.request.status="Registered"
      this.request.residence_id= this.residence.id;
      this.request.userName=this.user.email;
      this.request.progress=10;
      this.requestProvider.setRequestsFromResidence(this.residence.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  save(){
      this.requestProvider.addRequest(this.request);
      this.navCtrl.pop();
  }
}
