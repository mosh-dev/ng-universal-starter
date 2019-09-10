import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

@NgModule({
  /**
   * To use any Pipe,Component,Directive they need to be declared inside a module
   * They can be declared to only one module.
   * HOLDS: Components, Directives and Pipes.
   */
  declarations: [AppComponent],
  /**
   * To use other modules exported components, directives and pipes.
   * HOLDS: modules
   */
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-universal-starter'})
  ],
  /**
   * Makes Everything PUBLICLY available to other Module that Imports it.
   * We should really not export anything from app module for better project Organization.
   * HOLDS: Components, Directives, Pipes and Modules.
   */
  exports: [],
  /**
   * Register data providers such as SERVICES and GUARDS.
   * If not provided in root via @injectable metadata, These things can be Injected within this module Only
   * The Injected class will be available in this module and any module that imports it.
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
   * and that are not used in any route or template should be declared Here,
   * Otherwise treeShaking will remove them in prod build.
   * HOLDS: component
   */
  entryComponents: []
})
export class AppModule {
}
