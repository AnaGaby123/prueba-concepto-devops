import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// ACTIONS
import {customAgentDetailsActions} from '@appActions/forms/custom-agent-form';

// MODELS
import {ContactoDetalleAgenteAduanalObj, VAgenteAduanal} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// SELECTORS
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// DEV TOOLS
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {IContactItem} from '@appModels/shared-components/contact-item.models';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NewContactDialogComponent} from '@appComponents/catalogos/customs-agents/customs-agents-details/general-data-customs-agents/new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-general-data-customs-agents',
  templateUrl: './general-data-customs-agents.component.html',
  styleUrls: ['./general-data-customs-agents.component.scss'],
})
export class GeneralDataCustomsAgentsComponent {
  readonly FIELD_NOMBRES = 'Nombres';
  readonly FIELD_APELLIDO_PATERNO = 'ApellidoPaterno';
  readonly FIELD_APELLIDO_MATERNO = 'ApellidoMaterno';
  readonly FIELD_TITULO = 'Titulo';
  readonly FIELD_PUESTO = 'Puesto';
  readonly FIELD_DEPARTAMENTO = 'Departamento';
  readonly FIELD_EMAIL = 'email';
  readonly FIELD_PHONE_1 = 'phone1';
  readonly FIELD_PHONE_2 = 'phone2';

  // SELECTORES
  editMode$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEnableEdit);
  customAgent$: Observable<VAgenteAduanal> = this.store.select(
    customAgentsDetailsSelectors.selectCustomAgentSelected,
  );
  contacts$: Observable<Array<ContactoDetalleAgenteAduanalObj>> = this.store.select(
    customAgentsDetailsSelectors.selectContacts,
  );
  catCountry$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaisForDropDownList,
  );
  enableZipCodeInput$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.enableZipCodeInput,
  );
  countrySelected$: Observable<DropListOption> = this.store.select(
    customAgentsDetailsSelectors.selectedCountriForDropList,
  );
  zipValidation$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.selectZipCodeValidation,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;

  // VARIABLES DE APOYO
  contactsScroll: any = [];
  errors = [];
  email: string;
  currentDate = new Date().toDateString();
  editMode: any;
  enableEdit: any;
  validators = InputValidators;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  handleClickOnContact(contact): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        isClickOnContact: true,
        contact,
      },
      panelClass: 'mat-dialog-style',
    });

    this.contactDialogAfterClosed(dialogRef);
  }

  handleClickOnPlus(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        isClickOnContact: false,
      },
      panelClass: 'mat-dialog-style',
    });

    this.contactDialogAfterClosed(dialogRef);
  }

  contactDialogAfterClosed(dialogRef: MatDialogRef<NewContactDialogComponent, any>): void {
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(customAgentDetailsActions.SET_CONTACT_FORM());
      } else {
        this.store.dispatch(customAgentDetailsActions.RESET_CONTACT_FORM());
      }
    });
  }

  handleDisableContact(contact: ContactoDetalleAgenteAduanalObj): void {
    if (contact.IdContacto !== DEFAULT_UUID) {
      this.store.dispatch(customAgentDetailsActions.SET_CONTACT_TO_DISABLE({contact}));
    }
    this.store.dispatch(
      customAgentDetailsActions.DELETE_CONTACT({
        contact,
      }),
    );
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

  setNewCustomerData(input, value): void {
    if (input === 'IdCatPais') {
      this.store.dispatch(customAgentDetailsActions.SET_NEW_DATA({input, value: value.value}));
    } else if (input === 'CodigoPostal') {
      this.store.dispatch(customAgentDetailsActions.SET_NEW_DATA({input, value}));
      this.store.dispatch(customAgentDetailsActions.SET_ZIP_CODE({zipCode: value}));
    } else {
      this.store.dispatch(customAgentDetailsActions.SET_NEW_DATA({input, value}));
    }
  }

  handleTrackByContact(index: number, contact: ContactoDetalleAgenteAduanalObj): string {
    return contact.IdContacto;
  }

  buildContact(contact: ContactoDetalleAgenteAduanalObj): IContactItem {
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
  }
}
