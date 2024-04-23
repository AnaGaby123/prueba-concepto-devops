import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {newClientFormActions} from '@appActions/quotation';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {
  GET_CAT_DIFICULTAD_LOAD,
  GET_CAT_MANTENIMIENTO_LOAD,
  GET_CAT_NIVEL_DECISION_LOAD,
  GET_CAT_NIVEL_PUESTO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {newClientFormSelectors} from '@appSelectors/quotation';
import {GMContactoClienteCompleto} from 'api-logistica';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-link-new-contact-add-pop-up',
  templateUrl: './link-new-contact-add-pop-up.component.html',
  styleUrls: ['./link-new-contact-add-pop-up.component.scss'],
})
export class LinkNewContactAddPopUpComponent implements OnInit {
  viewType$: Observable<string> = this.store.select(selectViewType);
  selectedClientName$: Observable<string> = this.store.select(
    newClientFormSelectors.selectedClientName,
  );
  selectedClientRFC$: Observable<string> = this.store.select(
    newClientFormSelectors.selectedClientRFC,
  );
  contactForm$: Observable<GMContactoClienteCompleto> = this.store.select(
    newClientFormSelectors.selectNewContactForm,
  );
  existingEmail$: Observable<boolean> = this.store.select(newClientFormSelectors.getVerityEmail);
  catDificultad$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatDifficultyForDropDown,
  );
  difficulty$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedDificutad,
  );
  catMaintance$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatMaintenanceForDropDown,
  );
  maintenance$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedMaintenance,
  );
  catDecisionLevel$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatDecisionLevelForDropDown,
  );
  decisionLevel$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedDecisionLevel,
  );
  catJobLevel$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectListCatJobLevelForDropDown,
  );
  jobLevel$: Observable<DropListOption> = this.store.select(
    newClientFormSelectors.selectedJobLevel,
  );
  phone1Lenght$: Observable<number> = this.store.select(
    newClientFormSelectors.selectPhoneLength('Telefono 1'),
  );
  phone2Lenght$: Observable<number> = this.store.select(
    newClientFormSelectors.selectPhoneLength('Telefono 2'),
  );
  isValidFormContact$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectIsValidContact,
  );
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
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
  readonly FIELD_DIFFICULTY = 'difficulty';
  readonly FIELD_MAINTANCE = 'maintance';
  errors = [];

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<LinkNewContactAddPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_DIFICULTAD_LOAD());
    this.store.dispatch(GET_CAT_MANTENIMIENTO_LOAD());
    this.store.dispatch(GET_CAT_NIVEL_DECISION_LOAD());
    this.store.dispatch(GET_CAT_NIVEL_PUESTO_LOAD());
  }

  onClose(event: boolean): void {
    this.dialog.close(event);
  }

  validate(value: any, field: string): void {
    if (value.errors) {
      this.errors.push({fieldName: field, error: value});
    } else {
      this.errors = this.errors.filter((item) => item.fieldName !== field);
    }
  }

  setContactFormData(value: string | boolean, input: string, property: string): void {
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
}
