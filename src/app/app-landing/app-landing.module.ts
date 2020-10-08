import { NgModule } from '@angular/core';
import { AppLandingComponent } from './app-landing.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppLandingComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AppLandingComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppLandingModule {
}
