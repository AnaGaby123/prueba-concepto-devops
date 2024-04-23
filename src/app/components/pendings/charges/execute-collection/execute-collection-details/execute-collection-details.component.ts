import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {IExecuteCollectionPayment} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  executeCollectionDetailsSelectors,
  executeCollectionSelectors,
} from '@appSelectors/pendings/charges/execute-collection';
import {debounce, isEmpty} from 'lodash-es';

import {
  executeCollectionActions,
  executeCollectionDetailsActions,
} from '@appActions/pendings/charges/execute-collection';
import {selectCurrentChildRoute} from '@appSelectors/router/router.selectors';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Archivo} from 'api-catalogos';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-execute-collection-details',
  templateUrl: './execute-collection-details.component.html',
  styleUrls: ['./execute-collection-details.component.scss'],
})
export class ExecuteCollectionDetailsComponent implements OnDestroy {
  actualRoute$: Observable<string> = this.store.select(selectCurrentChildRoute);
  searchTerm$: Observable<string> = this.store.select(
    executeCollectionDetailsSelectors.selectSearchTerm,
  );
  burgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectBurgerOptions,
  );
  burgerOptionSelected$: Observable<DropListOption> = this.store.select(
    executeCollectionDetailsSelectors.selectBurgerOptionSelected,
  );
  selectedPayment$: Observable<IExecuteCollectionPayment> = this.store.select(
    executeCollectionDetailsSelectors.selectedPayment,
  );
  paymentList$: Observable<Array<IExecuteCollectionPayment>> = this.store.select(
    executeCollectionDetailsSelectors.selectPaymentList,
  );
  paymentStatus$: Observable<number> = this.store.select(
    executeCollectionDetailsSelectors.selectPaymentStatus,
  );
  validatorForManagePaymentButton$: Observable<boolean> = this.store.select(
    executeCollectionDetailsSelectors.validatorForManagePaymentButton,
  );
  rebillView$: Observable<boolean> = this.store.select(
    executeCollectionSelectors.selectIsInRebillView,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  loadingFile$: Observable<boolean> = this.store.select(
    executeCollectionDetailsSelectors.selectIsLoadingFile,
  );

  paymentsScrollResults: Array<IExecuteCollectionPayment> = [];
  lodashIsEmpty = isEmpty;
  leftContainerIsOpen = false;
  fileSelected: Archivo = {} as Archivo;
  isPdf = false;
  mails = [
    {
      nombre: 'hola.pdf',
    },
    {
      nombre: 'hola2.pdf',
    },
    {
      nombre: 'hola3.pdf',
    },
  ];

  constructor(private store: Store<AppState>, private router: Router, private location: Location) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      executeCollectionActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      executeCollectionActions.SET_ALLOWED_TO_DETAILS({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(executeCollectionDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  selectFilterByType(burgerOptionSelected: DropListOption): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_SELECTED_BURGER_OPTION({
        burgerOptionSelected,
      }),
    );
  }

  selectPayment(paymentId): void {
    if (paymentId && !this.router.url.includes('executePayment')) {
      this.store.dispatch(
        executeCollectionDetailsActions.SET_SELECTED_PAYMENT({
          paymentId,
        }),
      );
    }
  }

  handleLeftContainer(): void {
    this.leftContainerIsOpen = !this.leftContainerIsOpen;
  }

  viewFile(file: Archivo): void {
    this.fileSelected = file;
    const ext = file.FileKey.substr(-3);
    const isViewFile = ext === 'pdf' || ext === 'jpg' || ext === 'png' || ext === 'svg';
    this.isPdf = ext === 'pdf' || ext === 'tml';
    if (isViewFile) {
      this.store.dispatch(
        executeCollectionDetailsActions.VIEW_FILE_LOAD({
          IdArchivo: file.IdArchivo,
          ext,
        }),
      );
    } else {
      this.download(this.fileSelected);
    }
  }

  download(file: Archivo): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: file.IdArchivo, FileKey: file.FileKey}));
  }

  managePayment(): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_SELECTED_BILLS());
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.executeCollection.executeCollection,
      appRoutes.executeCollection.details,
      appRoutes.executeCollection.executePayment,
    ]);
  }

  pay(): void {
    this.store.dispatch(executeCollectionDetailsActions.MANAGE_PAYMENT_LOAD());
  }

  handleTrackBy(index: number, item: IExecuteCollectionPayment): string {
    return item.IdFCCFolioPagoCliente;
  }

  closePop(active: boolean): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_OPEN_VIEW_FILE({active}));
  }

  goBack(): void {
    this.location.back();
    this.store.dispatch(executeCollectionDetailsActions.CLEAN_PAYMENT_TRANSACTION());
  }
}
