/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColumnOptions, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-radio-button-item',
  templateUrl: './radio-button-item.component.html',
  styleUrls: ['./radio-button-item.component.scss'],
})
export class RadioButtonItemComponent {
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
