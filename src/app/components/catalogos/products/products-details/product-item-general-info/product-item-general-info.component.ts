import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {
  productDetailsSelectors,
  productTechnicalCommercialInvestigationSelectors,
} from '@appSelectors/forms/product-form';
import {IProductInfo} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {AVAILABILITY_TYPES, ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-item-general-info',
  templateUrl: './product-item-general-info.component.html',
  styleUrls: ['./product-item-general-info.component.scss'],
})
export class ProductItemGeneralInfoComponent implements AfterViewInit {
  @ViewChild('imagePresentationElement') imagePresentationElement: ElementRef;
  @ViewChild('imageItemBrand') imageItemBrand: ElementRef;
  selectValidationStandarAndReactiveBiologic$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationStandardAndReactiveBiologicBackUp,
  );
  selectValidationStandarAndReactiveChemist$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationStandardAndReactiveChemistBackUp,
  );
  selectValidationPublications$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationPublicationsBackUp,
  );
  selectValidationLabware$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationLabwareBackUp,
  );
  selectValidationMedicalDevices$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationMedicalDevicesBackUp,
  );
  selectValidationTrainings$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationTrainingBackup,
  );
  selectValidationStandards$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationStandardsBackup,
  );
  selectValidationReagents$: Observable<boolean> = this.store.select(
    productDetailsSelectors.selectValidationConfigurationReagentsBackup,
  );
  productInfo$: Observable<IProductInfo> = this.store.select(
    productDetailsSelectors.selectBackUpProductDetails,
  );
  selectBroadCastMediaSelected$: Observable<string> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectBroadCastMediaSelected,
  );
  providerSalesCurrency$: Observable<string> = this.store.select(
    productTechnicalCommercialInvestigationSelectors.selectProviderSalesCurrency,
  );
  readonly typeFamilyKeys = ENUM_PRODUCT_FAMILY_KEY;
  readonly availabilityTypes = AVAILABILITY_TYPES;
  defaultHoverImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  defaultHoverImageBrandSource = 'assets/Images/products/undefined_hover.svg';

  imagePresentationNativeElement;
  imageBrandElement;
  constructor(private store: Store<AppState>, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.imagePresentationNativeElement = this.renderer.selectRootElement(
      this.imagePresentationElement,
    ).nativeElement;
    this.imageBrandElement = this.renderer.selectRootElement(this.imageItemBrand).nativeElement;
  }
  errorImgBrandHandler(): void {
    this.renderer.setAttribute(this.imageBrandElement, 'src', this.defaultHoverImageSource);
  }
  errorImgHandler(): void {
    this.renderer.setAttribute(
      this.imagePresentationNativeElement,
      'src',
      this.defaultHoverImageBrandSource,
    );
  }
}
