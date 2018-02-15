import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserResidence } from '../../models/user_residence';

/*
  Generated class for the UserResidenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserResidenceProvider {

  userResidence: AngularFireList<UserResidence>;
  
  constructor(public http: HttpClient,
              public residencesdb: AngularFireDatabase) {
    this.userResidence = this.residencesdb.list('/user_residences');
  }

  addUserResident(userResidence: UserResidence){
    this.userResidence.push(userResidence);
  }

  updateUserResident(key: string, userResidence: UserResidence){
    this.userResidence.update(key, userResidence);
  }

  deleteUserResident(key: string){
    this.userResidence.remove(key);
  }

  getUserResidenceByEmail(email: string): AngularFireList<UserResidence>{
    return this.residencesdb.list('/user_residences',
    ref => ref.orderByChild('email').equalTo(email));
  }

  getUserResidenceByResident(resident_id: string): AngularFireList<UserResidence>{
    return this.residencesdb.list('/user_residences',
    ref => ref.orderByChild('resident_id').equalTo(resident_id));
  }

  getUserResidenceByResidence(residence_id: string): AngularFireList<UserResidence>{
    return this.residencesdb.list('/user_residences',
    ref => ref.orderByChild('residence_id').equalTo(residence_id));
  }
}
