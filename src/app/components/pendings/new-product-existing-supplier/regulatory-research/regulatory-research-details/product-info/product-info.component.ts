import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {
  regulatoryResearchDetailsSelectors,
  regulatoryResearchSelectors,
} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {select, Store} from '@ngrx/store';
import {selectedProduct} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.selectors';
import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {ProductRatificationExtended} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';
import {take} from 'rxjs/operators';
import {SET_CHANGE_SELECT_PROPERTY_PRODUCT_BRAND_FAMILY} from '@appActions/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.actions';
import {
  regulatoryResearchActions,
  regulatoryResearchDetailsActions,
} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {VProductoDetalle} from 'api-catalogos';
import {AVAILABILITY_TYPES, ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements AfterViewInit {
  @ViewChild('imagePresentationElement') imagePresentationElement: ElementRef;
  @ViewChild('imageItemBrand') imageItemBrand: ElementRef;
  selectBrandFamilyList$: Observable<DropListOptionsPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectBrandFamilyList,
  );

  selectBrandFamily$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectedBrandFamily,
  );

  selectProduct$: Observable<ProductRatificationExtended> = this.store.select(selectedProduct);
  isTabRegulationAndRestrictions$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isTabRegulationAndRestrictions,
  );
  typeBackup$: Observable<VProductoDetalle> = this.store.select(
    regulatoryResearchDetailsSelectors.producDetailsBackUp,
  );
  providerCurrency$: Observable<string> = this.store.select(
    regulatoryResearchDetailsSelectors.selectProviderSalesCurrency,
  );

  enableEdit$: Observable<boolean> = this.store.select(
    regulatoryResearchSelectors.selectEnableEdit,
  );
  readonly ENUM_PRODUCT_FAMILY_KEY = ENUM_PRODUCT_FAMILY_KEY;
  readonly availabilityTypes = AVAILABILITY_TYPES;
  imagePresentationNativeElement;
  imageBrandElement;
  defaultHoverImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  defaultHoverImageBrandSource = 'assets/Images/products/undefined_hover.svg';

  constructor(private store: Store<any>, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.imagePresentationNativeElement = this.renderer.selectRootElement(
      this.imagePresentationElement,
    ).nativeElement;
    this.imageBrandElement = this.renderer.selectRootElement(this.imageItemBrand).nativeElement;
  }
  isTipe(tipo: string): boolean {
    return !!TIPES[tipo];
  }

  protected readonly selectedProduct = selectedProduct;

  async selectionChange(property, event): Promise<void> {
    const params = {property: property, dropListOptionPqf: event};
    const famBefore = await lastValueFrom(
      this.store.pipe(select(regulatoryResearchDetailsSelectors.selectTypeProduct), take(1)),
    );
    this.store.dispatch(SET_CHANGE_SELECT_PROPERTY_PRODUCT_BRAND_FAMILY(params));
    const fam = await lastValueFrom(
      this.store.pipe(select(regulatoryResearchDetailsSelectors.selectTypeProduct), take(1)),
    );
    const hasRestrictionsAndRegularizations = await lastValueFrom(
      this.store.pipe(
        select(regulatoryResearchDetailsSelectors.hasRestrictionsAndRegularizations),
        take(1),
      ),
    );
    const nodes = {
      nodeRootBefore: famBefore,
      nodeRootAfter: fam,
      hasRestrictionsAndRegularizations: hasRestrictionsAndRegularizations,
    };
    this.store.dispatch(regulatoryResearchDetailsActions.RESET_INFORMATION_PRODUCT(nodes));
    this.store.dispatch(regulatoryResearchActions.SET_ENABLE_EDIT({enableEdit: true}));
  }
  getNAValue(type: string): string {
    return type === 'N/A' ? '' : `· ${type}`;
  }
  errorImgHandler() {
    this.renderer.setAttribute(
      this.imagePresentationNativeElement,
      'src',
      this.defaultHoverImageBrandSource,
    );
  }
  errorImgBrandHandler(): void {
    this.renderer.setAttribute(this.imageBrandElement, 'src', this.defaultHoverImageSource);
  }
}

const TIPES: any = {
  Capacitaciones: 'Capacitaciones',
  Publicaciones: 'Publicaciones',
  'Dispositivo Medico': 'Dispositivo Medico',
};
