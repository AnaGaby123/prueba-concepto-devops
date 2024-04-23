import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import {ContactoDetalleAgenteAduanalObj, VAgenteAduanal} from 'api-catalogos';
import {IEmailVerify} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  saveValidation$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.saveContactValidation,
  );
  editMode$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEditMode);
  customAgent$: Observable<VAgenteAduanal> = this.store.select(
    customAgentsDetailsSelectors.selectCustomAgentSelected,
  );
  contactForm$: Observable<ContactoDetalleAgenteAduanalObj> = this.store.select(
    customAgentsDetailsSelectors.selectContactForm,
  );
  existingEmail$: Observable<IEmailVerify> = this.store.select(
    customAgentsDetailsSelectors.selectExistingEmail,
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
  readonly FIELD_PHONE_2 = 'phone2';

  email: string;
  errors = [];
  validators = InputValidators;

  constructor(
    private dialog: MatDialogRef<NewContactDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.data?.isClickOnContact) {
      this.store.dispatch(
        customAgentDetailsActions.SET_CONTACT_SELECTED({contact: this.data?.contact}),
      );
    } else {
      this.store.dispatch(customAgentDetailsActions.SET_CONTACT_SELECTED({contact: null}));
    }
  }

  onClose(value: boolean): void {
    this.dialog.close(value);
  }

  // DOCS: ACTUALIZA EL ESTADO DEL FORMULARIO
  setData(input, value): void {
    this.store.dispatch(customAgentDetailsActions.SET_CONTACT_DATA({input, value}));
  }

  // DOCS: VALIDACIÓN PARA ACTIVAR EL BOTON ACEPTAR EN POP DE CONTACTO
  validate(value: any, field: string): void {
    // DOCS Valida los errores para activar o desactivar el botón
    if (value.errors) {
      this.errors.push({fieldName: field, error: value});
    } else {
      this.errors = this.errors.filter((item) => item.fieldName !== field);
    }
  }

  setPhoneNumber(value: string, field: string, phoneType: string): void {
    this.store.dispatch(
      customAgentDetailsActions.SET_PHONE_NUMBER_LOAD({
        value,
        field,
        phoneType,
      }),
    );
  }
}
