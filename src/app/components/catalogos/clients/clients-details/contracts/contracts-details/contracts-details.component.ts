import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

@Component({
  selector: 'app-contracts-details',
  templateUrl: './contracts-details.component.html',
  styleUrls: ['./contracts-details.component.scss'],
})
export class ContractsDetailsComponent implements OnInit, OnDestroy {
  addContractActualStep$: Observable<number> = this.store.select(
    clientContractsSelectors.selectAddContractActualStep,
  );
  activeAdvanceContract$: Observable<boolean> = this.store.select(
    clientContractsSelectors.activeAdvanceContract,
  );
  contractBarActivities: Observable<Array<BarActivityOption>> = this.store.select(
    clientContractsSelectors.selectContractBarActivities,
  );
  isEditMode$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectContractEditMode,
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(catalogsActions.GET_CAT_EMPRESAS_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(contractActions.RESET_FORM_CONTRACT());
  }

  addStepsContract(val: number): void {
    this.store.dispatch(contractActions.ADD_STEPS_CONTRACT_COMPONENT_EFFECT({val}));
  }
}
