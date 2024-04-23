import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
// Actions
import {generalDataProviderActions} from '@appActions/forms/providers';

// Selectors
import * as providerSelectors from '@appSelectors/forms/providers';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
})
export class GeneralDataComponent implements OnInit, OnDestroy {
  activeAlert = false;
  textAlert = '¿Seguro que deseas deshabilitar el proveedor?';

  editMode$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectModeEdit,
  );
  enableEdit$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectEnableEdit,
  );

  constructor(private store: Store<AppState>, private logger: NGXLogger) {}

  ngOnDestroy(): void {
    this.store.dispatch(generalDataProviderActions.CLEAN_GENERAL_DATA_STATE());
  }

  ngOnInit(): void {
    this.store.dispatch(generalDataProviderActions.GET_INITIAL_STATE());
  }

  closeAlert(status: boolean): void {
    this.activeAlert = false;
    if (status) {
      this.store.dispatch(generalDataProviderActions.DELETE_PROVIDER_LOAD());
    }
  }
}
