/**
 * All Cookie will be Encoded To base64 Automatically
 */
import {BROWSER_PLATFORM} from '../platform';
import {fromBase64, toBase64} from '../utility';

class CookieStorage {
  static get(cookieName: string): any {
    if (BROWSER_PLATFORM) {
      let cookie = '';
      const name = cookieName + '=';
      const ca = document.cookie.split(';');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          cookie = c.substring(name.length, c.length);
        }
      }

      try {
        return cookie ? JSON.parse(fromBase64(cookie)) : '';
      } catch (e) {
        return cookie ? fromBase64(cookie) : '';
      }
    }
  }

  /**
   * Other types need to be stringed except string
   *
   */
  static set(name: string, value: any, exDays: number = 20): void {
    const parsedValue = (typeof value === 'string') ? value : JSON.stringify(value);
    if (BROWSER_PLATFORM) {
      const d = new Date();
      d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + toBase64(parsedValue) + ';' + expires + ';path=/';
    }
  }

  static removeItem(name: string) {
    CookieStorage.set(name, '', 0);
  }

  static clear() {
    if (BROWSER_PLATFORM) {
      const cookies = document.cookie.split(';');
      if (cookies && cookies.length) {
        cookies.forEach(cookie => {
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
      }
    }
  }
}


export class BrowserCookieStorage {
  static removeItem(key: string): any {
    return BROWSER_PLATFORM ? CookieStorage.removeItem(key) : null;
  }

  static setItem(key: string, item: any): void {
    if (BROWSER_PLATFORM) {
      CookieStorage.set(key, item);
    }
  }

  /**
   * This Function Only works on ClientSide
   * For Both Client and ServerSide Cookie Access Use CookieService Dependency
   */
  static getItem(key: string): any {
    return BROWSER_PLATFORM ? CookieStorage.get(key) : null;
  }

  static clear() {
    CookieStorage.clear();
  }
}
