/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnAdjustmentPrice,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-adjustment-price-item',
  templateUrl: './adjustment-price-item.component.html',
  styleUrls: ['./adjustment-price-item.component.scss'],
})
export class AdjustmentPriceItemComponent {
  @Input() columnAdjustmentPrice: ColumnAdjustmentPrice;
  @Output() valueEmitter: EventEmitter<{
    event: Event;
    target: any;
    value: number | boolean;
    action: string;
  }> = new EventEmitter<{
    event: Event;
    target: any;
    value: number | boolean;
    action: NameActionsInternalSalesItem;
  }>();
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;

  isNumber(value: number | string): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  handleClickEmmit(
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
