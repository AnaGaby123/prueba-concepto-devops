import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {Store} from '@ngrx/store';
import {CotCotizacionFleteExpress, CotCotizacionFleteUltimaMilla} from 'api-logistica';
import {IFreightExpress} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {
  IGMCotCotizacionDetalle,
  IQuotation,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {CatQuotationState} from '@appHelpers/pending/quotation/quotation.helpers';
import {AppState} from '@appCore/core.state';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-freight-details',
  templateUrl: './freight-details.component.html',
  styleUrls: ['./freight-details.component.scss'],
})
export class FreightDetailsComponent implements OnInit {
  freightsExpress$: Observable<Array<CotCotizacionFleteExpress>> = this.store.select(
    quotationDetailsSelectors.selectedFreightExpressItems,
  );
  freightsExpressSelected$: Observable<IFreightExpress> = this.store.select(
    quotationDetailsSelectors.selectFreightExpressQuotationSelected,
  );
  freights$: Observable<Array<CotCotizacionFleteUltimaMilla>> = this.store.select(
    quotationDetailsSelectors.selectedFreightItems,
  );
  totalSelectedFreightExpress$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectedFreightExpressItemsTotalInQuotation,
  );
  totalFreightConventional: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectedFreightItemsTotalInQuotation,
  );
  selectedQuotationDetails$: Observable<IGMCotCotizacionDetalle> = this.store.select(
    quotationDetailsSelectors.selectedQuotationDetails,
  );
  selectedQuotation$: Observable<IQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotation,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);
  readonly viewTypes = AppViewTypes;
  readonly catQuotationState = CatQuotationState;
  brokenDown;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<FreightDetailsComponent>,
  ) {}

  ngOnInit(): void {
    this.selectedQuotationDetails$
      .subscribe((data: IGMCotCotizacionDetalle) => {
        this.brokenDown = data.CotCotizacion.FleteDesglosado;
      })
      .unsubscribe();
  }
  setBrokenDown(value: boolean): void {
    this.brokenDown = value;
  }

  onClose(event: boolean): void {
    this.dialog.close({event, brokenDown: this.brokenDown});
  }
}
