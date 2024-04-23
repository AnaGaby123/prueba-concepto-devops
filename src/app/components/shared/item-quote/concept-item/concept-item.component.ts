/* Core Imports */
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {ProductsTypes, QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {buildStringFamily} from '@appUtil/strings';
import {ColumnConcept, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';
import {ENUM_STATUS_INVESTIGATION_ITEM} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {AVAILABILITY_TYPES} from '@appUtil/common.protocols';

@Component({
  selector: 'app-concept-item',
  templateUrl: './concept-item.component.html',
  styleUrls: ['./concept-item.component.scss'],
})
export class ConceptItemComponent {
  @Input() columnConcept: ColumnConcept;
  @ViewChild('piecesInput') public piecesInput: ElementRef;
  @ViewChild('piecesInputDispatch') public piecesInputDispatch: ElementRef;
  @Output() valueEmitter: EventEmitter<{
    event: Event;
    target: any;
    value: number | boolean;
    action: string;
  }> = new EventEmitter<{
    event: Event;
    target: any;
    value: number | boolean;
    action: NameActionsInternalSalesItem;
  }>();
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;
  readonly availabilityTypes = AVAILABILITY_TYPES;
  readonly productsTypes = ProductsTypes;
  readonly typeItem = QuotationItemTypes;
  readonly statusItemInvestigation = ENUM_STATUS_INVESTIGATION_ITEM;
  family: string;
  isOpenTooltipAddSavingItem = false;
  numberPieces = 0;
  ngOnInit() {
    this.family = buildStringFamily(
      this.columnConcept?.type,
      this.columnConcept?.subType,
      this.columnConcept?.control,
      ' · ',
    );
  }
  @HostListener('document:click', ['$event'])
  clickOut(e?): void {
    if (this.isOpenTooltipAddSavingItem) {
      if (
        this.piecesInput &&
        this.piecesInputDispatch &&
        e.target !== this.piecesInputDispatch.nativeElement &&
        e.target !== this.piecesInput.nativeElement
      ) {
        this.changeQuantity(
          e,
          this.piecesInput,
          +this.numberPieces,
          this.nameActionsInternalSalesItem?.ConceptAddItemSavingAction,
        );
      }
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
  handleClickAddSavingItem(): void {
    this.handleStopEvents(event);
    this.isOpenTooltipAddSavingItem = !this.isOpenTooltipAddSavingItem;
    this.numberPieces = 0;
  }
  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }
  handleValidateDecimalNumber(
    event,
    target: any,
    value: number,
    action: NameActionsInternalSalesItem,
  ): void {
    if (event.which === 13) {
      this.changeQuantity(event, target, value, action);
    } else {
      const key = String.fromCharCode(event.which);
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(key)) {
        event.preventDefault();
      }
    }
  }
  changeQuantity(
    event: Event,
    target: any,
    value: number,
    action: NameActionsInternalSalesItem,
  ): void {
    this.valueEmitter.emit({
      event,
      target,
      value,
      action,
    });
    this.isOpenTooltipAddSavingItem = false;
  }
}
