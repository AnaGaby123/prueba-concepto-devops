// CORE
import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {IContract} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
// ACTIONS
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
// SELECTORS
import {clientContractsSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import {debounce} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
})
export class ContractsListComponent implements OnInit, AfterContentChecked {
  contractsList$: Observable<Array<IContract>> = this.store.select(
    clientContractsSelectors.getFilterContractsList,
  );
  contractStatus$: Observable<number> = this.store.select(
    clientContractsSelectors.selectedContractStatusNumber,
  );
  contractsListIsEmpty$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectFilterContractsListIsEmpty,
  );
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  selectTabFilters$: Observable<Array<ITabOption>> = this.store.select(
    clientContractsSelectors.selectTabFilters,
  );
  selectedTabFilter$: Observable<ITabOption> = this.store.select(
    clientContractsSelectors.selectedTabFilter,
  );
  selectApiStatus$: Observable<number> = this.store.select(
    clientContractsSelectors.selectListApiStatus,
  );
  selectedContract$: Observable<IContract> = this.store.select(
    clientContractsSelectors.selectedContract,
  );

  searchTerm$: Observable<string> = this.store.select(clientContractsSelectors.selectSearchTerm);
  activePopCancelC = false;
  dataCliente$: Observable<any>;
  emitIinitial = true;
  handleKeySearch = debounce((value) => this.setSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  idContratoCancelado: string;
  indexSelected = 0;
  itemSearch = 'Buscar';
  listContract: IContract[] = [];
  listContractUniverse: IContract[] = [];
  register = true;
  searchTerm = '';

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataCliente$ = this.store.select(clientContractsSelectors.getNameClient);
    this.store.dispatch(clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD());
    this.getList();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    const listAux: IContract[] = [];
    if (searchTerm !== '') {
      this.listContractUniverse.forEach((item) => {
        if (item.Folio.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          listAux.push(item);
        }
      });
      this.listContract = listAux;
    } else {
      this.listContract = [...this.listContractUniverse];
    }
  }

  getList(): void {
    this.store.select(clientContractsSelectors.getFilterContractsList).subscribe((contracts) => {
      this.listContract = [...contracts];
      this.listContractUniverse = [...contracts];
      this.search(this.searchTerm);
      if (this.emitIinitial && this.listContract && this.listContract.length > 0) {
        this.selectedContract(this.listContract[0]);
        this.emitIinitial = false;
      }
    });
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(clientContractActions.SET_SEARCH_TERM({searchTerm}));
  }

  filterSelected(event: ITabOption): void {
    this.store.dispatch(clientContractActions.SET_SELECTED_TAB_FILTER({item: event}));
    this.emitIinitial = true;
    this.getList();
  }

  selectedContract(contract: IContract, isEdition = false, typeAction = 'add'): void {
    this.store.dispatch(
      clientContractActions.SELECTED_CONTRACT_COMPONENT_EFFECT({
        contract,
        typeAction,
        isEdition,
      }),
    );
  }

  activePopCancel(contract: IContract): void {
    this.idContratoCancelado = contract.IdContratoCliente;
    this.activePopCancelC = true;
  }

  cancelContract(value: boolean): void {
    this.activePopCancelC = false;
    if (value) {
      this.emitIinitial = true;
      this.store.dispatch(
        clientContractActions.DISABLE_CONTRACT_LOAD({
          idContratoCliente: this.idContratoCancelado,
        }),
      );
    }
  }

  setDetails(value: boolean): void {
    this.store.dispatch(clientContractActions.SET_DETAILS({value}));
  }

  getYear(year: string): string {
    year = new Date().getFullYear().toString();
    return year;
  }
}
