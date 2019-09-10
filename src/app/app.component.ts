import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RequestCookieService} from './services/request-cookie.service';
import {BrowserCookieStorage} from '../utilities/storage/cookieStorage';
import {LocalStorageService} from '../utilities/storage/localStorage';
import {SessionStorageService} from '../utilities/storage/sessionStorage';
import {BROWSER_PLATFORM, NODE_PLATFORM} from '../utilities/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ng-universal-starter';

  constructor(private rcs: RequestCookieService) {
    /**
     * Example of use cookie in server side
     * Set with BrowserCookieStorage helper class.
     */

    if (NODE_PLATFORM && rcs.getCookieItem('randomKey')) {
      /**
       * Access with RequestCookieService
       * This will work both on ClientSide Cycle and SSR Cycle,
       * Where BrowserCookieService is only works at clientSide
       * Cookies are sent with request and injected in via provider in AppEngine inside server.ts
       */
      console.log(rcs.getCookieItem('randomKey'));
      BrowserCookieStorage.removeItem('randomKey');
      BrowserCookieStorage.clear();
    } else {
      BrowserCookieStorage.setItem('randomKey', '123RandomToken');
    }

    if (BROWSER_PLATFORM) {
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
}
