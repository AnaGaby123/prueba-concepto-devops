import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

// Models
import {
  ICustomer,
  IOrderNotProcessed,
  IPpPartidaPedidoObjNotProcess,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {VDireccion} from 'api-logistica';
import {IPpPartidaPedidoObj} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';

// Actions
import {notProcessedDetailActions} from '@appActions/pendings/not-processed';

// Selectors
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {IClientContact} from '@appModels/shared/shared.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {ProductsTypes} from '@appHelpers/pending/quotation/quotation.helpers';
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
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {RequestFeaDialogComponent} from '@appComponents/pendings/not-processed/not-processed-details/purchase-order-items/request-fea-dialog/request-fea-dialog.component';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {IReferenceFormEdit} from '@appComponents/shared/reference-form-edit/reference-form-edit.component';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-purchase-order-items',
  templateUrl: './purchase-order-items.component.html',
  styleUrls: ['./purchase-order-items.component.scss'],
})
export class PurchaseOrderItemsComponent {
  order$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelected,
  );
  selectTotalsOrderSelected$: Observable<ShoppingCartTotalsModel> = this.store.select(
    notProcessedDetailsSelectors.selectTotalsOrderSelected,
  );
  total$: Observable<number> = this.store.select(notProcessedDetailsSelectors.selectTotalsOrder);
  customer$: Observable<ICustomer> = this.store.select(notProcessedDetailsSelectors.selectClient);
  items$: Observable<Array<IPpPartidaPedidoObjNotProcess>> = this.store.select(
    notProcessedDetailsSelectors.selectItemsOrder,
  );
  apiStatusItems$: Observable<number> = this.store.select(
    notProcessedDetailsSelectors.selectApiStatusItems,
  );
  quotesLinked$: Observable<Array<any>> = this.store.select(
    notProcessedDetailsSelectors.selectItemsOrder,
  );
  clientContactData$: Observable<IClientContact> = this.store.select(
    notProcessedDetailsSelectors.selectClientContactData,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  activeItems$: Observable<Array<IPpPartidaPedidoObj>> = this.store.select(
    notProcessedDetailsSelectors.selectActiveItems,
  );
  displayRowsConfig$: Observable<InternalSalesItem[]> = this.store.select(
    notProcessedDetailsSelectors.displayRowsConfig,
  );
  displayColumnsConfig$: Observable<InternalSalesItem> = this.store.select(
    notProcessedDetailsSelectors.displayColumnsConfig,
  );
  selectCurrencyLabel$: Observable<string> = this.store.select(
    notProcessedDetailsSelectors.selectCurrencyLabel,
  );
  deliveryAddressSelected$: Observable<VDireccion> = this.store.select(
    notProcessedDetailsSelectors.selectedDeliveryAddress,
  );
  deliveryAddresses$: Observable<VDireccion[]> = this.store.select(
    notProcessedDetailsSelectors.selectDeliveriesAddress,
  );
  billingAddress$: Observable<string> = this.store.select(
    notProcessedDetailsSelectors.selectBillingAddressFormat,
  );
  scrolledItems: InternalSalesItem[] = [];
  fileName = '';
  fileSelected = null;
  tooltip = false;
  isPdf = true;
  targetPop: any;
  activePopCancel = false;
  errors = [];

  targetNotes: any;
  itemInternalSalesItem: InternalSalesItem;
  isOpenNotes: boolean;
  referencePopOpen = false;

  readonly inputValidators = InputValidators;
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
  readonly productsTypes = ProductsTypes;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private appService: CoreContainerService,
  ) {}

  handleTrackBy(index: number, entry: InternalSalesItem): string {
    return entry?.data?.IdPPPartidaPedido;
  }

  cancelProcess(value: boolean): void {
    if (value) {
      this.store.dispatch(notProcessedDetailActions.CANCEL_PROCESS_OC());
    }
  }

  setIncidenceValue(IdPPOrderItem: string, field: string, value: boolean | string): void {
    this.store.dispatch(
      notProcessedDetailActions.SET_INCIDENCE_VALUE({
        IdPPOrderItem,
        field,
        value,
      }),
    );
  }

  activePop(value: string, event?: boolean): void {
    const options = {
      validateSettings: {
        activeGenericPop: true,
        activeWithErrors: true,
      },
      feaSend: {
        activeGenericPop: false,
        activeRequestFEA: false,
      },
      fea: {
        activeGenericPop: true,
        activeRequestFEA: true,
        activeWithErrors: false,
      },
    };

    const data = options[value] || null;

    const dialogRef = this.dialog.open(RequestFeaDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data,
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((data: {value: string; event: boolean}) => {
      if (data?.value === 'requestWithErrorsPop') {
        if (data?.event) {
          this.store.dispatch(notProcessedDetailActions.SHOW_REQUEST_AUTH_CODE());
        } else {
          this.store.dispatch(
            notProcessedDetailActions.SET_DELIVERY_INSTRUCTIONS({
              instructions: null,
            }),
          );
        }
      } else if (data?.value === 'feaSend') {
        if (data?.event) {
          this.store.dispatch(notProcessedDetailActions.SEND_REQUEST_FOR_FEA_LOAD());
        }
      }
    });
  }

  showReconfigureFreightPopUp(): void {
    this.store.dispatch(notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_POP_UP({isOpen: true}));
    this.store.dispatch(notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_DIALOG());
  }

  popUpProtected(): void {
    this.store.dispatch(notProcessedDetailActions.SHOW_SEND_EMAIL_DIALOG({isNotCovered: true}));
  }

  //DOCS: DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
  /*  openLinked(pop: string, isOpen: boolean, event: any, item?, target?: any): void {
    if (item) {
      this.store.dispatch(notProcessedDetailActions.SET_ITEM_LINKED({item}));
      if (pop === 'PDF') {
        this.store.dispatch(
          notProcessedDetailActions.VIEW_FILE_IS_LOADING({
            value: true,
          }),
        );
        this.store.dispatch(
          notProcessedDetailActions.SET_OPEN_VIEW_FILE({
            active: isOpen,
          }),
        );
        this.tooltip = !isOpen;
      } else {
        this.tooltip = isOpen;
        this.targetPop = target;
      }
    } else {
      if (pop === 'PDF') {
        this.store.dispatch(
          notProcessedDetailActions.SET_OPEN_VIEW_FILE({
            active: isOpen,
          }),
        );
      } else {
        this.tooltip = isOpen;
      }
    }
  }*/

  //DOCS: DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
  /*
  openLinkedFile(IdArchivo: string, folio: string): void {
    this.fileName = 'FO-' + folio;
    this.fileSelected = null;
    this.isPdf = true;
    this.store.dispatch(
      notProcessedDetailActions.SET_INVOICE_ITEM_SELECTED({
        item: this.fileName,
      }),
    );
    this.store.dispatch(
      notProcessedDetailActions.VIEW_FILE_IS_LOADING({
        value: true,
      }),
    );
    this.store.dispatch(
      notProcessedDetailActions.SET_OPEN_VIEW_FILE({
        active: true,
      }),
    );
    this.store.dispatch(notProcessedDetailActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
    this.tooltip = false;
  }
*/

  handleDeliveryAddress(address: VDireccion): void {
    this.store.dispatch(notProcessedDetailActions.SET_SELECTED__DELIVERY_ADDRESS({address}));
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
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
  changeIsOpenNotesPopUp(model: ModelEmitInternalSalesItem): void {
    this.targetNotes = model.target;
    this.itemInternalSalesItem = model.dataInternal;
    this.isOpenNotes = model.value as boolean;
  }
  handleReferenceAction(event: IReferenceFormEdit) {
    if (event.value) {
      this.store.dispatch(
        notProcessedDetailActions.SET_UPDATE_REFERENCE_LOAD({reference: event.reference}),
      );
    }
    this.referencePopOpen = false;
  }
}
