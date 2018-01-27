import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyResidencesPage } from './my-residences';

@NgModule({
  declarations: [
    MyResidencesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyResidencesPage),
  ],
})
export class MyResidencesPageModule {}
