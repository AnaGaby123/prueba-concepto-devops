import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
// Actions
import {
  shippingPaidByCustomerActions,
  shippingPaidByCustomerDetailsActions,
  shippingPaidByCustomerListActions,
} from '@appActions/pendings/assorting-manager/shipping-paid-by-customer';

// Selectors
import {shippingPaidByCustomerListSelectors} from '@appSelectors/pendings/assorting-manager/shipping-paid-by-customer';

// Utils
import {debounce} from 'lodash-es';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-shipping-paid-by-customer-list',
  templateUrl: './shipping-paid-by-customer-list.component.html',
  styleUrls: ['./shipping-paid-by-customer-list.component.scss'],
})
export class ShippingPaidByCustomerListComponent {
  searchTerm$: Observable<string> = this.store.select(
    shippingPaidByCustomerListSelectors.selectSearchTerm,
  );
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  totalColumn = 0;
  clients = [
    {
      Index: 1,
      client: 'CRUMAD DISTRIBUIDORES',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 2,
      client: 'CEPROLAB SA DE CV',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 3,
      client: 'COMERCIALIZADORA Y PRODUCTORA DE ESPECIALIDADES',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 4,
      client: 'COPISA',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 5,
      client: 'IMPORTADORA MAE LAB',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 6,
      client: 'JAXAQUIM S.A. DE C.V.',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 7,
      client: 'TECNICOS HAGAP',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
  ];

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < 1500) {
      this.totalColumn = 3;
    } else if (window.innerWidth >= 1500 && window.innerWidth < 1880) {
      this.totalColumn = 4;
    } else if (window.innerWidth >= 1880 && window.innerWidth < 2240) {
      this.totalColumn = 5;
    } else if (window.innerWidth >= 2240) {
      this.totalColumn = 6;
    }
  }

  constructor(private router: Router, private store: Store<AppState>) {}

  setSelectedClient(selectedClient: any): void {
    this.store.dispatch(
      shippingPaidByCustomerDetailsActions.SET_SELECTED_CLIENT({
        selectedClient,
      }),
    );
    this.store.dispatch(
      shippingPaidByCustomerActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: true,
      }),
    );

    // TODO: Cambiar al effect cuando se haga la petición
    this.router
      .navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.shipping.paidByCustomer,
        appRoutes.shipping.paidByCustomerDetails,
      ])
      .then(() => {
        return this.store.dispatch(
          shippingPaidByCustomerActions.SET_IS_IN_DETAILS_VIEW({
            detailsMode: true,
          }),
        );
      });
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      shippingPaidByCustomerListActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }
}
