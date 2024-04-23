import {ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ReatenderPartidaInvestigacion} from 'api-logistica';
import {quotationDetailsActions} from '@appActions/quotation';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {IMessageHistory} from '@appModels/shared-components/message-history';
import {ICotPartidaInvetigacionAtencionComentariosObj} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ENUM_PRODUCT_FAMILY, ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';
import {selectShowMessageConfiguration} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

@Component({
  selector: 'app-investigation-details',
  templateUrl: './investigation-details.component.html',
  styleUrls: ['./investigation-details.component.scss'],
})
// TODO volver reutilizable
export class InvestigationDetailsComponent {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() isOpen: boolean;
  @Input() data: ICotPartidaInvetigacionAtencionComentariosObj;

  cotPartidaCotizacionInvestigacionMessages$: Observable<
    Array<IMessageHistory>
  > = this.store.select(quotationDetailsSelectors.selectAttendedInvestigationHistoryChat);
  selectReattendedInvestigation$: Observable<ReatenderPartidaInvestigacion> = this.store.select(
    quotationDetailsSelectors.selectReattendedInvestigation,
  );
  showMessageConfiguration$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectShowMessageConfiguration,
  );
  imageNativeElement;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  readonly productsType = ENUM_PRODUCT_FAMILY_KEY;

  constructor(private store: Store, private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  setEviComment(comment: string) {
    this.store.dispatch(quotationDetailsActions.SET_EVI_COMMENT({comment: comment?.trim()}));
  }

  handleSendResponse() {
    this.store.dispatch(quotationDetailsActions.SET_REATTEND_INVESTIGATION_LOAD());
  }

  handleAddToQuotation(data: ICotPartidaInvetigacionAtencionComentariosObj) {
    this.store.dispatch(
      quotationDetailsActions.SET_ADD_ITEM_INVESTIGATION_TO_QUOTATION_LOAD({
        investigationId: data.cotPartidaCotizacionInvestigacion.IdCotPartidaCotizacionInvestigacion,
      }),
    );
  }

  closeDetailsInvestigation() {
    this.store.dispatch(
      quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION({value: false}),
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  errorImage(): void {
    this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
  }
}
