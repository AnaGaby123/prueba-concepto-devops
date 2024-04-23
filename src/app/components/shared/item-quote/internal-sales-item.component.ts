/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';
import {
  QuotationItemTypes,
  quotationItemTypesClasses,
} from '@appHelpers/pending/quotation/quotation.helpers';

@Component({
  selector: 'app-internal-sales-item',
  templateUrl: './internal-sales-item.component.html',
  styleUrls: ['./internal-sales-item.component.scss'],
})
export class InternalSalesItemComponent {
  @Input() internalSalesItem: InternalSalesItem;
  @Output() valueEmitter: EventEmitter<ModelEmitInternalSalesItem> = new EventEmitter<
    ModelEmitInternalSalesItem
  >();
  typeOptionsColumn = TypeOptionsColumn;
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;
  readonly typeItem = QuotationItemTypes;
  readonly typeItemClasses = quotationItemTypesClasses;

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  handleAction(
    {event, target, value, action},
    data: any,
    dataInternal: InternalSalesItem,
    index: number,
  ): void {
    if (
      this.internalSalesItem?.activeGenericEmitter ||
      this.internalSalesItem?.activeGenericEmitterFreight
    ) {
      this.handleStopEvents(event);
    }
    this.valueEmitter.emit({
      event,
      data,
      dataInternal,
      index,
      value,
      action,
      target,
    });
  }

  // //DOCS: Componentes hijos
  //
  // handleAction(
  //   {event, target, value, action},
  //   data: any,
  //   dataInternal: InternalSalesItem,
  //   index: number,
  // ): void {
  //   if (
  //     action !== this.nameActionsInternalSalesItem.InternalSalesAction &&
  //     action !== this.nameActionsInternalSalesItem.InternalSalesFreightAction
  //   ) {
  //     this.valueEmitter.emit({
  //       event,
  //       data,
  //           dataInternal,
  //       index,
  //       value,
  //       action,
  //       target,
  //     });
  //   }
  // }
  // //DOCS:Item general
  // handleAction2(
  //   {event, target, value, action},
  //   data: any,
  //   dataInternal: InternalSalesItem,
  //   index: number,
  // ): void {
  //   if (!event?.target?.id) {
  //     this.valueEmitter.emit({
  //       event,
  //       data,
  //       dataInternal,
  //       index,
  //       value,
  //       action,
  //       target,
  //     });
  //   }
  // }
}
