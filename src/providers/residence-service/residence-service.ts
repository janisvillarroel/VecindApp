import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Residence } from '../../models/residence';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ResidenceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResidenceServiceProvider {

  residences: AngularFireList<Residence>;
  
  constructor(public http: HttpClient, 
              public residencesdb: AngularFireDatabase,
              public afAuth: AngularFireAuth ) {
    console.log('Id usuario: '+afAuth.auth.currentUser.uid);
    this.residences = residencesdb.list('/residences/'+afAuth.auth.currentUser.uid);
    // this.residencesObs = this.residences.snapshotChanges()
    // .map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

  }

  getResidences(): AngularFireList<Residence>{
    return this.residences;
  }

  addResidence(residence: Residence){
    this.residences.push(residence);
  }

  updateResidence(key: string, residence: Residence){
    this.residences.update(key, residence);
  }

  deleteResidence(key: string){
    this.residences.remove(key);
  }

  getResidence(userId: string, residentId: string): Observable<any[]>{
    this.residences = this.residencesdb.list('/residences/'+userId+'/'+residentId);
    return this.residences.snapshotChanges();
  }
}
