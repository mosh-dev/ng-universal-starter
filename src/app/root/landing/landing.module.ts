import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
    ]),
    MatListModule,
    MatCardModule,
    MatRippleModule,
    AngularFirestoreModule
  ],
  exports: [RouterModule],
  providers: [LandingService]
})
export class LandingModule {
}
