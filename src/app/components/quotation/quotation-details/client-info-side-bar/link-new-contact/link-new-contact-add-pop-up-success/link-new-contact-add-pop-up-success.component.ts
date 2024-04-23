import {Component, OnInit} from '@angular/core';
import {quotationDetailsActions} from '@appActions/quotation';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-link-new-contact-add-pop-up-success',
  templateUrl: './link-new-contact-add-pop-up-success.component.html',
  styleUrls: ['./link-new-contact-add-pop-up-success.component.scss'],
})
export class LinkNewContactAddPopUpSuccessComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  // DOCS: CIERRA EL POP
  showEvent(event: boolean): void {
    this.store.dispatch(
      quotationDetailsActions.SHOW_LINK_ADD_NEW_CONTACT_POP_UP_SUCCESS({open: false}),
    );
  }
}
