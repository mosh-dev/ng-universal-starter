import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CookieService} from './services/cookie.service';
import {BrowserCookieStorage} from '../ssr/storage/cookieStorage';

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
     */
    console.log(cs.getItem('token'));
  }
}
