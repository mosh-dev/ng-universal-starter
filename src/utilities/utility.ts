import {NODE_PLATFORM} from './platform';
import {timer} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {ObjectMap} from '../typings/typings';

export const fromBase64 = (base64String: string) => {
  return NODE_PLATFORM ? Buffer.from(base64String, 'base64').toString() : atob(base64String);
};

export const toBase64 = (value: string) => {
  return NODE_PLATFORM ? Buffer.from(value).toString('base64') : btoa(value);
};

export const parseQueryString = (queryString: string): ObjectMap<string> => {
  if (queryString.length && queryString.includes('=')) {
    return queryString.split('&').reduce((params, item) => {
      const [key, value] = item.split('=');
      if (key && value) {
        return {...params, [key]: value};
      }
      return params;
    }, {});
  }
  return {};
};

export const getTimer = (hour: number) => {
  let distance = (hour * 60 * 60 * 1000) - 1000;
  return timer(0, 1000).pipe(
    takeUntil(timer(distance)),
    map(() => {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      distance -= 1000;
      return `${days ? days + 'd' : ''} ${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''} ${seconds ? seconds + 's' : ''}`;
    })
  );
};

/**
 * Build Reactive Form Errors Recursively
 * It Does Not Support Multi Level Deep FormArray
 * It Also Does Replace Errors with Same Control Name With Different Group
 */
interface ReactiveErrorItem {
  controlName: string;
  errors: any;
}

export const buildReactiveFormErrors = (controls: ObjectMap<AbstractControl>, errs = []): Array<ReactiveErrorItem> => {
  Object
    .entries(controls)
    .forEach(([controlName, control]) => {
      if (control instanceof FormGroup) {
        if (control.errors) {
          errs.push({controlName, errors: control.errors});
        }
        buildReactiveFormErrors(control.controls, errs);
      } else if (control instanceof FormArray) {
        errs.push({
          controlName,
          errors: control.controls.map(({errors}) => errors).filter(e => e)
        });
      } else if (control instanceof FormControl && control.errors) {
        errs.push({controlName, errors: control.errors});
      }
    });
  return errs
    .filter(({errors}) => (errors instanceof Object) ? Object.keys(errors).length : errors ? errors.length : false);
};
