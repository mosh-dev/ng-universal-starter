import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './guards/public.guard';
import { PrivateGuard } from './guards/private.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('../features/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../features/login/login.module').then(m => m.LoginModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule),
    canActivate: [PrivateGuard]
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
