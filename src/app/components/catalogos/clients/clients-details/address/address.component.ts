// CORE
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {debounce, isEmpty} from 'lodash-es';
// ACTIONS
import {addressesActions} from '@appActions/forms/client-form';
import * as clientsAddressActions from '@appActions/forms/client-form/clients-details-form/address-clients-form/address-clients-form.actions';
// MODELS
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DatosDireccionClienteComentario, HorarioAtencion, VCliente} from 'api-catalogos';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  IDireccion,
  IHorarioAtencion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
// SELECTORS
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {
  clientsAddressSelectors,
  clientsDetailsSelectors,
  clientsSelectors,
} from '@appSelectors/forms/clients-form';
import {MatDialog} from '@angular/material/dialog';
import {AddScheduleComponent} from '@appComponents/catalogos/clients/clients-details/address/add-schedule/add-schedule.component';
import {DeliveryAddressesDialogComponent} from '@appComponents/catalogos/clients/clients-details/address/delivery-addresses-dialog/delivery-addresses-dialog.component';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageClient: ElementRef;

  addressOnly$: Observable<Array<IDireccion>> = this.store.select(
    clientsAddressSelectors.selectAddressOnly,
  );
  selectedAddress$: Observable<IDireccion> = this.store.select(
    clientsAddressSelectors.selectedAddress,
  );
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  deliveryComments$: Observable<Array<DatosDireccionClienteComentario>> = this.store.select(
    clientsAddressSelectors.selectDeliveryComments,
  );
  reviewComments$: Observable<Array<DatosDireccionClienteComentario>> = this.store.select(
    clientsAddressSelectors.selectReviewComments,
  );
  chargesComments$: Observable<Array<DatosDireccionClienteComentario>> = this.store.select(
    clientsAddressSelectors.selectChargesComments,
  );
  visitComments$: Observable<Array<DatosDireccionClienteComentario>> = this.store.select(
    clientsAddressSelectors.selectVisitComments,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  deliveryComment: Observable<DatosDireccionClienteComentario> = this.store.select(
    clientsAddressSelectors.selectDeliveryComment,
  );
  reviewDataComment: Observable<DatosDireccionClienteComentario> = this.store.select(
    clientsAddressSelectors.selectReviewDataComment,
  );
  chargesDataComment: Observable<DatosDireccionClienteComentario> = this.store.select(
    clientsAddressSelectors.selectChargesDataComment,
  );
  visitComment: Observable<DatosDireccionClienteComentario> = this.store.select(
    clientsAddressSelectors.selectVisitComment,
  );
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  lodashIsEmpty = isEmpty;
  scheduleValue;
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  imageNativeElement;
  errorImageNativeElement = false;
  handleKeySearch = debounce((data) => this.searchTerm(data), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(addressesActions.ON_INIT_COMPONENT_EFFECT());
  }

  ngOnDestroy(): void {
    this.store.dispatch(addressesActions.CLEAN_ADDRESS_CLIENT_STATE());
  }

  selectAddress(address: IDireccion): void {
    this.store.dispatch(addressesActions.SELECT_ADDRESS({address}));
  }

  handleNewAddress(address: IDireccion | null, isEdit: boolean, index: number | null): void {
    const dialogRef = this.dialog.open(DeliveryAddressesDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        title: isEdit ? 'EDITAR DIRECCIÓN' : 'AGREGAR DIRECCIÓN',
        isEdit,
        address,
      },
      panelClass: 'mat-dialog-style',
    });
    this.store.dispatch(
      addressesActions.EDIT_ADDRESS_COMPONENT_EFFECT({
        address: address,
        index: index,
        isEdit: isEdit,
      }),
    );
    dialogRef.afterClosed().subscribe((value) => {
      this.store.dispatch(clientsAddressActions.CLOSE_MODAL_COMPONENT_EFFECT({value}));
    });
  }

  setComment(value, node): void {
    this.store.dispatch(addressesActions.SET_COMMENT_SCHEDULE_TYPE({value, node}));
  }

  addComment(type: string): void {
    this.store.dispatch(addressesActions.ADD_COMMENT_COMPONENT_EFFECT({addressType: type}));
  }

  deleteComment(comment: DatosDireccionClienteComentario): void {
    this.store.dispatch(addressesActions.DELETE_COMMENT({comment}));
  }

  handleSchedule(tipo: string, editR: boolean, srcR: string): void {
    this.scheduleValue = {type: tipo, edit: editR, src: srcR};
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        ...this.scheduleValue,
        title: 'AGREGAR HORARIO',
      },
      panelClass: 'mat-dialog-style',
    });

    dialogRef
      .afterClosed()
      .subscribe((data: {event: boolean; scheduleList: IHorarioAtencion[]}) => {
        if (data.event) {
          const scheduleListDis = data.scheduleList.filter(
            (item: IHorarioAtencion): boolean => item.checked,
          );
          this.store.dispatch(
            addressesActions.SAVE_SCHEDULE({
              schedule: scheduleListDis,
              scheduleType: tipo,
            }),
          );
        }
      });
  }

  setDeliveryData(input: string, value: any): void {
    this.store.dispatch(addressesActions.SET_DELIVERY_DATA({value, input}));
  }

  deleteAddress(address: IDireccion): void {
    this.store.dispatch(addressesActions.DELETE_ADDRESS({address}));
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  searchTerm(searchTerm: string): void {
    this.store.dispatch(addressesActions.SET_SEARCH_TERM({searchTerm}));
  }

  addressTrackBy(index: number, address: IDireccion): string {
    return address.IdDireccion;
  }

  commentsTrackBy(index, comment: DatosDireccionClienteComentario): string {
    return comment.IdDatosDireccionClienteComentario;
  }

  scheduleTrackBy(index, schedule: HorarioAtencion): string {
    return schedule.IdHorarioAtencion;
  }
}
