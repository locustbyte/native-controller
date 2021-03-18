import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ms-teams',
    loadChildren: () => import('./modal/ms-teams/ms-teams.module').then(m => m.MsTeamsPageModule)
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
