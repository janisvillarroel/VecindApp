import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResidenceServiceProvider } from '../../providers/residence-service/residence-service';
import { UserResidence } from '../../models/user_residence';
import { Resident } from '../../models/resident';
import { Residence } from '../../models/residence';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { RequestObject } from '../../models/request';
import { RequestProvider } from '../../providers/request/request';

/**
 * Generated class for the ReqlistResidencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reqlist-residence',
  templateUrl: 'reqlist-residence.html',
})
export class ReqlistResidencePage {

  public userResidence: UserResidence;
  public resident: Resident;
  public residence: Residence;
  public requestList: RequestObject[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public residenceProvider: ResidenceServiceProvider,
              public userServiceProvider: UserServiceProvider,
              public requestProvider: RequestProvider
            ) {
    this.userResidence= this.navParams.get('userResidence');
    this.resident  = this.navParams.get('resident');  
    this.residence=new Residence();
    this.residence.id=this.userResidence.residence_id;
    this.residence.address=this.userResidence.residence_address;
    this.residence.name=this.userResidence.residence_name;
    this.residence.phone=this.userResidence.residence_phone;
    this.residence.slogan=this.userResidence.residence_slogan;
    requestProvider.setRequestsFromResidenceAndUserOwner(this.userResidence.residence_id,this.userResidence.residence_owner_id);
    requestProvider.getRequestByResidenceAndUserId(this.residence.id,
      this.userResidence.residence_owner_id,
      this.userResidence.id).subscribe(data => {
      this.requestList = new Array();
      for (let i = 0; i < data.length; i++) {
        this.requestList.push(data[i].payload.val());
        this.requestList[i].id = data[i].key;
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReqlistResidencePage');
  }

  addRequest(){
    this.navCtrl.push('RequestPage',{'residence':this.residence,'userResidence':this.userResidence});
  }

  goEditRequest(request: RequestObject){
    this.navCtrl.push('RequestEditPage',{'request':request,'residence':this.residence,'userResidence':this.userResidence});
  }

  deleteRequest(request: RequestObject){
    this.requestProvider.deleteRequest(request.id);
  }

  goDetailRequest(request: RequestObject){
    this.navCtrl.push('RequestDetailPage',{'request':request,'residence':this.residence,'userResidence':this.userResidence});
  }

  sendRequest(request: RequestObject){
    request.status='Enviado';
    this.requestProvider.updateRequest(request.id,request);
  }
}
