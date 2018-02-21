import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Resident } from '../../models/resident';

/**
 * Generated class for the ResidentViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resident-view',
  templateUrl: 'resident-view.html',
})
export class ResidentViewPage {
  public resident: Resident;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resident = this.navParams.get('resident');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResidentViewPage');
  }

}
