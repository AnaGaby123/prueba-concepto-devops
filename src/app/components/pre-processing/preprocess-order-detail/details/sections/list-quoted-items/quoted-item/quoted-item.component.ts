import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Store} from '@ngrx/store';
// Selectors
// Actions
import {preProcessDetailsActions, quotedItemActions} from '@appActions/pre-processing';
import {GET_CAT_ESTADO_COTIZACION} from '@appActions/catalogs/catalogos.actions';

// Models
import {IPpPartidaPedidoDetallePretamitar} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';

// Utils
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
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {ProductsTypes, QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {AppState} from '@appCore/core.state';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-quoted-item',
  templateUrl: './quoted-item.component.html',
  styleUrls: ['./quoted-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotedItemComponent implements OnInit, OnChanges {
  @Input() item: InternalSalesItem;
  @Input() index: number;
  @Output() openNotesValueEmitter: EventEmitter<{
    target: any;
    internalSalesItem: InternalSalesItem;
    isOpenNotes: boolean;
  }> = new EventEmitter<{
    target: any;
    internalSalesItem: InternalSalesItem;
    isOpenNotes: boolean;
  }>();

  // TODO: Revisar si se va a implementar
  /*quotesLinked$: Observable<IProduct> = this.store.select(
    preProcessOrderDetailsSelectors.selectItemSelected,
  );*/

  popUpIsOpenDeliversRestrictions = false;
  targetRestrictionsDeliver: any = null;
  toolTipPop = false;
  targetPop = null;
  viewPDF = false;
  isPdf = false;
  fileName: string;

  itemPpreProcessing: IPpPartidaPedidoDetallePretamitar;

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
  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_ESTADO_COTIZACION());
    this.cdr.detectChanges();
    this.itemPpreProcessing = this.item.data as IPpPartidaPedidoDetallePretamitar;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.itemPpreProcessing = this.item.data as IPpPartidaPedidoDetallePretamitar;
  }

  setIncidenceValue(entryId: string, field: string, value: boolean | string, index: number): void {
    this.store.dispatch(quotedItemActions.SET_INCIDENCE_VALUE({entryId, field, value, index}));
  }

  // TODO: Revisar si se va a implementar
  /*openLinkedQuoted(pop: string, isOpen: boolean, entry?, event?: any): void {
    if (entry) {
      this.store.dispatch(preProcessDetailsActions.SET_OPEN_VIEW_FILE({active: true}));
      if (entry.CotizacionesVinculadas === 1) {
        this.store.dispatch(preProcessDetailsActions.SET_ITEM_LINKED({item: entry}));
        this.viewPDF = true;
        this.toolTipPop = !isOpen;
      } else {
        this.store.dispatch(preProcessDetailsActions.SET_ITEM_LINKED({item: entry}));
        this.targetPop = event.target;
        this.toolTipPop = isOpen;
        this.viewPDF = !isOpen;
      }
    } else {
      if (pop === 'tooltip') {
        this.toolTipPop = isOpen;
      } else {
        this.store.dispatch(preProcessDetailsActions.SET_OPEN_VIEW_FILE({active: isOpen}));
      }
    }
  }*/

  // TODO: Revisar si se va a implementar
  /*openLinkedFile(IdArchivo, folio): void {
    this.fileName = 'FO-' + folio;
    this.isPdf = true;
    this.toolTipPop = false;
    this.viewPDF = true;
    this.store.dispatch(preProcessDetailsActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
  }*/

  openPopUpTEEItemOrder(itemOrder: IPpPartidaPedidoDetallePretamitar): void {
    this.store.dispatch(
      preProcessDetailsActions.SET_OPEN_POP_UP_TEE_ITEM_ORDER({
        value: true,
        itemOrder,
      }),
    );
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    const {data, value, action} = event;
    switch (action) {
      case NameActionsInternalSalesItem.CheckBoxRedGreenAction:
        this.quotedItemCheckbox(this.itemPpreProcessing, Boolean(value));
        break;
      case NameActionsInternalSalesItem.TrashReverseSettingAction:
        this.quotedItemTrash(this.itemPpreProcessing);
        break;
      case NameActionsInternalSalesItem.UnitPriceEditNumberAction:
        this.quotedItemUnitPrice(this.itemPpreProcessing, Number(value));
        break;
      case NameActionsInternalSalesItem.NumberPiecesAction:
        this.quotedItemNumPieces(this.itemPpreProcessing, Number(value));
        break;
      case NameActionsInternalSalesItem.DeliveryTimeScheduleAction:
      case NameActionsInternalSalesItem.InternalSalesAction:
        this.openPopUpTEEItemOrder(this.itemPpreProcessing);
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
  quotedItemCheckbox(data: any, value: boolean): void {
    this.store.dispatch(
      preProcessDetailsActions.SET_VALIDATE_ENTRY_ITEM({
        idQuote:
          data?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.IdCotPartidaCotizacion,
        value: value,
      }),
    );
  }

  quotedItemTrash(entry: IPpPartidaPedidoDetallePretamitar): void {
    this.store.dispatch(preProcessDetailsActions.DELETE_ITEM_IN_ORDER({entry}));
  }

  quotedItemNumPieces(entry: IPpPartidaPedidoDetallePretamitar, quantity: number): void {
    if (quantity >= 1) {
      const activeEntry = {
        ...entry,
        NumeroDePiezas: Number(quantity),
      };
      this.store.dispatch(preProcessDetailsActions.UPDATE_ITEM_SELECTED({entry: activeEntry}));
    }
  }

  quotedItemUnitPrice(entry: IPpPartidaPedidoDetallePretamitar, unitPrice: number): void {
    const activeEntry = {
      ...entry,
      PrecioUnitario: Number(unitPrice),
    };
    this.store.dispatch(preProcessDetailsActions.UPDATE_ITEM_SELECTED({entry: activeEntry}));
  }
}
