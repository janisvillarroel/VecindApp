import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RequestObject } from '../../models/request'
import { CommentRequest } from '../../models/comment';
/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {

  comments: AngularFireList<CommentRequest>;
  
  constructor(public http: HttpClient, 
              public requestsdb: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
               
  }

  setCommentsFromResidenceAndUserOwnerAndRequest(residenceId: string, userOwnerId:string, requestId:string){
    this.comments = this.requestsdb.list('/residences/'+userOwnerId+'/'+residenceId+'/requests/'+requestId+'/comments');
  }

  getComments(): Observable<any[]>{
    return this.comments.snapshotChanges();
  }

  addComment(comment: CommentRequest){
    this.comments.push(comment);
  }

}
