import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Persona} from '@appModels/catalogos/persona/persona';
import {generalDataProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {generalDataProviderActions} from '@appActions/forms/providers';
import {IContactItem} from '@appModels/shared-components/contact-item.models';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProviderContactPopComponent} from '@appComponents/catalogos/providers/providers-details/sections/general-data/provider-contact-pop/provider-contact-pop.component';

@Component({
  selector: 'app-provider-contacts-catalogs',
  templateUrl: './provider-contacts.component.html',
  styleUrls: ['./provider-contacts.component.scss'],
})
export class ProviderContactsComponent {
  contactList$: Observable<Array<ContactoDetalleProvObj>> = this.store.select(
    generalDataProviderSelectors.selectContacts,
  );
  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);

  contactListScroll: Array<ContactoDetalleProvObj>;
  selectedContact = {} as Persona;
  modalIsOpen = false;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  handleClickOnContact(contactId: string | null = null, index: number | null = null): void {
    const dataDialog = {
      isClickOnPlus: contactId === null && index === null,
      contactId,
      index,
    };
    const dialogRef = this.dialog.open(ProviderContactPopComponent, {
      backdropClass: 'mat-dialog-background',
      data: dataDialog,
      panelClass: 'mat-dialog-style',
    });
    this.contactDialogAfterClose(dialogRef);
  }

  contactDialogAfterClose(dialogRef: MatDialogRef<ProviderContactPopComponent, any>): void {
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(generalDataProviderActions.ADD_EDIT_CONTACT_TO_ARRAY());
      } else {
        this.store.dispatch(generalDataProviderActions.SET_CONTACT_TO_EDIT({contactId: null}));
      }
    });
  }

  handleDisableContact(contact: IContactItem): void {
    this.store.dispatch(
      generalDataProviderActions.SET_DISABLE_CONTACT({
        contactId: contact?.contactId,
        mail: contact?.mail?.Correo,
      }),
    );
  }

  buildContact(contact: ContactoDetalleProvObj): IContactItem {
    return {
      active: contact.Activo,
      contactId: contact.IdContacto,
      department: contact.Departamento,
      job: contact.Puesto,
      mail: contact?.CorreoElectronico[0] || null,
      mSurName: contact.ApellidoMaterno,
      name: contact.Nombres,
      phone: contact.NumeroTelefonico[0] || null,
      surName: contact.ApellidoPaterno,
    };
  }

  handleTrackByContact(index: number, contact: ContactoDetalleProvObj): string {
    return contact.IdContacto;
  }
}
