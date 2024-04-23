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
import {IItemCatalogData} from '@appModels/item-card-catalog/item-card-catalog';

@Component({
  selector: 'pqf-generic-grid-item',
  templateUrl: './pqf-generic-grid-item.component.html',
  styleUrls: ['./pqf-generic-grid-item.component.scss'],
})
export class PqfGenericGridItemComponent implements AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  @ViewChild('imageElementHover') imageElementHover: ElementRef;
  @Input() hoverRightImageSource = 'assets/Images/mas.svg';
  @Input() item: IItemCatalogData;
  @Input() rightImageSource = 'assets/Images/mas_gris.svg';
  @Input() showActiveIndicator = true;
  @Input() showRightImage = false;
  @Output() emitRightImageClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitValue: EventEmitter<any> = new EventEmitter<any>();

  defaultHoverImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_default.svg';
  errorHoverNativeElement = false;
  errorImageNativeElement = false;
  hoverNativeElement;
  imageNativeElement;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    this.hoverNativeElement = this.renderer.selectRootElement(this.imageElementHover).nativeElement;
  }

  errorImgHandler(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
  }

  errorImgHandlerHover(): void {
    if (!this.errorHoverNativeElement) {
      this.renderer.setAttribute(this.hoverNativeElement, 'src', this.defaultHoverImageSource);
      this.errorHoverNativeElement = true;
    }
  }

  emitResponse() {
    this.emitValue.emit();
  }

  handleRightImageClick(event: MouseEvent) {
    event.stopPropagation();
    this.emitRightImageClick.emit();
  }
}
