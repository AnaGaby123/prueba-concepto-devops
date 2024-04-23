import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {lastValueFrom, Observable} from 'rxjs';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {listQuotesActions, quotationDetailsActions} from '@appActions/quotation';
import {debounce, filter as _filter} from 'lodash-es';

import {
  VDatosFacturacionCliente,
  VDireccion,
  VProductoAlternativo,
  VProductoComplementario,
} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ProductsTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {IProductCardItem} from '@appModels/shared-components/product-card-item.models';
import {CotPartidaCotizacionCapacitacionFecha} from 'api-logistica';
import {buildStringFamily} from '@appUtil/strings';
import {
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  ENUM_CONTROL_FAMILY,
  ENUM_PRODUCT_FAMILY_KEY,
} from '@appUtil/common.protocols';
import {currentLocaleDateUTCFormat} from '@appUtil/dates';
import {take} from 'rxjs/operators';
import {IGMCotPartidasDetalle} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-information-details',
  templateUrl: './product-information-details.component.html',
  styleUrls: ['./product-information-details.component.scss'],
})
export class ProductInformationDetailsComponent {
  @ViewChild('imageElementDetails') imageElementDetails: ElementRef;
  @ViewChild('imageElementDetailsBrand') imageElementDetailsBrand: ElementRef;
  @Input() productData: ProductSearchResult;
  @Output() emitOpenDates: EventEmitter<ProductSearchResult> = new EventEmitter<
    ProductSearchResult
  >();
  quotationCurrency$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectQuotationCurrency,
  );
  deliveryAddressSelected$: Observable<VDireccion> = this.store.select(
    quotationDetailsSelectors.selectedAddressDelivery,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  options$: Observable<ITabOption[]> = this.store.select(quotationDetailsSelectors.selectOptions);
  optionSelected$: Observable<ITabOption> = this.store.select(
    quotationDetailsSelectors.selectOptionSelected,
  );
  isBackOrder$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsBackOrder,
  );
  isTypeChemical$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsTypeChemical,
  );
  isTypeBiological$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsTypeBiological,
  );
  isTypePublications$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsTypePublications,
  );
  isTypeMedicalDevice$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsTypeMedicalDevice,
  );
  isTypeLabware$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsTypeLabware,
  );
  isTypeTraining$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsTypeTraining,
  );
  isNotMarketable$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsNotMarketable,
  );
  readonly productsTypes = ProductsTypes;
  handleSetPieces = debounce(
    (value, item) => this.setPieces(value, item),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  validators = InputValidators;
  datesPopIsOpen = false;
  trainingItem: ProductSearchResult;
  imageNativeElementDetails;
  imageNativeElementDetailsBrand;
  errorImageNativeElement = false;
  errorImageBrandNativeElement = false;
  openOpop = false;
  defaultImageSource = 'assets/Images/logo_pqf_cliente.svg';
  imageNativeElement;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  setPieces(pieces: any, item: ProductSearchResult): void {
    this.store.dispatch(listQuotesActions.SET_PIECES_PRODUCT_LOAD({pieces, item}));
  }

  async addProductToCart(product: ProductSearchResult): Promise<void> {
    const address = await lastValueFrom(
      this.store.pipe(select(quotationDetailsSelectors.selectedAddressDeliveryDropList), take(1)),
    );
    if (!address) {
      this.store.dispatch(quotationDetailsActions.SET_ACTIVE_ERROR_ADDRESS({value: true}));
      return;
    }
    this.addProductToCartValidation(product);
  }

  addTrainingItem(product): void {
    if (product.vProductDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
      this.emitOpenDates.emit(product);
    } else {
      this.store.dispatch(quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({product}));
    }
  }
  // DOCS: Agregar al carrito con la validacion de combinaciones
  async addProductToCartValidation(product: ProductSearchResult): Promise<void> {
    const items: IGMCotPartidasDetalle[] = await lastValueFrom(
      this.store.pipe(select(quotationDetailsSelectors.selectedQuotationItems), take(1)),
    );
    const enterpriseSelected = await lastValueFrom(
      this.store.pipe(select(quotationDetailsSelectors.selectEnterpriseSelected), take(1)),
    );
    const {MismaEmpresaFacturaPublicaciones}: VDatosFacturacionCliente = await lastValueFrom(
      this.store.pipe(select(quotationDetailsSelectors.selectClientInfoBillingData), take(1)),
    );
    const hasControlledItems = (controlClave: string) =>
      _filter(
        items,
        (o: IGMCotPartidasDetalle) =>
          o.product?.ControlClave === controlClave ||
          o.VPartidaCotizacion?.CatControlClave === controlClave,
      ).length;
    const hasPublicationItems = _filter(
      items,
      (o: IGMCotPartidasDetalle) =>
        o.product?.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications ||
        o.VPartidaCotizacion?.Tipo.toLowerCase() === ENUM_PRODUCT_FAMILY_KEY.publications,
    ).length;
    const filteredItems: IGMCotPartidasDetalle[] = _filter(
      items,
      (o: IGMCotPartidasDetalle) =>
        o.product?.ControlClave !== ENUM_CONTROL_FAMILY.NA ||
        o.VPartidaCotizacion?.Control.toLowerCase() !== ENUM_CONTROL_FAMILY.NA ||
        o.product?.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications ||
        o.VPartidaCotizacion?.Tipo.toLowerCase() === ENUM_PRODUCT_FAMILY_KEY.publications,
    );
    let message = '';
    switch (enterpriseSelected.Clave) {
      case 'proveedora':
        if (!items.length) {
          this.addTrainingItem(product);
          return;
        }
        if (
          ((hasControlledItems(ENUM_CONTROL_FAMILY.Mundiales) ||
            hasControlledItems(ENUM_CONTROL_FAMILY.Nacionales) ||
            hasControlledItems(ENUM_CONTROL_FAMILY.Origen) ||
            hasControlledItems(ENUM_CONTROL_FAMILY.Normal)) &&
            !MismaEmpresaFacturaPublicaciones &&
            product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) ||
          (hasPublicationItems &&
            !MismaEmpresaFacturaPublicaciones &&
            product.TipoProductoClave !== ENUM_PRODUCT_FAMILY_KEY.publications &&
            product.ControlClave !== ENUM_CONTROL_FAMILY.NA &&
            (filteredItems[0]?.product?.TipoProductoClave ===
              ENUM_PRODUCT_FAMILY_KEY.publications ||
              filteredItems[0]?.VPartidaCotizacion?.Tipo.toLowerCase() ===
                ENUM_PRODUCT_FAMILY_KEY.publications))
        ) {
          message =
            hasControlledItems(ENUM_CONTROL_FAMILY.Mundiales) ||
            hasControlledItems(ENUM_CONTROL_FAMILY.Nacionales) ||
            hasControlledItems(ENUM_CONTROL_FAMILY.Origen) ||
            hasControlledItems(ENUM_CONTROL_FAMILY.Normal)
              ? this.translateService.instant('quotation.messageAddProduct1')
              : this.translateService.instant('quotation.messageAddProduct4');
          break;
        }

        if (product.vProductDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
          this.emitOpenDates.emit(product);
          return;
        } else {
          this.store.dispatch(
            quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({
              product,
            }),
          );
          return;
        }
        break;
      default:
        if (!items.length) {
          this.addTrainingItem(product);
          return;
        }
        // DOCS: Validación para productos normales
        if (
          ((filteredItems[0]?.product?.ControlClave === ENUM_CONTROL_FAMILY.Origen ||
            filteredItems[0]?.VPartidaCotizacion?.CatControlClave === ENUM_CONTROL_FAMILY.Origen ||
            filteredItems[0]?.product?.ControlClave === ENUM_CONTROL_FAMILY.Normal ||
            filteredItems[0]?.VPartidaCotizacion?.CatControlClave === ENUM_CONTROL_FAMILY.Normal) &&
            (product.ControlClave === ENUM_CONTROL_FAMILY.Origen ||
              product.ControlClave === ENUM_CONTROL_FAMILY.Normal)) ||
          ((product.ControlClave === ENUM_CONTROL_FAMILY.Normal ||
            product.ControlClave === ENUM_CONTROL_FAMILY.Origen) &&
            (MismaEmpresaFacturaPublicaciones || enterpriseSelected.Clave === 'golocaer') &&
            !hasControlledItems(ENUM_CONTROL_FAMILY.Mundiales) &&
            !hasControlledItems(ENUM_CONTROL_FAMILY.Nacionales))
        ) {
          this.store.dispatch(quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({product}));
          return;
        } else {
          message =
            product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications &&
            !MismaEmpresaFacturaPublicaciones
              ? this.translateService.instant('quotation.messageAddProduct1')
              : (product.ControlClave === ENUM_CONTROL_FAMILY.Mundiales ||
                  product.ControlClave === ENUM_CONTROL_FAMILY.Nacionales) &&
                (hasControlledItems(ENUM_CONTROL_FAMILY.Normal) ||
                  hasControlledItems(ENUM_CONTROL_FAMILY.Origen))
              ? this.translateService.instant('quotation.messageAddProduct2')
              : this.translateService.instant('quotation.messageAddProduct4');
        }
        // DOCS: Validación para productos controlados
        if (
          (filteredItems[0]?.VPartidaCotizacion?.CatControlClave ===
            ENUM_CONTROL_FAMILY.Mundiales ||
            filteredItems[0]?.product?.ControlClave === ENUM_CONTROL_FAMILY.Mundiales ||
            filteredItems[0]?.VPartidaCotizacion?.CatControlClave ===
              ENUM_CONTROL_FAMILY.Nacionales ||
            filteredItems[0]?.product?.ControlClave === ENUM_CONTROL_FAMILY.Nacionales) &&
          (product.ControlClave === ENUM_CONTROL_FAMILY.Mundiales ||
            product.ControlClave === ENUM_CONTROL_FAMILY.Nacionales)
        ) {
          this.store.dispatch(quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({product}));
          return;
        } else {
          message =
            product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications ||
            (hasPublicationItems &&
              (product.ControlClave === ENUM_CONTROL_FAMILY.Nacionales ||
                product.ControlClave === ENUM_CONTROL_FAMILY.Mundiales))
              ? this.translateService.instant('quotation.messageAddProduct3')
              : (product.ControlClave === ENUM_CONTROL_FAMILY.Origen ||
                  product.ControlClave === ENUM_CONTROL_FAMILY.Normal) &&
                (hasControlledItems(ENUM_CONTROL_FAMILY.Mundiales) ||
                  hasControlledItems(ENUM_CONTROL_FAMILY.Nacionales)) &&
                !hasPublicationItems
              ? this.translateService.instant('quotation.messageAddProduct2')
              : message;
        }
        // DOCS: Validación para publicaciones
        if (
          ((filteredItems[0]?.product?.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications ||
            filteredItems[0]?.VPartidaCotizacion?.Tipo.toLowerCase() ===
              ENUM_PRODUCT_FAMILY_KEY.publications) &&
            product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) ||
          (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications &&
            (MismaEmpresaFacturaPublicaciones || enterpriseSelected.Clave === 'golocaer') &&
            !hasControlledItems(ENUM_CONTROL_FAMILY.Mundiales) &&
            !hasControlledItems(ENUM_CONTROL_FAMILY.Nacionales))
        ) {
          this.store.dispatch(quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({product}));
          return;
        } else {
          message =
            product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications &&
            !hasControlledItems(ENUM_CONTROL_FAMILY.Mundiales) &&
            !hasControlledItems(ENUM_CONTROL_FAMILY.Nacionales)
              ? this.translateService.instant('quotation.messageAddProduct1')
              : message;
        }
        if (
          product.ControlClave === ENUM_CONTROL_FAMILY.NA &&
          product.TipoProductoClave !== ENUM_PRODUCT_FAMILY_KEY.publications
        ) {
          if (product.vProductDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
            this.emitOpenDates.emit(product);
          } else {
            this.store.dispatch(quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({product}));
          }
          return;
        }
        break;
    }
    if (message) {
      this.dialog.open(
        ConfirmDialogComponent,
        buildDialogConfig({
          message: message,
          onlyOneButton: true,
        }),
      );
    }
  }
  setTabs(item: ITabOption): void {
    this.store.dispatch(listQuotesActions.SET_OPTION_FILTER_PRODUCT({item}));
  }

  setImage(src?: string): string {
    if (this.imageElementDetails) {
      this.imageNativeElementDetails = this.renderer.selectRootElement(
        this.imageElementDetails,
      ).nativeElement;
    }
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  setImageBrand(src?: string): string {
    if (this.imageElementDetailsBrand) {
      this.imageNativeElementDetailsBrand = this.renderer.selectRootElement(
        this.imageElementDetailsBrand,
      ).nativeElement;
    }
    if (src) {
      if (!this.errorImageBrandNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElementDetails, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  errorImageBrand(): void {
    if (!this.errorImageBrandNativeElement) {
      this.renderer.setAttribute(
        this.imageElementDetailsBrand || '',
        'src',
        this.defaultImageSource || '',
      );
      this.errorImageBrandNativeElement = true;
    }
    this.setImage();
  }

  open(event) {
    this.openOpop = !event;
  }

  handleTrackByAlternativeProductId(index: number, product: VProductoAlternativo): string {
    return product.IdProductoAlternativoRelacion;
  }

  handleTrackByComplementaryProductId(index: number, product: VProductoComplementario): string {
    return product.IdProductoComplementarioRelacion;
  }

  buildAlternativeItem = (product: VProductoAlternativo, index: number): IProductCardItem => {
    return {
      Activo: product.Activo,
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Descripcion: product.Descripcion,
      Disponibilidad: product?.Disponibilidad,
      DisponibilidadClave: product.DisponibilidadClave,
      IdProducto: product.IdProducto,
      IdProductoAlternativoRelacion: product.IdProductoAlternativoRelacion,
      Index: index,
      NombreMarca: product.NombreMarca,
      PrecioLista: product.PrecioLista,
      Presentacion: product.Presentacion,
      Subtipo: product.Subtipo,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      TotalAlternativo: product.TotalAlternativo,
      TotalComplementario: product.TotalAlternativo,
      Unidad: product.Unidad,
      Uso: product.Uso,
      ImagePresentationHover: `assets/Images/products/${product?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${product?.TipoPresentacionClave?.toLowerCase()}.svg`,
    } as IProductCardItem;
  };
  buildComplementaryItem = (product: VProductoComplementario, index: number): IProductCardItem => {
    return {
      Activo: product.Activo,
      Catalogo: product.Catalogo,
      Controlado: product.Controlado,
      Descripcion: product.Descripcion,
      DisponibilidadClave: product.DisponibilidadClave,
      Disponibilidad: product?.Disponibilidad,
      IdProducto: product.IdProducto,
      IdProductoComplementarioRelacion: product.IdProductoComplementarioRelacion,
      Index: index,
      NombreMarca: product.NombreMarca,
      PrecioLista: product.PrecioLista,
      Presentacion: product.Presentacion,
      Subtipo: product.Subtipo,
      Tipo: product.Tipo,
      TipoProductoClave: product.TipoProductoClave,
      TotalAlternativo: product.TotalAlternativo,
      TotalComplementario: product.TotalComplementario,
      Unidad: product.Unidad,
      Uso: product.Uso,
      ImagePresentationHover: `assets/Images/products/${product?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${product?.TipoPresentacionClave?.toLowerCase()}.svg`,
    } as IProductCardItem;
  };

  handleSetDates(dates: Array<CotPartidaCotizacionCapacitacionFecha>) {
    if (dates !== null) {
      this.handleAddItemToCart(this.trainingItem, dates);
    }
    this.datesPopIsOpen = !this.datesPopIsOpen;
  }

  handleAddItemToCart(
    product: ProductSearchResult,
    dates?: Array<CotPartidaCotizacionCapacitacionFecha>,
  ) {
    this.store.dispatch(
      quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({
        product,
        dates,
      }),
    );
  }

  buildStringFamilyProduct(type: string, subType: string, control: string): string {
    return buildStringFamily(type, subType, control, ' · ');
  }
  isCuratorshipsValidity(curatorshipsDate) {
    return curatorshipsDate > currentLocaleDateUTCFormat();
  }
  curashipValidator(date: string): boolean {
    const today = new Date().toISOString();
    return date ? new Date(date.split('T')[0]) < new Date(today.split('T')[0]) : false;
  }
}
