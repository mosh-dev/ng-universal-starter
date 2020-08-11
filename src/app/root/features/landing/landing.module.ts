import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingService } from './landing.service';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent
      }
    ])
  ],
  exports: [RouterModule],
  providers: [LandingService]
})
export class LandingModule {
  constructor() {
    console.log('Landing Module Loaded');
  }
}
