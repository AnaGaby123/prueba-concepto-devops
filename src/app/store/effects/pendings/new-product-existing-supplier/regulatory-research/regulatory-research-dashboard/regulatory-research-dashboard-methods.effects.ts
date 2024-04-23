import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {
  regulatoryResearchActions,
  regulatoryResearchDashboardActions,
} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {map} from 'rxjs/operators';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  GET_CAT_APPLICATION_LOAD,
  GET_CAT_AVALABILITY_LOAD,
  GET_CAT_BILLING_RESTRICTION_LOAD,
  GET_CAT_CLASIFICACION_REGULATORIA_LOAD,
  GET_CAT_INTERNATIONAL_DEPOSITARY_LOAD,
  GET_CAT_MODELO_DIFUSION_LOAD,
  GET_CAT_PHYSICAL_STATE_LOAD,
  GET_CAT_PRESENTATION_TYPE_LOAD,
  GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD,
  GET_CAT_PUBLICATIONS_FORMAT_LOAD,
  GET_CAT_RESTRICCIONES_FLETE_LOAD,
  GET_CAT_TRANSPORTATION_MANAGEMENT_LOAD,
  GET_CAT_TRANSPORTATION_WAY_LOAD,
  GET_CAT_USE_LOAD,
  GET_UNIDAD_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {ConfiguracionProductosMarcasFamiliasService} from 'api-catalogos';
import {NGXLogger} from 'ngx-logger';

const FILE_NAME = 'regulatory-research-dashboard-methods.effects.ts';

@Injectable()
export class RegulatoryResearchDashboardMethodsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private configuracionProductosMarcasFamiliasService: ConfiguracionProductosMarcasFamiliasService,
    private logger: NGXLogger,
  ) {}

  $setItem = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDashboardActions.HANDLE_SET_SELECTED_PROVIDER),
      map(({item}) => {
        // DOCS: Guarda si contiene los detalles la ratificación de investigación
        this.store.dispatch(regulatoryResearchActions.SET_ALLOW_TO_DETAILS({allowToDetails: true}));
        // DOCS: Consulta las unidades
        this.store.dispatch(GET_UNIDAD_LOAD());
        // DOCS: Consulta las restricciones del flete
        this.store.dispatch(GET_CAT_RESTRICCIONES_FLETE_LOAD());
        // DOCS: Consulta las clasificación de categorias
        this.store.dispatch(GET_CAT_CLASIFICACION_REGULATORIA_LOAD());
        // DOCS: Consulta los modelos de difusión
        this.store.dispatch(GET_CAT_MODELO_DIFUSION_LOAD());
        // DOCS: Consulta la ratificación de investigación
        this.store.dispatch(regulatoryResearchDashboardActions.SET_SELECTED_PROVIDER({item}));
        // DOCS: Consulta la disponibilidad del producto
        this.store.dispatch(GET_CAT_AVALABILITY_LOAD());
        // DOCS: Consulta las restricciones de compra
        this.store.dispatch(GET_CAT_BILLING_RESTRICTION_LOAD());
        // DOCS: Consulta de estado físico
        this.store.dispatch(GET_CAT_PHYSICAL_STATE_LOAD());
        // DOCS: Consulta de uso
        this.store.dispatch(GET_CAT_USE_LOAD());
        // DOCS: Consulta de depósito internacional
        this.store.dispatch(GET_CAT_INTERNATIONAL_DEPOSITARY_LOAD());
        // DOCS: Consulta el tipo de presentación
        this.store.dispatch(GET_CAT_PRESENTATION_TYPE_LOAD());
        // DOCS: Consulta los tipos de aplicación
        this.store.dispatch(GET_CAT_APPLICATION_LOAD());
        // DOCS: Consulta el medio de transporte
        this.store.dispatch(GET_CAT_TRANSPORTATION_WAY_LOAD());
        // DOCS: Consulta el manejo de transporte
        this.store.dispatch(GET_CAT_TRANSPORTATION_MANAGEMENT_LOAD());
        // DOCS: Consulta el manejo de transporte
        this.store.dispatch(GET_CAT_PUBLICATIONS_FORMAT_LOAD());
        // DOCS:
        this.store.dispatch(GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD());
        // DOCS: Cargar Clasificacion Regulatoria
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.regulatoryResearch.regulatoryResearch,
          appRoutes.regulatoryResearch.details,
        ]);
        return RETURN_EMPTY();
      }),
    ),
  );
}
