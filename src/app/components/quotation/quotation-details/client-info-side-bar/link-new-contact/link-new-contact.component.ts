import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {quotationDetailsActions} from '@appActions/quotation';
import {debounce} from 'lodash-es';
import {Observable} from 'rxjs';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {IVClient} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-link-new-contact',
  templateUrl: './link-new-contact.component.html',
  styleUrls: ['./link-new-contact.component.scss'],
})
export class LinkNewContactComponent {
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  clientList$: Observable<Array<IVClient>> = this.store.select(
    quotationDetailsSelectors.selectClientList,
  );
  searchTerm$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectSearchTermClient,
  );
  clientListStatus$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectClientListStatus,
  );
  readonly statusRequest = ApiRequestStatus;

  constructor(private store: Store<AppState>, private router: Router) {}

  changeSearchTerm(searchTerm: string): void {
    if (searchTerm) {
      this.store.dispatch(quotationDetailsActions.SET_SEARCH_TERM_CLIENT({searchTerm}));
    } else {
      this.store.dispatch(quotationDetailsActions.CLEAN_LINK_NEW_CONTACT_CLIENT_LIST());
    }
  }

  goToAddClient(): void {
    this.router.navigateByUrl('/protected/pendings/quoter/details/new-client');
  }
}
