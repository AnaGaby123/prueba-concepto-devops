/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnChecksTypeAdjustment,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-checks-type-adjustment-item',
  templateUrl: './checks-type-adjustment-item.component.html',
  styleUrls: ['./checks-type-adjustment-item.component.scss'],
})
export class ChecksTypeAdjustmentItemComponent {
  @Input() columnChecksTypeAdjustment: ColumnChecksTypeAdjustment;
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
  handleClick(target: any, value: boolean, action: NameActionsInternalSalesItem): void {
    const event: MouseEvent = new MouseEvent('');
    this.valueEmitter.emit({
      event,
      target,
      value,
      action,
    });
  }

  stopEvents(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
