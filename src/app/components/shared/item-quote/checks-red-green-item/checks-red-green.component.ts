/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnOptions,
  NameActionsInternalSalesItem,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-checks-red-green',
  templateUrl: './checks-red-green.component.html',
  styleUrls: ['./checks-red-green.component.scss'],
})
export class ChecksRedGreenComponent {
  @Input() columnOptions: ColumnOptions;
  @Input() showOnlyCheck: boolean = false;
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
  readonly typeOptions = TypeOptionsColumn;
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

  // newMethod = (columnOptions: ColumnOptions): boolean => {
  //   return columnOptions?.value || columnOptions?.value === null || columnOptions?.value == false;
  // };
}
