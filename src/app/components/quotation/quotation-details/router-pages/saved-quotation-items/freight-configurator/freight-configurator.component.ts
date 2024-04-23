import {Component, Inject, OnInit} from '@angular/core';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';

import {
  IDataClient,
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {Store} from '@ngrx/store';
// Actions
import {
  GET_CAT_FREIGHT_EXPRESS_LOAD,
  GET_CAT_FREIGHT_LOAD,
} from '@appActions/quotation/quotation-details/details/check-out-quotation/check-out-quotation.actions';
/* Selectors Imports */
import {quotationDetailsSelectors, resumeSectionSelectors} from '@appSelectors/quotation';
import {checkOutQuotationActions} from '@appActions/quotation';
import {Observable} from 'rxjs';
import {selectOptionContactSelected} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IGMCotCotizacionDetalle} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-freight-configurator',
  templateUrl: './freight-configurator.component.html',
  styleUrls: ['./freight-configurator.component.scss'],
})
export class FreightConfiguratorComponent implements OnInit {
  width = '744px';
  height = '780px';
  listFreightExpress$ = this.store.select(resumeSectionSelectors.selectListFreightExpress);
  listFreightConventional$ = this.store.select(
    resumeSectionSelectors.selectListFreightConventional,
  );
  totalSelectedFreightExpress$: Observable<number> = this.store.select(
    resumeSectionSelectors.selectTotalSelectedListFreightExpress,
  );
  step = 0;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<FreightConfiguratorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      client: IDataClient;
    },
  ) {}
  brokenDown;
  totalFreightExpress$: Observable<number> = this.store.select(
    resumeSectionSelectors.selectTotalFreightExpress,
  );
  totalPieces$: Observable<number> = this.store.select(quotationDetailsSelectors.selectTotalPieces);

  totalItemsInQuotation$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectTotalItemsInQuotation,
  );
  totalFreightConventional = this.store.select(
    resumeSectionSelectors.selectTotalFreightConventional,
  );
  totalQuoted$: Observable<ShoppingCartTotalsModel> = this.store.select(
    quotationDetailsSelectors.selectTotalQuoted,
  );
  selectedQuotationDetails$: Observable<IGMCotCotizacionDetalle> = this.store.select(
    quotationDetailsSelectors.selectedQuotationDetails,
  );
  clientSendGuide$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectClientSendGuide,
  );
  ShippingCostApply$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectShippingCostApply,
  );
  isInternalMessaging$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsInternalMessaging,
  );
  selectSaveFreightValidator$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.SelectSaveFreightValidator,
  );
  freightSteps$: Observable<BarActivityOption[]> = this.store.select(
    quotationDetailsSelectors.selectQuotationFreightSteps,
  );
  contact$: Observable<DropListOption> = this.store.select(selectOptionContactSelected);
  comment = '';
  clickArrowsIzq = false;
  activities: BarActivityOption[] = [
    {id: 1, label: 'FLETE EXPRESS', activeSubtitle: false},
    {id: 2, label: 'FLETE CONVENCIONAL', activeSubtitle: false},
  ];

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_FREIGHT_LOAD());
    this.store.dispatch(GET_CAT_FREIGHT_EXPRESS_LOAD());
    this.selectedQuotationDetails$
      .subscribe((data: IGMCotCotizacionDetalle) => {
        this.brokenDown = data.CotCotizacion.FleteDesglosado;
        this.comment = data.CotCotizacion.ComentarioFlete;
      })
      .unsubscribe();
  }

  // DOCS Setea el paso en que se encuentra
  setStep(step: number): void {
    this.step = step;
    if (step === 1) {
      this.clickArrowsIzq = true;
    } else {
      this.clickArrowsIzq = false;
    }
  }
  // DOCS Setea el valor del desglose del flete si es true se agregara como partida si es false se prorrata el flete
  setBrokenDown(value: boolean): void {
    this.brokenDown = value;
  }
  // DOCS Selecciona un flete express
  selectedFreightExpress(item: IFreightExpress): void {
    this.store.dispatch(checkOutQuotationActions.SET_IS_SELECTED_FREIGHT_EXPRESS({item}));
  }
  // DOCS Setea el comentario del flete localmente
  setComment(value: string): void {
    if (value?.trim() !== '') {
      this.comment = value;
    } else {
      this.comment = null;
    }
  }

  // DOCS selecciona un flete convencional modifica en el listaod del catalogo e internamente
  setOptionFreightConventional(item: IFlete): void {
    this.store.dispatch(checkOutQuotationActions.SET_OPTION_FREIGHT_CONVENTIONAL({item}));
  }

  handleTrackByProvider = (index: number, freightExpress: IFreightExpress): string =>
    freightExpress.IdProveedor;

  handleTrackByFreight = (index: number, freightExpress: IFlete): string => freightExpress.IdFlete;

  onClose(event: boolean): void {
    this.dialog.close({
      comment: this.comment,
      event,
      isBrokenDown: this.brokenDown,
    });
  }
}
