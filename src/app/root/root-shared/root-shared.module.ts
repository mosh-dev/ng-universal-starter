import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';


@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAnalyticsModule
  ]
})
export class RootSharedModule {
}
