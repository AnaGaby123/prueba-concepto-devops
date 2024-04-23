// CORE
import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// ACTIONS
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
// SELECTORS
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnDestroy {
  contractDetails$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectContractDetails,
  );

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE());
  }
}
