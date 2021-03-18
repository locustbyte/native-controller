import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IpconfigPage } from './ipconfig.page';

const routes: Routes = [
  {
    path: '',
    component: IpconfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IpconfigPageRoutingModule {}
