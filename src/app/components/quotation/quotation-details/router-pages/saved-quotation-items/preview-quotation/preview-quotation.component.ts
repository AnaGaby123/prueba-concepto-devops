import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDataClient} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {Observable, Subscription} from 'rxjs';
import {quotationDetailsSelectors, totalQuotePdfSelectors} from '@appSelectors/quotation';
import {
  ENUM_TYPE_QUOTATION,
  ICotPartidasInvetigacionCotizacion,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {VCotCotizacion} from 'api-logistica';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-preview-quotation',
  templateUrl: './preview-quotation.component.html',
  styleUrls: ['./preview-quotation.component.scss'],
})
export class PreviewQuotationComponent {
  @ViewChild('filesContainer') filesContainer: ElementRef;

  selectBase64File$: Observable<string> = this.store.select(
    totalQuotePdfSelectors.selectBase64File,
  );
  selectBase64FileInvestigation$: Observable<string> = this.store.select(
    totalQuotePdfSelectors.selectBase64FileInvestigation,
  );
  selectBase64FileStatus$: Observable<number> = this.store.select(
    totalQuotePdfSelectors.selectBase64FileStatus,
  );
  selectBase64FileInvestigationStatus$: Observable<number> = this.store.select(
    totalQuotePdfSelectors.selectBase64FileInvestigationStatus,
  );
  itemsInvestigation$: Observable<Array<ICotPartidasInvetigacionCotizacion>> = this.store.select(
    quotationDetailsSelectors.selectedInvestigationItems,
  );
  selectedQuotation$: Observable<VCotCotizacion> = this.store.select(
    totalQuotePdfSelectors.selectQuotationPdf,
  );
  typeQuotation$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedOptionSwitchList,
  );
  private subscription: Subscription;
  TOTAL_QUOTATION = ENUM_TYPE_QUOTATION.TOTAL;
  PARTIAL_QUOTATION = ENUM_TYPE_QUOTATION.PARTIAL;
  apiSuccess = API_REQUEST_STATUS_SUCCEEDED;
  apiFailed = API_REQUEST_STATUS_FAILED;
  apiLoading = API_REQUEST_STATUS_LOADING;
  width = '744px';
  height = '780px';
  value = false;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<PreviewQuotationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      client: IDataClient;
    },
  ) {
    this.subscription = this.selectBase64File$.subscribe(() => {
      this.onScroll();
    });
  }
  onClose(event: boolean): void {
    this.dialog.close({
      event,
    });
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
