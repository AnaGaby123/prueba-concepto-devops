import {Component, Input} from '@angular/core';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';

@Component({
  selector: 'app-client-logistic-times',
  templateUrl: './client-logistic-times.component.html',
  styleUrls: ['./client-logistic-times.component.scss'],
})
export class ClientLogisticTimesComponent {
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;
  @Input() viewType: string;
  selectLogisticTimeTotal$: Observable<number> = this.store.select(
    clientContractsSelectors.selectLogisticTimeTotal,
  );
  selectCommercialTimeTotal$: Observable<number> = this.store.select(
    clientContractsSelectors.selectCommercialTimeTotal,
  );
  viewTypes = AppViewTypes;

  constructor(private store: Store<AppState>) {}
}
