import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Resident } from '../../models/resident';

/*
  Generated class for the ResidentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResidentServiceProvider {

  residents: AngularFireList<Resident>;
  
  constructor(public http: HttpClient, 
              public residencesdb: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
  }

  setResidentsFromResidence(residenceId: string){
     this.residents = this.residencesdb.list('/residences/'+this.afAuth.auth.currentUser.uid+'/'+residenceId+'/members');
  }

  getResidents(): Observable<any[]>{
    return this.residents.snapshotChanges();
  }

  addResident(resident: Resident){
    this.residents.push(resident);
  }

  updateResident(key: string, resident: Resident){
    this.residents.update(key, resident);
  }

  deleteResident(key: string){
    this.residents.remove(key);
  }
}
