const BROWSER_PLATFORM = typeof window !== 'undefined' && typeof window.document !== 'undefined';

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
  static set(key: string, item) {
    (typeof item === 'string') ? sessionStorage.setItem(key, item) : sessionStorage.setItem(key, JSON.stringify(item));
  }
}


export class SessionStorageService {
  static removeItem(key: string) {
    if (BROWSER_PLATFORM) {
      sessionStorage.removeItem(key);
    }
  }

  static setItem(key: string, item) {
    if (BROWSER_PLATFORM) {
      SessionStorage.set(key, item);
    }
  }

  static getItem(key: string) {
    return BROWSER_PLATFORM ? SessionStorage.get(key) : null;
  }

  static clear() {
    if (BROWSER_PLATFORM) {
      sessionStorage.clear();
    }
  }
}
