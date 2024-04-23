import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
// Selectors
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
// Actions
import {
  addItemsQuoteActions,
  preProcessDetailsActions,
  quotedItemActions,
} from '@appActions/pre-processing';
import {GET_CAT_ESTADO_COTIZACION} from '@appActions/catalogs/catalogos.actions';

// Models
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {VDireccion} from 'api-logistica';
import {IClientContact} from '@appModels/shared/shared.models';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {MatDialog} from '@angular/material/dialog';
import {IntramitableDialogComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/intramitable-dialog/intramitable-dialog.component';
import {AppState} from '@appCore/core.state';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {IReferenceFormEdit} from '@appComponents/shared/reference-form-edit/reference-form-edit.component';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-list-quoted-items',
  templateUrl: './list-quoted-items.component.html',
  styleUrls: ['./list-quoted-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListQuotedItemsComponent implements OnInit, AfterViewChecked {
  @ViewChild('imageElement') imageElement: ElementRef;
  @ViewChild('imageElementBrand') imageElementBrand: ElementRef;
  totals$: Observable<ShoppingCartTotalsModel> = this.store.select(
    preProcessOrderDetailsSelectors.totalsItemsOrderSelected,
  );
  preProcessOrder$: Observable<IOrder> = this.store.select(
    preProcessOrderDetailsSelectors.selectOrderSelected,
  );
  totalItems$: Observable<number> = this.store.select(
    preProcessOrderDetailsSelectors.selectTotalItems,
  );
  indexOrder$: Observable<number> = this.store.select(preProcessOrderDetailsSelectors.selectIndex);

  validatePreProcessTramitableButton$: Observable<boolean> = this.store.select(
    preProcessOrderDetailsSelectors.validatePreProcessTramitable,
  );
  validatePreProcessNotTramitableButton$: Observable<boolean> = this.store.select(
    preProcessOrderDetailsSelectors.validatePreProcessNotTramitable,
  );
  selectCurrencyLabel$: Observable<string> = this.store.select(
    preProcessOrderDetailsSelectors.selectCurrencyLabel,
  );
  itemsOrder$: Observable<InternalSalesItem[]> = this.store.select(
    preProcessOrderDetailsSelectors.selectItemsOrderCombined,
  );
  entriesApiStatus$: Observable<number> = this.store.select(
    preProcessOrderDetailsSelectors.selectEntriesApiStatus,
  );
  selectClientContactData$: Observable<IClientContact> = this.store.select(
    preProcessOrderDetailsSelectors.selectClientContactData,
  );
  itemForReusableHeaderTable$: Observable<InternalSalesItem> = this.store.select(
    preProcessOrderDetailsSelectors.selectItemForReusableHeaderTable,
  );
  deliveryAddressSelected$: Observable<VDireccion> = this.store.select(
    preProcessOrderDetailsSelectors.selectDeliveryAddress,
  );
  deliveryAddresses$: Observable<VDireccion[]> = this.store.select(
    preProcessOrderDetailsSelectors.selectDeliveryAddresses,
  );
  billingAddress$: Observable<string> = this.store.select(
    preProcessOrderDetailsSelectors.selectBillingAddressFormat,
  );
  searchTermItemsByCatalog$: Observable<string> = this.store.select(
    preProcessOrderDetailsSelectors.selectSearchItemsByCatalog,
  );

  lodashIsEmpty = isEmpty;
  imageNativeElement;
  errorImageNativeElement = false;
  defaultImageSource = 'assets/Images/logos/undefined_hover.png';
  isOpenNotes = false;
  targetNotes: any;
  itemInternalSalesItem: InternalSalesItem;
  referencePopOpen = false;

  handleCatSearch = debounce(
    (value: string) => this.searchItemsByCatalog(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_ESTADO_COTIZACION());
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  dataValidate(value: boolean, type: string, valueOrignal: boolean): void {
    if (value !== valueOrignal) {
      this.store.dispatch(quotedItemActions.SET_DATA_VALIDATE({value, typeValidate: type}));
    }
  }

  handleTrackBy(index: number, entry: InternalSalesItem): string {
    return entry?.data?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
      ?.IdCotPartidaCotizacion;
  }

  addItems(): void {
    this.store.dispatch(addItemsQuoteActions.REDIRECT_ADD_NEW_QUOTES_ITEM_CLIENT());
  }

  onTramitablePressed(): void {
    this.store.dispatch(preProcessDetailsActions.VALIDATE_ITEMS_ORDER_CONTROLLED());
  }

  onNotTramitablePressed(): void {
    const dialogRef = this.dialog.open(IntramitableDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {},
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.store.dispatch(preProcessDetailsActions.PROCESS_ENTRIES_LOAD());
      }
    });
  }
  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.store.dispatch(
      preProcessDetailsActions.SET_POP_ITEM_DATE_ESTIMATED_FEE({
        date,
        dateString,
      }),
    );
  }
  handleDeliveryAddress(address: VDireccion): void {
    this.store.dispatch(preProcessDetailsActions.SELECT_DELIVERY_ADDRESS({address}));
  }

  handleHoverNotes(event: any): void {
    this.targetNotes = event.target;
    this.itemInternalSalesItem = event.internalSalesItem;
    this.isOpenNotes = event.isOpenNotes;
  }
  handleReferenceAction(event: IReferenceFormEdit) {
    if (event.value) {
      this.store.dispatch(
        preProcessDetailsActions.SET_UPDATE_REFERENCE_LOAD({reference: event.reference}),
      );
    }
    this.referencePopOpen = false;
  }

  searchItemsByCatalog(catalog: string): void {
    this.store.dispatch(preProcessDetailsActions.SEARCH_ITEMS_BY_CATALOG({catalog}));
  }
}
