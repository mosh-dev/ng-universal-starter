import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

@NgModule({
  /**
   * Makes Everything PRIVATELY available to this module
   * HOLDS: Components, Directives and Pipes.
   */
  declarations: [AppComponent],
  /**
   * To access other modules exported components, directives and pipes import is used.
   * HOLDS: modules
   */
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-universal-starter'})
  ],
  /**
   * Makes Everything PUBLICLY available to this module and other Module that Imports it.
   * We should really not export anything from app module for better project Organization.
   * HOLDS: Components, Directives and Pipes.
   */
  exports: [],
  /**
   * Register data providers such as SERVICES and GUARDS.
   * These things can be Injected within this module Only
   * The Injected class will be available to any component in this module and any module that imports it.
   * HOLDS: services and guards
   */
  providers: [],
  /**
   * Defines a component that is initially used to load the application
   * This component is loaded first during the bootstrap.
   * HOLDS: Single component
   */
  bootstrap: [AppComponent],
  /**
   * Components that is loaded dynamically on runtime
   * and that are not used in any route or template should be declared Here, Since they will be tree Otherwise
   * HOLDS: component
   */
  entryComponents: []
})
export class AppModule {
}
