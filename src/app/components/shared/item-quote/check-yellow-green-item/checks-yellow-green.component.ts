/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColumnOptions, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-checks-yellow-green',
  templateUrl: './checks-yellow-green.component.html',
  styleUrls: ['./checks-yellow-green.component.scss'],
})
export class ChecksYellowGreenComponent {
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
  handleCheck(
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
