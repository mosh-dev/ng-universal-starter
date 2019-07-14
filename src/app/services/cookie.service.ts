import {Inject, Injectable, Optional} from '@angular/core';
import {fromBase64} from '../../ssr/utility';
import {BrowserCookieStorage} from '../../ssr/storage/cookieStorage';
import {NODE_PLATFORM} from '../../ssr/platform';

/**
 * KeyNames as Strings.
 * These keys are filtered from cookie object
 */
const BLACKLISTED_KEYS = [
  '_ga',
  '_gid'
];

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(@Optional() @Inject('COOKIES') private serverCookies: any) {
  }

  /**
   * All the cookies are base64 Encoded
   * So We are Decoding It On the fly
   */
  private get cookies(): any {
    const SERVER_COOKIES = this.serverCookies || {};
    return Object
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

  getItem(name): any {
    return NODE_PLATFORM ? this.cookies[name] : BrowserCookieStorage.getItem(name);
  }
}
