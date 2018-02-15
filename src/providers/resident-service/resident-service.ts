import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Resident } from '../../models/resident';
import { AngularFireObject } from 'angularfire2/database/interfaces';

/*
  Generated class for the ResidentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResidentServiceProvider {

  residents: AngularFireList<Resident>;
  resident: AngularFireObject<Resident>;
  
  constructor(public http: HttpClient, 
              public residencesdb: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
  }

  setResidentsFromResidence(residenceId: string){
     this.residents = this.residencesdb.list('/residences/'+this.afAuth.auth.currentUser.uid+'/'+residenceId+'/members');
  }

  // setResident(userId:string, residenceId: string, residentId: string){
  //   //this.resident = this.residencesdb.object('/residences/'+userId+'/'+residenceId+'/members/'+residentId);
  //   this.residents = this.residencesdb.list('/residences/'+userId+'/'+residenceId+'/members');
  // }

  getResidents(): AngularFireList<Resident>{
    return this.residents;
  }

  addResident(resident: Resident): string{
    return this.residents.push(resident).key;
  }

  updateResident(key: string, resident: Resident){
    this.residents.update(key, resident);
  }

  deleteResident(key: string){
    this.residents.remove(key);
  }

  updateOnlyResident(resident: Resident){
    this.resident.update(resident);
  }

  checkEmail(residenceId: string, email: string): Observable<any[]>{
    return this.residencesdb.list('/residences/'+this.afAuth.auth.currentUser.uid+'/'+residenceId+'/members',
    ref => ref.orderByChild('email').equalTo(email)).valueChanges();
  }

  getResident(userId: string, residenceId: string, residentId: string): AngularFireObject<Resident>{
    this.resident = this.residencesdb.object('/residences/'+userId+'/'+residenceId+'/members/'+residentId);
    return this.resident;
  }
}
