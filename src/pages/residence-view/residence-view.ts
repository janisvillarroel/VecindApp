import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserResidence } from '../../models/user_residence';

/**
 * Generated class for the ResidenceViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-residence-view',
  templateUrl: 'residence-view.html',
})
export class ResidenceViewPage {

  public userResidence: UserResidence;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userResidence =this.navParams.get('userResidence');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResidenceViewPage');
  }

}
