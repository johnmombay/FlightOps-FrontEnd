import { trigger, sequence, state, animate, transition, style } from '@angular/animations';
import { AnimationDurations, AnimationCurves } from '@angular/material';

export const rowsAnimation =
    trigger('rowsAnimation', [
        transition('void => *', [
            style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
            sequence([
                animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
                animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]);

export const detailExpand =
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
        state('expanded', style({ height: '*', visibility: 'visible' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]);

export const contentFade =
    trigger('contentFade', [
        transition(':enter', [
            style({ opacity: '0' }),
            animate(`${AnimationDurations.COMPLEX} ${AnimationCurves.STANDARD_CURVE}`)
        ])
    ])