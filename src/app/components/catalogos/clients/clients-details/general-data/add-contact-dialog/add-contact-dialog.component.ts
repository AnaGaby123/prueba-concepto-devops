import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ContactoDetalleObj, NumeroTelefonico, VCliente} from 'api-catalogos';
import {clientsGeneralDataSelectors} from '@appSelectors/forms/clients-form';
import {Store} from '@ngrx/store';
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {IContactoDetalleObj} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {AppState} from '@appCore/core.state';
import {isEmpty} from 'lodash-es';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss'],
})
export class AddContactDialogComponent implements OnInit {
  @ViewChild('imageElement') imageElement: ElementRef;

  readonly FIELD_EMAIL = 'email';
  readonly FIELD_NOMBRES = 'Nombres';
  readonly inputValidators = InputValidators;
  readonly FIELD_APELLIDO_PATERNO = 'ApellidoPaterno';
  readonly FIELD_APELLIDO_MATERNO = 'ApellidoMaterno';
  readonly FIELD_TITULO = 'Titulo';
  readonly FIELD_PUESTO = 'Puesto';
  readonly FIELD_DEPARTAMENTO = 'Departamento';
  readonly FIELD_PHONE_1 = 'phone1';
  readonly FIELD_EXT_1 = 'ext1';
  readonly FIELD_PHONE_2 = 'phone2';
  readonly FIELD_EXT_2 = 'ext2';
  readonly FIELD_MOBILE = 'mobile';
  readonly viewTypes = AppViewTypes;
  imageNativeElement;

  contactButtonValidation$: Observable<boolean> = this.store.select(
    clientsGeneralDataSelectors.contactFormButtonValidation,
  );

  contactForm$: Observable<ContactoDetalleObj> = this.store.select(
    clientsGeneralDataSelectors.selectContactForm,
  );

  catDificultad$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatDifficultyForDropDown,
  );

  difficulty$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedDifficulty,
  );

  existingEmail$: Observable<boolean> = this.store.select(
    clientsGeneralDataSelectors.getVerityEmail,
  );

  viewType$: Observable<string> = this.store.select(selectViewType);

  selectedClient$: Observable<VCliente> = this.store.select(
    clientsGeneralDataSelectors.selectedClient,
  );

  catMaintance$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatMaintenanceForDropDown,
  );

  catDecisionLevel$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatDecisionLevelForDropDown,
  );

  catJobLevel$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatJobLevelForDropDown,
  );

  jobLevel$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedJobLevel,
  );

  maintenance$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedManintenance,
  );
  decisionLevel$: Observable<DropListOption> = this.store.select(
    clientsGeneralDataSelectors.selectedLevelDecision,
  );

  errors = [];
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  defaultDisableImageSource = 'assets/Images/cargar_foto_disabled.svg';
  errorImageNativeElement = false;
  localIsEmpty = isEmpty;
  defaultId = DEFAULT_UUID;

  constructor(
    private dialog: MatDialogRef<AddContactDialogComponent>,
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEdit: boolean;
      contact: IContactoDetalleObj;
    },
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;

    if (this.data?.isEdit) {
      this.store.dispatch(
        clientsGeneralDataActions.SET_SELECTED_CONTACT({contact: this.data?.contact}),
      );
    }
  }

  errorImage(img: HTMLImageElement): void {
    img.src = this.defaultImageSource;
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

  onClose(value: boolean): void {
    this.dialog.close(value);
  }

  setContactDropData(idInput: string, value: DropListOption): void {
    this.store.dispatch(clientsGeneralDataActions.SET_CLIENT_FORM_DROP_DATA({value, idInput}));
  }

  selectPhoneTypeValues(phoneType): Observable<NumeroTelefonico> {
    return this.store.select(clientsGeneralDataSelectors.selectContactFormPhone1(phoneType));
  }

  validate(value: any, field: string): void {
    if (value.errors) {
      this.errors.push({fieldName: field, error: value});
    } else {
      this.errors = this.errors.filter((item) => item.fieldName !== field);
    }
  }

  setPhoneNumber(value: string, field: string, phoneType: string): void {
    this.store.dispatch(
      clientsGeneralDataActions.SET_PHONE_NUMBER_LOAD({
        value,
        field,
        phoneType,
      }),
    );
  }

  setContactFormData(value: any, input: string): void {
    this.store.dispatch(clientsGeneralDataActions.SET_CONTACT_FORM_DATA({value, input}));
  }
}
