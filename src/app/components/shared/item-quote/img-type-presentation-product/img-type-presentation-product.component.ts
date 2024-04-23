/* Core Imports */
import {ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {ColumnImgTypePresentationProduct} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-img-type-presentation-product-item',
  templateUrl: './img-type-presentation-product.component.html',
  styleUrls: ['./img-type-presentation-product.component.scss'],
})
export class ImgTypePresentationProductComponent {
  @Input() columnImgTypePresentationProduct: ColumnImgTypePresentationProduct;
  @ViewChild('imageElement') imageElement: ElementRef;
  readonly defaultImageSource = 'assets/Images/logo_pqf_cliente.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.columnImgTypePresentationProduct?.src) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }
  }
  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElement = false;
    return this.defaultImageSource;
  }
  errorImage(): void {
    if (this.columnImgTypePresentationProduct?.src) {
      if (!this.errorImageNativeElement) {
        this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
        this.errorImageNativeElement = true;
      }
      this.setImage();
    }
  }
}
