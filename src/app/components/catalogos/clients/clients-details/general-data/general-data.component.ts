// CORE
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
// MODELS
import {ContactoDetalleObj, VCliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IContactItem} from '@appModels/shared-components/contact-item.models';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {
  ClientTerceroAutorizadoRelacion,
  IContactoDetalleObj,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
// ACTIONS
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
// SELECTORS
import {clientsGeneralDataSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
// UTILS
import {isEmpty, toLower} from 'lodash-es';
import {getIncomeLevelImage, InputValidators} from '@appHelpers/shared/shared.helpers';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import {MatDialog} from '@angular/material/dialog';
import {AddContactDialogComponent} from '@appComponents/catalogos/clients/clients-details/general-data/add-contact-dialog/add-contact-dialog.component';
import {ENUM_CLIENT_SECTOR} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {
  selectIsUserCoordinadorDeServicioAlCliente,
  selectIsUserCoordinadorDeVentaInterna,
} from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralDataComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef;
  readonly FIELD_NOMBRES = 'Nombres';
  readonly FIELD_APELLIDO_PATERNO = 'ApellidoPaterno';
  readonly FIELD_APELLIDO_MATERNO = 'ApellidoMaterno';
  readonly FIELD_TITULO = 'Titulo';
  readonly FIELD_PUESTO = 'Puesto';
  readonly FIELD_DEPARTAMENTO = 'Departamento';
  readonly FIELD_EMAIL = 'email';
  readonly FIELD_PHONE_1 = 'phone1';
  readonly FIELD_PHONE_2 = 'phone2';
  readonly PUBLIC_SECTOR = ENUM_CLIENT_SECTOR.PUBLIC;
  // CONTROLS
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);

  viewType$: Observable<string> = this.store.select(selectViewType);
  // GENERAL DATA
  selectedClient$: Observable<VCliente> = this.store.select(
    clientsGeneralDataSelectors.selectedClient,
  );
  selectSectors$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatSectorForDropDown,
  );
  sector$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedSector,
  );
  selectRoles$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatRolClientsForDropDown,
  );
  clientRole$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedClientRole,
  );
  selectIndustries$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selecCatIndustriaForDropDown,
  );
  industry$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedIndustry,
  );
  optionSellers$: Observable<any[]> = this.store.select(
    clientsGeneralDataSelectors.selectListSellersForDropDown,
  );
  seller$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedSeller,
  );
  tercerosAutorizadosList$: Observable<Array<DropListOption>> = this.store.select(
    clientsGeneralDataSelectors.selectTercerosAutorizadosForDropDown,
  );
  authorizedThirdSelected$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectAuthorizedThirdSelected,
  );

  clientAuthorized$: Observable<Array<ClientTerceroAutorizadoRelacion>> = this.store.select(
    clientsGeneralDataSelectors.selectClientAuthorized,
  );
  // contacts
  contacts$: Observable<Array<ContactoDetalleObj>> = this.store.select(
    clientsGeneralDataSelectors.selectSortedClientContacts,
  );
  isUserAnalistaDeCuentasPorCobrar$: Observable<boolean> = this.store.select(
    clientsGeneralDataSelectors.selectIsUserAnalistaDeCuentasPorCobrar,
  );
  isUserCoordinadorDeVentaInterna$: Observable<boolean> = this.store.select(
    clientsGeneralDataSelectors.selectIsUserCoordinadorDeVentaInterna,
  );
  isUserCoordinadorDeServicioAlCliente$: Observable<boolean> = this.store.select(
    clientsGeneralDataSelectors.selectIsUserCoordinadorDeServicioAlCliente,
  );
  esacList$: Observable<Array<DropListOption>> = this.store.select(
    clientsGeneralDataSelectors.selectUsersEsac,
  );
  selectedEsac$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedEsac,
  );
  collectorList$: Observable<Array<DropListOption>> = this.store.select(
    clientsGeneralDataSelectors.selectUsersCollectors,
  );
  selectedCollector$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedCollector,
  );
  commercialLeaders$: Observable<DropListOption[]> = this.store.select(
    clientsGeneralDataSelectors.selectUsersCommercialLeader,
  );
  selectedCommercialLeader$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedCommercialLeader,
  );

  coordinatorESACList$: Observable<DropListOption[]> = this.store.select(
    clientsGeneralDataSelectors.selectUsersCoordinatorESAC,
  );
  selectedCoordinatorESA$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedCoordinatorESAC,
  );

  selectIsUserCommercialLeaderOrCoordinatorESAC$: Observable<boolean> = this.store.select(
    clientsGeneralDataSelectors.selectIsUserCommercialLeaderOrCoordinatorESAC,
  );
  incomeLevelHelper = getIncomeLevelImage;
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  contactsListScroll: Array<IContactoDetalleObj> = [];
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  defaultDisableImageSource = 'assets/Images/cargar_foto_disabled.svg';
  errorImageNativeElement = false;
  errors = [];
  imageNativeElement;
  lodashIsEmpty = isEmpty;
  lodashToLower = toLower;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(clientsGeneralDataActions.INIT_GENERAL_DATA_COMPONENT_EFFECT());
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  setDataClient(input: string, value: any): void {
    if (input === 'ObjetivoCrecimientoFundamental' || input === 'ObjetivoCrecimientoDeseado') {
      value = Number(value);
    }
    this.store.dispatch(clientsGeneralDataActions.SET_DATA_CLIENT({input, value}));
  }

  setDropData(idInput: string, stringInput: string, value: DropListOption): void {
    this.store.dispatch(clientsGeneralDataActions.SET_DROP_DATA({idInput, stringInput, value}));
    if (idInput === 'IdUsuarioCoordinadorDeServicioAlCliente') {
      this.store.dispatch(
        clientsGeneralDataActions.SET_DROP_DATA({
          idInput: 'IdUsuarioESAC',
          stringInput: 'ESAC',
          value: null,
        }),
      );
    }
    if (idInput === 'IdUsuarioCoordinadorDeVentaInterna') {
      this.store.dispatch(
        clientsGeneralDataActions.SET_DROP_DATA({
          idInput: 'IdUsuarioVendedor',
          stringInput: 'UsuarioVendedor',
          value: null,
        }),
      );
    }
  }

  handleContact(contact: ContactoDetalleObj | null, isEdit: boolean): void {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      data: {
        isEdit,
        contact,
      },
    });

    dialogRef.afterClosed().subscribe((value) => {
      this.store.dispatch(clientsGeneralDataActions.OPEN_MODAL_COMPONENT_EFFECT({value}));
    });
  }

  removeContact(contact: IContactoDetalleObj): void {
    this.store.dispatch(clientsGeneralDataActions.REMOVE_CONTACT({contact}));
  }

  buildContact(contact): IContactItem {
    if (contact) {
      return {
        active: contact.Activo,
        contactId: contact.IdContacto,
        department: contact.Departamento,
        job: contact.Puesto,
        mail: contact.CorreoElectronico[0] || null,
        mSurName: contact.ApellidoMaterno,
        name: contact.Nombres,
        phone: contact.NumeroTelefonico[0] || null,
        surName: contact.ApellidoPaterno,
      };
    } else {
      return null;
    }
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(clientActive?: boolean, src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        if (clientActive === true) {
          return this.defaultImageSource;
        } else if (clientActive === false) {
          return this.defaultDisableImageSource;
        }
      }
    }
    return this.defaultImageSource;
  }

  setAuthorizedThirdSelected(value: DropListOption): void {
    this.store.dispatch(clientsGeneralDataActions.SET_AUTHORIZED_THIRD_SELECTED({value}));
  }

  addTercero(): void {
    this.store.dispatch(clientsGeneralDataActions.ADD_THIRD_COMPONENT_EFFECT());
  }

  removeTercero(item): void {
    this.store.dispatch(
      clientsGeneralDataActions.REMOVE_TERCERO_AUTORIZADO({
        terceroAutorizado: item,
      }),
    );
  }

  ngOnDestroy(): void {
    /*   DOCS: Solo se reinicia el bóton de edición a false, ya que reiniicar todo el estado podría tener implicaciones
          en multiples funciones
      */
    this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
  }
}
