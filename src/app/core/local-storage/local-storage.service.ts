import {Injectable} from '@angular/core';
import {APP_PREFIX} from '@appUtil/common.protocols';
import {update} from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  static loadInitialState() {
    return Object.keys(sessionStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map((key) =>
            key
              .split('-')
              .map((token, index) =>
                index === 0 ? token : token.charAt(0).toUpperCase() + token.slice(1),
              )
              .join(''),
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(sessionStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(`${APP_PREFIX}${key}`));
  }

  updateItem(key: string, value: any, path): void {
    const packedData: any = this.getItem(key);
    if (packedData) {
      update(packedData, path, () => {
        return value;
      });
      this.setItem(key, packedData);
    }
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
