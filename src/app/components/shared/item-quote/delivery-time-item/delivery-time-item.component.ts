/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnDeliveryTime,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {currentDateWithHoursInZeroUTCFormatDate} from '@appUtil/dates';

@Component({
  selector: 'app-delivery-time-item',
  templateUrl: './delivery-time-item.component.html',
  styleUrls: ['./delivery-time-item.component.scss'],
})
export class DeliveryTimeItemComponent {
  @Input() columnDeliveryTime: ColumnDeliveryTime;
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
  printDays(days: string | number): string {
    if (!days) return '';
    if (typeof days === 'number') {
      return `${days} ${days === 1 ? 'día' : 'días'} `;
    }
    if (
      typeof days === 'string' &&
      (days.toLowerCase().includes('días') || days.toLowerCase().includes('dias'))
    ) {
      return days;
    } else if (typeof days === 'string' && days.includes('T')) {
      return new Date(days).toLocaleDateString();
    } else {
      return currentDateWithHoursInZeroUTCFormatDate(days).date.toLocaleDateString();
    }
  }
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
