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
import {
  ColumnNumberPieces,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-number-pieces-item',
  templateUrl: './number-pieces-item.component.html',
  styleUrls: ['./number-pieces-item.component.scss'],
})
export class NumberPiecesItemComponent {
  @Input() columnNumberPieces: ColumnNumberPieces;
  @ViewChild('piecesInput') public piecesInput: ElementRef;
  @ViewChild('piecesInputDispatch') public piecesInputDispatch: ElementRef;
  @Output() valueEmitter: EventEmitter<{
    event: Event;
    target: any;
    value: number;
    action: string;
  }> = new EventEmitter<{
    event: Event;
    target: any;
    value: number;
    action: NameActionsInternalSalesItem;
  }>();
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;
  clickEvent: boolean = false;
  numberPieces: number = 0;

  @HostListener('document:click', ['$event'])
  clickOut(e?): void {
    if (this.clickEvent && this.numberPieces > 0) {
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
          this.nameActionsInternalSalesItem?.NumberPiecesAction,
        );
      }
    }
  }

  handleClickLabel(): void {
    this.clickEvent = !this.clickEvent;
    this.numberPieces = Number(this.columnNumberPieces?.value);
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
  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }
  changeQuantity(
    event: Event,
    target: any,
    value: number,
    action: NameActionsInternalSalesItem,
  ): void {
    if (value >= 1 && value !== this.columnNumberPieces?.value) {
      this.valueEmitter.emit({
        event,
        target,
        value,
        action,
      });
    }
    this.clickEvent = false;
  }
  isNumber(value: number | string): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
