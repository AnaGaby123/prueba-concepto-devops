import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {IProductCardItem} from '@appModels/shared-components/product-card-item.models';
import {AVAILABILITY_TYPES, ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent implements AfterViewInit {
  @Input() product: IProductCardItem; // DOCS Objeto de tipo IProducto a pintar
  @ViewChild('imagePresentationElement') imagePresentationElement: ElementRef;
  @ViewChild('imagePresentationElementHover') imagePresentationElementHover: ElementRef;
  @ViewChild('imageItemBrand') imageItemBrand: ElementRef;
  @ViewChild('imageItemBrandHover') imageItemBrandHover: ElementRef;
  defaultHoverImageSource = 'assets/Images/products/undefined.svg';
  defaultImageSource = 'assets/Images/products/undefined_hover.svg';
  errorImagePresentation = false;
  errorImagePresentationHover = false;
  errorImageBrand = false;
  errorImageBrandHover = false;
  imagePresentationNativeElement;
  imagePresentationHoverNativeElement;
  imageBrandElement;
  imageBrandHoverElement;
  readonly productType = ENUM_PRODUCT_FAMILY_KEY;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.imagePresentationNativeElement = this.renderer.selectRootElement(
      this.imagePresentationElement,
    ).nativeElement;
    this.imagePresentationHoverNativeElement = this.renderer.selectRootElement(
      this.imagePresentationElementHover,
    ).nativeElement;
    this.imageBrandElement = this.renderer.selectRootElement(this.imageItemBrand).nativeElement;
    this.imageBrandHoverElement = this.renderer.selectRootElement(
      this.imageItemBrandHover,
    ).nativeElement;
  }

  setIndicatorColor(value: string): string {
    if (value !== null) {
      return value.toLowerCase() === AVAILABILITY_TYPES.available
        ? 'enable'
        : value.toLowerCase() === AVAILABILITY_TYPES.backorder
        ? 'backOrder'
        : value.toLowerCase() === AVAILABILITY_TYPES.notmarketable
        ? 'unmarketable'
        : value.toLowerCase() === AVAILABILITY_TYPES.discontinued
        ? 'discontinued'
        : '';
    }
  }

  setTextIndicatorColor(value: string): string {
    if (value !== null) {
      return value.toLowerCase() === AVAILABILITY_TYPES.available
        ? 'enable-text'
        : value.toLowerCase() === AVAILABILITY_TYPES.backorder
        ? 'backOrder-text'
        : value.toLowerCase() === AVAILABILITY_TYPES.notmarketable
        ? 'unmarketable-text'
        : value.toLowerCase() === AVAILABILITY_TYPES.discontinued
        ? 'discontinued-text'
        : '';
    }
  }

  errorImgBrandHandler(): void {
    if (!this.errorImageBrand) {
      this.renderer.setAttribute(this.imageBrandElement, 'src', this.defaultImageSource);
      this.errorImageBrand = true;
    }
  }
  errorImgBrandHandlerHover(): void {
    if (!this.errorImageBrandHover) {
      this.renderer.setAttribute(this.imageBrandHoverElement, 'src', this.defaultHoverImageSource);
      this.errorImageBrandHover = true;
    }
  }
  errorImgHandler(): void {
    if (!this.errorImagePresentation) {
      this.renderer.setAttribute(
        this.imagePresentationNativeElement,
        'src',
        this.defaultImageSource,
      );
      this.errorImagePresentation = true;
    }
  }

  errorImgHandlerHover(): void {
    if (!this.errorImagePresentationHover) {
      this.renderer.setAttribute(
        this.imagePresentationHoverNativeElement,
        'src',
        this.defaultHoverImageSource,
      );
      this.errorImagePresentationHover = true;
    }
  }
}
