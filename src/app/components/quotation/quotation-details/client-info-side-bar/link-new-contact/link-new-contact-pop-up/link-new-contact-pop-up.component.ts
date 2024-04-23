import {Component, Inject, OnInit} from '@angular/core';
import {newClientFormActions} from '@appActions/quotation';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {newClientFormSelectors} from '@appSelectors/quotation';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IVClient} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-link-new-contact-pop-up',
  templateUrl: './link-new-contact-pop-up.component.html',
  styleUrls: ['./link-new-contact-pop-up.component.scss'],
})
export class LinkNewContactPopUpComponent implements OnInit {
  selectedClientName$: Observable<string> = this.store.select(
    newClientFormSelectors.selectedClientName,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<LinkNewContactPopUpComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      client: IVClient;
    },
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      newClientFormActions.SET_SELECTED_CLIENT_TO_LINK_NEW_CONTACT({
        client: this.data?.client,
      }),
    );
  }

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
