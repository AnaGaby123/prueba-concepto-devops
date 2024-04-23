/* Core Imports */
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {newClientFormSelectors} from '@appSelectors/quotation';
import {Observable} from 'rxjs';

/* Selectors Imports */
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
/* Models Imports */
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Cliente, NumeroTelefonico, VCliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
/* Actions Imports */
import {
  GET_CAT_DIFICULTAD_LOAD,
  GET_CAT_MANTENIMIENTO_LOAD,
  GET_CAT_NIVEL_DECISION_LOAD,
  GET_CAT_NIVEL_PUESTO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {newClientFormActions} from '@appActions/quotation';
/* Dev Tools */
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {GMContactoClienteCompleto} from 'api-logistica';

@Component({
  selector: 'app-customer-contact-quotes',
  templateUrl: './customer-contact-quotes.component.html',
  styleUrls: ['./customer-contact-quotes.component.scss'],
})
export class CustomerContactQuotesComponent implements OnInit, AfterContentChecked, OnDestroy {
  @Output() contactErrors = new EventEmitter<Array<any>[]>();
  gmSelectedClient$: Observable<Cliente> = this.store.select(newClientFormSelectors.selectClient);
  catDecisionLevel$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatDecisionLevelForDropDown,
  );
  catDifficulty$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatDifficultyForDropDown,
  );
  catJobLevel$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatJobLevelForDropDown,
  );
  catMaintenance$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatMaintenanceForDropDown,
  );
  selectedClient$: Observable<VCliente> = this.store.select(
    newClientFormSelectors.selectedNewClient,
  );
  selectedDecisionLevel$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedDecisionLevel,
  );
  selectedDifficulty$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedDificutad,
  );
  selectedFormContact$: Observable<GMContactoClienteCompleto> = this.store.select(
    newClientFormSelectors.selectNewContactForm,
  );
  selectedMaintenance$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedMaintenance,
  );
  selectedJobLevel$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedJobLevel,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);
  phone1Lenght$: Observable<number> = this.store.select(
    newClientFormSelectors.selectPhoneLength('Telefono 1'),
  );
  phone2Lenght$: Observable<number> = this.store.select(
    newClientFormSelectors.selectPhoneLength('Telefono 2'),
  );
  contactIndexEdit$: Observable<number | null> = this.store.select(
    newClientFormSelectors.selectContactIndexEdit,
  );
  phone1Value$: Observable<NumeroTelefonico> = this.store.select(
    newClientFormSelectors.selectContactFormPhone1('telefono1'),
  );
  phone2Value$: Observable<NumeroTelefonico> = this.store.select(
    newClientFormSelectors.selectContactFormPhone1('telefono2'),
  );
  mobileValue$: Observable<NumeroTelefonico> = this.store.select(
    newClientFormSelectors.selectContactFormPhone1('movil'),
  );

  readonly inputValidators = InputValidators;
  readonly FIELD_NOMBRES: string = 'Nombres';
  readonly FIELD_APELLIDO_PATERNO: string = 'ApellidoPaterno';
  readonly FIELD_APELLIDO_MATERNO: string = 'ApellidoMaterno';
  readonly FIELD_TITULO: string = 'Titulo';
  readonly FIELD_PUESTO: string = 'Puesto';
  readonly FIELD_DEPARTAMENTO: string = 'Departamento';
  readonly FIELD_EMAIL: string = 'email';
  readonly FIELD_PHONE_1: string = 'phone1';
  readonly FIELD_EXT_1: string = 'ext1';
  readonly FIELD_PHONE_2: string = 'phone2';
  readonly FIELD_EXT_2: string = 'ext2';
  readonly FIELD_MOBILE: string = 'mobile';
  /// TODO: Variable temporal para monstrar agregar
  private errors = [];
  public viewTypes = AppViewTypes;
  public email: string;

  constructor(private store: Store<AppState>, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_DIFICULTAD_LOAD());
    this.store.dispatch(GET_CAT_MANTENIMIENTO_LOAD());
    this.store.dispatch(GET_CAT_NIVEL_DECISION_LOAD());
    this.store.dispatch(GET_CAT_NIVEL_PUESTO_LOAD());
    this.contactIndexEdit$
      .subscribe((data: number | null) => {
        if (data === null) {
          this.store.dispatch(newClientFormActions.GET_CONTACTS_BY_QUOTATION());
        }
      })
      .unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(newClientFormActions.CLEAN_FORM_DATA_CONTACT());
  }

  setFormContact(input: string, value: string | boolean, property: string): void {
    this.store.dispatch(
      newClientFormActions.SET_DATA_CONTACT_NEW_CONTACT({
        input,
        value,
        property,
      }),
    );
  }

  setPhoneNumber(value: string, field: string, phoneType: string): void {
    this.store.dispatch(
      newClientFormActions.SET_PHONE_NUMBER_CONTACT_EFFECT({
        value,
        field,
        phoneType,
      }),
    );
  }

  validate(value: any, field: string): void {
    if (value.errors) {
      this.errors.push({fieldName: field, error: value});
    } else {
      this.errors = this.errors.filter((item) => item.fieldName !== field);
    }
    if (field === this.FIELD_EMAIL && value.errors === false) {
      this.checkExistingEmail(value.data);
    }
    this.contactErrors.emit(this.errors);
  }

  checkExistingEmail(email: string): void {
    this.store.dispatch(newClientFormActions.CHECK_EXISTING_EMAIL({email}));
    this.email = email;
  }
}
