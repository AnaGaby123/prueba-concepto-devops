import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {
  DeliveryRoutes,
  IOfferDeliveryRoutes,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

// Actions
import {offerActions} from '@appActions/forms/providers';

// Utils
import {deburr, find, isEmpty, toLower} from 'lodash-es';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-delivery-routes',
  templateUrl: './delivery-routes.component.html',
  styleUrls: ['./delivery-routes.component.scss'],
})
export class DeliveryRoutesComponent {
  @Input() deliveryRoutes: Array<IOfferDeliveryRoutes>;
  @Input() enableEdit: boolean;
  readonly inputValidators = InputValidators;

  routes = DeliveryRoutes;
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  selectRoute(routeName: string): void {
    const deliveryRouteId = this.getRouteId(routeName);
    this.store.dispatch(offerActions.SET_SELECTED_DELIVERY_ROUTE({deliveryRouteId}));
  }

  getRoute(routeName: string): IOfferDeliveryRoutes {
    const route: IOfferDeliveryRoutes = find(
      this.deliveryRoutes,
      (o: IOfferDeliveryRoutes) =>
        toLower(deburr(o.configuracionTiempoEntregaProveedorFamiliaRutaEntrega?.RutaEntrega)) ===
        deburr(toLower(routeName)),
    );
    return route || {};
  }

  getRouteName(routeName: string): string {
    const route: IOfferDeliveryRoutes = this.getRoute(routeName);
    return route?.configuracionTiempoEntregaProveedorFamiliaRutaEntrega?.RutaEntrega || 'N/D';
  }

  getRouteId(routeName: string): string {
    const route: IOfferDeliveryRoutes = this.getRoute(routeName);
    return route?.configuracionTiempoEntregaProveedorFamiliaRutaEntrega?.IdCatRutaEntrega || 'N/D';
  }

  getRouteIsSelected(routeName: string): boolean {
    const route: IOfferDeliveryRoutes = this.getRoute(routeName);
    if (!isEmpty(route)) {
      return route.isSelected;
    }
    return false;
  }
}
