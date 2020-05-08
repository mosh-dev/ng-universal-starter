import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class LandingModule {
}
