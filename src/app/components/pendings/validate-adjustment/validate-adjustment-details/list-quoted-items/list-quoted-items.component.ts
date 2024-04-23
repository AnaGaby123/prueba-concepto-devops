import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {select, Store} from '@ngrx/store';

// Models
import {
  IOrder,
  IPpPartidaPedidoDetalleValidateAdjustment,
  ITotalDividedEntries,
  TotalItemsOrder,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

// Actions
import {validateAdjustmentDetailActions} from '@appActions/pendings/validate-adjustment';

// Selectors
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';

// Utils
import {isEmpty} from 'lodash-es';
import {lastValueFrom, Observable} from 'rxjs';
import {IClientContact} from '@appModels/shared/shared.models';
import {take} from 'rxjs/operators';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {VDireccion} from 'api-catalogos';
import {IntramitableAlertComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/intramitable-alert/intramitable-alert.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderConfirmationDialogComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/order-confirmation-dialog/order-confirmation-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {AppState} from '@appCore/core.state';
import {ControlledProductsConfirmationDialogComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/controlled-products-confirmation-dialog/controlled-products-confirmation-dialog.component';
import {IReferenceFormEdit} from '@appComponents/shared/reference-form-edit/reference-form-edit.component';

@Component({
  selector: 'app-list-quoted-item',
  templateUrl: './list-quoted-items.component.html',
  styleUrls: ['./list-quoted-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListQuotedItemsComponent implements AfterContentChecked {
  orderSelected$: Observable<IOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrder,
  );
  totals$: Observable<TotalItemsOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.totalsItemsOrderSelected,
  );
  totalItems$: Observable<number> = this.store.select(
    validateAdjustmentDetailsSelectors.selectTotalItems,
  );
  itemsOrderSelected$: Observable<IPpPartidaPedidoDetalleValidateAdjustment[]> = this.store.select(
    validateAdjustmentDetailsSelectors.selectInternalSalesItem,
  );
  statusApiIssueAndItems$: Observable<number> = this.store.select(
    validateAdjustmentDetailsSelectors.selectStatusApiIssueAndItemsOrder,
  );
  currencyLabel$: Observable<string> = this.store.select(
    validateAdjustmentDetailsSelectors.selectCurrencyLabel,
  );
  validatePreProcessTramitableButton$: Observable<boolean> = this.store.select(
    validateAdjustmentDetailsSelectors.validatePreProcessTramitable,
  );
  validatePreProcessNotTramitableButton$: Observable<boolean> = this.store.select(
    validateAdjustmentDetailsSelectors.validatePreProcessNotTramitable,
  );
  selectContactData$: Observable<IClientContact> = this.store.select(
    validateAdjustmentDetailsSelectors.selectClientContactData,
  );
  internalSalesItemHeader$: Observable<InternalSalesItem> = this.store.select(
    validateAdjustmentDetailsSelectors.buildInternalItemHeader,
  );
  deliveryAddressSelected$: Observable<VDireccion> = this.store.select(
    validateAdjustmentDetailsSelectors.selectDeliveryAddressSelected,
  );
  deliveryAddresses$: Observable<VDireccion[]> = this.store.select(
    validateAdjustmentDetailsSelectors.selectDeliveryAddresses,
  );
  billingAddress$: Observable<string> = this.store.select(
    validateAdjustmentDetailsSelectors.selectBillingAddressFormat,
  );

  scrolledEntriesResults: IPpPartidaPedidoDetalleValidateAdjustment[];
  lodashIsEmpty = isEmpty;

  isOpenNotes = false;
  targetNotes: any;
  itemInternalSalesItem: InternalSalesItem;
  referencePopOpen = false;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
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

  setIncidenceValue(entryId: string, field: string, value: boolean | string): void {
    this.store.dispatch(
      validateAdjustmentDetailActions.SET_INCIDENCE_VALUE({
        entryId,
        field,
        value,
      }),
    );
  }

  onNotTramitablePressed(): void {
    const dialogRef = this.dialog.open(IntramitableAlertComponent, {
      backdropClass: 'mat-dialog-background',
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.processEntries(false);
      }
    });
  }

  async onTramitablePressed(): Promise<void> {
    const totals: ITotalDividedEntries = await lastValueFrom(
      this.store.pipe(
        select(validateAdjustmentDetailsSelectors.selectValidateAndInvalidateEntries),
        take(1),
      ),
    );
    if (totals.invalidate > 0) {
      this.showOrderConfirmationDialog();
    } else {
      await this.checkControlledTotal(true);
    }
  }

  showOrderConfirmationDialog(): void {
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent, buildDialogConfig({}));

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.processEntries(true);
      }
    });
  }

  processEntries(tramitable): void {
    this.store.dispatch(validateAdjustmentDetailActions.PROCESS_ENTRIES_LOAD({tramitable}));
  }

  async checkControlledTotal(event: boolean): Promise<void> {
    if (event) {
      const controlledCount: number = await lastValueFrom(
        this.store.pipe(select(validateAdjustmentDetailsSelectors.selectControlledCount), take(1)),
      );
      if (controlledCount > 0) {
        this.openControlledProductsAlert();
      } else {
        this.processEntries(true);
      }
    }
  }

  openControlledProductsAlert(): void {
    const controlledProductsRef = this.dialog.open(
      ControlledProductsConfirmationDialogComponent,
      buildDialogConfig({}),
    );

    controlledProductsRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.processEntries(true);
      }
    });
  }

  handleDeliveryAddress(deliveryAddress: VDireccion): void {
    this.store.dispatch(validateAdjustmentDetailActions.SELECT_DELIVERY_ADDRESS({deliveryAddress}));
  }

  handleTrackBy(index: number, entry: IPpPartidaPedidoDetalleValidateAdjustment): string {
    return entry?.IdPPPartidaPedido;
  }

  handleHoverNotes(event: any): void {
    this.targetNotes = event.target;
    this.itemInternalSalesItem = event.internalSalesItem;
    this.isOpenNotes = event.isOpenNotes;
  }
  handleReferenceAction(event: IReferenceFormEdit) {
    if (event.value) {
      this.store.dispatch(
        validateAdjustmentDetailActions.SET_UPDATE_REFERENCE_LOAD({reference: event.reference}),
      );
    }
    this.referencePopOpen = false;
  }
}
