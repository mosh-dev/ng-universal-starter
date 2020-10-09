import { NgModule } from '@angular/core';
import { AppLandingComponent } from './app-landing.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppLandingComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AppLandingComponent
      }
    ]),
    CommonModule
  ]
})
export class AppLandingModule {
}
