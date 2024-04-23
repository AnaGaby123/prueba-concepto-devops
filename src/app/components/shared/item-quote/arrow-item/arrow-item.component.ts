/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColumnArrow, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-arrow-item',
  templateUrl: './arrow-item.component.html',
  styleUrls: ['./arrow-item.component.scss'],
})
export class ArrowItemComponent {
  @Input() columnArrow: ColumnArrow;
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
