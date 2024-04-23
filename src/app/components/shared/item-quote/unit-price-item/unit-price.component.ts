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
import {ColumnUnitPrice, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-unit-price-item',
  templateUrl: './unit-price.component.html',
  styleUrls: ['./unit-price.component.scss'],
})
export class UnitPriceComponent {
  @Input() columnUnitPrice: ColumnUnitPrice;
  @ViewChild('priceInput') public priceInput: ElementRef;
  @ViewChild('priceInputDispatch') public priceInputDispatch: ElementRef;
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
  tooltipIsOpen: boolean = false;
  unitPrice: number = 0;

  @HostListener('document:click', ['$event'])
  clickOut(e?): void {
    if (this.tooltipIsOpen && this.unitPrice > 0 && !this.columnUnitPrice?.activeGenericEmitter) {
      if (
        this.priceInput &&
        this.priceInputDispatch &&
        e.target !== this.priceInputDispatch.nativeElement &&
        e.target !== this.priceInput.nativeElement
      ) {
        this.changeUnitPrice(
          e,
          this.priceInput,
          +this.unitPrice,
          this.nameActionsInternalSalesItem?.UnitPriceEditNumberAction,
        );
      }
    }
  }

  handleValidateDecimalNumber(
    event,
    target: any,
    value: number,
    action: NameActionsInternalSalesItem,
  ): void {
    if (event.which === 13) {
      this.changeUnitPrice(event, target, value, action);
    } else {
      const key = String.fromCharCode(event.which);
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(key)) {
        event.preventDefault();
      }
    }
  }
  handleClickLabel(event): void {
    this.handleStopEvents(event);
    this.tooltipIsOpen = !this.tooltipIsOpen;
    this.unitPrice = Number(this.columnUnitPrice?.value);
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  changeUnitPrice(
    event: Event,
    target: any,
    value: number,
    action: NameActionsInternalSalesItem,
  ): void {
    if (this.unitPrice >= this.columnUnitPrice?.valuePriceOriginal) {
      this.valueEmitter.emit({
        event,
        target,
        value,
        action,
      });
    }
    this.tooltipIsOpen = false;
  }
  handleClickEmmit(
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

  isNumber(value: number | string): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
