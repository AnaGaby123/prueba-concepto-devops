import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';

// Models
import {IPpPartidaPedidoDetalleValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

// Actions
import {validateAdjustmentDetailActions} from '@appActions/pendings/validate-adjustment';

// Selectors
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {filter, find, isEmpty} from 'lodash-es';
import {
  INCIDENCE_CATALOG,
  INCIDENCE_COMMENTS,
  INCIDENCE_DATE,
  INCIDENCE_DESCRIPTION,
  INCIDENCE_IVA,
  INCIDENCE_MONEDA,
  INCIDENCE_PRESENTATION,
  INCIDENCE_TEE,
  INCIDENCE_TRADEMARK,
  INCIDENCE_UNIT_PRICE,
} from '@appUtil/common.protocols';
import {Observable} from 'rxjs';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {ProductsTypes, QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {buildInternalSalesItem} from '@appHelpers/pending/validate-adjustment/validate-adjusment.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-item-quote-validate-adjustment',
  templateUrl: './quote-item-validate-adjustment.component.html',
  styleUrls: ['./quote-item-validate-adjustment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteItemValidateAdjustmentComponent implements AfterContentChecked {
  @ViewChild('priceInput') public priceInput: ElementRef;
  @ViewChild('priceInputDispatch') public priceInputDispatch: ElementRef;
  @ViewChild('piecesInput') public piecesInput: ElementRef;
  @ViewChild('piecesInputDispatch') public piecesInputDispatch: ElementRef;
  @ViewChild('exchangeRate', {static: false}) exchangeRate: ElementRef;
  @ViewChild('imageElement') imageElement: ElementRef;

  @Input() item: IPpPartidaPedidoDetalleValidateAdjustment;
  @Input() currency: string;
  @Output() openNotesValueEmitter: EventEmitter<{
    target: any;
    internalSalesItem: InternalSalesItem;
    isOpenNotes: boolean;
  }> = new EventEmitter<{
    target: any;
    internalSalesItem: InternalSalesItem;
    isOpenNotes: boolean;
  }>();

  selectCurrencyLabel$: Observable<string> = this.store.select(
    validateAdjustmentDetailsSelectors.selectCurrencyLabel,
  );
  itemsQuote$: Observable<Array<IPpPartidaPedidoDetalleValidateAdjustment>> = this.store.select(
    validateAdjustmentDetailsSelectors.selectItemOrdersResults,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  localIsEmpty = isEmpty;

  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;

  readonly FIELD_CATALOG = INCIDENCE_CATALOG;
  readonly FIELD_DESCRIPTION = INCIDENCE_DESCRIPTION;
  readonly FIELD_PRESENTATION = INCIDENCE_PRESENTATION;
  readonly FIELD_TRADEMARK = INCIDENCE_TRADEMARK;
  readonly FIELD_TEE = INCIDENCE_TEE;
  readonly FIELD_IVA = INCIDENCE_IVA;
  readonly FIELD_UNIT_PRICE = INCIDENCE_UNIT_PRICE;
  readonly FIELD_COMMENTS = INCIDENCE_COMMENTS;
  readonly FIELD_DATE = INCIDENCE_DATE;
  readonly FIELD_CURRENCY = INCIDENCE_MONEDA;
  readonly inputValidators = InputValidators;
  readonly typeItem = QuotationItemTypes;
  readonly productsTypes = ProductsTypes;
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private appService: CoreContainerService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  dataValidate(value: boolean, type: string, valueOrignal: boolean): void {
    if (value !== valueOrignal) {
      this.store.dispatch(
        validateAdjustmentDetailActions.SET_DATA_VALIDATE({
          value,
          typeValidate: type,
        }),
      );
    }
  }

  setValidateEntry(IdPPPartidaPedido: string, value: boolean): void {
    this.store.dispatch(
      validateAdjustmentDetailActions.SET_VALIDATE_ENTRY_ITEM({
        IdPPPartidaPedido,
        value,
      }),
    );
  }

  changeQuantity(entry: IPpPartidaPedidoDetalleValidateAdjustment, quantity: number): void {
    const activeEntry = {
      ...entry,
      NumeroDePiezas: Number(quantity),
    };
    this.store.dispatch(
      validateAdjustmentDetailActions.UPDATE_ITEM_SELECTED({
        entry: activeEntry,
      }),
    );
  }

  changeUnitPrice(entry: IPpPartidaPedidoDetalleValidateAdjustment, unitPrice: number): void {
    const activeEntry = {
      ...entry,
      PrecioUnitario: unitPrice,
    };
    this.store.dispatch(
      validateAdjustmentDetailActions.UPDATE_ITEM_SELECTED({
        entry: activeEntry,
      }),
    );
  }

  setIncidenceValue(entryId: string, field: string, value: boolean | string): void {
    this.store.dispatch(
      validateAdjustmentDetailActions.SET_INCIDENCE_VALUE({
        entryId,
        field,
        value,
      }),
    );
  }

  buildItem(items: Array<IPpPartidaPedidoDetalleValidateAdjustment>): InternalSalesItem {
    const showNotes = !isEmpty(
      filter(items, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Comentarios),
    );
    const showColumnProFreight = find(
      items,
      (o: IPpPartidaPedidoDetalleValidateAdjustment) =>
        o.PrecioFleteNoDesglosado > 0 && o?.PrecioFleteNoDesglosado !== null,
    );
    return buildInternalSalesItem(showNotes, this.item, {
      currency: this.currency,
      showColumnProFreight: showColumnProFreight !== undefined,
    });
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    const {action, data, value} = event;
    switch (action) {
      case this.nameActionsInternalSalesItem.CheckBoxRedGreenAction:
        this.setValidateEntry(data.IdPPPartidaPedido, Boolean(value));
        break;
      case this.nameActionsInternalSalesItem.NumberPiecesAction:
        this.changeQuantity(data, Number(value));
        break;
      case this.nameActionsInternalSalesItem.UnitPriceEditNumberAction:
        this.changeUnitPrice(data, Number(value));
        break;
      case this.nameActionsInternalSalesItem.SeeNotesItemAction:
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
}
