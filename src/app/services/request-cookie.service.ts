import {Inject, Injectable, Optional} from '@angular/core';
import {fromBase64} from '../../utilities/utility';
import {BrowserCookieStorage} from '../../utilities/storage/cookieStorage';
import {NODE_PLATFORM} from '../../utilities/platform';
import {ObjectMap} from '../../typings/typings';

@Injectable({providedIn: 'root'})
export class RequestCookieService {
  /**
   * KeyNames as Strings.
   * These keys are filtered from cookie object
   */
  blackListedKeys: string[] = [];
  private cookieStore: ObjectMap;

  constructor(@Optional() @Inject('COOKIES') private serverCookies: ObjectMap) {
  }

  /**
   * All the cookies are base64 Encoded
   * So We are Decoding It On the fly
   */
  private get decodedCookies(): ObjectMap {
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

  getCookieItem(name) {
    return NODE_PLATFORM ? this.decodedCookies[name] : BrowserCookieStorage.getItem(name);
  }
}
