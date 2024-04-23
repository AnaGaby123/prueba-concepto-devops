/* Core Container */
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {filter, find, isEmpty} from 'lodash-es';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IConfigExpressFreight,
  IItemQuotationByBrand,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';

/* Actions Imports*/
import {
  offerAdjustmentDetailsActions,
  offerAdjustmentDetailsListOfferActions,
} from '@appActions/pendings/offer-adjustment';

/* Selectors Imports */
import {adjustmentDetailsDetailsSelectors} from '@appSelectors/pendings/offer-adjustment';

/* Tools Imports */
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {toRound} from '@appUtil/util';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-delivery-time',
  templateUrl: './delivery-time.component.html',
  styleUrls: ['./delivery-time.component.scss'],
})
export class DeliveryTimeComponent implements OnInit {
  selectRadioControls$: Observable<any> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectDeliveryTimeControls,
  );
  selectHeaderInternalSalesItemTwoDays$: Observable<InternalSalesItem> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectHeaderInternalSalesItemTwoDays,
  );
  selectHeaderInternalSalesExpressFreight$: Observable<InternalSalesItem> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectHeaderInternalSalesExpressFreight,
  );

  selectedItemsDetails$: Observable<InternalSalesItem[]> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedItemsDetails,
  );
  quotationItems$: Observable<Array<InternalSalesItem>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedItemsByOption,
  );
  itemsQuotation: Array<InternalSalesItem> = [];
  readonly initialFreightPopObj = {
    index: 0,
    active: true,
    provider: '',
    freightPrice: 0,
    percentageSelected: null,
    percentageOptions: [
      {
        value: '0',
        label: '0 %',
      },
      {
        value: '25',
        label: '25 %',
      },
      {
        value: '50',
        label: '50 %',
      },
      {
        value: '75',
        label: '75 %',
      },
    ],
    comments: null,
  };
  freightPopObj = this.initialFreightPopObj;
  lodashIsEmpty = isEmpty;
  justification = '';
  justificationPosition = null;
  popUpJustification = false;
  popUpJustificationTarget: HTMLElement;
  popUpFreightExpressTarget: HTMLElement;
  popUpFreightExpress = false;

  constructor(private store: Store<AppState>, private appService: CoreContainerService) {}

  ngOnInit(): void {}

  handleChangeModeSection(value: boolean, mode: string): void {
    if (mode === 'twoDays') {
      this.store.dispatch(offerAdjustmentDetailsActions.SET_TWO_DAYS_OPTION({value}));
    } else {
      this.store.dispatch(offerAdjustmentDetailsActions.SET_EXPRESS_FREIGHT_OPTION({value}));
    }
  }

  setIncidenceValue(brand: IItemQuotationByBrand, value: string): void {
    this.store.dispatch(
      offerAdjustmentDetailsListOfferActions.SET_ADJUSTMENT_DELIVERY_INCIDENCE({
        idBrand: brand.IdMarca,
        value,
      }),
    );
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleTrackByProvider(index: number, item: any) {
    return (
      item?.ajOfValorConfiguracionTiempoEntregaCotizacion?.IdCotCotizacion ||
      item?.ajOfFleteExpressCotizacion?.IdCotCotizacionFleteExpress
    );
  }
  showItems(index: number) {
    this.store.dispatch(offerAdjustmentDetailsActions.SET_SHOW_ITEMS({index}));
  }
  handleJustificationPop(
    value: boolean,
    comments?: string,
    target?,
    justificationPosition?: string,
  ) {
    this.popUpJustification = value;
    this.justification = comments || 'N/D';
    this.justificationPosition = justificationPosition ? justificationPosition : null;
    this.popUpJustificationTarget = target ? target : null;
  }
  handleExpressFreightPop(
    value: boolean,
    provider?: IConfigExpressFreight,
    target?,
    index?: number,
    event?: any,
  ) {
    if (value) {
      this.freightPopObj = {
        ...this.freightPopObj,
        index,
        active:
          !provider.ajOfFleteExpressCotizacion.Aceptado &&
          !provider.ajOfFleteExpressCotizacion.ParcialmenteAceptado &&
          !provider.ajOfFleteExpressCotizacion.Rechazado
            ? true
            : !provider.ajOfFleteExpressCotizacion.Rechazado,
        percentageOptions: filter(
          this.freightPopObj.percentageOptions,
          (o: DropListOption) => Number(o.value) <= provider.originalPercentage,
        ),
        percentageSelected: find(
          this.freightPopObj.percentageOptions,
          (o: DropListOption): DropListOption => {
            if (Number(o.value) === provider.ajOfFleteExpressCotizacion.PorcentajeProquifa) {
              return {
                ...o,
              };
            }
          },
        ),
        freightPrice: toRound(provider.ajOfFleteExpressCotizacion.PrecioFleteExpress, 2),
        provider: provider.Proveedor.Nombre,
        comments: provider.ajOfFleteExpressCotizacion.Comentarios,
      };
    }
    this.popUpFreightExpress = value;
    this.popUpFreightExpressTarget = target;
    if (event) {
      event.stopPropagation();
    }
  }

  setFreightPopConfig() {
    this.handleExpressFreightPop(false);
    this.store.dispatch(
      offerAdjustmentDetailsActions.SET_EXPRESS_FREIGHT_POP_CONFIG({
        config: this.freightPopObj,
      }),
    );
    this.freightPopObj = this.initialFreightPopObj;
  }

  setCheckValue(index: number, value: boolean) {
    this.store.dispatch(
      offerAdjustmentDetailsActions.SET_CHECK_ITEM_VALUE({
        index,
        value,
      }),
    );
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxRedGreenAction:
        this.setCheckValue(event.index, event.value as boolean);
        break;
      case NameActionsInternalSalesItem.CommentsAction:
        this.handleJustificationPop(
          event.value as boolean,
          event.data?.ajOfValorConfiguracionTiempoEntregaCotizacion?.Comentarios,
          event.target,
          'left-center',
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

  readonly Number = Number;
  readonly toRound = toRound;
}
