import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const fadeIn = [
  trigger('fadeIn', [
    state('void', style({opacity: 0})),
    transition('void => *', [animate(200)])
  ])
];

export const fadeOut = [
  trigger('fadeOut', [
    state('void', style({opacity: 0})),
    transition('* => void', [animate(200)])
  ])
];

export const fade = [
  trigger('fade', [
    state('void', style({opacity: 0})),
    transition('* <=> void', [animate(200)])
  ])
];


export const slideIn = [
  trigger('slideIn', [
    state('left', style({transform: 'translateX(0)'})),
    state('right', style({transform: 'translateX(-50%)'})),
    transition('* => *', animate(300))
  ])
];

export const listAnimation = [
  trigger('listAnimation', [
    transition('* => *', [
      query(':enter', style({opacity: 0}), {optional: true}),
      query(':enter', stagger('10ms', [
        animate('300ms ease-in', keyframes([
          style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
          style({opacity: .5, transform: 'translateX(-35px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0}),
        ]))]), {optional: true}),
      query(':leave', stagger('10ms', [
        animate('300ms ease-in', keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0, transform: 'translateX(75%)', offset: 1.0}),
        ]))]), {optional: true})
    ])
  ])
];
