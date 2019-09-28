import {NODE_PLATFORM} from './platform';
import {timer} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

export const fromBase64 = (base64String: string) => {
  return NODE_PLATFORM ? Buffer.from(base64String, 'base64').toString() : atob(base64String);
};

export const toBase64 = (value: string) => {
  return NODE_PLATFORM ? Buffer.from(value).toString('base64') : btoa(value);
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
