import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Residence } from '../../models/residence';
import { RequestObject } from '../../models/request';
import { RequestProvider } from '../../providers/request/request';
import { User } from '../../models/user';

/**
 * Generated class for the RequestListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-list',
  templateUrl: 'request-list.html',
})
export class RequestListPage {
  public residence: Residence;
  public requestList: RequestObject[];
  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public requestProvider: RequestProvider) {
    this.residence = navParams.get('residence');
    this.user = navParams.get('user');
    requestProvider.setRequestsFromResidence(this.residence.id);
    requestProvider.getRequest().subscribe(data => {
      this.requestList = new Array();
      for (let i = 0; i < data.length; i++) {
        this.requestList.push(data[i].payload.val());
        this.requestList[i].id = data[i].key;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestListPage');
  }

  addRequest(residence:Residence){
    this.navCtrl.push('RequestPage',{'residence':residence,'user':this.user});
  }

  goEditRequest(request: RequestObject){
    this.navCtrl.push('RequestEditPage',{'request':request,'residence':this.residence,'user':this.user});
  }

  deleteRequest(request: RequestObject){
    this.requestProvider.deleteRequest(request.id);
  }
  goDetailRequest(request: RequestObject){
    this.navCtrl.push('RequestDetailPage',{'request':request,'residence':this.residence,'user':this.user});
  }
}

