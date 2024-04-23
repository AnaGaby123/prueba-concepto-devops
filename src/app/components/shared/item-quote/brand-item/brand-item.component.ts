/* Core Imports */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {ColumnBrand, NameActionsInternalSalesItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.scss'],
})
export class BrandItemComponent {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() columnBrand: ColumnBrand;
  @Output() valueEmitter: EventEmitter<{
    event: Event;
    target: any;
    value: boolean;
    action: string;
  }> = new EventEmitter<{
    event: Event;
    target: any;
    value: boolean;
    action: NameActionsInternalSalesItem;
  }>();
  readonly nameActionsInternalSalesItem = NameActionsInternalSalesItem;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.columnBrand?.src) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }
  }
  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}
  handleClick(
    event: Event,
    target: any,
    value: boolean,
    action: NameActionsInternalSalesItem,
  ): void {
    this.valueEmitter.emit({
      event,
      target,
      value,
      action,
    });
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
    if (this.columnBrand?.src) {
      if (!this.errorImageNativeElement) {
        this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
        this.errorImageNativeElement = true;
      }
      this.setImage();
    }
  }
}
