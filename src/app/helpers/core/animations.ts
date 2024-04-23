import {animate, style, transition, trigger} from '@angular/animations';

export const enterLeave = [
  trigger('enter', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate(
        '250ms 150ms ease-in-out',
        style({
          opacity: 1,
        }),
      ),
    ]),
    transition(':leave', [
      animate(
        '250ms 50ms ease-in-out',
        style({
          opacity: 0,
        }),
      ),
    ]),
  ]),
  trigger('enterLeaveFast', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate(
        '250ms 150ms ease-in-out',
        style({
          opacity: 1,
        }),
      ),
    ]),
    transition(':leave', [
      style({
        opacity: 0,
      }),
    ]),
  ]),
  trigger('enterFromTop', [
    transition(':enter', [
      style({
        opacity: 0,
        marginTop: '-8px',
      }),
      animate(
        '250ms 150ms ease-in-out',
        style({
          opacity: 1,
          marginTop: '0',
        }),
      ),
    ]),
    transition(':leave', [
      animate(
        '250ms 50ms ease-in-out',
        style({
          opacity: 0,
          marginTop: '-8px',
        }),
      ),
    ]),
  ]),
  trigger('enterFromTopDropDown', [
    transition(':enter', [
      style({
        opacity: 0,
        marginTop: '-5px',
      }),
      animate(
        '200ms 50ms ease-in-out',
        style({
          opacity: 1,
          marginTop: '0',
        }),
      ),
    ]),
    transition(':leave', [
      animate(
        '200ms 50ms ease-in-out',
        style({
          opacity: 0,
          marginTop: '-5px',
        }),
      ),
    ]),
  ]),
];
