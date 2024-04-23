import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';

// Models
import {
  ICustomerCheckOut,
  PROCEDURES_TYPES,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {
  IOrdersC,
  IPurchaseOrderDetails,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {
  TpClienteCSCreditoMorosoCorreo,
  TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj,
  VTramitarPedidoPartida,
} from 'api-logistica';

// Actions
import {checkoutDetailsActions} from '@appActions/pendings/checkout';

// Selectors
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {isEmpty, toNumber} from 'lodash-es';
import {take} from 'rxjs/operators';
import {CatMetodoDePagoCFDI, CatUsoCFDI} from 'api-catalogos';
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {AppState} from '@appCore/core.state';
import {KeyCatDestination} from '@appUtil/common.protocols';
import {AvailabilityLetterData} from '@appModels/store/dialogs/availability-letter/availability-letter.model';
import {AvailabilityLettersDialogComponent} from '@appComponents/shared/availability-letters-dialog/availability-letters-dialog.component';
import {availabilityActions} from '@appActions/dialogs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss'],
})
export class CheckoutDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren('inputs') inputs: QueryList<ElementRef>;
  purchaseOrder$: Observable<IOrdersC> = this.store.select(
    checkoutDetailsSelectors.selectedPurchaseOrder,
  );
  resumeMode$: Observable<boolean> = this.store.select(checkoutDetailsSelectors.selectResumeMode);
  customer$: Observable<ICustomerCheckOut> = this.store.select(
    checkoutDetailsSelectors.selectClient,
  );
  purchaseOrderDetails$: Observable<IPurchaseOrderDetails> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderDetails,
  );
  clientAddress$: Observable<string> = this.store.select(checkoutDetailsSelectors.clientAddress);
  selectedCatDestiny$: Observable<DropListOption> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderCatDestiny,
  );
  destinies$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatDestinoForDropList,
  );
  contacts$: Observable<Array<IDropListMulti>> = this.store.select(
    checkoutDetailsSelectors.selectClientContactsForMultiDrop,
  );
  contactDelivery$: Observable<DropListOption[]> = this.store.select(
    checkoutDetailsSelectors.selectContactDelivery,
  );
  selectedContactDelivery$: Observable<DropListOption> = this.store.select(
    checkoutDetailsSelectors.selectedContactDelivery,
  );
  schedules$: Observable<Array<string>> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderSchedules,
  );
  checkoutValidator$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.checkoutButtonValidator,
  );
  code$: Observable<Array<number>> = this.store.select(checkoutDetailsSelectors.selectCode);
  selectCodeIsEmpty$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectCodeIsEmpty,
  );
  shaked$: Observable<boolean> = this.store.select(checkoutDetailsSelectors.selectShaked);
  codePopValidation$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectCodePopValidation,
  );
  delinquentCustomerRequest$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectExistDelinquentCustomerRequest,
  );
  codeRequest$: Observable<TpClienteCSCreditoMorosoCorreo> = this.store.select(
    checkoutDetailsSelectors.selectCodeRequest,
  );

  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  readonly CODE_POP = 'code';
  readonly DEFAULTER_POP = 'defaulter';
  readonly keyCatDestination = KeyCatDestination;
  lodashIsEmpty = isEmpty;
  leftContainerIsOpen = true;
  popUpSchedules = false;
  popUpSchedulesTarget: HTMLElement;
  popUps: {
    code: IPopUpConfig;
    defaulter: IPopUpConfig;
  };
  proceduresTypes = PROCEDURES_TYPES;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    this.popUps = {
      [this.CODE_POP]: {isOpen: false, target: null},
      [this.DEFAULTER_POP]: {isOpen: false, target: null},
    };
  }

  ngOnInit(): void {
    this.store.dispatch(checkoutDetailsActions.INIT_COMPONENT());
  }

  handleLeftContainer(): void {
    this.leftContainerIsOpen = !this.leftContainerIsOpen;
  }

  handlePopUp(pop: string, value: boolean, target: any): void {
    this.popUpSchedules = value;
    this.popUpSchedulesTarget = target as HTMLElement;

    // DOCS: Se comenta porque no funciona, revisar si se conserva
    /*    const popsSwitch = {
  schedules: () => {
    (this.popUpSchedules = value), (this.popUpSchedulesTarget = target as HTMLElement);
  },
};*/
  }

  goBack(): void {
    this.store.dispatch(checkoutDetailsActions.SET_RESUME_COMPONENT({resumeComponent: false}));
    this.location.back();
    this.store.dispatch(checkoutDetailsActions.SET_RESUME_MODE({resumeMode: false}));
  }

  selectCatDestino(catDestino: DropListOption): void {
    this.store.dispatch(checkoutDetailsActions.SET_CAT_DESTINO({catDestino}));
  }

  selectContactDelivery(contactDelivery: DropListOption): void {
    this.store.dispatch(checkoutDetailsActions.SET_CONTACT_DELIVERY({contactDelivery}));
  }

  /*  TODO: REVISAR SI SE CONSERVA O ES FUNCIONALIDAD OBSOLETA
  selectClientAddress(clientAddress: DropListOption): void {
    this.store.dispatch(checkoutDetailsActions.SET_CLIENT_ADDRESS({clientAddress}));
  }*/

  setTPOrderValue(value: string, field: string): void {
    this.store.dispatch(
      checkoutDetailsActions.SET_TPPEDIDO_VALUE({
        value,
        field,
      }),
    );
  }

  addEmail(item: IDropListMulti): void {
    if (item.isSelected) {
      this.store.dispatch(
        checkoutDetailsActions.DELETE_CLIENT_CONTACT({
          emailId: item.value.toString(),
        }),
      );
    } else {
      this.store.dispatch(
        checkoutDetailsActions.ADD_CLIENT_CONTACT({
          itemId: item.value.toString(),
        }),
      );
    }
  }

  deleteEmail(item: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj): void {
    this.store.dispatch(
      checkoutDetailsActions.DELETE_CLIENT_CONTACT({
        emailId: item.m_Item2.CorreoElectronico[0].IdCorreoElectronico,
      }),
    );
  }

  handleValidateNumber(event: {which: number; preventDefault: () => void}, position: number): void {
    if (event.which === 8) {
      this.setTextData(null, position);
    } else {
      const key = String.fromCharCode(event.which);
      const regex = /^\d*$/;
      if (!regex.test(key)) {
        event.preventDefault();
      } else {
        this.setTextData(key, position);
      }
    }
  }

  async setTextData(value: string, position: number): Promise<void> {
    const digit = value ? toNumber(value) : null;
    this.store.dispatch(
      checkoutDetailsActions.SET_CODE_VALUE_BY_POSITION({
        position,
        value: digit,
      }),
    );
    const codeIsFill = await lastValueFrom(
      this.store.pipe(select(checkoutDetailsSelectors.selectCodeIsFill), take(1)),
    );
    if (codeIsFill) {
      this.validateCode();
    } else {
      if (value) {
        this.setFocus(position + 1);
      }
    }
  }

  validateCode() {
    this.store.dispatch(checkoutDetailsActions.COMPARE_VERIFICATION_CODE_LOAD());
    setTimeout(async () => {
      const codeIsEmpty = await lastValueFrom(
        this.store.pipe(select(checkoutDetailsSelectors.selectCodeIsEmpty), take(1)),
      );
      if (codeIsEmpty && this.popUps.code.isOpen) {
        this.setFocus(0);
      }
    }, 2000);
  }

  setFocus(position: number) {
    this.inputs.toArray()[position].nativeElement.focus();
  }

  async openCodePopUp() {
    const orderDetails = await lastValueFrom(
      this.store.pipe(select(checkoutDetailsSelectors.selectPurchaseOrderDetails), take(1)),
    );
    const hasControlledItems = await lastValueFrom(
      this.store.pipe(select(checkoutDetailsSelectors.selectTotalControlledEntries), take(1)),
    );
    const requireAuthoization = orderDetails.RequiereAutorizacionFinanzas;
    if (hasControlledItems) {
      const data: AvailabilityLetterData = {
        onlyOneButton: false,
        idPedido: orderDetails.IdTPPedido,
        inPreprocess: false,
      };
      const dialogRef = this.dialog.open(AvailabilityLettersDialogComponent, {
        backdropClass: 'mat-dialog-background',
        data: data,
        panelClass: 'mat-dialog-style',
      });

      dialogRef.afterClosed().subscribe((value: boolean) => {
        if (value) {
          this.activePopUpsAuthorization(requireAuthoization);
        }
        this.store.dispatch(availabilityActions.SET_INITIAL_STATE());
      });
    } else {
      this.activePopUpsAuthorization(requireAuthoization);
    }
  }

  activePopUpsAuthorization(authorization: boolean): void {
    if (authorization) {
      this.store.dispatch(
        checkoutDetailsActions.SET_CODE_POP_PROCEDURE_TYPE({
          procedureType: this.proceduresTypes.delinquentCustomer,
        }),
      );
      this.handlePopUps(this.CODE_POP, true, null);
    } else {
      this.store.dispatch(checkoutDetailsActions.SHOW_SEND_EMAIL_DIALOG());
    }
  }

  async handlePopUps(
    pop: string,
    isOpen: boolean,
    target: any,
    emit?: boolean,
    item?: VTramitarPedidoPartida | CatUsoCFDI | CatMetodoDePagoCFDI,
  ) {
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
      if (pop === this.CODE_POP) {
        const request = await this.getRequest();
        const procedureType = await this.getProcedureType();
        // TODO: Hacer foco solamente si ya existe una solicitud
        if (!isEmpty(request) && request.TipoTramite === procedureType) {
          this.cdr.detectChanges();
          this.setFocus(0);
        }
      }
    } else {
      if (emit !== null && emit !== undefined) {
        /*// TODO: Hacer algo cuando se desea trabajar con el emit
        if (pop === this.DEFAULTER_POP) {
          this.store.dispatch(checkoutDetailsActions.SAVE_CHECKOUT_DATA_LOAD({}));
        }*/
        if (pop === this.CODE_POP) {
          this.store.dispatch(checkoutDetailsActions.SHOW_SEND_EMAIL_DIALOG());
        }
      }
    }
  }

  async onCloseCodePopUp(event: boolean) {
    if (!event) {
      this.handlePopUps(this.CODE_POP, false, null);
      this.store.dispatch(checkoutDetailsActions.RESTORE_CODE_VALUE());
      return;
    }
    const order = await lastValueFrom(
      this.store.pipe(select(checkoutDetailsSelectors.selectedPurchaseOrder), take(1)),
    );
    // TODO: Si existe la solicitud y es de tipo Tramitar a moroso
    if (
      order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo &&
      order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.TipoTramite ===
        this.proceduresTypes.delinquentCustomer
    ) {
      // TODO: Si esta autorizada
      if (order.purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.Autorizado) {
        this.handlePopUps(this.CODE_POP, false, null, event);
      } else {
        // TODO: Vuelve a generar la solicitud
        this.store.dispatch(checkoutDetailsActions.GENERATE_VERIFICATION_CODE_LOAD());
      }
    } else {
      // TODO: Si no existe la solicitud se genera
      this.store.dispatch(checkoutDetailsActions.GENERATE_VERIFICATION_CODE_LOAD());
    }
  }

  async getRequest() {
    return await lastValueFrom(
      this.store.pipe(select(checkoutDetailsSelectors.selectCodeRequest), take(1)),
    );
  }

  async getProcedureType() {
    return await lastValueFrom(
      this.store.pipe(select(checkoutDetailsSelectors.selectProcedureType), take(1)),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(checkoutDetailsActions.DESTROY_COMPONENT());
  }
}
