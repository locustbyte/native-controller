import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IpconfigPageRoutingModule } from './ipconfig-routing.module';

import { IpconfigPage } from './ipconfig.page';
import { GlobalConstants } from '../../global-constants';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IpconfigPageRoutingModule
  ],
  declarations: [IpconfigPage],
  providers: [GlobalConstants],
})
export class IpconfigPageModule { }
