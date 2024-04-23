// CORE
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
// SELECTORS
import * as priceSelectors from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-client-logistics-times',
  templateUrl: './client-logistics-times.component.html',
  styleUrls: ['./client-logistics-times.component.scss'],
})
export class ClientLogisticsTimesComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;
  selectLogisticTimeTotal$: Observable<number> = this.store.select(
    priceSelectors.selectLogisticTimeTotal,
  );
  selectComercialTimeTotal$: Observable<number> = this.store.select(
    priceSelectors.selectComercialTimeTotal,
  );

  constructor(private store: Store<AppState>) {}
}
