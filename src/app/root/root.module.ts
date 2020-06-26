import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { RootRoutingModule } from './root-routing/root-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RootRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
  ]
})
export class RootModule {
}
