import {Inject, Injectable, Optional} from '@angular/core';
import {fromBase64} from '../../utilities/utility';
import {BrowserCookieStorage} from '../../utilities/storage/cookieStorage';
import {NODE_PLATFORM} from '../../utilities/platform';

/**
 * KeyNames as Strings.
 * These keys are filtered from cookie object
 */
const BLACKLISTED_KEYS: string[] = [];

@Injectable({providedIn: 'root'})
export class RequestCookieService {
  private cookieStore: any;

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
        .filter(key => !BLACKLISTED_KEYS.includes(key))
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
