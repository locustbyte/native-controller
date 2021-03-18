import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsTeamsPageRoutingModule } from './ms-teams-routing.module';

import { MsTeamsPage } from './ms-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsTeamsPageRoutingModule
  ],
  declarations: [MsTeamsPage]
})
export class MsTeamsPageModule {}
