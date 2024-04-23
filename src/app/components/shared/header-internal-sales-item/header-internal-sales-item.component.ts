/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-header-internal-sales-item',
  templateUrl: './header-internal-sales-item.component.html',
  styleUrls: ['./header-internal-sales-item.component.scss'],
})
export class HeaderInternalSalesItemComponent {
  @Input() internalSalesItem: InternalSalesItem;
  @Output() valueEmitter: EventEmitter<ModelEmitInternalSalesItem> = new EventEmitter<
    ModelEmitInternalSalesItem
  >();
  readonly typeOptionsColumn = TypeOptionsColumn;
  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }
  handleAction({event, target, value, action}): void {
    this.handleStopEvents(event);
    this.valueEmitter.emit({
      event,
      value,
      action,
      target,
    });
  }
}
