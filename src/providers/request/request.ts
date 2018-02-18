import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RequestObject } from '../../models/request';
/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  requests: AngularFireList<RequestObject>;
  
  constructor(public http: HttpClient, 
              public requestsdb: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
               
  }

  setRequestsFromResidenceAndUserOwner(residenceId: string,userOwnerId:string){
    this.requests = this.requestsdb.list('/residences/'+userOwnerId+'/'+residenceId+'/requests');
  }

  getRequestByResidenceAndUserId(residenceId: string,userOwnerId:string,userId:string): Observable<any[]>{
    return this.requestsdb.list('/residences/'+userOwnerId+'/'+residenceId+'/requests', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }

  getRequest(): Observable<any[]>{
    return this.requests.snapshotChanges();
  }

  addRequest(request: RequestObject){
    this.requests.push(request);
  }

  updateRequest(key: string, request: RequestObject){
    this.requests.update(key, request);
  }

  deleteRequest(key: string){
    this.requests.remove(key);
  }
}

