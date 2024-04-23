import {Component, ElementRef, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';

@Component({
  selector: 'app-observations-message-tooltip',
  templateUrl: './observations-message-tooltip.component.html',
  styleUrls: ['./observations-message-tooltip.component.scss'],
})
export class ObservationsMessageTooltipComponent {
  hasObservations$: Observable<boolean> = this.store.select(
    preProcessOrderDetailsSelectors.selectHasObservations,
  );
  observations$: Observable<string> = this.store.select(
    preProcessOrderDetailsSelectors.selectObservations,
  );

  isTooltipOpen = false;

  constructor(private elementRef: ElementRef, private store: Store) {}

  showObservationsTooltip(): void {
    this.isTooltipOpen = !this.isTooltipOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event): void {
    if (this.isTooltipOpen) {
      const elementRef = this.elementRef.nativeElement.contains(event?.target);
      if (!elementRef) {
        this.isTooltipOpen = false;
      }
    }
  }
}
