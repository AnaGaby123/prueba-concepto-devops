import {Component} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CotPartidaCotizacionInvestigacionAtencion} from 'api-logistica';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {attendInvestigationDetailsActions} from '@appActions/pendings/attend-investigation';
import {isEmpty} from 'lodash-es';
import {IProductInvestigation} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {AttendInvestigationProductsStatusKeys} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {IMessageHistory} from '@appModels/shared-components/message-history';
import {ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './list-right-sidebar.component.html',
  styleUrls: ['./list-right-sidebar.component.scss'],
})
export class ListRightSidebarComponent {
  productStatus = AttendInvestigationProductsStatusKeys;
  cotPartidaCotizacionInvestigacion$: Observable<
    CotPartidaCotizacionInvestigacionAtencion
  > = this.store.select(
    attendInvestigationDetailsSelectors.selectCotPartidaCotizacionInvestigacion,
  );
  cotPartidaCotizacionInvestigacionComentario$: Observable<
    Array<IMessageHistory>
  > = this.store.select(
    attendInvestigationDetailsSelectors.selectCotPartidaCotizacionInvestigacionComentario,
  );
  itemAttentionProduct$: Observable<IProduct> = this.store.select(
    attendInvestigationDetailsSelectors.selectItemAttentionProduct,
  );
  selectedProduct$: Observable<IProductInvestigation> = this.store.select(
    attendInvestigationDetailsSelectors.selectedProductInvestigation,
  );
  selectedProductInvestigationNewComment$: Observable<string> = this.store.select(
    attendInvestigationDetailsSelectors.selectedProductInvestigationNewComment,
  );
  sendResponse$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.sendResponseValidator,
  );
  sendProviderResponseValidator$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.sendProviderResponseValidator,
  );
  lodashIsEmpty = isEmpty;
  readonly productsType = ENUM_PRODUCT_FAMILY_KEY;

  constructor(private store: Store<AppState>) {}

  drop(event: CdkDragDrop<IProduct>): void {
    this.store.dispatch(attendInvestigationDetailsActions.DROP_PRODUCT({product: event.item.data}));
  }

  deleteProductDetails(): void {
    this.store.dispatch(attendInvestigationDetailsActions.REMOVE_PRODUCT_TO_ATTEND());
  }

  setRadioOption(prop: string, value: boolean) {
    this.store.dispatch(attendInvestigationDetailsActions.SET_RADIO_VALUE({prop, value}));
  }

  setEviComment(comment: string) {
    comment = comment?.trim();
    this.store.dispatch(attendInvestigationDetailsActions.SET_EVI_COMMENT({comment}));
  }

  handleSendResponse() {
    this.store.dispatch(attendInvestigationDetailsActions.SEND_RESPONSE_LOAD());
  }

  handleCancel() {
    this.store.dispatch(attendInvestigationDetailsActions.HANDLE_CANCEL_PRODUCT());
  }

  sendProviderResponse() {
    this.store.dispatch(attendInvestigationDetailsActions.FOUND_OR_NOT_METHOD());
  }
}
