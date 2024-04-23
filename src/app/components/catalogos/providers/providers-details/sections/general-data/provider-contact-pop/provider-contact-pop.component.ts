/*CORE*/
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
/*MODELS*/
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {NumeroTelefonico} from 'api-catalogos';
import {
  GeneralData,
  IContactoDetalleProvObj,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
/*ACTIONS*/
import {generalDataProviderActions} from '@appActions/forms/providers';
/*SELECTORS*/
import {generalDataProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {
  contactValidation,
  selectContactToEdit,
  selectContactToEditMobile,
  selectContactToEditPhone1,
  selectContactToEditPhone2,
  selectProvidersGeneralData,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';
import {
  selectListCatDecisionLevelForDropDown,
  selectListCatDifficultyForDropDown,
  selectListCatJobLevelForDropDown,
  selectListCatMaintenanceForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-provider-contact-pop',
  templateUrl: './provider-contact-pop.component.html',
  styleUrls: ['./provider-contact-pop.component.scss'],
})
export class ProviderContactPopComponent implements OnInit, AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  viewType$: Observable<string> = this.store.select(selectViewType);
  readonly inputValidators = InputValidators;
  editMode$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  generalData$: Observable<GeneralData> = this.store.select(selectProvidersGeneralData);
  providerData$: Observable<IVProveedor> = this.store.select(
    generalDataProviderSelectors.selectGeneralDataProviderObject,
  );
  contact$: Observable<IContactoDetalleProvObj> = this.store.select(selectContactToEdit);
  phone1$: Observable<NumeroTelefonico> = this.store.select(selectContactToEditPhone1);
  phone2$: Observable<NumeroTelefonico> = this.store.select(selectContactToEditPhone2);
  mobile$: Observable<NumeroTelefonico> = this.store.select(selectContactToEditMobile);
  difficultyOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectListCatDifficultyForDropDown,
  );
  maintenanceOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectListCatMaintenanceForDropDown,
  );
  decisionLevelOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectListCatDecisionLevelForDropDown,
  );
  jobLevelOptions: Observable<Array<DropListOption>> = this.store.select(
    selectListCatJobLevelForDropDown,
  );
  enableSaveContact$: Observable<boolean> = this.store.select(contactValidation);

  readonly FIELD_NOMBRES = 'Nombres';
  readonly FIELD_APELLIDO_PATERNO = 'ApellidoPaterno';
  readonly FIELD_APELLIDO_MATERNO = 'ApellidoMaterno';
  readonly FIELD_TITULO = 'Titulo';
  readonly FIELD_PUESTO = 'Puesto';
  readonly FIELD_DEPARTAMENTO = 'Departamento';
  readonly FIELD_EMAIL = 'email';
  readonly FIELD_PHONE_1 = 'phone1';
  readonly FIELD_EXT_1 = 'ext1';
  readonly FIELD_PHONE_2 = 'phone2';
  readonly FIELD_EXT_2 = 'ext2';
  readonly FIELD_MOBILE = 'mobile';
  readonly FIELD_DIFICULTAD = 'selectedDifficultyOption';
  readonly FIELD_MANTENIMIENTO = 'selectedMaintenanceOption';
  readonly FIELD_NIVEL_DECISION = 'selectedDecisionLevelOption';
  readonly FIELD_NIVEL_PUESTO = 'selectedJobLevelOption';
  readonly viewTypes = AppViewTypes;
  readonly validators = InputValidators;
  errors = [];
  FILE_NAME = 'provider-contact-pop.component.ts';

  defaultImageSource = 'assets/Images/cargar_foto.svg';
  imageNativeElement;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private dialog: MatDialogRef<ProviderContactPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
    if (this.data?.isClickOnPlus) {
      this.store.dispatch(generalDataProviderActions.SET_CONTACT_TO_EDIT({contactId: null}));
    } else {
      this.store.dispatch(
        generalDataProviderActions.SET_CONTACT_TO_EDIT({
          contactId: this.data?.contactId,
          index: this.data?.index,
        }),
      );
    }
  }

  ngAfterViewInit(): void {
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  formHandler(fieldValue: string | DropListOption, fieldName: string): void {
    this.store.dispatch(
      generalDataProviderActions.FORM_HANDLER_COMPONENT_EFFECT({
        fieldValue,
        fieldName,
      }),
    );
  }

  validate(value: any, field: string): void {
    if (value.errors) {
      this.errors.push({fieldName: field, error: value});
    } else {
      this.errors = this.errors.filter((item) => item.fieldName !== field);
    }
  }

  errorImage(): void {
    this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
  }

  onClose(value: boolean): void {
    this.dialog.close(value);
  }
}
