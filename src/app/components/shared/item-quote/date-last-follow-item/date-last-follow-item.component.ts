/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnDateLastFollow,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-date-last-follow-item',
  templateUrl: './date-last-follow-item.component.html',
  styleUrls: ['./date-last-follow-item.component.scss'],
})
export class DateLastFollowItemComponent {
  @Input() columnDateLastFollow: ColumnDateLastFollow;
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
