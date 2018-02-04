import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserdatPage } from './userdat';

@NgModule({
  declarations: [
    UserdatPage,
  ],
  imports: [
    IonicPageModule.forChild(UserdatPage),
  ],
})
export class UserdatPageModule {}
