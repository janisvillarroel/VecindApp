import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResidencePage } from './residence';

@NgModule({
  declarations: [
    ResidencePage,
  ],
  imports: [
    IonicPageModule.forChild(ResidencePage),
  ],
})
export class ResidencePageModule {}
