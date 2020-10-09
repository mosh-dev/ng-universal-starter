import { NgModule } from '@angular/core';
import { AppLandingComponent } from './app-landing.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppLandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppLandingComponent
      }
    ])
  ]
})
export class AppLandingModule {
}
