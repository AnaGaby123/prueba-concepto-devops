/* Core Container */
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
/* Selectors Imports */
import {adjustmentDetailsDetailsSelectors} from '@appSelectors/pendings/offer-adjustment';

/* Tools Imports */
import {indexOf, isEmpty, map as _map} from 'lodash-es';

import {
  calculateAmountWithoutRound,
  calculatePercentage,
  toRound,
  toRoundDown,
} from '@appUtil/util';
import {AjustePrecioPartidaObj} from 'api-logistica';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {offerAdjustmentDetailsActions} from '@appActions/pendings/offer-adjustment';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements AfterContentChecked, AfterViewInit {
  priceConfig$: Observable<Array<AjustePrecioPartidaObj>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectPriceConfig,
  );
  quotationCurrency$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedQuotationCurrency,
  );
  selectHeaderInternalSalesItemPrice$: Observable<InternalSalesItem> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectHeaderInternalSalesItemPrice,
  );

  selectInternalSalesItemPrice$: Observable<InternalSalesItem[]> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectInternalSalesItemPrice,
  );
  pricePopTarget: HTMLElement;
  pricePopOpen = false;
  priceAdjustmentForm = {
    percentage: null,
    ammount: null,
    comments: null,
  };
  readyToSave = false;
  itemsQuotation: Array<InternalSalesItem> = [];
  readonly inputValidators = InputValidators;
  //

  typePercentage = 'typePercentage';
  typeAmount = 'typeAmount';
  minPercentage = 0;
  maxPercentage = 20;
  controlSetTimeout;
  priceItem = {
    price: null,
    IdCotPartidaCotizacion: null,
  };
  lodashIsEmpty = isEmpty;
  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  handlePopUp(value: boolean, item?: AjustePrecioPartidaObj, target?): void {
    if (target) {
      this.priceAdjustmentForm.ammount = item.ajOfPrecioCotizacion.PrecioUnitarioPactado.toString();
      this.pricePopTarget = target;
      this.priceItem = {
        price:
          item.cotPartidaCotizacionDetalle.gMCotPartidasDetalle.VPartidaCotizacion
            .PrecioCotizadoUnitarioConvertido,
        IdCotPartidaCotizacion:
          item.cotPartidaCotizacionDetalle.gMCotPartidasDetalle.VPartidaCotizacion
            .IdCotPartidaCotizacion,
      };
      this.setInput(item.ajOfPrecioCotizacion.PrecioUnitarioPactado.toString(), this.typeAmount);
      this.priceAdjustmentForm = {
        ...this.priceAdjustmentForm,
        comments: item.ajOfPrecioCotizacion.Comentarios,
      };
    } else {
      this.priceAdjustmentForm = {
        percentage: null,
        ammount: null,
        comments: null,
      };
    }
    this.pricePopOpen = value;
  }

  updatePriceAdjustment() {
    this.store.dispatch(
      offerAdjustmentDetailsActions.UPDATE_PAYMENT_CONFIG({
        IdCotPartidaCotizacion: this.priceItem.IdCotPartidaCotizacion,
        ammount: this.priceAdjustmentForm.ammount,
        comments: this.priceAdjustmentForm.comments,
        percentage: this.priceAdjustmentForm.percentage,
      }),
    );
    this.handlePopUp(false);
  }

  handleValidateNumber(event: {which: number; preventDefault: () => void}, type: string): void {
    const key = String.fromCharCode(event.which);
    const regex =
      type === this.typeAmount ? /^$|^[0-9]+$|null/ : /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    clearTimeout(this.controlSetTimeout);
    if (!regex.test(key) && key !== '.') {
      event.preventDefault();
    }
  }

  setInput(value: string, type: string): void {
    this.readyToSave = false;
    const minAmount = toRoundDown(
      calculateAmountWithoutRound(this.priceItem.price, this.maxPercentage),
      6,
    );
    if (type === this.typeAmount) {
      if (+value < minAmount) {
        this.controlSetTimeout = setTimeout(() => {
          this.priceAdjustmentForm.ammount =
            this.priceAdjustmentForm.ammount < 1
              ? ''
              : this.priceAdjustmentForm.ammount >= 1 &&
                this.priceAdjustmentForm.ammount < minAmount
              ? minAmount
              : this.priceAdjustmentForm.ammount;
          this.priceAdjustmentForm.percentage = calculatePercentage(
            this.priceItem.price,
            Number(this.priceAdjustmentForm.ammount),
          );
          this.readyToSave = true;
        }, 1500);
        return;
      }
      if (+value > this.priceItem.price) {
        this.controlSetTimeout = setTimeout(() => {
          this.priceAdjustmentForm.ammount =
            this.priceAdjustmentForm.ammount > this.priceItem
              ? this.priceItem
              : this.priceAdjustmentForm.ammount;
          this.priceAdjustmentForm.percentage = calculatePercentage(
            this.priceItem.price,
            Number(this.priceAdjustmentForm.ammount),
          );
          this.readyToSave = true;
        }, 1500);
        return;
      }
      setTimeout(() => {
        this.priceAdjustmentForm.percentage = calculatePercentage(
          this.priceItem.price,
          Number(this.priceAdjustmentForm.ammount),
        );
        this.readyToSave = true;
      }, 500);
    } else if (type === this.typePercentage) {
      if (value === '.') {
        return;
      }
      if (+value < 0) {
        // Este caso no sucede por la validación de solo aceptar números, pero se deja por si se require poner un limite inferior
        this.controlSetTimeout = setTimeout(() => {
          this.priceAdjustmentForm.percentage =
            this.priceAdjustmentForm.percentage < 1
              ? this.minPercentage
              : this.priceAdjustmentForm.percentage;
          this.priceAdjustmentForm.ammount = toRoundDown(
            calculateAmountWithoutRound(
              this.priceItem.price,
              Number(this.priceAdjustmentForm.percentage),
            ),
            6,
          );
          this.readyToSave = true;
        }, 1000);
        return;
      }
      if (+value > this.maxPercentage) {
        this.controlSetTimeout = setTimeout(() => {
          this.priceAdjustmentForm.percentage =
            this.priceAdjustmentForm.percentage > this.maxPercentage
              ? this.maxPercentage
              : this.priceAdjustmentForm.percentage;
          this.priceAdjustmentForm.ammount = toRoundDown(
            calculateAmountWithoutRound(
              this.priceItem.price,
              Number(this.priceAdjustmentForm.percentage),
            ),
            6,
          );
          this.readyToSave = true;
        }, 1000);
        return;
      }
      this.controlSetTimeout = setTimeout(() => {
        this.priceAdjustmentForm.percentage = toRound(
          Number(this.priceAdjustmentForm.percentage),
          2,
        );
        this.priceAdjustmentForm.ammount =
          Number(value) > 0
            ? toRoundDown(
                calculateAmountWithoutRound(
                  this.priceItem.price,
                  this.priceAdjustmentForm.percentage,
                ),
                6,
              )
            : this.priceItem.price;
        this.readyToSave = true;
      }, 500);
    }
  }

  handleTrackByItem(index: number, item: InternalSalesItem): string {
    return item.data?.ajOfPrecioCotizacion.IdCotPartidaCotizacion;
  }

  protected readonly toRound = toRound;
  protected readonly calculatePercentage = calculatePercentage;

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.RequestedPriceClickNumberAction:
        this.handlePopUp(
          event.value as boolean,
          event.data as AjustePrecioPartidaObj,
          event.target,
        );
        break;

      case NameActionsInternalSalesItem.SeeNotesItemAction:
        this.store.dispatch(
          SET_POP_UP_NOTES_DATA({
            notes: event.dataInternal.columnNotes,
            modalIsOpen: event.value,
          }),
        );
        this.appService.setTarget(event.target);
        break;
    }
  }

  handlePositionCustomPop(): string {
    const idsArray = _map(
      this.itemsQuotation,
      (o: InternalSalesItem): string => o?.data?.ajOfPrecioCotizacion?.IdCotPartidaCotizacion,
    );
    const position = indexOf(idsArray, this.priceItem.IdCotPartidaCotizacion);
    return position + 1 === this.itemsQuotation.length ? 'top-center' : 'bottom-center';
  }
}
