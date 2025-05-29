import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition 
} from '@angular/animations';

export const dropDownMenu = trigger('dropDownMenu', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateY(-10px) scale(0.95)'
    }),
    animate('300ms ease-out', style({ 
      opacity: 1, 
      transform: 'translateY(0) scale(1)'
    }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ 
      opacity: 0,
      transform: 'translateY(-10px) scale(0.95)'
    }))
  ])
]);