import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './guards/public.guard';
import { PrivateGuard } from './guards/private.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
    canActivate: [PrivateGuard]
  },
  {
    path: '',
    loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule)
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
