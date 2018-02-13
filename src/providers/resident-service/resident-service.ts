import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Resident } from '../../models/resident';
import { UserResidence } from '../../models/user_residence';
import { AngularFireObject } from 'angularfire2/database/interfaces';

/*
  Generated class for the ResidentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResidentServiceProvider {

  residents: AngularFireList<Resident>;
  userResidence: AngularFireList<UserResidence>;
  resident: AngularFireObject<Resident>;
  
  constructor(public http: HttpClient, 
              public residencesdb: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    this.userResidence = this.residencesdb.list('/user_residences');
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

  addResident(resident: Resident, userResidence: UserResidence){
    userResidence.resident_id = this.residents.push(resident).key;
    this.addUserResident(userResidence);
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

  getInfoByEmail(email: string){    //: Observable<any[]>{
    //return this.residencesdb.list('/residences').snapshotChanges();

    

    // this.residencesdb.list('/residences').snapshotChanges().map((ItemKeys) => {
    //   return ItemKeys.map((ItemKey) => {
    //     console.log('KEY: '+ItemKey.key);
    //     return this.residencesdb.object('/residences' + '/' + ItemKey.key);
    //   });
    // }).subscribe((items) => {
    //   console.log(items);
    // });
    
    //this.residenceList = new Array();

    this.residencesdb.list('/residences').snapshotChanges()
    // .map((ItemKeys) => {
    //   return ItemKeys.map((ItemKey) => {
    //     console.log('KEY: '+ItemKey.key);
    //     this.residenceList.push(ItemKey.key);

    //     return this.residencesdb.object('/residences/' + ItemKey.key);


    //     // .map((ItemKeys1) => {
    //     //   console.log('KEYX: '+ItemKeys1.values);
    //     //   return ItemKeys1.map((ItemKey1) => {
    //     //     console.log('KEY1: '+ItemKey1.key);
    //     //     //return this.residencesdb.object('/residences' + '/' + ItemKey.key+'/'+ItemKey1.key);
    

    
            
    //     //   });
    //     // });
        
    //   });
    // })

    .forEach((data) => {
//      console.log('DATA: '+ data);
//      console.log('DATA: '+ data[0].key);

//        this.residentsList.push(data[i].payload.val());
//        this.residentsList[i].id = data[i].key;
      for (let i = 0; i < data.length; i++) {
        console.log('item1: ' + data[i].key);
        this.residencesdb.list('/residences/'+data[i].key).snapshotChanges()
        .forEach((data1) => {
          for (let j = 0; j < data1.length; j++) {
            console.log('item2: ' + data1[j].key);
            this.residencesdb.list('/residences/'+data[i].key+'/'+data1[j].key+'/members',
            ref => ref.orderByChild('email').equalTo(email)).snapshotChanges()
            .forEach((data2) => {
              for (let k = 0; k < data2.length; k++) {
                console.log('item3: ' + data2[k].key);
                
                // this.invitation = new Invitation();

                // this.invitation.resident_id = data2[k].key;
                // this.invitation.residence_id = data1[j].key;
                // this.invitation.user_id = data[i].key;
                // this.invitations.push(this.invitation);
    
              }
            });
                

          }
        });
      }
      //console.log('VALORES: ' + items[0].]);
    });

    //return this.invitations;
    //console.log('ARRAY: '+ this.residenceList);


  }

  addUserResident(userResidence: UserResidence){
    this.userResidence.push(userResidence);
  }

  updateUserResident(key: string, userResidence: UserResidence){
    this.userResidence.update(key, userResidence);
  }

  getUserResidenceByEmail(email: string): AngularFireList<UserResidence>{
    return this.residencesdb.list('/user_residences',
    ref => ref.orderByChild('email').equalTo(email));
  }

  getResident(userId: string, residenceId: string, residentId: string): AngularFireObject<Resident>{
    this.resident = this.residencesdb.object('/residences/'+userId+'/'+residenceId+'/members/'+residentId);
    return this.resident;
  }
}
