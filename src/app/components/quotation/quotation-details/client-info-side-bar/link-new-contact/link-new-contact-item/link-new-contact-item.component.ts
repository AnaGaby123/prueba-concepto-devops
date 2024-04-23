import {Component, Input} from '@angular/core';
import {IVClient} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {MatDialog} from '@angular/material/dialog';
import {LinkNewContactPopUpComponent} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact-pop-up/link-new-contact-pop-up.component';
import {newClientFormActions, quotationDetailsActions} from '@appActions/quotation';
import {LinkNewContactAddPopUpComponent} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact-add-pop-up/link-new-contact-add-pop-up.component';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-link-new-contact-item',
  templateUrl: './link-new-contact-item.component.html',
  styleUrls: ['./link-new-contact-item.component.scss'],
})
export class LinkNewContactItemComponent {
  @Input() client: IVClient;

  defaultHoverImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  openNewContactPopUp(): void {
    const dialogRef = this.dialog.open(LinkNewContactPopUpComponent, {
      backdropClass: 'mat-dialog-background',
      data: {
        client: this.client,
      },
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.store.dispatch(newClientFormActions.GET_CONTACTS_BY_QUOTATION());
        this.store.dispatch(quotationDetailsActions.SET_GM_ID_QUOTATION());
        this.openNewContactFormDialog();
        this.store.dispatch(quotationDetailsActions.CLEAN_LINK_ADD_NEW_CONTACT_POP_UP());
      }
    });
  }

  // DOCS: Muestra el dialog de formulario para el nuevo contacto
  openNewContactFormDialog(): void {
    const dialogRef = this.dialog.open(LinkNewContactAddPopUpComponent, {
      backdropClass: 'mat-dialog-background',
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        // DOCS: ADD CONTACT FORM DATA TO CLIENT CONTACTS ARRAY
        this.store.dispatch(
          newClientFormActions.SET_GM_CONTACT_CLIENT_QUOTATION({isLinkContact: true}),
        );
        // DOCS: SEND REQUEST TO LINK NEW CONTACT TO CLIENT
        this.store.dispatch(newClientFormActions.LINK_NEW_CONTACT_TO_CLIENT());
      } else {
        this.store.dispatch(quotationDetailsActions.CLEAN_LINK_ADD_NEW_CONTACT_POP_UP());
      }
    });
  }

  errorImgHandlerHover(img: HTMLImageElement): void {
    img.src = this.defaultHoverImageSource;
  }
}
