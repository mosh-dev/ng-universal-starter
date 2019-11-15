const BROWSER_PLATFORM = typeof window !== 'undefined' && typeof window.document !== 'undefined';

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
  static set(key: string, item) {
    (typeof item === 'string') ? localStorage.setItem(key, item) : localStorage.setItem(key, JSON.stringify(item));
  }
}

export class LocalStorageService {
  static removeItem(key: string) {
    if (BROWSER_PLATFORM) {
      localStorage.removeItem(key);
    }
  }

  static setItem(key: string, item) {
    if (BROWSER_PLATFORM) {
      LocalStorage.set(key, item);
    }
  }

  static getItem(key: string) {
    return BROWSER_PLATFORM ? LocalStorage.get(key) : null;
  }

  static clear() {
    if (BROWSER_PLATFORM) {
      localStorage.clear();
    }
  }
}

