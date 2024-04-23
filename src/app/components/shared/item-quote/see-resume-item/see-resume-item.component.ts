/* Core Imports */
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ColumnSeeResume, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-see-resume-item',
  templateUrl: './see-resume-item.component.html',
  styleUrls: ['./see-resume-item.component.scss'],
})
export class SeeResumeItemComponent {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() columnSeeResume: ColumnSeeResume;
  @Output() valueEmitter: EventEmitter<{
    event: Event;
    target: any;
    value: boolean;
    action: string;
  }> = new EventEmitter<{
    event: Event;
    target: any;
    value: boolean;
    action: NameActionsInternalSalesItem;
  }>();
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;

  handleClick(
    event: Event,
    target: any,
    value: boolean,
    action: NameActionsInternalSalesItem,
  ): void {
    if (target !== null) {
      this.valueEmitter.emit({
        event,
        target,
        value,
        action,
      });
    }
  }
}
