import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResidentViewPage } from './resident-view';

@NgModule({
  declarations: [
    ResidentViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ResidentViewPage),
  ],
})
export class ResidentViewPageModule {}
