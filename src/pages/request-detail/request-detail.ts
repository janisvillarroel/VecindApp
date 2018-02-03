import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestObject } from '../../models/request';
import { Residence } from '../../models/residence';
import { User } from '../../models/user';
import { RequestProvider } from '../../providers/request/request';

/**
 * Generated class for the RequestDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-detail',
  templateUrl: 'request-detail.html',
})
export class RequestDetailPage {

  public request: RequestObject;
  public residence: Residence;
  public user: User;
  public commentList: Comment[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestProvider: RequestProvider) {
      this.residence = this.navParams.get('residence');
      this.user = this.navParams.get('user');
      this.request= this.navParams.get('request');
      this.requestProvider.setRequestsFromResidence(this.residence.id);
      this.commentList=new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

}
