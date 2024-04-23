import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {lastValueFrom, Observable} from 'rxjs';
// Models
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {ICustomerResults} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {
  IFileUpload,
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';
import {
  TpClienteCSCreditoMorosoCorreo,
  TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj,
} from 'api-logistica';
import {CatMetodoDePagoCFDI, CatUsoCFDI} from 'api-catalogos';
import {PROCEDURES_TYPES} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
// Selectors
import {orderModificationDetailSelectors} from '@appSelectors/pendings/order-modification';
import {selectMetodoDePagoCFDI, selectUsoCFDI} from '@appSelectors/catalogs/catalogs.selectors';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
// Actions
import {orderModificationDetailsActions} from '@appActions/pendings/order-modification';
import * as catalogosActions from '@appActions/catalogs/catalogos.actions';
// Utils
import {debounce, filter, isEmpty, isEqual, toNumber} from 'lodash-es';
import {
  CURRENCY_MXN,
  CURRENCY_USD,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';

export interface IPurchaseOrderItemSelected extends IPurchaseOrderItem {
  processSelected: DropListOption;
  notes: string;
}

@Component({
  selector: 'app-order-modification-details',
  templateUrl: './order-modification-details.component.html',
  styleUrls: ['./order-modification-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderModificationDetailsComponent
  implements OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, OnDestroy {
  @ViewChildren('codeInputs') code: QueryList<ElementRef>;
  @ViewChildren('twoCodesInputs') twoCodes: QueryList<ElementRef>;

  readonly SCHEDULES_POP = 'schedules';
  readonly LINKED_POP = 'linked';
  readonly VIEW_FILE = 'viewFile';
  readonly REPLACE_OC_POP = 'replaceOc';
  readonly DELETE_ITEM_POP = 'deleteItem';
  readonly CODE_POP = 'code';
  readonly TWO_CODE_POP = 'twoCodes';
  readonly DELETE_ORDER_ALERT_POP = 'deleteOrderAlert';
  readonly SEGMENT_ALERT_POP = 'segmentAlert';
  readonly FINALIZE_ALERT_POP = 'finalizeAlert';
  readonly SEE_ENTRY_POP = 'seeEntry';
  readonly SEE_NOTES_POP = 'seeNotes';
  readonly USAGE_POP = 'usage';
  readonly PAYMENT_POP = 'payment';
  readonly CURRENCY_USD = CURRENCY_USD;
  readonly CURRENCY_MXN = CURRENCY_MXN;

  items$: Observable<Array<IPurchaseOrderItem>> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderEntries,
  );
  itemsLoading$: Observable<number> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderEntriesLoading,
  );
  dataLoading$: Observable<number> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderDetailsLoading,
  );
  destinies$: Observable<Array<DropListOption>> = this.store.select(
    orderModificationDetailSelectors.selectDropDestiny,
  );
  addresses$: Observable<Array<DropListOption>> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderAddress,
  );
  catProcess$: Observable<Array<DropListOption>> = this.store.select(
    orderModificationDetailSelectors.selectDropProcess,
  );
  destinySelected$: Observable<DropListOption> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderCatDestiny,
  );
  processSelected$: Observable<DropListOption> = this.store.select(
    orderModificationDetailSelectors.selectProcessSelected,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    orderModificationDetailSelectors.selectFilterSelected,
  );
  filterList$: Observable<Array<DropListOption>> = this.store.select(
    orderModificationDetailSelectors.selectFilterList,
  );
  selectDataCard$: Observable<Array<ICard>> = this.store.select(
    orderModificationDetailSelectors.selectOrdersCard,
  );
  customer$: Observable<ICustomerResults> = this.store.select(
    orderModificationDetailSelectors.selectCustomerSelected,
  );
  purchaseOrderDetails$: Observable<IPurchaseOrderDetails> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderDetails,
  );
  selectedOrder$: Observable<IOrdersC> = this.store.select(
    orderModificationDetailSelectors.selectOrderSelected,
  );
  schedules$: Observable<Array<string>> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderSchedules,
  );
  contacts$: Observable<Array<IDropListMulti>> = this.store.select(
    orderModificationDetailSelectors.selectClientContactsForMultiDrop,
  );
  usageOptions$: Observable<Array<CatUsoCFDI>> = this.store.select(selectUsoCFDI);
  paymentMethodOptions$: Observable<Array<CatMetodoDePagoCFDI>> = this.store.select(
    selectMetodoDePagoCFDI,
  );
  validatorForSegmentOrder$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.validatorForSegmentOrderButton,
  );
  validatorForCancel$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.validatorForCancelActions,
  );
  selectedItems$: Observable<Array<IPurchaseOrderItem>> = this.store.select(
    orderModificationDetailSelectors.selectedItems,
  );
  additionalFiles$: Observable<Array<IFileUpload>> = this.store.select(
    orderModificationDetailSelectors.selectAdditionalFiles,
  );
  isActiveFinalizeButton$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectValidateFinalizeButton,
  );
  popUpNotesIsOpen$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectPopUpNotesIsOpen,
  );
  procedureType$: Observable<string> = this.store.select(
    orderModificationDetailSelectors.selectProcedureType,
  );
  firstCodePassed$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectFirstCodePassed,
  );
  editDataRequest$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectExistEditInvoiceDataRequest,
  );
  cancelItemRequest$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectExistCancelItemRequest,
  );
  cancelOrderRequest$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectExistCancelOrderRequest,
  );
  shaked$: Observable<boolean> = this.store.select(orderModificationDetailSelectors.selectShaked);
  codeRequest$: Observable<TpClienteCSCreditoMorosoCorreo> = this.store.select(
    orderModificationDetailSelectors.selectCodeRequest,
  );
  selectCodeIsEmpty$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectCodeIsEmpty,
  );
  code$: Observable<Array<number>> = this.store.select(orderModificationDetailSelectors.selectCode);
  selectCodeIsFill$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectCodeIsFill,
  );
  editDataRequestAuthorized$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectIsAuthorizedEditInvoiceDataRequest,
  );
  existAnyRequest$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectExistAnyRequest,
  );
  base64$: Observable<string> = this.store.select(
    orderModificationDetailSelectors.selectFileBase64,
  );
  openPDF$: Observable<boolean> = this.store.select(orderModificationDetailSelectors.selectOpenPDF);
  isLoadingViewFile$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectViewFileIsLoading,
  );
  // TODO: REVISAR SI SE QUITA O SE QUEDA
  /*quotesLinked$: Observable<IPurchaseOrderItem> = this.store.select(
    orderModificationDetailSelectors.selectItemSelected,
  );*/
  invoice$: Observable<string> = this.store.select(
    orderModificationDetailSelectors.selectInvoiceSelected,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  mgsPopUpSeeNotes = '';
  items: Array<IPurchaseOrderItem>;
  itemSelected: IPurchaseOrderItemSelected;
  itemSelectedBackup: IPurchaseOrderItemSelected;
  processSelected: DropListOption;
  lodashIsEmpty = isEmpty;
  isPdf = true;
  fileName: string;
  popUps: {
    schedules: IPopUpConfig;
    replaceOc: IPopUpConfig;
    deleteItem: IPopUpConfig;
    code: IPopUpConfig;
    twoCodes: IPopUpConfig;
    deleteOrderAlert: IPopUpConfig;
    segmentAlert: IPopUpConfig;
    finalizeAlert: IPopUpConfig;
    seeEntry: IPopUpConfig;
    usage: IPopUpConfig;
    payment: IPopUpConfig;
    linked: IPopUpConfig;
    viewFile: IPopUpConfig;
  };
  openViewFile = false;
  proceduresTypes = PROCEDURES_TYPES;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.popUps = {
      [this.SCHEDULES_POP]: {isOpen: false, target: null},
      [this.REPLACE_OC_POP]: {isOpen: false, target: null},
      [this.DELETE_ITEM_POP]: {isOpen: false, target: null},
      [this.CODE_POP]: {isOpen: false, target: null, item: null},
      [this.TWO_CODE_POP]: {isOpen: false, target: null},
      [this.DELETE_ORDER_ALERT_POP]: {isOpen: false, target: null},
      [this.SEGMENT_ALERT_POP]: {isOpen: false, target: null},
      [this.FINALIZE_ALERT_POP]: {isOpen: false, target: null},
      [this.SEE_ENTRY_POP]: {isOpen: false, target: null},
      [this.USAGE_POP]: {isOpen: false, target: null},
      [this.PAYMENT_POP]: {isOpen: false, target: null},
      [this.LINKED_POP]: {isOpen: false, target: null},
      [this.VIEW_FILE]: {isOpen: false, target: null},
    };
  }

  ngOnInit(): void {
    this.store.dispatch(catalogosActions.GET_CAT_DESTINO_LOAD());
    this.store.dispatch(catalogosActions.GET_CAT_PROCESS_LOAD());
    this.store.dispatch(orderModificationDetailsActions.FETCH_CLIENT_ADDRESSES_LOAD());
    this.store.dispatch(orderModificationDetailsActions.FETCH_CLIENT_CONTACTS_LOAD());
    this.store.dispatch(catalogosActions.GET_CAT_USO_CFDI());
    this.store.dispatch(catalogosActions.GET_CAT_METODO_DE_PAGO());
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.popUps.schedules.isOpen) {
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(orderModificationDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  handleAutoEmit(file: File): void {
    this.store.dispatch(orderModificationDetailsActions.SAVE_OC_FILE({file}));
  }

  handleManualEmit(file: File): void {
    this.store.dispatch(orderModificationDetailsActions.SAVE_ADDITIONAL_FILE({file}));
  }

  setCheckValue(isSelected: boolean, item: IPurchaseOrderItem): void {
    this.store.dispatch(orderModificationDetailsActions.SET_ITEM_IS_SELECTED({isSelected, item}));
  }

  setAllowAddFiles(allowAddFiles: boolean): void {
    this.store.dispatch(
      orderModificationDetailsActions.SET_ITEM_ALLOW_ADD_FILES({
        allowAddFiles,
      }),
    );
  }

  openCodePopUp(procedureType: string): void {
    this.store.dispatch(
      orderModificationDetailsActions.SET_CODE_POP_PROCEDURE_TYPE({
        procedureType,
      }),
    );
    this.handlePopUps({pop: this.CODE_POP, isOpen: true, target: null});
  }

  async handleAuxOpenPops(event, {pop, isOpen, item, procedureType = null}): Promise<void> {
    this.handleStopEvents(event);
    // Solo para el popUp de Notas
    if (pop === this.SEE_NOTES_POP) {
      this.processSelected = {} as DropListOption;
      if (item.tpPartidaPedido.IdCatProceso) {
        const catProcess: Array<DropListOption> = await lastValueFrom(
          this.store.pipe(select(orderModificationDetailSelectors.selectDropProcess), take(1)),
        );
        this.processSelected = filter(
          catProcess,
          (process) => process.value === item.tpPartidaPedido.IdCatProceso,
        )[0];
      }

      this.mgsPopUpSeeNotes =
        item.tpPartidaPedido.IdCatProceso && item.tpPartidaPedido.NotasModificacion
          ? 'Ver Nota'
          : 'Agregar Nota';
      this.itemSelected = {
        ...item,
        processSelected: this.processSelected,
        notes: item.tpPartidaPedido.NotasModificacion,
      };
      this.itemSelectedBackup = {
        ...item,
        processSelected: this.processSelected,
        notes: item.tpPartidaPedido.NotasModificacion,
      };
      this.store.dispatch(
        orderModificationDetailsActions.HANDLE_POP_UP_NOTES({
          popUpNotesIsOpen: isOpen,
        }),
      );
      return;
    } else {
      this.store.dispatch(
        orderModificationDetailsActions.SET_CODE_POP_PROCEDURE_TYPE({
          procedureType,
        }),
      );
    }
    this.handlePopUps({
      pop,
      isOpen,
      target: null,
      item,
    });
  }

  async handlePopUps({pop, isOpen, target, emit = false, item = null}): Promise<void> {
    if (pop === this.SEE_ENTRY_POP) {
      this.itemSelected = {...item};
    }
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
        target,
        item,
      },
    };
    this.cdr.detectChanges();
    if (isOpen) {
      // TODO: Hacer algo cuando se abre el pop
      if (pop === this.CODE_POP) {
        const request = await this.getRequest();
        const procedureType = await this.getProcedureType();
        // TODO: Hacer foco solamente si ya existe una solicitud y es del tipo que se esta solicitando
        if (
          !isEmpty(request) &&
          request.TipoTramite === procedureType &&
          ((procedureType === this.proceduresTypes.cancelItem &&
            request.IdTPPartidaPedido === item.IdTPPartidaPedido) ||
            procedureType === this.proceduresTypes.editData)
        ) {
          this.cdr.detectChanges();
          this.setFocus(pop, 0);
        }
      }
      if (pop === this.TWO_CODE_POP) {
        const request = await this.getRequest();
        const procedureType = await this.getProcedureType();
        if (!isEmpty(request) && request.TipoTramite === procedureType) {
          this.cdr.detectChanges();
          this.setFocus(pop, 0);
        }
      }
    } else {
      // TODO: Hacer algo cuando se cierra el pop
      if (pop === this.VIEW_FILE) {
        this.store.dispatch(orderModificationDetailsActions.SET_OPEN_VIEW_FILE({active: false}));
        this.store.dispatch(
          orderModificationDetailsActions.SET_INVOICE_ITEM_SELECTED({
            item: null,
          }),
        );
      }
      if (emit) {
        // TODO: Hacer algo cuando se desea trabajar con el emit
        if (pop === this.DELETE_ITEM_POP) {
          // TODO: Quitar despues de hacer pruebas. Solo se pide codigo si no esta en pedido
          this.handlePopUps({
            pop: this.CODE_POP,
            isOpen: true,
            target: null,
            emit: false,
            item,
          });
          /*if (item.EstadoPartida !== 'Pedido') {
            this.handlePopUps({
              pop: this.CODE_POP,
              isOpen: true,
              target: null,
              emit: false,
              item,
            });
          } else {
            this.store.dispatch(
              orderModificationDetailsActions.DELETE_ITEM_LOAD({item}),
            );
          }*/
        }
        if (pop === this.CODE_POP) {
          const procedureType = await this.getProcedureType();
          if (procedureType === this.proceduresTypes.cancelItem) {
            this.store.dispatch(orderModificationDetailsActions.DELETE_ITEM_LOAD({item}));
          }
        }
        if (pop === this.DELETE_ORDER_ALERT_POP) {
          this.store.dispatch(
            orderModificationDetailsActions.SET_CODE_POP_PROCEDURE_TYPE({
              procedureType: this.proceduresTypes.cancelOrder,
            }),
          );
          this.handlePopUps({
            pop: this.TWO_CODE_POP,
            isOpen: true,
            target: null,
            emit: false,
            item,
          });
        }
        if (pop === this.TWO_CODE_POP) {
          this.store.dispatch(orderModificationDetailsActions.DELETE_ORDER_LOAD());
        }
        if (pop === this.USAGE_POP && item) {
          this.store.dispatch(
            orderModificationDetailsActions.SET_USAGE_OR_PAYMENT_METHOD({
              item,
              node: 'catUsoCFDI',
            }),
          );
        }
        if (pop === this.PAYMENT_POP && item) {
          this.store.dispatch(
            orderModificationDetailsActions.SET_USAGE_OR_PAYMENT_METHOD({
              item,
              node: 'catMetodoDePagoCFDI',
            }),
          );
        }
        if (pop === this.SEGMENT_ALERT_POP) {
          this.store.dispatch(orderModificationDetailsActions.SEGMENT_ORDER_LOAD());
        }
        if (pop === this.REPLACE_OC_POP) {
          this.store.dispatch(orderModificationDetailsActions.SAVE_OC_FILE_LOAD());
        }
        if (pop === this.FINALIZE_ALERT_POP) {
          this.store.dispatch(orderModificationDetailsActions.SAVE_ADDITIONAL_FILES_LOAD());
        }
        if (pop === this.SEE_NOTES_POP) {
          this.store.dispatch(
            orderModificationDetailsActions.UPDATE_ITEM_LOAD({
              item: this.itemSelected,
            }),
          );
        }
      } else {
        if (pop === this.REPLACE_OC_POP) {
          this.store.dispatch(orderModificationDetailsActions.REMOVE_OC_FILE());
        } else if (pop === this.SEE_NOTES_POP) {
          this.store.dispatch(
            orderModificationDetailsActions.HANDLE_POP_UP_NOTES({
              popUpNotesIsOpen: isOpen,
            }),
          );
        }
      }
    }
  }

  async onCloseCodePopUp(event: boolean): Promise<void> {
    if (!event) {
      this.handlePopUps({pop: this.CODE_POP, isOpen: false, target: null});
      this.store.dispatch(orderModificationDetailsActions.RESTORE_CODE_VALUE());
      return;
    }
    const order = await lastValueFrom(
      this.store.pipe(select(orderModificationDetailSelectors.selectedPurchaseOrder), take(1)),
    );

    // TODO: Si es de tipo cancelar partida
    if (order.procedureType === this.proceduresTypes.cancelItem) {
      // TODO: Si existe la solicitud
      if (
        order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo &&
        order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.TipoTramite ===
          this.proceduresTypes.cancelItem &&
        order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.IdTPPartidaPedido ===
          this.popUps.deleteItem.item.IdTPPartidaPedido
      ) {
        // TODO: Si esta autorizada
        if (order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.Autorizado) {
          this.handlePopUps({
            pop: this.CODE_POP,
            isOpen: false,
            target: null,
            emit: event,
            item: this.popUps.deleteItem.item,
          });
        } else {
          // TODO: Vuelve a generar la solicitud
          this.generateCodeRequest(this.popUps.code.item.IdTPPartidaPedido);
        }
      } else {
        // TODO: Si no existe la solicitud se genera
        this.generateCodeRequest(this.popUps.code.item.IdTPPartidaPedido);
      }
    }

    // TODO: Si es de tipo editar datos
    if (order.procedureType === this.proceduresTypes.editData) {
      // TODO: Si existe la solicitud
      if (
        order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo &&
        order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.TipoTramite ===
          this.proceduresTypes.editData
      ) {
        // TODO: Si esta autorizada
        if (order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.Autorizado) {
          this.handlePopUps({
            pop: this.CODE_POP,
            isOpen: false,
            target: null,
            emit: event,
            item: this.popUps.deleteItem.item,
          });
        } else {
          // TODO: Vuelve a generar la solicitud
          this.generateCodeRequest(null);
        }
      } else {
        // TODO: Si no existe la solicitud se genera
        this.generateCodeRequest(null);
      }
    }
  }

  async onCloseTwoCodesPopUp(event: boolean): Promise<void> {
    if (!event) {
      this.handlePopUps({pop: this.TWO_CODE_POP, isOpen: false, target: null});
      this.store.dispatch(
        orderModificationDetailsActions.SET_FIRST_CODE_PASSED({
          firstCodePassed: true,
        }),
      );
      this.store.dispatch(orderModificationDetailsActions.RESTORE_CODE_VALUE());
      return;
    }
    const order = await lastValueFrom(
      this.store.pipe(select(orderModificationDetailSelectors.selectedPurchaseOrder), take(1)),
    );

    // TODO: Si existe la solicitud
    if (
      order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo &&
      order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.TipoTramite ===
        this.proceduresTypes.cancelOrder
    ) {
      // TODO: Si esta autorizada
      if (order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.Autorizado) {
        this.handlePopUps({
          pop: this.TWO_CODE_POP,
          isOpen: false,
          target: null,
          emit: event,
        });
      } else {
        // TODO: Vuelve a generar la solicitud
        this.generateCodeRequest(null);
      }
    } else {
      // TODO: Si no existe la solicitud se genera
      this.generateCodeRequest(null);
    }
  }

  saveNotes(notes: string): void {
    this.itemSelected = {
      ...this.itemSelected,
      notes,
    };
  }

  saveProcessSelected(processSelected: DropListOption): void {
    this.processSelected = processSelected;
    this.itemSelected = {
      ...this.itemSelected,
      processSelected,
    };
  }

  setFocus(type: string, position: number): void {
    this[type].toArray()[position].nativeElement.focus();
  }

  handleValidateNumber(
    pop: string,
    event: {which: number; preventDefault: () => void},
    position: number,
  ): void {
    if (event.which === 8) {
      this.setTextData(pop, null, position);
    } else {
      const key = String.fromCharCode(event.which);
      const regex = /^\d*$/;
      if (!regex.test(key)) {
        event.preventDefault();
      } else {
        this.setTextData(pop, key, position);
      }
    }
  }

  async setTextData(pop: string, value: string, position: number): Promise<void> {
    const digit = value ? toNumber(value) : null;
    this.store.dispatch(
      orderModificationDetailsActions.SET_CODE_VALUE_BY_POSITION({
        position,
        value: digit,
      }),
    );
    const codeIsFill = await lastValueFrom(
      this.store.pipe(select(orderModificationDetailSelectors.selectCodeIsFill), take(1)),
    );
    if (codeIsFill) {
      this.validateCode(pop);
    } else {
      if (value) {
        this.setFocus(pop, position + 1);
      }
    }
  }

  validateCode(pop: string): void {
    this.store.dispatch(
      orderModificationDetailsActions.COMPARE_VERIFICATION_CODE_LOAD({
        twoCodes: pop === this.TWO_CODE_POP,
      }),
    );
    setTimeout(async () => {
      const codeIsEmpty = await lastValueFrom(
        this.store.pipe(select(orderModificationDetailSelectors.selectCodeIsEmpty), take(1)),
      );
      if (codeIsEmpty && this.popUps[pop].isOpen) {
        this.setFocus(pop, 0);
      }
    }, 2000);
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}) {
    event.preventDefault();
    event.stopPropagation();
  }

  setProcess(option: DropListOption): void {
    this.store.dispatch(orderModificationDetailsActions.SET_OPTION_PROCESS({option}));
  }

  setDestiny(option: DropListOption): void {
    this.store.dispatch(orderModificationDetailsActions.SET_OPTION_DESTINY({option}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(orderModificationDetailsActions.SET_FILTER_SELECTED({filter}));
  }

  setOrder(order: ICard): void {
    this.store.dispatch(orderModificationDetailsActions.SET_BACKUP());
    this.store.dispatch(
      orderModificationDetailsActions.SET_ORDER_SELECTED({
        IdTPPedido: order.value,
      }),
    );
  }

  selectClientAddress(clientAddress: DropListOption): void {
    this.store.dispatch(orderModificationDetailsActions.SET_CLIENT_ADDRESS({clientAddress}));
  }

  addEmail(item: IDropListMulti): void {
    if (item.isSelected) {
      this.store.dispatch(
        orderModificationDetailsActions.DELETE_CLIENT_CONTACT({
          emailId: item.value.toString(),
        }),
      );
    } else {
      this.store.dispatch(
        orderModificationDetailsActions.ADD_CLIENT_CONTACT({
          itemId: item.value.toString(),
        }),
      );
    }
  }

  deleteEmail(item: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj): void {
    this.store.dispatch(
      orderModificationDetailsActions.DELETE_CLIENT_CONTACT({
        emailId: item.m_Item2.CorreoElectronico[0].IdCorreoElectronico,
      }),
    );
  }

  setTPPedidoValue(value, field: string): void {
    this.store.dispatch(
      orderModificationDetailsActions.SET_TPPEDIDO_VALUE({
        value,
        field,
      }),
    );
  }

  selectUsage(item: CatUsoCFDI | CatMetodoDePagoCFDI, node: string): void {
    this.handlePopUps({
      pop: node,
      isOpen: false,
      target: this.popUps[node].target,
      emit: true,
      item,
    });
  }

  openFreight(value: boolean): void {
    this.store.dispatch(orderModificationDetailsActions.SET_STATUS_OPEN_FREIGHT({active: value}));
  }

  handleTrackByItem(index: number, item: IPurchaseOrderItem): string {
    return item.IdTPPartidaPedido;
  }

  popFreight(value: boolean): void {
    this.openFreight(false);
    if (!value) {
      this.store.dispatch(orderModificationDetailsActions.RESTORE_BACKUP_FREIGHT());
    }
  }

  setNotes(notes: string): void {
    this.store.dispatch(orderModificationDetailsActions.SET_NOTES({notes}));
  }

  setReferenciaCliente(reference: string): void {
    this.store.dispatch(orderModificationDetailsActions.SET_REFERENCE({reference}));
  }

  removeFile(name: string): void {
    this.store.dispatch(orderModificationDetailsActions.REMOVE_ADDITIONAL_FILE({name}));
  }

  async getRequest(): Promise<TpClienteCSCreditoMorosoCorreo> {
    return await lastValueFrom(
      this.store.pipe(select(orderModificationDetailSelectors.selectCodeRequest), take(1)),
    );
  }

  async getProcedureType(): Promise<string> {
    return await lastValueFrom(
      this.store.pipe(select(orderModificationDetailSelectors.selectProcedureType), take(1)),
    );
  }

  generateCodeRequest(IdTPPartidaPedido: string | null): void {
    this.store.dispatch(
      orderModificationDetailsActions.GENERATE_VERIFICATION_CODE_LOAD({
        IdTPPartidaPedido,
      }),
    );
  }

  isDisableButtonAddNotes(): boolean {
    return !!(
      this.itemSelected.notes &&
      !isEmpty(this.itemSelected.processSelected) &&
      this.itemSelected.processSelected.value !== DEFAULT_UUID &&
      !isEqual(this.itemSelected, this.itemSelectedBackup)
    );
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(orderModificationDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  openLinked(pop: string, isOpen: boolean, target: any, emit?: boolean, item?, event?): void {
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
        target,
        item,
      },
    };
    this.handleStopEvents(event);
    if (item) {
      this.store.dispatch(orderModificationDetailsActions.SET_ITEM_LINKED({item}));
      if (pop === this.LINKED_POP) {
      } else {
        this.store.dispatch(orderModificationDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
      }
    }
  }

  openLinkedFile(IdArchivo: string, folio: string): void {
    this.fileName = 'FO-' + folio;
    this.store.dispatch(
      orderModificationDetailsActions.SET_INVOICE_ITEM_SELECTED({
        item: this.fileName,
      }),
    );
    this.store.dispatch(orderModificationDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
    this.isPdf = true;
    this.store.dispatch(orderModificationDetailsActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
  }
}
