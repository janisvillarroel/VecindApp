import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Residence } from '../../models/residence';
import { RequestObject } from '../../models/request';
import { RequestProvider } from '../../providers/request/request';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

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
    public requestProvider: RequestProvider,
    public afAuth: AngularFireAuth) {
    this.residence = navParams.get('residence');
    this.user = navParams.get('user');
    requestProvider.setRequestsFromResidenceAndUserOwner(this.residence.id,this.afAuth.auth.currentUser.uid);
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
  
  receiveRequest(request: RequestObject){
    request.status='Recepcionado';
    request.progress=15;
    this.requestProvider.updateRequest(request.id,request);
  }

  progressRequest(request: RequestObject){
    request.status='En proceso';
    request.progress=20;
    this.requestProvider.updateRequest(request.id,request);
  }

  completeRequest(request: RequestObject){
    request.status='Completado';
    request.progress=100;
    this.requestProvider.updateRequest(request.id,request);
  }

  goDetailRequest(request: RequestObject){
    this.navCtrl.push('RequestDetailPage',{'request':request,'residence':this.residence,'user':this.user});
  }
}

