import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {Store} from '@ngrx/store';
import {GMPartidaPromesaDeCompra} from 'api-logistica';
import {purchasePromiseDetailsActions} from '@appActions/pendings/purchase-promise';
import {
  INCIDENCE_CATALOG,
  INCIDENCE_COMMENTS,
  INCIDENCE_DATE_TRAINING,
  INCIDENCE_DESCRIPTION,
  INCIDENCE_IVA,
  INCIDENCE_MONEDA,
  INCIDENCE_PRESENTATION,
  INCIDENCE_PRICE,
  INCIDENCE_TEE_SHORT,
  INCIDENCE_TRADEMARK,
} from '@appUtil/common.protocols';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {BroadcastMediumKey, ProductsTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {IQuoteItem} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {checkoutDetailsActions} from '@appActions/pendings/checkout';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {RegularPopComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-details/regular-pop/regular-pop.component';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-table-resume-item',
  templateUrl: './table-resume-item.component.html',
  styleUrls: ['./table-resume-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableResumeItemComponent {
  @Input() itemResume: InternalSalesItem;
  @Output() valueEmitter: EventEmitter<{
    target: any;
    internalSalesItem: InternalSalesItem;
    isOpenNotes: boolean;
  }> = new EventEmitter<{
    target: any;
    internalSalesItem: InternalSalesItem;
    isOpenNotes: boolean;
  }>();

  FIELD_CATALOG = INCIDENCE_CATALOG;
  FIELD_DESCRIPTION = INCIDENCE_DESCRIPTION;
  FIELD_PRESENTATION = INCIDENCE_PRESENTATION;
  FIELD_TRADEMARK = INCIDENCE_TRADEMARK;
  FIELD_TEE = INCIDENCE_TEE_SHORT;
  FIELD_MONEDA = INCIDENCE_MONEDA;
  FIELD_UNIT_PRICE = INCIDENCE_PRICE;
  FIELD_COMMENTS = INCIDENCE_COMMENTS;
  FIELD_IVA = INCIDENCE_IVA;
  FIELD_DATE_TRAINING = INCIDENCE_DATE_TRAINING;

  readonly inputValidators = InputValidators;
  readonly productsTypes = ProductsTypes;
  readonly broadcastMedium = BroadcastMediumKey;
  readonly viewTypes = AppViewTypes;
  readonly TEE_POP = 'tee';
  readonly USAGE_POP = 'usage';
  readonly PAYMENT_POP = 'payment';

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private appService: CoreContainerService,
  ) {}

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    const {action, data, value, index} = event;
    switch (action) {
      case NameActionsInternalSalesItem.NumberPiecesAction:
        this.store.dispatch(
          purchasePromiseDetailsActions.SET_QUOTE_VALUE({
            IdCotPartidaCotizacion: data?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion,
            value,
            field: 'NumeroDePiezas',
          }),
        );
        break;
      case NameActionsInternalSalesItem.UnitPriceEditNumberAction:
        this.store.dispatch(
          purchasePromiseDetailsActions.SET_QUOTE_VALUE({
            IdCotPartidaCotizacion: event?.data?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion,
            value,
            field: 'PrecioCotizadoUnitarioPactado',
          }),
        );
        break;
      case NameActionsInternalSalesItem.CheckBoxRedGreenAction:
        this.setValidateEntry(data, Boolean(value));
        break;
      case NameActionsInternalSalesItem.DeleteAction:
        // DOCS: Se valida si se quiere eliminar una partida de fletes
        if (data?.freightItem) {
          this.store.dispatch(
            purchasePromiseDetailsActions.DELETE_FLETE({
              IdCotCotizacionFleteExpress:
                data?.freightItem?.freight?.FleteExpress?.IdCotCotizacionFleteExpress,
              IdsFletesUltimaMilla: data?.freightItem?.freight?.FletesUltimaMilla.map(
                (it) => it?.IdCotCotizacionFleteUltimaMilla,
              ),
            }),
          );
          return;
        }
        // DOCS: Se elimina una partida normal
        this.deleteEntry(data);
        break;
      case NameActionsInternalSalesItem.DeliveryTimeScheduleAction:
      case NameActionsInternalSalesItem.InternalSalesAction:
        this.openDetails();
        break;
      case NameActionsInternalSalesItem.CheckBoxHeaderBoxNormalItem:
        this.store.dispatch(
          purchasePromiseDetailsActions.CHECK_ALL_ORDERS({checked: Boolean(value)}),
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

  setValidateEntry(item: GMPartidaPromesaDeCompra, value: boolean): void {
    const IdCotPartidaCotizacion: string = item.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion;
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_VALIDATE_ENTRY_ITEM({
        IdCotPartidaCotizacion,
        value,
      }),
    );
  }

  deleteEntry(item: GMPartidaPromesaDeCompra): void {
    const IdCotPartidaCotizacion = item?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion;
    this.store.dispatch(
      purchasePromiseDetailsActions.REMOVE_IQUOTE_ITEM({
        IdCotPartidaCotizacion,
      }),
    );
  }

  setIncidenceValue(item: GMPartidaPromesaDeCompra, field: string, value: boolean | string): void {
    const IdCotPartidaCotizacion = item.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion;
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_INCIDENCE_VALUE({
        IdCotPartidaCotizacion,
        field,
        value,
      }),
    );
  }

  isTraining(item: GMPartidaPromesaDeCompra & QuoteItemExtension): boolean {
    return (
      item?.quote?.Tipo.includes(this.productsTypes.training) ||
      (item?.quote?.Tipo.includes(this.productsTypes.trainings) &&
        item?.quote?.ClaveMedioDifusion?.startsWith(this.broadcastMedium.FaceToFace)) ||
      item?.quote?.ClaveMedioDifusion?.startsWith(this.broadcastMedium.FaceToFaceOnline)
    );
  }

  openDetails(): void {
    // DOCS: Obtiene las unidades de medida para la partida
    this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
    this.store.dispatch(
      purchasePromiseDetailsActions.SELECTED_IQUOTE_ITEM({
        item: this.itemResume.data,
        i: this.itemResume.index,
      }),
    );

    const dialogRef = this.dialog.open(RegularPopComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        item: this.itemResume,
        i: this.itemResume.index,
      },
      panelClass: 'mat-dialog-style',
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (data: {pop: string; event: boolean; target: any; emit?: boolean; item?: IQuoteItem}) => {
          if (!data?.event) {
            if (data?.emit === null || data?.emit === undefined) {
              return;
            }

            // TODO: REVISAR POR QUE ES QUE ESTÁ USANDO ACCIONES DE TRAMITAR PEDIDO
            /*      if (pop === this.DEFAULTER_POP) {
              this.store.dispatch(checkoutDetailsActions.SAVE_CHECKOUT_DATA_LOAD({}));
            }*/
            /*            if (data?.pop === this.CODE_POP) {
              // const procedureType = await this.getProcedureType();
              // if (procedureType === this.proceduresTypes.invoiceInAdvance) {
              //   this.store.dispatch(checkoutDetailsActions.SAVE_CHECKOUT_DATA_LOAD({}));
              // }
            }*/
            if (data?.pop === this.TEE_POP && data?.emit !== false) {
              // DOCS: al dar click en aceptar se guardar los cambios de la partida seleccionada a la lista
              this.store.dispatch(purchasePromiseDetailsActions.SAVE_CHANGES_IQUOTE_ITEM());
            }
            if (data?.pop === this.USAGE_POP && data?.item) {
              this.store.dispatch(
                checkoutDetailsActions.SET_USAGE_OR_PAYMENT_METHOD({
                  item: data?.item,
                  node: 'catUsoCFDI',
                }),
              );
            }
            if (data?.pop === this.PAYMENT_POP && data?.item) {
              this.store.dispatch(
                checkoutDetailsActions.SET_USAGE_OR_PAYMENT_METHOD({
                  item: data?.item,
                  node: 'catMetodoDePagoCFDI',
                }),
              );
            }
            if (!data?.item) {
              //DOCS: Caso para cancelar la edición
              // const backupPurchaseOrder = await lastValueFrom(
              //   this.store.pipe(select(checkoutDetailsSelectors.selectBackupPurchaseOrder), take(1)),
              // );
              // this.store.dispatch(checkoutDetailsActions.RESTORE_BACKUP_PURCHASE_ORDER_SELECTED({backupPurchaseOrder}));
              this.store.dispatch(purchasePromiseDetailsActions.RESTORE_SELECTED_IQUOTE_ITEM());
            }
          }
        },
      );
  }
}
