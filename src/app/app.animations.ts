import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
  state,
} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

export const appAnimations = [
  trigger('routerTransitionFade', [
    transition(
      '* => *',
      group([
        query(
          'content > :enter, content > :leave ',
          [
            style({
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }),
          ],
          { optional: true }
        ),

        query(
          'content > :enter',
          [
            style({
              opacity: 0,
            }),
          ],
          { optional: true }
        ),
        query(
          'content > :leave',
          [
            style({
              opacity: 1,
            }),
            animate(
              '300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                opacity: 0,
              })
            ),
          ],
          { optional: true }
        ),
        query(
          'content > :enter',
          [
            style({
              opacity: 0,
            }),
            animate(
              '300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({
                opacity: 1,
              })
            ),
          ],
          { optional: true }
        ),
        query('content > :enter', animateChild(), { optional: true }),
        query('content > :leave', animateChild(), { optional: true }),
      ])
    ),
  ]),
];
