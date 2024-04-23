import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {newClientFormSelectors} from '@appSelectors/quotation';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {GMContactoClienteCompleto} from 'api-logistica';
import {newClientFormActions} from '@appActions/quotation';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss'],
})
export class AddContactDialogComponent implements OnInit {
  isValidFormContact$: Observable<boolean> = this.store.select(
    newClientFormSelectors.selectIsValidContact,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);

  contactErrorsForm = [];
  contactMail = '';
  email: string;
  viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<AddContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      contact: GMContactoClienteCompleto;
      index: number;
      isNewContact: boolean;
    },
  ) {}

  ngOnInit(): void {
    if (this.data?.isNewContact) {
      this.store.dispatch(newClientFormActions.CLEAN_FORM_DATA_CONTACT());
    } else {
      this.store.dispatch(
        newClientFormActions.SET_SELECTED_NEW_CONTACT({
          contact: this.data?.contact,
          index: this.data?.index,
        }),
      );
    }
  }

  async openModal(value: boolean): Promise<void> {
    this.dialog.close();
    if (value) {
      const contactForm = await lastValueFrom(
        this.store.pipe(select(newClientFormSelectors.selectNewContactForm), take(1)),
      );
      this.contactMail = contactForm?.CorreoElectronico?.Correo;
      this.setContact();
    } else {
      this.store.dispatch(newClientFormActions.CLEAN_FORM_DATA_CONTACT());
      this.email = '';
    }
  }

  setContact(): void {
    this.store.dispatch(
      newClientFormActions.SET_GM_CONTACT_CLIENT_QUOTATION({isLinkContact: false}),
    );
  }

  contactErrors(errors: any[]) {
    this.contactErrorsForm = errors;
  }
}
