import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResidentPage } from './resident';

@NgModule({
  declarations: [
    ResidentPage,
  ],
  imports: [
    IonicPageModule.forChild(ResidentPage),
  ],
})
export class ResidentPageModule {}
