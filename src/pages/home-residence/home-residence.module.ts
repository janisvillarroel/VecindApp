import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeResidencePage } from './home-residence';

@NgModule({
  declarations: [
    HomeResidencePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeResidencePage),
  ],
})
export class HomeResidencePageModule {}
