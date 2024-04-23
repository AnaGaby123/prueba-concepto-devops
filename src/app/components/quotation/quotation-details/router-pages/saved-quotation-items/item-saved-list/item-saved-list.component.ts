import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {quotationDetailsSelectors, resumeSectionSelectors} from '@appSelectors/quotation';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {CotPartidaCotizacionCapacitacionFecha} from 'api-logistica';
import {
  IGMCotPartidasDetalle,
  IQuotation,
  QuotationItemCombined,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {checkOutQuotationActions, quotationDetailsActions} from '@appActions/quotation';
import {filter, reverse} from 'lodash-es';

import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {MatDialog} from '@angular/material/dialog';
import {FreightDetailsComponent} from '@appComponents/quotation/quotation-details/router-pages/shared/freight-details/freight-details.component';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-item-saved-list',
  templateUrl: './item-saved-list.component.html',
  styleUrls: ['./item-saved-list.component.scss'],
})
export class ItemSavedListComponent implements AfterContentChecked {
  @ViewChild('imageElementListProduct') imageElementListProduct: ElementRef;
  viewType$: Observable<string> = this.store.select(selectViewType);
  itemsQuotation3$: Observable<InternalSalesItem[]> = this.store.select(
    quotationDetailsSelectors.selectInternalSalesItem,
  );
  selectedQuotation$: Observable<IQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotation,
  );
  totalPieces$: Observable<number> = this.store.select(quotationDetailsSelectors.selectTotalPieces);

  totalItemsInQuotation$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectTotalItemsInQuotation,
  );
  totalQuoted$: Observable<ShoppingCartTotalsModel> = this.store.select(
    quotationDetailsSelectors.selectTotalQuoted,
  );
  itemSelected$ = this.store.select(resumeSectionSelectors.itemSelected);
  isProratedFreight$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsProratedFreight,
  );
  hasFreightSelected$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectHasFreightSelected,
  );
  optionSelected$: Observable<ITabOption> = this.store.select(
    quotationDetailsSelectors.selectOptionSelected,
  );
  selectedProduct$: Observable<IGMCotPartidasDetalle> = this.store.select(
    quotationDetailsSelectors.selectSelectedProductDetail,
  );

  readonly viewTypes = AppViewTypes;

  activeDetails = false;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageListProducts = false;
  imageListProductsNativeElement;
  productQuantityControlled = 0;
  selectedProductControlled: QuotationItemCombined = {} as QuotationItemCombined;
  targetPop: any;
  internalSalesItems: Array<InternalSalesItem> = [];

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private appService: CoreContainerService,
    private translateService: TranslateService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    if (!!this.imageElementListProduct) {
      this.imageListProductsNativeElement = this.renderer.selectRootElement(
        this.imageElementListProduct,
      ).nativeElement;
    }
  }

  // DOCS Abre el pop de los detalles de la partida y va por la info en caso de que se requiera recargar
  viewProductData(itemQuotation: QuotationItemCombined, event: any, index): void {
    this.store.dispatch(checkOutQuotationActions.SET_DETAILS_PRODUCT_LOAD({itemQuotation, index}));
    this.activeDetails = true;
  }

  // DOCS Muestra el input que permitira agregar las partidas de ahorro
  activeInputControlled(
    event: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    item: IGMCotPartidasDetalle,
    productIndex: number,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(
      quotationDetailsActions.ACTIVE_INPUT_CONTROLLED_IN_ITEM_QUOTATION({
        idItemQuotation: item?.VPartidaCotizacion?.IdCotPartidaCotizacion,
        productIndex,
      }),
    );
    this.productQuantityControlled = 1;
    this.selectedProductControlled = item;
  }

  // DOCS crea la data para añadir una o más partidas de ahorro a la cotizacion
  onEnterInputFloating(
    productIndex: number,
    item: IGMCotPartidasDetalle,
    productQuantityControlled: number,
  ): void {
    this.store.dispatch(
      quotationDetailsActions.ADD_ITEM_SAVING_TO_SELECTED_QUOTATION_LOAD({
        item: item,
        itemsNumberPieces: this.generateItemQuotationSaving(
          item.VPartidaCotizacion
            ? item.VPartidaCotizacion.NumeroDePiezas
            : item.product.NumeroDePiezas,
          productQuantityControlled,
        ),
        productIndex,
      }),
    );
  }

  // DOCS Calcula el numero de piezas por partida de ahorro
  generateItemQuotationSaving(totalPieces: number, itemNumber: number): Array<number> {
    let total = totalPieces;
    const data: Array<number> = [];
    for (let i = 0; i < itemNumber; i++) {
      data.push(total + itemNumber);
      total += itemNumber;
    }
    return reverse(data);
  }

  // DOCS Setea el valor del input al presentar un cambio y valida el valor
  setInput(value: string): void {
    if (+value < 1) {
      setTimeout(() => {
        this.productQuantityControlled =
          this.productQuantityControlled < 1 ? 1 : this.productQuantityControlled;
      }, 500);
    }
    if (+value > 10) {
      setTimeout(() => {
        this.productQuantityControlled =
          this.productQuantityControlled > 10 ? 10 : this.productQuantityControlled;
      }, 500);
      return;
    }
  }

  // DOCS Valida que el valor ingresado corresponda a un dato numero del 0-9
  handleValidateNumber(event: {which: number; preventDefault: () => void}): void {
    const key = String.fromCharCode(event.which);
    const regex = /^$|^[0-9]+$|null/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  // DOCS Incrementa el numero de partidas de ahorro por agregar en el input
  onIncrement(): void {
    if (this.productQuantityControlled < 10) {
      this.productQuantityControlled = this.productQuantityControlled + 1;
    }
  }

  // DOCS Decrementa el numero de partidas de ahorro por agregaren el input
  onDecrement(): void {
    if (this.productQuantityControlled > 1) {
      this.productQuantityControlled = this.productQuantityControlled - 1;
    }
  }

  // DOCS Detiene la propagacion de evente para el input de las partidas de ahorro
  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}) {
    event.preventDefault();
    event.stopPropagation();
  }

  // DOCS Recorre solo las fechas que esten activas para los productos de tipo capacitación
  onlyDatesActive(dates: Array<CotPartidaCotizacionCapacitacionFecha>) {
    return filter(dates, (o: CotPartidaCotizacionCapacitacionFecha) => o.Activo);
  }

  // DOCS Mostrar la imagen por defecto en la marca de la partida en caso de que no exista
  errorImage(): void {
    if (!this.errorImageListProducts) {
      this.renderer.setAttribute(
        this.imageListProductsNativeElement,
        'src',
        this.defaultImageSource,
      );
      this.errorImageListProducts = true;
    }
    this.setImage();
  }

  // DOCS Mostrar las imagenes en la marca de la partida en caso de que exista
  setImage(src?: string, tab?: string) {
    if (src) {
      if (!this.errorImageListProducts) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  // DOCS Preselecciona la partida del listado de cotizaciones y abre el pop de confirmar eliminacion
  handleRemoveItem(name: string, index: number): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      buildDialogConfig({
        greenText: name,
        message: this.translateService.instant('quotation.details.alertDeleteProduct'),
      }),
    );

    dialogRef.afterClosed().subscribe((event: boolean) => {
      if (event) {
        this.store.dispatch(quotationDetailsActions.DELETE_ITEM_QUOTATION({index: index}));
      }
    });
  }

  openDetailsFreight(): void {
    const dialogRef = this.dialog.open(FreightDetailsComponent, buildDialogConfig({}));

    dialogRef.afterClosed().subscribe((data: {event: boolean; brokenDown: boolean}) => {
      if (data?.event) {
        this.store.dispatch(
          quotationDetailsActions.SET_FREIGHT_APPORTION({
            value: data?.brokenDown,
          }),
        );
      }
    });
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.ConceptAddItemSavingAction:
        this.onEnterInputFloating(event?.index, event?.data, event.value as number);
        break;
      case NameActionsInternalSalesItem.DeleteAction:
        this.handleRemoveItem(
          event?.data?.VPartidaCotizacion?.Descripcion || event?.data?.product?.Descripcion,
          event.index,
        );
        break;
      case NameActionsInternalSalesItem.InternalSalesAction:
        this.viewProductData(event.data, event, event.index);
        break;
      case NameActionsInternalSalesItem.InternalSalesFreightAction:
        this.openDetailsFreight();
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
}
