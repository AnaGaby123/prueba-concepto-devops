import {Component, Input} from '@angular/core';
import {isEmpty} from 'lodash-es';
import {Observable} from 'rxjs';
import {
  IOfferDeliveryRoutes,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {offerSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {offerActions} from '@appActions/forms/providers';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-logistics-times',
  templateUrl: './logistics-times.component.html',
  styleUrls: ['./logistics-times.component.scss'],
})
export class LogisticsTimesComponent {
  @Input() isMexican: boolean;
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  route$: Observable<IOfferDeliveryRoutes> = this.store.select(
    offerSelectors.selectACSelectedDeliveryRoute,
  );
  sumLogisticTimes$: Observable<{timeLogistics: any; timeCommerce: number}> = this.store.select(
    offerSelectors.selectSumLogisticsTime,
  );
  readonly fields = OfferFields;
  readonly inputValidators = InputValidators;
  isEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  handleLogisticTimesChange(value: string, field: string): void {
    this.store.dispatch(
      offerActions.SET_PROVIDER_DELIVERY_ROUTE_DELIVERY_TIME_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
