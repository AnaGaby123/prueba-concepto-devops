import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  IProductCardItem,
  IProductLinked,
} from '@appModels/shared-components/product-card-item.models';
import {AVAILABILITY_TYPES, ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-card-item',
  templateUrl: './product-card-item.component.html',
  styleUrls: ['./product-card-item.component.scss'],
})
export class ProductCardItemComponent implements AfterViewInit {
  @Input() backGroundColor = 'default'; // DOCS cambiara el color de fondo del componente y su hover
  @Input() borderColorWhite = false; // DOCS muestra un borde de color blanco al ser true
  @Input() product: IProductCardItem; // DOCS Objeto de tipo IProducto a pintar
  @Input() showAvailability = false; // DOCS al ser true mostrara los indicadores de disponibilidad
  @Input() showCheck = false; // DOCS al ser true mostrara el check
  @Input() showIndex = true;
  @Output() emitResponse: EventEmitter<IProductLinked> = new EventEmitter<IProductLinked>();
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

  emitValue(value: any): void {
    const productLinked: IProductLinked = {
      value,
      product: this.product,
    };
    this.emitResponse.emit(productLinked);
  }

  setIndicatorColor(value: string): string {
    if (value !== null) {
      return value === AVAILABILITY_TYPES.available
        ? 'enable'
        : value === AVAILABILITY_TYPES.backorder
        ? 'backOrder'
        : value === AVAILABILITY_TYPES.notmarketable
        ? 'unmarketable'
        : value === AVAILABILITY_TYPES.discontinued
        ? 'discontinued'
        : '';
    }
  }

  setTextIndicatorColor(value: string): string {
    if (value !== null) {
      return value === AVAILABILITY_TYPES.available
        ? 'enable-text'
        : value === AVAILABILITY_TYPES.backorder
        ? 'backOrder-text'
        : value === AVAILABILITY_TYPES.notmarketable
        ? 'unmarketable-text'
        : value === AVAILABILITY_TYPES.discontinued
        ? 'discontinued-text'
        : '';
    }
  }
}
