import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal-starter'}),
    BrowserTransferStateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
