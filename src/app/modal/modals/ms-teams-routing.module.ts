import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsTeamsPage } from './ms-teams.page';

const routes: Routes = [
  {
    path: '',
    component: MsTeamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsTeamsPageRoutingModule {}
