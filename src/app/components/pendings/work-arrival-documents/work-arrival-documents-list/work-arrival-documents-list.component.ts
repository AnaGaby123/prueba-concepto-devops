import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Action
import {
  workArrivalDocumentsActions,
  workArrivalDocumentsDetailsActions,
  workArrivalDocumentsListActions,
} from '@appActions/pendings/work-arrival-documents';

// Selectors
import {workArrivalDocumentsListSelectors} from '@appSelectors/pendings/work-arrival-documents';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-work-arrival-documents-list',
  templateUrl: './work-arrival-documents-list.component.html',
  styleUrls: ['./work-arrival-documents-list.component.scss'],
})
export class WorkArrivalDocumentsListComponent {
  burgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    workArrivalDocumentsListSelectors.selectBurgerOptions,
  );
  providersStatus$: Observable<number> = this.store.select(
    workArrivalDocumentsListSelectors.selectProvidersStatus,
  );
  searchTerm$: Observable<string> = this.store.select(
    workArrivalDocumentsListSelectors.selectSearchTerm,
  );
  selectedBurgerOption$: Observable<DropListOption> = this.store.select(
    workArrivalDocumentsListSelectors.selectedBurgerOption,
  );
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  providers = [
    {
      Index: 1,
      provider: 'EP',
      oc: 10,
      products: 3,
      date: '2021-03-01T00:00:00.000-06:00Z',
    },
    {
      Index: 2,
      provider: 'USP',
      oc: 10,
      products: 3,
      date: '2021-03-01T00:00:00.000-06:00Z',
    },
    {
      Index: 3,
      provider: 'PHARMA',
      oc: 10,
      products: 3,
      date: '2021-03-01T00:00:00.000-06:00Z',
    },
  ];

  constructor(private router: Router, private store: Store<AppState>) {}

  setSelectedProvider(selectedProvider: any): void {
    this.store.dispatch(
      workArrivalDocumentsDetailsActions.SET_SELECTED_PROVIDER({
        selectedProvider,
      }),
    );
    this.store.dispatch(
      workArrivalDocumentsActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: true,
      }),
    );

    // TODO: Cambiar al effect cuando se haga la petición
    this.router
      .navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.workArrivalDocuments.workArrivalDocuments,
        appRoutes.workArrivalDocuments.details,
      ])
      .then(() => {
        return this.store.dispatch(
          workArrivalDocumentsActions.SET_IS_IN_DETAILS_VIEW({
            detailsMode: true,
          }),
        );
      });
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      workArrivalDocumentsListActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }
}
