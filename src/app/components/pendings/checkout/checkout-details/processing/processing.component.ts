import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {checkoutDetailsActions} from '@appActions/pendings/checkout';
import {take} from 'rxjs/operators';
import {lastValueFrom, Observable} from 'rxjs';
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';
import {ICard} from '@appModels/card/card';
import {TpPedido} from 'api-logistica';
import {
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {
  ICustomerCheckOut,
  PROCEDURES_TYPES,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {CatMetodoDePagoCFDI, CatUsoCFDI} from 'api-catalogos';
import {selectMetodoDePagoCFDI, selectUsoCFDI} from '@appSelectors/catalogs/catalogs.selectors';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {InputValidators} from '../../../../../helpers/shared/shared.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {appRoutes} from '@appHelpers/core/app-routes';
import {MatDialog} from '@angular/material/dialog';
import {authDialogSelectors} from '@appSelectors/dialogs';
import {IReferenceFormEdit} from '@appComponents/shared/reference-form-edit/reference-form-edit.component';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessingComponent implements AfterContentChecked, AfterViewInit {
  readonly SEE_MORE_POP = 'seeMore';
  readonly USAGE_POP = 'usage';
  readonly PAYMENT_POP = 'payment';
  readonly TEE_POP = 'tee';
  readonly DEFAULTER_POP = 'defaulter';
  readonly LINKED_POP = 'linked';
  protected readonly InputValidators = InputValidators;

  purchaseOrderTotal$: Observable<number> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderTotal,
  );
  purchaseOrders$: Observable<Array<ICard>> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderForCards,
  );
  items$: Observable<IPurchaseOrderItem[]> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderEntries,
  );
  purchaseOrder$: Observable<IOrdersC> = this.store.select(
    checkoutDetailsSelectors.selectedPurchaseOrder,
  );
  purchaseOrderDetails$: Observable<IPurchaseOrderDetails> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderDetails,
  );
  checkoutValidator$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.checkoutButtonValidator,
  );
  totalControlledEntries$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectTotalControlledEntries,
  );
  tpPedido$: Observable<TpPedido> = this.store.select(checkoutDetailsSelectors.selectTpPedido);
  customer$: Observable<ICustomerCheckOut> = this.store.select(
    checkoutDetailsSelectors.selectClient,
  );
  usageOptions$: Observable<Array<CatUsoCFDI>> = this.store.select(selectUsoCFDI);
  paymentMethodOptions$: Observable<Array<CatMetodoDePagoCFDI>> = this.store.select(
    selectMetodoDePagoCFDI,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  isCodeValid$: Observable<boolean> = this.store.select(authDialogSelectors.selectCodeIsValid);
  isAddendaPopUpOpen$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectIsAddendaPopUpOpen,
  );
  itemForReusableHeaderTable$: Observable<InternalSalesItem> = this.store.select(
    checkoutDetailsSelectors.selectItemForReusableHeaderTable,
  );
  itemsForSalesItem$: Observable<InternalSalesItem[]> = this.store.select(
    checkoutDetailsSelectors.selectItemsForSalesItem,
  );
  selectResumeMode$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectResumeMode,
  );
  entriesListApiStatus$: Observable<number> = this.store.select(
    checkoutDetailsSelectors.selectListEntriesApiStatus,
  );

  items: IPurchaseOrderItem[];
  items2: InternalSalesItem[];
  popUps: {
    seeMore: IPopUpConfig;
    usage: IPopUpConfig;
    payment: IPopUpConfig;
    tee: IPopUpConfig;
    defaulter: IPopUpConfig;
    linked: IPopUpConfig;
  };
  fileName = null;
  fileSelected = null;
  viewFile = false;
  tooltip = false;
  isPdf = true;
  targetPop: any;
  proceduresTypes = PROCEDURES_TYPES;
  isOpenNotes: boolean;
  referencePopOpen = false;
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;
  readonly API_REQUEST_STATUS_LOADING = API_REQUEST_STATUS_LOADING;
  readonly API_REQUEST_STATUS_SUCCEEDED = API_REQUEST_STATUS_SUCCEEDED;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private appService: CoreContainerService,
  ) {
    this.popUps = {
      [this.SEE_MORE_POP]: {isOpen: false, target: null},
      [this.USAGE_POP]: {isOpen: false, target: null},
      [this.PAYMENT_POP]: {isOpen: false, target: null},
      [this.TEE_POP]: {isOpen: false, target: null},
      [this.DEFAULTER_POP]: {isOpen: false, target: null},
      [this.LINKED_POP]: {isOpen: false, target: null},
    };
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  async handlePopUp(
    pop: string,
    isOpen: boolean,
    target: any,
    emit?: boolean,
    item?: IPurchaseOrderItem,
  ): Promise<void> {
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
        target,
      },
    };
    if (isOpen) {
      this.cdr.detectChanges();
      // TODO: Hacer algo cuando se abre el pop
      if (pop === this.TEE_POP) {
        this.openTEEPop(item, target, emit);
      }
    } else {
      if (emit === null || emit === undefined) {
        return;
      }

      // TODO: REVISAR SI SE ELIMINA
      /*      if (pop === this.DEFAULTER_POP) {
        this.store.dispatch(checkoutDetailsActions.SAVE_CHECKOUT_DATA_LOAD({}));
      }*/
      if (pop === this.USAGE_POP && item) {
        this.store.dispatch(
          checkoutDetailsActions.SET_USAGE_OR_PAYMENT_METHOD({
            item,
            node: 'catUsoCFDI',
          }),
        );
      }
      if (pop === this.PAYMENT_POP && item) {
        this.store.dispatch(
          checkoutDetailsActions.SET_USAGE_OR_PAYMENT_METHOD({
            item,
            node: 'catMetodoDePagoCFDI',
          }),
        );
      }
      if (!emit) {
        //DOCS: Caso para cancelar la edición
        const backupPurchaseOrder = await lastValueFrom(
          this.store.pipe(select(checkoutDetailsSelectors.selectBackupPurchaseOrder), take(1)),
        );
        this.store.dispatch(
          checkoutDetailsActions.RESTORE_BACKUP_PURCHASE_ORDER_SELECTED({backupPurchaseOrder}),
        );
      }
    }
  }

  handleNavigateToResume(): void {
    this.store.dispatch(
      checkoutDetailsActions.SET_CODE_POP_PROCEDURE_TYPE({
        procedureType: this.proceduresTypes.invoiceInAdvance,
      }),
    );
    // DOCS: hace la navegación al detalle sin hacer la petición de actualizar
    this.store.dispatch(
      checkoutDetailsActions.SET_RESUME_COMPONENT({
        resumeComponent: true,
      }),
    );
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.checkout.checkout,
      appRoutes.checkout.details,
      appRoutes.checkout.resume,
    ]);
    this.store.dispatch(checkoutDetailsActions.SET_RESUME_MODE({resumeMode: true}));
  }

  selectPurchaseOrder(selectedPurchaseOrder: ICard): void {
    this.store.dispatch(
      checkoutDetailsActions.SET_SELECTED_PURCHASE_ORDER({IdTPPedido: selectedPurchaseOrder.value}),
    );
  }

  setTPPedidoValue(value: any, field: string): void {
    this.store.dispatch(
      checkoutDetailsActions.SET_TPPEDIDO_VALUE({
        value,
        field,
      }),
    );
  }

  // TODO: REVISAR SI SE ELIMINA
  /*  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }*/

  selectUsage(item: CatUsoCFDI | CatMetodoDePagoCFDI, node: string): void {
    this.handlePopUp(node, false, this.popUps[node].target, true, item);
  }

  openCodePopUp(procedureType: string) {
    this.store.dispatch(checkoutDetailsActions.SET_CODE_POP_PROCEDURE_TYPE({procedureType}));
    this.store.dispatch(checkoutDetailsActions.UPDATE_CODE_REQUEST());
    this.store.dispatch(checkoutDetailsActions.SHOW_REQUEST_AUTHORIZATION_CODE_DIALOG());
  }

  // TODO: REVISAR SI SE ELIMINA
  /*  openLinked(pop: string, isOpen: boolean, event: any, item?, target?: any): void {
    if (item) {
      this.handleStopEvents(event);
      if (pop === 'PDF') {
        this.store.dispatch(checkoutDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
        this.viewFile = isOpen;
        this.tooltip = false;
        this.store.dispatch(checkoutDetailsActions.SET_ITEM_LINKED({item}));
      } else {
        this.store.dispatch(checkoutDetailsActions.SET_ITEM_LINKED({item}));
        this.tooltip = isOpen;
        this.targetPop = target;
      }
    } else {
      if (pop === 'PDF') {
        this.viewFile = isOpen;
        this.fileName = null;
        this.store.dispatch(checkoutDetailsActions.SET_INVOICE_ITEM_SELECTED({item: null}));
      } else {
        this.tooltip = isOpen;
      }
    }
  }*/
  // TODO: ES PARTE DE LAS COTIZACIONES VINCULADAS, REVISAR SI SE ELIMINA
  /*  openLinkedFile(IdArchivo, folio): void {
    this.fileName = 'FO-' + folio;
    this.fileSelected = null;
    this.store.dispatch(checkoutDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
    this.isPdf = true;
    this.viewFile = true;
    this.store.dispatch(checkoutDetailsActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
    this.tooltip = false;
  }

  downLoadFile(IdArchivo): void {
    this.store.dispatch(checkoutDetailsActions.DOWN_LOAD_FILE({IdArchivo}));
  }*/
  downLoadFile(IdArchivo): void {
    this.store.dispatch(checkoutDetailsActions.DOWN_LOAD_FILE({IdArchivo}));
  }

  openAddendaModal(): void {
    // DOCS: SAVE BACKUP ONLY WHEN MODAL HAS BEEN OPENED
    this.store.dispatch(checkoutDetailsActions.SET_BACKUP_ADDENDA_INFO());
    this.store.dispatch(checkoutDetailsActions.OPEN_ADDENDA_POP_UP({isOpen: true}));
  }

  async globalItemEventsHandler(event: ModelEmitInternalSalesItem): Promise<void> {
    const {action, target, data} = event;
    switch (action) {
      case this.nameActionsInternalSalesItem.DeliveryTimeScheduleAction:
      case this.nameActionsInternalSalesItem.InternalSalesAction:
        this.store.dispatch(checkoutDetailsActions.SET_ENTRY_SELECTED({entry: data}));
        await this.handlePopUp(this.TEE_POP, true, target, null, data);
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

  openTEEPop(item: IPurchaseOrderItem, target: any, emit?: boolean): void {
    if (item?.tpPartidaPedido?.IdTPPartidaPedido) {
      this.store.dispatch(checkoutDetailsActions.SHOW_TEE_DIALOG({item, emit}));
    }
  }
  itemTrackBy(index, item: InternalSalesItem): string {
    return item.data?.tpPartidaPedido?.IdTPPartidaPedido;
  }
  downloadExistenceLetter(): void {
    this.store.dispatch(checkoutDetailsActions.DOWN_LOAD_EXISTENCE_LETTER());
  }
  handleReferenceAction(event: IReferenceFormEdit) {
    if (event.value) {
      this.store.dispatch(
        checkoutDetailsActions.SET_UPDATE_REFERENCE_LOAD({reference: event.reference}),
      );
    }
    this.referencePopOpen = false;
  }
}
