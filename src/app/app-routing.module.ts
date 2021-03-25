import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'modals',
    loadChildren: () => import('./modal/modals/ms-teams.module').then(m => m.MsTeamsPageModule)
  },
  {
    path: 'ipconfig',
    loadChildren: () => import('./modal/ipconfig/ipconfig.module').then(m => m.IpconfigPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
