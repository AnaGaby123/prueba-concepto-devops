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
import {toLower} from 'lodash-es';

import {getIncomeLevelImage} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-generic-grid-item',
  templateUrl: './generic-grid-item.component.html',
  styleUrls: ['./generic-grid-item.component.scss'],
})
export class GenericGridItemComponent implements AfterViewInit {
  @Input() hoverRightImageSource = 'assets/Images/mas.svg';
  @Input() item: IItemCatalogData;
  @Input() showSegmentation = false;
  @Input() showActiveIndicator = true;
  @Input() showRightImage = false;
  @Input() rightImageSource = 'assets/Images/mas_gris.svg';
  @Output() emitValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitRightImageClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('imageElement') imageElement: ElementRef;
  @ViewChild('imageElementHover') imageElementHover: ElementRef;

  defaultHoverImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_default.svg';
  imageNativeElement;
  hoverNativeElement;
  errorImageNativeElement = false;
  errorHoverNativeElement = false;
  readonly lodashToLower = toLower;
  incomeLevelHelper = getIncomeLevelImage;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
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

  emitResponse(): void {
    this.emitValue.emit();
  }

  handleRightImageClick(event: MouseEvent): void {
    event.stopPropagation();
    this.emitRightImageClick.emit();
  }
}
