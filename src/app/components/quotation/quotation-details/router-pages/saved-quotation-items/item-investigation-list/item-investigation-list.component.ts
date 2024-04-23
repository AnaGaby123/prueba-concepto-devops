import {ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {
  ENUM_STATUS_INVESTIGATION_ITEM,
  ICotPartidasInvetigacionCotizacion,
  IQuotation,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {quotationDetailsActions} from '@appActions/quotation';
import {getOnlyFileName} from '@appUtil/files';
import {CatQuotationState} from '@appHelpers/pending/quotation/quotation.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {MatDialog} from '@angular/material/dialog';
import {SeeProductInInvestigationDialogComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-investigation-list/see-product-in-investigation-dialog/see-product-in-investigation-dialog.component';
import {CatEstadoCotizacion} from 'api-catalogos';

@Component({
  selector: 'app-item-investigation-list',
  templateUrl: './item-investigation-list.component.html',
  styleUrls: ['./item-investigation-list.component.scss'],
})
export class ItemInvestigationListComponent {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() investigationProducts: Array<ICotPartidasInvetigacionCotizacion>;

  selectedQuotation$: Observable<IQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotation,
  );
  selectInternalSalesInvestigationItem$: Observable<InternalSalesItem[]> = this.store.select(
    quotationDetailsSelectors.selectInternalSalesInvestigationItem,
  );
  selectedQuotationStatus$: Observable<CatEstadoCotizacion> = this.store.select(
    quotationDetailsSelectors.selectedQuotationStatus,
  );
  readonly catQuotationState = CatQuotationState;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  statusItemInvestigation = ENUM_STATUS_INVESTIGATION_ITEM;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) {}

  closeDetailsInvestigationProductPop() {
    this.store.dispatch(quotationDetailsActions.SET_INVESTIGATION_PRODUCT_POP_UP({item: null}));
    this.store.dispatch(
      quotationDetailsActions.SET_INVESTIGATION_PRODUCT_ACTIVE_POP_UP({isOpen: false}),
    );
  }

  errorImage(): void {
    this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
  }

  seeDetailsInvestigation(item: ICotPartidasInvetigacionCotizacion): void {
    const dialogRef = this.dialog.open(SeeProductInInvestigationDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        item,
      },
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(quotationDetailsActions.SET_INVESTIGATION_PRODUCT_POP_UP({item: null}));
    });
  }

  getFileName(file) {
    return getOnlyFileName(file);
  }

  openInvestigationAttended(itemInvestigation: ICotPartidasInvetigacionCotizacion) {
    if (
      itemInvestigation.ProductoInvestigacionObj.ClaveEstadoInvestigacion ===
      this.statusItemInvestigation.ATTENDED
    ) {
      this.store.dispatch(
        quotationDetailsActions.SET_ATTEND_INVESTIGATION_LOAD({itemInvestigation}),
      );
    }
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.InternalSalesAction:
        this.openInvestigationAttended(event.data);
        break;
      case NameActionsInternalSalesItem.SeeMoreAction: {
        this.seeDetailsInvestigation(event.data);
        break;
      }
    }
  }
}
