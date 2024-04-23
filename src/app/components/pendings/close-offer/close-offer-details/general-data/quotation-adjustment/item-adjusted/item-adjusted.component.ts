import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  IQuotation,
  ITipoAjustePrecioObj,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {Observable} from 'rxjs';
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';

@Component({
  selector: 'app-item-adjusted',
  templateUrl: './item-adjusted.component.html',
  styleUrls: ['./item-adjusted.component.scss'],
})
export class ItemAdjustedComponent implements OnInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() item: ITipoAjustePrecioObj;
  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);

  readonly typeItem = QuotationItemTypes;
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  imageNativeElement;
  errorImageNativeElement = false;
  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {}
  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(src?: string) {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }
}
