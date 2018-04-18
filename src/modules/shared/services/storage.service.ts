import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  private prefix = 'dc';

  /**
   * Get item from localStorage
   *
   * @param key: string; Name of the item to get
   *
   * @returns { string || null }
   * @memberOf StorageService
   */
  getItem(key: string): any | null {
    const item = localStorage.getItem(`${this.prefix}_${key}`);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
  }

  /**
   * Save item in localStorage
   *
   * @param key: string; Name of the item to set
   * @param value: sring; Data to set
   *
   * @memberOf StorageService
   */
  setItem(key: string, value: any): void {
    if (typeof(value) === 'string') {
      localStorage.setItem(`${this.prefix}_${key}`, value);
    } else {
      localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(value));
    }
  }

  /**
   * Remove item from localstorage
   *
   * @param key: string; Name of the item to remove
   *
   * @memberOf StorageService
   */
  removeItem(key: string): void {
    localStorage.removeItem(`${this.prefix}_${key}`);
  }

  /**
   * Return if item is saved in localstorage
   *
   * @param key { string }
   * @returns { boolean }
   *
   * @memberOf StorageService
   */
  has(key: string): boolean {
    return localStorage.getItem(`${this.prefix}_${key}`) !== null;
  }

}
