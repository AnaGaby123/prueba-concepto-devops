import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {regulatoryResearchDetailsActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {mergeMap, of} from 'rxjs';
import {find} from 'lodash-es';
import * as actionsUtils from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {appRoutes} from '@appHelpers/core/app-routes';
import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {regulatoryResearchDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import * as apiCatalogos from 'api-catalogos';
import {ArchivoDetalle} from 'api-catalogos';

@Injectable()
export class RegulatoryResearchDetailsMethodsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private sistemaArchivosService: apiCatalogos.SistemaArchivosService,
  ) {}

  loadSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SET_TAB_OPTIONS),
      mergeMap((action) => {
        const option: IPqfTabOption = find(action.tabOptions, (o: IPqfTabOption) => o.selected);
        if (option.id === '1') {
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.regulatoryResearch.regulatoryResearch,
            appRoutes.regulatoryResearch.details,
            appRoutes.regulatoryResearch.commercialTechnicalResearch,
          ]);
        } else {
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.regulatoryResearch.regulatoryResearch,
            appRoutes.regulatoryResearch.details,
            appRoutes.regulatoryResearch.regulationAndNonTariffRestrictions,
          ]);
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: Descargar archivo de evidencia del proveedor
  downloadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SET_DOWNLOAD_FILE),
        withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.selectedProduct)),
        mergeMap(([action, product]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.sistemaArchivosService
            .ArchivoExtensionsObtenerDetalle(product.IdArchivoEvidenciaProvedor)
            .pipe(
              map(async (response: ArchivoDetalle) => {
                if (response && response.Url) {
                  // Si newTab = true, abre el archivo en una nueva pestaña (en chrome lo descarga)
                  window.open(response.Url, '_blank');
                }
                this.store.dispatch(SET_LOADING({payload: false}));
                return actionsUtils.DOWLOAD_FILE_SUCCESS();
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(actionsUtils.DOWLOAD_FILE_ERROR(error));
              }),
            );
        }),
      ),
    {dispatch: false},
  );
}
