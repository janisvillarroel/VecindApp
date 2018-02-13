import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { ResidentServiceProvider } from '../../providers/resident-service/resident-service';
import { ResidenceServiceProvider } from '../../providers/residence-service/residence-service';
import { UserResidence } from '../../models/user_residence';
import { Resident } from '../../models/resident';

/**
 * Generated class for the InvitationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitation-list',
  templateUrl: 'invitation-list.html',
})
export class InvitationListPage {

  public user: User;
  public userResidenceList: UserResidence[];
  public userResidence: UserResidence;
  public resident: Resident;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public residentServiceProvider: ResidentServiceProvider,
              public residenceServiceProvider: ResidenceServiceProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Conectandose a la base de datos, por favor espere...'
    });
    loading.present();

    this.user=this.navParams.get('user');

    residentServiceProvider.getUserResidenceByEmail(this.user.email).snapshotChanges().subscribe(data => {
     
      if (data.length == 0){
        this.showMessageEmptyList();
      }else {

        this.userResidenceList = new Array();

        for (let i = 0; i < data.length; i++) {
          this.userResidence = data[i].payload.val();
          this.userResidence.id = data[i].key;
          
          residenceServiceProvider.getResidence(data[i].payload.val().residence_owner_id, data[i].payload.val().residence_id)
          .map((Items) => {
              return Items.map((Item) => {
                if (Item.key == 'name'){
                  this.userResidence.residence_name = Item.payload.val();
                }else if (Item.key == 'photo'){
                  this.userResidence.residence_photo = Item.payload.val();
                }else if (Item.key == 'slogan'){
                  this.userResidence.residence_slogan = Item.payload.val();
                }else if (Item.key == 'address'){
                  this.userResidence.residence_address = Item.payload.val();
                }
              });
          }).subscribe(data => {
              if (this.userResidence.status == 'Pending'){
                this.userResidenceList.push(this.userResidence);
              }else if (this.userResidence.status == 'Active'){
                //this.navCtrl.push('HelpPage');
                this.goHomeResident(this.userResidence);
              }

              loading.dismissAll();
          });
        }
      }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationListPage');
  }

  acceptInvitation(userResidence: UserResidence){

    this.resident = null;
    this.residentServiceProvider.getResident(userResidence.residence_owner_id, userResidence.residence_id, userResidence.resident_id)
    .valueChanges().subscribe(data => {
    
      if (this.resident == null){
        this.resident = data;  
        this.navCtrl.push('ResidentPage',{'operation':'complete','resi':this.resident, 'userResi':userResidence});
      }
    });
  }

  goAcceptInvitation(userResidence: UserResidence){

    let prompt = this.alertCtrl.create({
      title: 'Invitación',
      message: "Aceptar invitación de "+userResidence.residence_name+"?",
      buttons: [
        {
          text: 'Si',
          handler: data => {
            this.acceptInvitation(userResidence);
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  showMessageEmptyList(){
    let toast = this.toastCtrl.create({
      message: 'No existen invitaciones.',
      duration: 3000
    });
    toast.present();
  }

  goHomeResident(userResidence: UserResidence){

    this.resident = null;
    this.residentServiceProvider.getResident(userResidence.residence_owner_id, userResidence.residence_id, userResidence.resident_id)
    .valueChanges().subscribe(data => {
    
      if (this.resident == null){
        this.resident = data;  
        this.navCtrl.push('WelcomePage',{'resi':this.resident, 'userResi':userResidence});
      }
    });
  }

}
