/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColumnOptions, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-check-normal-item',
  templateUrl: './check-normal-item.component.html',
  styleUrls: ['./check-normal-item.component.scss'],
})
export class CheckNormalItemComponent {
  @Input() columnOptions: ColumnOptions;
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
  stopEvents(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleCheck(target: any, value: boolean, action: NameActionsInternalSalesItem): void {
    const event: MouseEvent = new MouseEvent('');
    this.valueEmitter.emit({
      event,
      target,
      value,
      action,
    });
  }
}
