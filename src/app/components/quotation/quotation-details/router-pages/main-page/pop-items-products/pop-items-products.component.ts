import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {checkOutQuotationActions, listQuotesActions} from '@appActions/quotation';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {selectNonWorkingDays, selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VProductoAlternativo, VProductoComplementario, VProductoSuplementario} from 'api-catalogos';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {IGMCotPartidasDetalle} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {IProductCardItem} from '@appComponents/shared/product-item/product-item.component';
import {CalendarDay} from '@appModels/calendario/calendar';
import {take} from 'rxjs/operators';
import {CotPartidaCotizacionCapacitacionFecha} from 'api-logistica';
import {debounce, filter, forEach, isEmpty, map as _map} from 'lodash-es';

import {
  DEFAULT_DATE,
  DEFAULT_UUID,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  ENUM_PRODUCT_FAMILY_KEY_VALIDATION,
} from '@appUtil/common.protocols';
import {getObjectPercentagePriceList} from '@appUtil/math';
import {
  PurchaseRestrictions,
  QuotationItemTypes,
  quotationItemTypes,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {buildStringFamily} from '@appUtil/strings';

@Component({
  selector: 'app-pop-items-products',
  templateUrl: './pop-items-products.component.html',
  styleUrls: ['./pop-items-products.component.scss'],
})
export class PopItemsProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() isBackOrder: boolean;
  @Input() isNotMarketable: boolean;
  @Input() selectsSupplementaryProducts: Array<VProductoSuplementario>;
  @Input() product: IGMCotPartidasDetalle;
  @Input() options: Array<ITabOption>;
  @Input() optionSelected: ITabOption;
  @Input() currentCurrency = {} as DropListOption;
  options$: Observable<ITabOption[]> = this.store.select(quotationDetailsSelectors.selectOptions);
  optionSelected$: Observable<ITabOption> = this.store.select(
    quotationDetailsSelectors.selectOptionSelected,
  );
  quotationState$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectStateQuotation,
  );
  currencyQuotationSelected$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectQuotationCurrency,
  );
  nonWorkingDays: Array<CalendarDay> = [];
  newDate = null;
  datesArray: Array<CotPartidaCotizacionCapacitacionFecha> = [];
  validators = InputValidators;
  viewType$: Observable<string> = this.store.select(selectViewType);
  pieces = 0;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  errorImageNativeElement = false;
  handlePiecesNumber = debounce(this.setPieces, DEFAULT_TIME_DEBOUNCE_SEARCH);
  resultPriceList: [boolean, number];
  quotationItemTypes = quotationItemTypes;
  QuotationItemTypes = QuotationItemTypes;
  purchaseRestrictions = PurchaseRestrictions;
  familyKey = ENUM_PRODUCT_FAMILY_KEY_VALIDATION;

  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    this.nonWorkingDays = await lastValueFrom(
      this.store.pipe(select(selectNonWorkingDays), take(1)),
    );
    this.datesArray = this.product.fechasRealizacionCapacitacion || [];
    if (this.datesArray.length > 0) {
      forEach(this.datesArray, (o: CotPartidaCotizacionCapacitacionFecha) => {
        this.nonWorkingDays.push({
          day: new Date(o.Fecha),
          enable: false,
        });
      });
    }
  }

  ngAfterViewInit() {
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    this.resultPriceList = this.getObjectPercentagePrice(
      this.product?.CotProductoOferta?.totalPrice,
      this.product?.CotProductoOferta?.PrecioListaConvertido,
    );
    this.cdr.detectChanges();
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }
  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }
  setTabs(item: ITabOption): void {
    this.store.dispatch(listQuotesActions.SET_OPTION_FILTER_PRODUCT({item}));
  }
  setPieces(value: number): void {
    this.store.dispatch(
      checkOutQuotationActions.SET_PIECES_IN_PRODUCT_DETAIL({NumeroDePiezas: value}),
    );
  }
  buildAlternativeProductCardItem(product: VProductoAlternativo, index: number): IProductCardItem {
    return {
      Index: index,
      Activo: product.Activo,
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Uso: product.Uso,
      Descripcion: product.Descripcion,
      Disponibilidad: product.Disponibilidad,
      IdProducto: product.IdProducto,
      IdProductoAlternativoRelacion: product.IdProductoAlternativoRelacion,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      Unidad: product.Unidad,
      Subtipo: product.Subtipo,
      PrecioLista: product.PrecioLista,
      Presentacion: product.Presentacion,
      TotalAlternativo: product.TotalAlternativo,
      TotalComplementario: product.TotalComplementario,
    };
  }
  buildComplementaryProductCardItem(
    product: VProductoComplementario,
    index: number,
  ): IProductCardItem {
    return {
      Index: index,
      Activo: product.Activo,
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Uso: product.Uso,
      Descripcion: product.Descripcion,
      Disponibilidad: product.Disponibilidad,
      IdProducto: product.IdProducto,
      IdProductoComplementarioRelacion: product.IdProductoComplementarioRelacion,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      Unidad: product.Unidad,
      Subtipo: product.Subtipo,
      PrecioLista: product.PrecioLista,
      Presentacion: product.Presentacion,
      TotalAlternativo: product.TotalAlternativo,
      TotalComplementario: product.TotalComplementario,
    };
  }
  // DOCS: Guarda localmente el día seleccionado en el calendario
  setDates(date): void {
    this.newDate = date;
  }
  // DOCS: Agrega una fecha al arreglo de fechas y manda el nuevo arreglo al estado
  addDate(): void {
    if (this.datesArray.length < 5 && this.newDate !== null) {
      this.nonWorkingDays.push({
        day: this.newDate,
        enable: false,
        color: '#008894',
      });
      this.datesArray = [
        ...this.datesArray,
        {
          Activo: true,
          Fecha: this.newDate.toISOString(),
          FechaRegistro: DEFAULT_DATE,
          FechaUltimaActualizacion: DEFAULT_DATE,
          IdCotPartidaCotizacion: DEFAULT_UUID,
          IdCotPartidaCotizacionCapacitacionFecha: DEFAULT_UUID,
        },
      ];
      if (this.datesArray.length > 1) {
        this.datesArray.sort((a, b) => {
          const fechaA = new Date(a.Fecha);
          const fechaB = new Date(b.Fecha);

          if (fechaA < fechaB) {
            return -1;
          }
          if (fechaA > fechaB) {
            return 1;
          }
          return 0;
        });
      }
      this.newDate = null;
      this.dispatchDate();
    }
  }
  // DOCS: Elimina del arreglo, la fecha seleccionada
  removeDate(date: CotPartidaCotizacionCapacitacionFecha): void {
    if (date.IdCotPartidaCotizacionCapacitacionFecha === DEFAULT_UUID) {
      this.datesArray = filter(
        this.datesArray,
        (o: CotPartidaCotizacionCapacitacionFecha): boolean => o.Fecha !== date.Fecha,
      );
    } else {
      this.datesArray = _map(
        this.datesArray,
        (o: CotPartidaCotizacionCapacitacionFecha): CotPartidaCotizacionCapacitacionFecha => {
          if (
            o.IdCotPartidaCotizacionCapacitacionFecha ===
            date.IdCotPartidaCotizacionCapacitacionFecha
          ) {
            return {
              ...o,
              Activo: false,
            };
          }
          return {
            ...o,
          };
        },
      );
    }
    this.nonWorkingDays = filter(
      this.nonWorkingDays,
      (o: CalendarDay) => new Date(o.day).toISOString().split('T')[0] !== date.Fecha.split('T')[0],
    );
    this.dispatchDate();
  }
  dispatchDate() {
    this.store.dispatch(checkOutQuotationActions.SET_NEW_DATE({dates: this.datesArray}));
  }
  // DOCS: Toma el arreglo de fechas y las ordena cronologicamente
  showOnlyActives(
    dates: Array<CotPartidaCotizacionCapacitacionFecha>,
  ): Array<CotPartidaCotizacionCapacitacionFecha> {
    return filter(dates, (o: CotPartidaCotizacionCapacitacionFecha) => o.Activo);
  }

  getObjectPercentagePrice(salePrice: number, listPrice: number): [boolean, number] {
    const result = getObjectPercentagePriceList(salePrice, listPrice);
    return [result.isNegative, result.percentage];
  }

  handleSetItemNotes(Comentarios: string): void {
    Comentarios = !isEmpty(Comentarios.trim()) ? Comentarios.trim() : null;
    this.store.dispatch(checkOutQuotationActions.SET_ITEM_NOTE({Comentarios}));
  }

  buildStringFamily(type: string, subtype: string, control: string): string {
    return buildStringFamily(type, subtype, control, ' · ');
  }
}
