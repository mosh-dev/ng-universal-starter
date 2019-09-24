import {Inject, Injectable, Optional} from '@angular/core';
import {fromBase64} from '../../utilities/utility';
import {BrowserCookieStorage} from '../../utilities/storage/cookieStorage';
import {NODE_PLATFORM} from '../../utilities/platform';

@Injectable({providedIn: 'root'})
export class RequestCookieService {
  /**
   * KeyNames as Strings.
   * These keys are filtered from cookie object
   */
  blackListedKeys: string[] = [];
  private cookieStore: { [key: string]: string | number };

  constructor(@Optional() @Inject('COOKIES') private serverCookies: any) {
  }

  /**
   * All the cookies are base64 Encoded
   * So We are Decoding It On the fly
   */
  private get decodedCookies(): any {
    if (!this.cookieStore) {
      const SERVER_COOKIES = this.serverCookies || {};
      this.cookieStore = Object
        .keys(SERVER_COOKIES)
        .filter(key => !this.blackListedKeys.includes(key))
        .reduce((decodedCookies, key) => {
          const decodedValue = fromBase64(SERVER_COOKIES[key]);
          try {
            decodedCookies[key] = JSON.parse(decodedValue);
          } catch (e) {
            decodedCookies[key] = decodedValue;
          }
          return decodedCookies;
        }, {});
    }
    return this.cookieStore || {};
  }

  getCookieItem(name): any {
    return NODE_PLATFORM ? this.decodedCookies[name] : BrowserCookieStorage.getItem(name);
  }
}
