import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResidenceViewPage } from './residence-view';

@NgModule({
  declarations: [
    ResidenceViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ResidenceViewPage),
  ],
})
export class ResidenceViewPageModule {}
