/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ColumnTrashReverseSetting,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-trash-reverse-setting-item',
  templateUrl: './trash-reverse-item.component.html',
  styleUrls: ['./trash-reverse-item.component.scss'],
})
export class TrashReverseItemComponent {
  @Input() columnTrashReverseSetting: ColumnTrashReverseSetting;
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
