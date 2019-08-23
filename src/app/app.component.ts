import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CookieService} from './services/cookie.service';
import {BrowserCookieStorage} from '../utilities/storage/cookieStorage';
import {LocalStorageService} from '../utilities/storage/localStorage';
import {SessionStorageService} from '../utilities/storage/sessionStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ng-universal-starter';

  constructor(private cs: CookieService) {
    /**
     * Example of use cookie in server side
     * Set with BrowserCookieStorage helper class.
     */
    BrowserCookieStorage.setItem('token', '123RandomToken');

    /**
     * Access with CookieService
     * This will work both on ClientSide Cycle and SSR Cycle,
     * Where BrowserCookieService is only works at clientSide
     * Cookies are sent with request and injected in via provider in AppEngine inside server.ts
     */
    console.log(cs.getItem('token'));

    BrowserCookieStorage.removeItem('token');
    BrowserCookieStorage.clear();

    /**
     * SSR Safe Storage Usage
     */
    LocalStorageService.setItem('key', 'value');
    SessionStorageService.setItem('key', 'value');

    /**
     * Will be null on server cycle
     * As there is no LocalStorage and SessionStorage is Server
     */
    console.log(LocalStorageService.getItem('key'));
    console.log(SessionStorageService.getItem('key'));

    LocalStorageService.removeItem('key');
    SessionStorageService.removeItem('key');

    /**
     * Additional Methods
     */
    LocalStorageService.clear();
    SessionStorageService.clear();


  }
}
