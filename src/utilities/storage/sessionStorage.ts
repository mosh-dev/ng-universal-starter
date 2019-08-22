import {BROWSER_PLATFORM} from '../platform';

class SessionStorage {
  static get(key: string) {
    /**
     * Try to parse the item If fails Return the item itself
     * In case of plain string parse will fail.
     */
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      return sessionStorage.getItem(key);
    }
  }

  /**
   * Other types need to be stringed except string
   *
   */
  static set(key: string, item: any): void {
    (typeof item === 'string') ? sessionStorage.setItem(key, item) : sessionStorage.setItem(key, JSON.stringify(item));
  }

  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }
}


export class SessionStorageService {
  static removeItem(key: string): any {
    return BROWSER_PLATFORM ? SessionStorage.removeItem(key) : null;
  }

  static setItem(key: string, item: any): void {
    if (BROWSER_PLATFORM) {
      SessionStorage.set(key, item);
    }
  }

  static getItem(key: string): any {
    return BROWSER_PLATFORM ? SessionStorage.get(key) : null;
  }

  static clear() {
    if (BROWSER_PLATFORM) {
      SessionStorage.clear();
    }
  }
}
