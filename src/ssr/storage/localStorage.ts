import {BROWSER_PLATFORM} from '../platform';

class LocalStorage {
  static get(key: string) {
    /**
     * Try to parse the item If fails Return the item itself
     * In case of plain string parse will fail.
     */
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  /**
   * Other types need to be stringed except string
   *
   */
  static set(key: string, item: any): void {
    (typeof item === 'string') ? localStorage.setItem(key, item) : localStorage.setItem(key, JSON.stringify(item));
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export class LocalStorageService {
  static removeItem(key: string): any {
    return BROWSER_PLATFORM ? LocalStorage.removeItem(key) : null;
  }

  static setItem(key: string, item: any): void {
    if (BROWSER_PLATFORM) {
      LocalStorage.set(key, item);
    }
  }

  static getItem(key: string): any {
    return BROWSER_PLATFORM ? LocalStorage.get(key) : null;
  }

  static clear() {
    if (BROWSER_PLATFORM) {
      LocalStorage.clear();
    }
  }
}

