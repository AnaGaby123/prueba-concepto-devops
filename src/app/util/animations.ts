import {
  animate,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animationAddCampaing = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        'max-width': '30%',
        opacity: '1',
        visibility: 'visible',
      }),
    ),
    state(
      'out',
      style({
        'max-width': '0px',
        opacity: '0',
        visibility: 'hidden',
      }),
    ),
    transition('in => out', [
      group([
        animate(
          '300ms ease-in-out',
          style({
            opacity: '0',
          }),
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-width': '0px',
          }),
        ),
        animate(
          '800ms ease-in-out',
          style({
            visibility: 'hidden',
          }),
        ),
      ]),
    ]),
    transition('out => in', [
      group([
        animate(
          '1ms ease-in-out',
          style({
            visibility: 'visible',
          }),
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-width': '30%',
          }),
        ),
        animate(
          '800ms ease-in-out',
          style({
            opacity: '1',
          }),
        ),
      ]),
    ]),
  ]),
];

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [style({opacity: 0}), animate('200ms', style({opacity: 1}))]),
  transition(':leave', [style({opacity: 1}), animate('200ms', style({opacity: 0}))]),
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [style({opacity: 0}), stagger('60ms', animate('600ms ease-out', style({opacity: 1})))],
      {optional: true},
    ),
    query(':leave', animate('200ms', style({opacity: 0})), {optional: true}),
  ]),
]);

export const filterAnimation = trigger('filterAnimation', [
  transition(':enter, * => 0, * => -1', []),
  transition(':increment', [
    query(
      ':enter',
      [
        style({opacity: 0, width: '0px'}),
        stagger(50, [animate('300ms ease-out', style({opacity: 1, width: '*'}))]),
      ],
      {optional: true},
    ),
  ]),
  transition(':decrement', [
    query(':leave', [stagger(50, [animate('300ms ease-out', style({opacity: 0, width: '0px'}))])]),
  ]),
]);

export const flyInOut = trigger('flyInOut', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [style({transform: 'translateX(-100%)'}), animate(100)]),
  transition('* => void', [animate(100, style({transform: 'translateX(100%)'}))]),
]);

export const arrowYAnimation = trigger('arrowYAnimation', [
  state('close', style({transform: 'scaleY(1)'})),

  state('open', style({transform: 'scaleY(-1)'})),
  transition('open => close', [animate('0.3s')]),
  transition('close => open', [animate('0.3s')]),
  transition('* => close', [animate('0.3s')]),
  transition('* => open', [animate('200ms ease-in')]),
  transition('open <=> close', [animate('0.3s')]),
  transition('* => open', [animate('0.3s')]),
  transition('* => *', [animate('0.3s')]),
]);

export const openClose = trigger('openClose', [
  state(
    'open',
    style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow',
    }),
  ),
  state(
    'closed',
    style({
      height: '100px',
      opacity: 0.5,
      backgroundColor: 'green',
    }),
  ),
  transition('open => closed', [animate('1s')]),
  transition('closed => open', [animate('0.5s')]),
  transition('* => closed', [animate('1s')]),
  transition('* => open', [animate('0.5s')]),
  transition('open <=> closed', [animate('0.5s')]),
  transition('* => open', [animate('1s', style({opacity: '*'}))]),
  transition('* => *', [animate('1s')]),
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('200ms ease-in', style({transform: 'translateY(0%)'})),
  ]),
  transition(':leave', [animate('200ms ease-in', style({transform: 'translateY(-100%)'}))]),
]);
export const mailboxNotification = [
  trigger('mailboxNotificationShow', [
    state('void', style({height: '0px'})),
    state('show', style({height: '50px'})),

    transition(':enter', [animate('0.5s 0.2s')]),
  ]),
];
export const fadeInBottomStrategy = trigger('fadeInBottom', [
  state('void', style({opacity: 0, top: '-395px'})),
  transition(':enter', [animate('250ms 50ms')]),
]);
export const filterFadeInFadeOut = trigger('enterAnimation', [
  transition(':enter', [style({opacity: 0}), animate('300ms', style({opacity: 1}))]),
  transition(':leave', [style({opacity: 1}), animate('300ms', style({opacity: 0}))]),
]);

export const hamburgerAnimation = trigger('hamburguerX', [
  state('hamburguer', style({})),
  state(
    'topX',
    style({
      transform: 'rotate(45deg)',
      transformOrigin: 'left',
      margin: '6px',
    }),
  ),
  state(
    'hide',
    style({
      opacity: 0,
    }),
  ),
  state(
    'bottomX',
    style({
      transform: 'rotate(-45deg)',
      transformOrigin: 'left',
      margin: '6px',
    }),
  ),
  transition('* => *', [animate('0.2s')]),
]);
