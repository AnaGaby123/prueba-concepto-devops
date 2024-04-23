// CORE
import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
// MODELS
// ACTIONS
// SELECTORS
// UTILS

@Injectable()
export class ClientContractFormContractBrandsMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  // fetchMoreBrands$ = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(contractActions.FETCH_MORE_BRANDS_COMPONENT_EFFECT),
  //       withLatestFrom(this.store.select(clientContractsSelectors.selectBrands)),
  //       mergeMap(([{event}, brands]) => {
  //         const brandsList = brands.brandList;
  //         if (event.endIndex !== brandsList.length - 1) {
  //           return EMPTY;
  //         }
  //         const currentTotal: number = brands.totalResults;
  //         const currentPage: number = brands.brandQueryInfo.desiredPage;
  //         const isLoading: number = brands.brandsStatus;
  //         if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
  //           const totalPages =
  //             currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
  //           if (currentPage > totalPages || brandsList.length > currentTotal) {
  //             return EMPTY;
  //           }
  //           if (isLoading !== API_REQUEST_STATUS_LOADING) {
  //             setTimeout(async () => {
  //               this.store.dispatch(contractActions.GET_BRANDS_LOAD({isFirstPage: false}));
  //             }, 200);
  //           }
  //         }
  //         return EMPTY;
  //       }),
  //     ),
  //   {dispatch: false},
  // );
}
