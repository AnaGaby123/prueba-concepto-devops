/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnArrivalDate,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-arrival-date-item',
  templateUrl: './arrival-date-item.component.html',
  styleUrls: ['./arrival-date-item.component.scss'],
})
export class ArrivalDateItemComponent {
  @Input() columnArrivalDate: ColumnArrivalDate;
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
    this.valueEmitter.emit({
      event,
      target,
      value,
      action,
    });
  }
}
