import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import * as servicesLogger from '@appUtil/logger';
import {
  CotProductoOferta,
  GMCotCotizacionDetalle,
  GMCotProductoOferta,
  GMPartidaInvestigacionCotizador,
  ProcesosL01CotizacionPartidasDesglosesService,
  ProcesosL01CotizacionPartidasService,
  ProcesosL01CotizacionService,
} from 'api-logistica';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
// Selectors
// Actions
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

import {offlineProductActions, quotationDetailsActions} from '@appActions/quotation';

/* Selectors */
import {offlineProductSelectors, quotationDetailsSelectors} from '@appSelectors/quotation';

import {appRoutes} from '@appHelpers/core/app-routes';
import {
  CatalogosService,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosService,
  Direccion,
  QueryResultVMarcaFamilia,
  QueryResultVProducto,
} from 'api-catalogos';

import {
  buildCotQuotationDetails,
  buildDropOfflineProductBrandFamily,
  buildQueryOffers,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {Location} from '@angular/common';
import {IQuotation} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {AddProductDialogComponent} from '@appComponents/quotation/quotation-details/router-pages/offline-product/add-product-dialog/add-product-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {selectedOptionSwitchList} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

const FILE_NAME = 'offline-product.effects.ts';

@Injectable()
export class OfflineProductEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosCotizacionServices: ProcesosL01CotizacionPartidasService, // ProcesosCotizacionPartidasService,
    private processes01QuotationService: ProcesosL01CotizacionService,
    private processes01QuotationBreakdownItemsService: ProcesosL01CotizacionPartidasDesglosesService,
    private configuracionProductosMarcasFamiliasService: ConfiguracionProductosMarcasFamiliasService,
    private configuracionProductoService: ConfiguracionProductosService,
    private catalogosService: CatalogosService,
    private location: Location,
    private dialog: MatDialog,
  ) {}

  //DOCS: NAVEGAR A LA PANTALLA DE INVESTIGAR PRODUCTO
  handleProductInvestigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offlineProductActions.NAVIGATE_OFFLINE_PRODUCT_INIT_EFFECT),
      map((action) => {
        this.store.dispatch(offlineProductActions.FETCH_DATA_LOAD());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.quoter.quoter,
          appRoutes.quoter.details,
          appRoutes.quoter.offlineProducts,
        ]);
        return RETURN_EMPTY();
      }),
    ),
  );

  //DOCS: AGREGAR EL PRODUCTO A LA COTIZACIÓN
  addProductToQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(offlineProductActions.ADD_PRODUCT_QUOTATION),
      withLatestFrom(
        this.store.select(offlineProductSelectors.selectProductExisting),
        this.store.select(offlineProductSelectors.selectPieces),
      ),
      map(([{value}, product, numPieces]) => {
        if (value) {
          const data = {
            ...product,
            PiezasACotizar: numPieces,
          };
          this.store.dispatch(
            quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({product: data}),
          );
          this.location.back();
          this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Se ha guardado'}));
        } else {
          this.store.dispatch(offlineProductActions.RESET_PRODUCT_EXISTING());
        }
        return RETURN_EMPTY();
      }),
    ),
  );

  //DOCS: OBTENER LOS TIPO DE FAMILIA CON PROVEEDOR PRINCIPAL DE LA MARCA SELECCIONADA PARA EL DROPLIST

  getListTypeFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offlineProductActions.FETCH_DATA_LOAD),
      withLatestFrom(this.store.select(offlineProductSelectors.selectQueryInfoTypesFamily)),
      mergeMap(([state, queryInfo]) => {
        return this.configuracionProductosMarcasFamiliasService
          .vMarcaFamiliaQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVMarcaFamilia) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Exito al obtener los tipos de familia con proveedor de la marca seleccionada',
                ),
                response,
              );
              const typesFamiliesOptionsDropList = buildDropOfflineProductBrandFamily(
                response.Results,
              );
              return offlineProductActions.FETCH_TYPES_FAMILY_WITH_PRINCIPAL_PROVIDER_SUCCESS({
                typesFamiliesOptionsApi: response,
                typesFamiliesOptionsDropList,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Error al obtener los tipos de familia con proveedor de la marca seleccionada',
                ),
                error,
              );
              return of(
                offlineProductActions.FETCH_TYPES_FAMILY_WITH_PRINCIPAL_PROVIDER_FAILED({error}),
              );
            }),
          );
      }),
    ),
  );

  //DOCS: CONSULTAR SI EXISTE O NO EL PRODUCTO
  getProductExisting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offlineProductActions.SAVE_OFFLINE_PRODUCT_LOAD),
      withLatestFrom(this.store.select(offlineProductSelectors.selectQueryInfoProductExisting)),
      mergeMap(([state, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));

        return this.configuracionProductoService.vProductoQueryResult(queryInfo).pipe(
          map((response: QueryResultVProducto) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Exito al obtener la existencia del producto',
              ),
              response,
            );
            if (response.TotalResults > 0) {
              this.store.dispatch(SET_LOADING({payload: false}));
              const dialogRef = this.dialog.open(AddProductDialogComponent, {
                backdropClass: 'mat-dialog-background',
                panelClass: 'mat-dialog-style',
              });
              dialogRef.afterClosed().subscribe((value: boolean) => {
                this.store.dispatch(offlineProductActions.ADD_PRODUCT_QUOTATION({value}));
              });
              return offlineProductActions.FETCH_PRODUCT_EXISTING_SUCCESS_WITH_RESULTS({
                response: {
                  ...response.Results[0],
                  imageHover: `assets/Images/logos/${response.Results[0].NombreImagenMarca?.toLowerCase()}_hover.svg`,
                },
              });
            }
            return offlineProductActions.FETCH_PRODUCT_EXISTING_SUCCESS_WITHOUT_RESULTS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Error al obtener la existencia de un producto',
              ),
              error,
            );
            this.setStatus(API_REQUEST_STATUS_FAILED);
            return of(offlineProductActions.FETCH_PRODUCT_EXISTING_FAILED({error}));
          }),
        );
      }),
    ),
  );

  //DOCS: GUARDAR PRODUCTO A INVESTIGAR
  saveOfflineProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(offlineProductActions.FETCH_PRODUCT_EXISTING_SUCCESS_WITHOUT_RESULTS),
      withLatestFrom(
        this.store.select(offlineProductSelectors.selectProductExisting),
        this.store.select(offlineProductSelectors.selectOfflineProductData),
        this.store.select(quotationDetailsSelectors.selectedOptionSwitchList),
      ),
      mergeMap(([state, productExisting, dataProduct, typeQuotation]) => {
        this.setStatus(API_REQUEST_STATUS_LOADING);
        return this.procesosCotizacionServices
          .cotPartidaCotizacionInvestigacionGuardarOActualizarPartidaInvestigacionCotizador({
            ...dataProduct,
            IdCatTipoCotizacion: typeQuotation.value,
          })
          .pipe(
            map((response: GMPartidaInvestigacionCotizador) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Guardado exitoso de producto',
                ),
                response,
              );
              this.setStatus(API_REQUEST_STATUS_SUCCEEDED);
              this.store.dispatch(offlineProductActions.INITIAL_OFFLINE_PRODUCT());
              return offlineProductActions.SAVE_OFFLINE_PRODUCT_SUCCESS();
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Error al guardar el producto',
                ),
                error,
              );
              this.setStatus(API_REQUEST_STATUS_FAILED);
              return of(offlineProductActions.SAVE_OFFLINE_PRODUCT_ERROR(error));
            }),
          );
      }),
    ),
  );
  /* DOCS: Obtiene el detalle y partidas de la cotización seleccionada*/
  getQuotationDetailsItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offlineProductActions.SAVE_OFFLINE_PRODUCT_SUCCESS),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectedQuotation)),
      mergeMap(([action, selectedQuotation]) => {
        return this.processes01QuotationService
          .cotCotizacionObtenerGMCotCotizacion(selectedQuotation.IdCotCotizacion)
          .pipe(
            map((response: GMCotCotizacionDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el detalle y las partidas de la cotización seleccionada.',
                ),
                response,
              );
              this.store.dispatch(
                quotationDetailsActions.FETCH_UPDATE_SELECTED_QUOTATION_DETAILS_SUCCESS({
                  selectedQuotationDetails: response,
                }),
              );
              this.store.dispatch(
                quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                  activeNavigate: true,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Se ha mandado a investigar el producto',
                }),
              );
              this.location.back();
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el detalle y las partidas de la cotización seleccionada.',
                ),
                error,
              );
              this.setStatus(API_REQUEST_STATUS_FAILED);
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
      /* withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedAddressDelivery),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
      ),
      // DOCS Obtiene las ofertas más actuales para todas las partidas
      switchMap(
        ([quotationDetail, addressClient, selectedQuotation]: [
          GMCotCotizacionDetalle,
          Direccion,
          Quotation,
        ]) => {
          const queryOffer: GMCotProductoOferta = buildQueryOffers(
            quotationDetail.CotPartidasCotizacion,
            selectedQuotation,
          );
          if (queryOffer.Productos.length) {
            return this.processes01QuotationBreakdownItemsService
              .cotProductoOfertaGetsCotProductoOfertaTemporal(queryOffer)
              .pipe(
                map((response: Array<CotProductoOferta>) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al recuperar las multiples ofertas',
                    ),
                    response,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS({
                      selectedQuotationDetails: buildCotQuotationDetails(
                        quotationDetail,
                        addressClient,
                        selectedQuotation.EstadoCotizacion,
                        response,
                      ),
                    }),
                  );
                  this.store.dispatch(
                    quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                      activeNavigate: true,
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    SET_LOADING_SUCCESS({
                      active: true,
                      message: 'Se ha mandado a investigar el producto',
                    }),
                  );
                  this.location.back();
                  return RETURN_EMPTY();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al recuperar las multiples ofertas',
                    ),
                    error,
                  );
                  this.setStatus(API_REQUEST_STATUS_FAILED);
                  return of(SET_LOADING({payload: false}));
                }),
              );
          }
          this.store.dispatch(
            quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS({
              selectedQuotationDetails: buildCotQuotationDetails(
                quotationDetail,
                addressClient,
                selectedQuotation.EstadoCotizacion,
              ),
            }),
          );
          this.store.dispatch(
            quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
              activeNavigate: true,
            }),
          );
          this.store.dispatch(SET_LOADING({payload: false}));
          this.store.dispatch(
            SET_LOADING_SUCCESS({active: true, message: 'Se ha mandado a investigar el producto'}),
          );
          this.location.back();
          return of(RETURN_EMPTY());
        },
      ),*/
    ),
  );

  setStatus(offlineProductStatus: number): void {
    this.store.dispatch(
      offlineProductActions.SET_STATUS_API({
        offlineProductStatus,
      }),
    );
  }
}
