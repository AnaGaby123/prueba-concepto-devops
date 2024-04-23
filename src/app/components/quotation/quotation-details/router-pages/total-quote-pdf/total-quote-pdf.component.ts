/* Core Imports */
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable, Subscription} from 'rxjs';
/* Selectors Imports */
import {quotationDetailsSelectors, totalQuotePdfSelectors} from '@appSelectors/quotation';

/* Models Imports */
import {AppViewTypes} from '@appModels/store/utils/utils.model';
/* Actions Imports */
import {totalQuotePdfActions} from '@appActions/quotation';

/* Dev Tools */
import {CatQuotationState} from '@appHelpers/pending/quotation/quotation.helpers';
import {VCotCotizacion} from 'api-logistica';
import {
  ENUM_TYPE_QUOTATION,
  ICotPartidasInvetigacionCotizacion,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {CatEstadoCotizacion} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-total-quote-pdf',
  templateUrl: './total-quote-pdf.component.html',
  styleUrls: ['./total-quote-pdf.component.scss'],
})
export class TotalQuotePdfComponent implements AfterContentChecked, OnDestroy {
  @ViewChild('filesContainer') filesContainer: ElementRef;

  selectedQuotation$: Observable<VCotCotizacion> = this.store.select(
    totalQuotePdfSelectors.selectQuotationPdf,
  );
  folionvestigation$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectFolioInvestigation,
  );
  selectBase64File$: Observable<string> = this.store.select(
    totalQuotePdfSelectors.selectBase64File,
  );
  selectBase64FileStatus$: Observable<number> = this.store.select(
    totalQuotePdfSelectors.selectBase64FileStatus,
  );
  selectBase64FileInvestigationStatus$: Observable<number> = this.store.select(
    totalQuotePdfSelectors.selectBase64FileInvestigationStatus,
  );
  selectIsLinkedQuote$: Observable<boolean> = this.store.select(
    totalQuotePdfSelectors.selectIsLinkedQuote,
  );
  selectBase64FileInvestigation$: Observable<string> = this.store.select(
    totalQuotePdfSelectors.selectBase64FileInvestigation,
  );
  itemsInvestigation$: Observable<Array<ICotPartidasInvetigacionCotizacion>> = this.store.select(
    quotationDetailsSelectors.selectedInvestigationItems,
  );
  selectedQuotationStatus$: Observable<CatEstadoCotizacion> = this.store.select(
    quotationDetailsSelectors.selectedQuotationStatus,
  );
  typeQuotation$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedOptionSwitchList,
  );
  readonly catQuotationState = CatQuotationState;
  private subscription: Subscription;
  public viewTypes = AppViewTypes;
  TOTAL_QUOTATION = ENUM_TYPE_QUOTATION.TOTAL;
  PARTIAL_QUOTATION = ENUM_TYPE_QUOTATION.PARTIAL;
  apiSuccess = API_REQUEST_STATUS_SUCCEEDED;
  apiFailed = API_REQUEST_STATUS_FAILED;
  apiLoading = API_REQUEST_STATUS_LOADING;
  value = false;
  titleHeader = '';

  constructor(private store: Store<AppState>, private changeDetector: ChangeDetectorRef) {
    this.subscription = this.selectBase64File$.subscribe(() => {
      this.onScroll();
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(totalQuotePdfActions.CLEAN_DATA_QUOTE_PDF());
  }

  onReturnView(): void {
    this.store.dispatch(totalQuotePdfActions.RETURN_VIEW());
  }

  handleModalIsOpenSendQuotation(): void {
    this.store.dispatch(totalQuotePdfActions.SHOW_EMAIL_DIALOG());
  }
  onScroll() {
    if (!this.filesContainer) {
      return;
    }
    this.handleSelectorChange();
  }
  handleSelectorChange() {
    const nativeElement = this.filesContainer.nativeElement;
    const scrollHeight = nativeElement.scrollHeight;
    const scrollTop = nativeElement.scrollTop;
    const clientHeight = nativeElement.clientHeight;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      this.value = true;
    }
  }
}
