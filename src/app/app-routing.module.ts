import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MyGuardGuard } from './my-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'mostar',
    canActivate:[MyGuardGuard],
    loadChildren: () => import('./mostar/mostar.module').then( m => m.MostarPageModule)
  },
  {
    path: 'malo',
    loadChildren: () => import('./malo/malo.module').then( m => m.MaloPageModule)
  },
  {
    path:'**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
