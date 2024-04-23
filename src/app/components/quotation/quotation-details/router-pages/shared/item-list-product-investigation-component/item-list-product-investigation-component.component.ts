import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ENUM_STATUS_INVESTIGATION_ITEM,
  ICotPartidasInvetigacionCotizacion,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-item-list-product-investigation-component',
  templateUrl: './item-list-product-investigation-component.component.html',
  styleUrls: ['./item-list-product-investigation-component.component.scss'],
})
export class ItemListProductInvestigationComponentComponent implements OnInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() item: ICotPartidasInvetigacionCotizacion;
  @Output() event: EventEmitter<ICotPartidasInvetigacionCotizacion> = new EventEmitter<
    ICotPartidasInvetigacionCotizacion
  >();
  statusItemInvestigation = ENUM_STATUS_INVESTIGATION_ITEM;
  imageNativeElement;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  errorImage(): void {
    this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
  }

  seeDetailsInvestigationProduct(itemInvestigation: ICotPartidasInvetigacionCotizacion) {
    this.event.emit(itemInvestigation);
  }
}
