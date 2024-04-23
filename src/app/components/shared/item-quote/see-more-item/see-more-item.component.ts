/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColumnSeeMore, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-see-more-item',
  templateUrl: './see-more-item.component.html',
  styleUrls: ['./see-more-item.component.scss'],
})
export class SeeMoreItemComponent {
  @Input() columnSeeMore: ColumnSeeMore;
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
