import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../models/user';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  user: AngularFireList<User>;

  constructor(public http: HttpClient,
              public residencesdb: AngularFireDatabase) {
    this.user = this.residencesdb.list('/users');
  }

  addUser(user: User){
    this.user.push(user);
  }

  getUserByEmail(email: string): AngularFireList<User>{
    return this.residencesdb.list('/users',
    ref => ref.orderByChild('email').equalTo(email));
  }
}
