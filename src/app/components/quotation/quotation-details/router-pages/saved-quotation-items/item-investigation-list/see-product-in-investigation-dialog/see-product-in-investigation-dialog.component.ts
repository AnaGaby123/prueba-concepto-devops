import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {quotationDetailsActions} from '@appActions/quotation';
import {lastValueFrom, Observable} from 'rxjs';
import {ICotPartidasInvetigacionCotizacion} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {getOnlyFileName} from '@appUtil/files';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-see-product-dialog',
  templateUrl: './see-product-in-investigation-dialog.component.html',
  styleUrls: ['./see-product-in-investigation-dialog.component.scss'],
})
export class SeeProductInInvestigationDialogComponent implements OnInit {
  @ViewChild('imageElement') imageElement: ElementRef;

  popInvestigationProductData$: Observable<ICotPartidasInvetigacionCotizacion> = this.store.select(
    quotationDetailsSelectors.selectInvestigationProductPopUp,
  );

  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<SeeProductInInvestigationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: ICotPartidasInvetigacionCotizacion;
    },
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      quotationDetailsActions.SET_ADD_PRODUCT_FOUND_BY_PROVIDER_LOAD({
        item: this.data?.item,
      }),
    );
    this.store.dispatch(
      quotationDetailsActions.SET_INVESTIGATION_PRODUCT_POP_UP({
        item: this.data?.item,
      }),
    );
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  onClose() {
    this.dialog.close();
  }

  errorImage(): void {
    this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
  }

  getFileName(file) {
    return getOnlyFileName(file);
  }

  getFile(): void {
    this.store.dispatch(quotationDetailsActions.FETCH_EXTERNAL_FILE_LOAD_EVIDENCE());
  }

  async handleAddToQuotation(): Promise<void> {
    this.dialog.close();
    const investigationProductSelected = await lastValueFrom(
      this.store.pipe(select(quotationDetailsSelectors.selectInvestigationProductPopUp), take(1)),
    );
    this.store.dispatch(
      quotationDetailsActions.SET_ADD_ITEM_INVESTIGATION_TO_QUOTATION_LOAD({
        investigationId:
          investigationProductSelected.CotPartidaInvestigacionProducto
            .IdCotPartidaCotizacionInvestigacion,
      }),
    );
  }
}
