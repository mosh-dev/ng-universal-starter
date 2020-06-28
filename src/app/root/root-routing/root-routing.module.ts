import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './guards/public.guard';
import { PrivateGuard } from './guards/private.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule),
    canActivate: [PrivateGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
    canActivate: [PublicGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    PublicGuard,
    PrivateGuard
  ]
})
export class RootRoutingModule {
}
