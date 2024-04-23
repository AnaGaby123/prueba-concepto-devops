/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnRequestedPrice,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-requested-price-item',
  templateUrl: './requested-price-item.component.html',
  styleUrls: ['./requested-price-item.component.scss'],
})
export class RequestedPriceItemComponent {
  @Input() columnRequestedPrice: ColumnRequestedPrice;
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
