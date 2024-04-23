/* Core Imports */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {lastValueFrom, Observable} from 'rxjs';
import {debounce} from 'lodash-es';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  ICotPartidaInvetigacionAtencionComentariosObj,
  ICotPartidasInvetigacionCotizacion,
  IQuotation,
  QuotationItemCombined,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
/* Actions Imports */
import {
  checkOutQuotationActions,
  listQuotesActions,
  quotationDetailsActions,
  totalQuotePdfActions,
} from '@appActions/quotation';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Selectors Imports */
import {quotationDetailsSelectors, resumeSectionSelectors} from '@appSelectors/quotation';

/* Tools Imports */
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {CatQuotationState} from '@appHelpers/pending/quotation/quotation.helpers';
import {Location} from '@angular/common';
import {CatEstadoCotizacion, VDireccion} from 'api-catalogos';
import {MatDialog} from '@angular/material/dialog';
import {FreightConfiguratorComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/freight-configurator/freight-configurator.component';
import {take} from 'rxjs/operators';
import {selectedQuotationStatus} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

@Component({
  selector: 'app-saved-quotation-items',
  templateUrl: './saved-quotation-items.component.html',
  styleUrls: ['./saved-quotation-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedQuotationItemsComponent {
  @ViewChild('anchor') public anchor: ElementRef;
  @ViewChild('inputNumberPieces', {read: ElementRef}) public input: ElementRef;
  @ViewChild('imageElementListProduct') imageElementListProduct: ElementRef;
  @ViewChild('imageElementListProductInLine')
  imageElementListProductInLine: ElementRef;
  @ViewChildren('itemList') itemList: QueryList<ElementRef>;
  options$: Observable<Array<ITabOption>> = this.store.select(
    resumeSectionSelectors.selectOptionsTabs,
  );
  tapSelected$: Observable<ITabOption> = this.store.select(
    resumeSectionSelectors.selectTabSelected,
  );
  searchTerm$: Observable<string> = this.store.select(resumeSectionSelectors.selectSearchTerm);
  IsOpenDetailsProductInvestigation$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsOpenDetailsProductInvestigation,
  );
  itemsQuotation2$: Observable<Array<QuotationItemCombined>> = this.store.select(
    quotationDetailsSelectors.selectQuotationItemsCombinedFiltered,
  );
  itemsInvestigation$: Observable<Array<ICotPartidasInvetigacionCotizacion>> = this.store.select(
    quotationDetailsSelectors.selectedInvestigationItems,
  );
  optionSwitch$: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectOptionSwitch,
  );
  itemConfigSelected$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedOptionSwitchList,
  );
  optionTypeDelivery: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectOptionsTypeDelivery,
  );
  optionDeliverySelected$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedOptionTypeDelivery,
  );
  hasDifferentFEE$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.hasDifferentFEE,
  );
  infoAddress$: Observable<VDireccion> = this.store.select(
    quotationDetailsSelectors.selectedAddressDelivery,
  );
  activeSave$: Observable<boolean> = this.store.select(quotationDetailsSelectors.activeSave);
  activeSend$: Observable<boolean> = this.store.select(quotationDetailsSelectors.activeSend);
  validationMessageItem$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectValidationSpecial,
  );
  selectedQuotation$: Observable<IQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotation,
  );
  selectedQuotationStatus$: Observable<CatEstadoCotizacion> = this.store.select(
    quotationDetailsSelectors.selectedQuotationStatus,
  );
  cotPartidaCotizacionInvestigacion$: Observable<
    ICotPartidaInvetigacionAtencionComentariosObj
  > = this.store.select(quotationDetailsSelectors.selectAttendedInvestigationData);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  selectedProduct: QuotationItemCombined = {} as QuotationItemCombined;
  showRightSideBar = false;
  readonly catQuotationState = CatQuotationState;

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event) {
    const list = this.itemList.toArray();
    const found = list.find((el) => el.nativeElement.contains(event.target));
    if (found) {
      if (this.showRightSideBar) {
        this.showRightSidebar(false);
        setTimeout(() => {
          this.showRightSidebar(true);
          this.cdr.detectChanges();
        }, 500);
      } else {
        this.showRightSidebar(true);
      }
    } else {
      if (this.showRightSideBar) {
        this.showRightSidebar(false);
      }
    }
  }

  redirectToListDetail(): void {
    this.location.back();
  }

  handleSaveQuotation(value = false): void {
    this.store.dispatch(
      quotationDetailsActions.SAVE_QUOTATION_LOAD({
        hasPreviewQuotation: value,
        showMessageSuccess: true,
      }),
    );
  }

  handleModalIsOpenSendQuotation(isResend: boolean): void {
    this.store.dispatch(listQuotesActions.SHOW_SEND_EMAIL_DIALOG({isResend}));
  }

  onSelectOption(tab: ITabOption): void {
    this.store.dispatch(checkOutQuotationActions.SET_TAB({tab}));
    this.store.dispatch(
      quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION({
        value: false,
      }),
    );
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(checkOutQuotationActions.SET_SEARCH_TERM({searchTerm}));
  }

  onClickTypeQuotation(option: DropListOption) {
    this.store.dispatch(quotationDetailsActions.SET_TYPE_QUOTATION({option}));
  }
  onClickTypeDeliveryQuotation(option: DropListOption) {
    this.store.dispatch(quotationDetailsActions.SET_TYPE_DELIVERY_QUOTATION({option}));
  }

  onClickViewQuotationPdf(): void {
    this.store.dispatch(
      totalQuotePdfActions.NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT({
        isLinkedQuote: false,
        quotation: null,
        navigate: true,
      }),
    );
  }

  async onClickOpenFreight(): Promise<void> {
    const client = await lastValueFrom(
      this.store.pipe(select(resumeSectionSelectors.selectDataClient), take(1)),
    );

    const dialogRef = this.dialog.open(FreightConfiguratorComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        client,
      },
      panelClass: 'mat-dialog-style',
    });

    dialogRef
      .afterClosed()
      .subscribe((data: {comment: string; event: boolean; isBrokenDown: boolean}) => {
        if (data?.event) {
          this.store.dispatch(
            checkOutQuotationActions.SET_FREIGHT_QUOTATION({
              comment: data?.comment,
              isBrokenDown: data?.isBrokenDown,
            }),
          );
        } else {
          this.store.dispatch(checkOutQuotationActions.RESTORE_FREIGHT_DATA());
        }
      });
  }

  showRightSidebar(show: boolean): void {
    this.showRightSideBar = show;
  }
}
