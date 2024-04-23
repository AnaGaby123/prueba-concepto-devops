// CORE
import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
// SELECTORS
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {clientDeliveryBillingSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
import {
  dropListMoneda,
  selectListMercantileSocietyForDropDown,
  selectListRegimenFiscalForDropDown,
  selectListThemesCommentsForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {selectCompany} from '@appSelectors/forms/clients-form/clients-details/clients-delivery-billing-form.selectors';
// MODELS
import {
  IBilling,
  IDireccionClienteDetalle,
  ITemporalRestriction,
  ITopicComments,
} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';
import {
  CorreoValidacionFacturacionCliente,
  RestriccionMensualDatosFacturacion,
  RestriccionTemporalDatosFacturacion,
} from 'api-catalogos';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
// ACTIONS
import {deliveryBillingActions} from '@appActions/forms/client-form';
// UTILS
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {CalendarDay} from '@appModels/calendario/calendar';
import {isEmpty} from 'lodash-es';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  currentDateWithHoursInZeroUTCFormatDate,
  currentDateWithoutHoursUTCFormatDate,
} from '@appUtil/dates';
import {MatDialog} from '@angular/material/dialog';
import {AddressDialogComponent} from '@appComponents/catalogos/clients/clients-details/address/address-dialog/address-dialog.component';
import {authDialogActions} from '@appActions/dialogs';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-delivery-billing',
  templateUrl: './delivery-billing.component.html',
  styleUrls: ['./delivery-billing.component.scss'],
})
export class DeliveryBillingComponent implements OnInit, OnDestroy {
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  billing$: Observable<IBilling> = this.store.select(clientDeliveryBillingSelectors.selectBilling);
  temporalRestriction$: Observable<ITemporalRestriction> = this.store.select(
    clientDeliveryBillingSelectors.selectTemporalRestriction,
  );
  selectRestrictionValidation$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.restrictionValidation,
  );
  selectRestrictionValidationDisable$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.restrictionValidationDisable,
  );
  selectEmailValidation$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.emailValidation,
  );
  selectEmailValidationDisable$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.emailValidationDisable,
  );
  commentValidationDisable$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.commentValidationDisable,
  );
  commentValidation$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.commentValidations,
  );
  selectBillingMonthlyRestriction$: Observable<
    RestriccionMensualDatosFacturacion
  > = this.store.select(clientDeliveryBillingSelectors.selectBilligMonthlyRestriction);
  rfcValidation$: Observable<boolean> = this.store.select(
    clientDeliveryBillingSelectors.selectRfcValidation,
  );
  selectClientDirection$: Observable<IDireccionClienteDetalle> = this.store.select(
    clientDeliveryBillingSelectors.selectClientAddress,
  );
  selectWhoBillsSelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectWhoBills,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  selectBillingCurrencySelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectBillingCurrency,
  );
  selectMercantileSocietySelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectMercantileSociety,
  );
  selectTaxRegimeSelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectTaxRegime,
  );
  selectOfferCurrencySelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectOfferCurrency,
  );
  selectTypesChanges$: Observable<Array<DropListOption>> = this.store.select(
    clientDeliveryBillingSelectors.selectTypesChanges,
  );
  selectTypeChangesSelected$: Observable<DropListOption> = this.store.select(
    clientDeliveryBillingSelectors.selectTypeChangesSelected,
  );
  selectMercantileSocietyTypes$: Observable<Array<DropListOption>> = this.store.select(
    selectListMercantileSocietyForDropDown,
  );
  selectTaxRegime$: Observable<Array<DropListOption>> = this.store.select(
    selectListRegimenFiscalForDropDown,
  );
  selectDropListCurrency$: Observable<Array<DropListOption>> = this.store.select(dropListMoneda);
  selectEnterprise$: Observable<Array<DropListOption>> = this.store.select(selectCompany);
  selectThemes$: Observable<Array<DropListOption>> = this.store.select(
    selectListThemesCommentsForDropDown,
  );
  selectComment$: Observable<ITopicComments> = this.store.select(
    clientDeliveryBillingSelectors.selectComment,
  );
  selectEmail$: Observable<CorreoValidacionFacturacionCliente> = this.store.select(
    clientDeliveryBillingSelectors.selectEmail,
  );
  selectClienteTCDOFVigencia$: Observable<Date> = this.store.select(
    clientDeliveryBillingSelectors.selectClientTCDOFDAte,
  );
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  defaultId = DEFAULT_UUID;
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  initialDate = currentDateWithoutHoursUTCFormatDate();
  lodashIsEmpty = isEmpty;
  validEmail = false;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.store.dispatch(
      authDialogActions.FETCH_AUTHORIZATION_DETAILS({authType: 'tipodecambiodof'}),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(deliveryBillingActions.CLEAN_DELIVERY_BILLING_CLIENT_STATE());
  }

  handleAddress(isEdit: boolean): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        isEdit,
      },
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      this.store.dispatch(deliveryBillingActions.CLOSE_MODAL_COMPONENT_EFFECT({value}));
      if (value) {
        this.store.dispatch(deliveryBillingActions.VALIDATE_RFC());
      }
    });
  }

  setDataBilling(value, node: string): void {
    this.store.dispatch(
      deliveryBillingActions.SET_DATA_BILLING_COMPONENT_EFFECT({
        value,
        node,
      }),
    );
  }

  setDataBillingDropList(value: DropListOption, node: string, selectedNode: string): void {
    this.store.dispatch(
      deliveryBillingActions.SET_DATA_BILLING_DROPLIST({
        payload: value,
        node,
        selectedNode,
      }),
    );
    this.store.dispatch(deliveryBillingActions.UPDATE_CHANGE_TYPE_VALIDATION());
  }

  setDataRestriction(payload: string | boolean, node: string): void {
    this.store.dispatch(
      deliveryBillingActions.SET_DATA_RESTRICTION({
        payload,
        node,
      }),
    );
  }

  setCFDIValidation(value: IRadioButton, node: string): void {
    if (value.value) {
      value = {
        ...value,
        label: node,
      };
      this.store.dispatch(deliveryBillingActions.SET_CFDI_VALIDATION({value, node}));
    }
  }

  setRestricitionType(value: boolean, node: string): void {
    this.store.dispatch(deliveryBillingActions.SET_RESTRICTION_TYPE({value, node}));
  }

  setDataThemeDropList(value): void {
    this.store.dispatch(deliveryBillingActions.SET_THEME_COMMENT({value}));
  }

  deleteComent(item: ITopicComments): void {
    this.store.dispatch(deliveryBillingActions.SET_DISABLE_COMMENT({payload: item}));
  }

  deleteEmail(item: CorreoValidacionFacturacionCliente): void {
    this.store.dispatch(deliveryBillingActions.SET_DISABLE_EMAIL({payload: item}));
  }

  deleteEvent(item: RestriccionTemporalDatosFacturacion): void {
    this.store.dispatch(deliveryBillingActions.SET_DISABLE_EVENT({payload: item}));
  }

  setTextComment(value: string): void {
    this.store.dispatch(deliveryBillingActions.SET_TEXT_COMMENT({value}));
  }

  addComent(): void {
    this.store.dispatch(deliveryBillingActions.SET_ADD_COMMENT());
  }

  setEmail(value: string): void {
    this.store.dispatch(deliveryBillingActions.SET_EMAIL_ADDRESS({value}));
  }

  setErrorData(error): void {
    this.validEmail = !error.errors;
  }

  addEmail(): void {
    this.store.dispatch(deliveryBillingActions.SET_ADD_EMAIL());
  }

  addEvent(): void {
    this.store.dispatch(deliveryBillingActions.SET_ADD_EVENT());
  }

  setTypeChange(payload: DropListOption): void {
    this.store.dispatch(deliveryBillingActions.SET_TYPE_CHANGE({payload}));
  }

  setDateStart(value): void {
    this.store.dispatch(
      deliveryBillingActions.SET_RESTRICTION_DATE_START({
        value: currentDateWithHoursInZeroUTCFormatDate(value),
      }),
    );
  }

  setTitle(value: string): void {
    this.store.dispatch(
      deliveryBillingActions.SET_TITLE_RESTRICTION({
        value,
      }),
    );
  }

  setDateEnd(value): void {
    this.store.dispatch(
      deliveryBillingActions.SET_RESTRICTION_DATE_END({
        value: currentDateWithHoursInZeroUTCFormatDate(value),
      }),
    );
  }

  closeModal(value): void {
    this.store.dispatch(deliveryBillingActions.CLOSE_MODAL_COMPONENT_EFFECT({value}));
  }

  directionData(value): string {
    let address = `${value?.Calle ? `${value?.Calle}` : ''} ${
      value?.NumeroExterior ? `No. ${value?.NumeroExterior}` : ''
    } ${value?.NumeroInterior ? 'Int. ' + value?.NumeroInterior : ''} ${
      value?.Colonia ? `Col. ${value?.Colonia}` : ''
    } ${value?.CodigoPostal ? `C.P. ${value?.CodigoPostal}` : ''}`;
    if (!address?.trim()) {
      address = 'N/D';
    }
    return address;
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

  handleValidationDate(date) {
    this.store.dispatch(deliveryBillingActions.HANDLE_VALIDATION_DATE({date: date.toISOString()}));
  }
}
