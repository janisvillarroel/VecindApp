import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestObject } from '../../models/request';
import { Residence } from '../../models/residence';
import { RequestProvider } from '../../providers/request/request';
import { UserResidence } from '../../models/user_residence';
import { CommentProvider } from '../../providers/comment/comment';
import { CommentRequest } from '../../models/comment';
import { AngularFireAuth } from 'angularfire2/auth';
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
  public user: UserResidence;
  public commentList: CommentRequest[];
  public addComment: boolean;
  public comment:CommentRequest;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestProvider: RequestProvider,
              public commentProvider: CommentProvider,
              public afAuth: AngularFireAuth) {
      this.residence = this.navParams.get('residence');
      this.user = this.navParams.get('userResidence');
      this.request= this.navParams.get('request');
      if(this.user != undefined){
        this.commentProvider.setCommentsFromResidenceAndUserOwnerAndRequest(this.user.residence_id,
          this.user.residence_owner_id,
          this.request.id );
        this.addComment=false;
        if(this.request.status=='En proceso'){
          this.addComment=true;
        }
      }else{
        this.commentProvider.setCommentsFromResidenceAndUserOwnerAndRequest(this.residence.id,
          this.afAuth.auth.currentUser.uid,
          this.request.id );
          this.addComment=false;
        if(this.request.status=='En proceso'){
          this.addComment=true;
        }
        this.comment = new CommentRequest();
      }
        commentProvider.getComments().subscribe(data => {
          this.commentList = new Array();
          for (let i = 0; i < data.length; i++) {
            this.commentList.push(data[i].payload.val());
            this.commentList[i].id = data[i].key;
          }
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  save(){
    this.comment.requestId=this.request.id;
    this.comment.timestamp = Date.now();
    this.comment.userId=this.afAuth.auth.currentUser.uid;
    this.comment.userEmail=this.afAuth.auth.currentUser.email;
    this.commentProvider.addComment(this.comment);
    this.comment.description="";
  }
}
