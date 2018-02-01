import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResidentListPage } from './resident-list';

@NgModule({
  declarations: [
    ResidentListPage,
  ],
  imports: [
    IonicPageModule.forChild(ResidentListPage),
  ],
})
export class ResidentListPageModule {}
