/**
 * All Cookie will be Encoded To base64 Automatically
 */
interface ObjectMap<T = any> {
  [key: string]: T;
}

const BROWSER_PLATFORM = typeof window !== 'undefined' && typeof window.document !== 'undefined';

class CookieStorage {
  private static cookieStore: ObjectMap;
  private static cookieString: string;

  static get(cookieName: string) {
    return CookieStorage.getAll()[cookieName];
  }

  static getAll(): ObjectMap {
    /**
     * Little Memoization :)
     */
    if (document.cookie !== CookieStorage.cookieString) {
      CookieStorage.cookieString = document.cookie;
      CookieStorage.cookieStore = CookieStorage.cookieString
        .split(';')
        .reduce((cookies, cookie) => {
          const [cookieName, ...valueInB64Arr] = cookie
            .replace(' ', '')
            .split('=');
          const cookieValue = atob(valueInB64Arr.join(''));
          try {
            return {...cookies, [cookieName]: JSON.parse(cookieValue)};
          } catch (e) {
            return {...cookies, [cookieName]: cookieValue};
          }
        }, {});
    }
    return CookieStorage.cookieStore || {};
  }

  /**
   * Other types need to be stringed except string
   *
   */
  static set(name: string, value: any, exDays: number = 20) {
    const parsedValue = (typeof value === 'string') ? value : JSON.stringify(value);
    const expiryDate = new Date(Date.now() + (exDays * 24 * 60 * 60 * 1000)).toUTCString();
    const path = '/';
    const sameSite = 'Strict';
    document.cookie = `${name}=${btoa(parsedValue)};expires=${expiryDate};path=${path};SameSite=${sameSite}`;
  }

  static clear() {
    Object
      .keys(CookieStorage.getAll())
      .forEach(name => document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT');
  }
}


export class BrowserCookieStorage {
  static removeItem(key: string) {
    if (BROWSER_PLATFORM) {
      document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  static setItem(key: string, item) {
    if (BROWSER_PLATFORM) {
      CookieStorage.set(key, item);
    }
  }

  /**
   * This Function Only works on ClientSide
   * For Both Client and ServerSide Cookie Access Use CookieService Dependency
   */
  static getItem(key: string) {
    return BROWSER_PLATFORM ? CookieStorage.get(key) : null;
  }

  static getAll() {
    return BROWSER_PLATFORM ? CookieStorage.getAll() : {};
  }

  static clear() {
    CookieStorage.clear();
  }
}
