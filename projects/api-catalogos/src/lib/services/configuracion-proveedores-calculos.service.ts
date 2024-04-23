/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConfiguracionPrecioListaProveedorObj } from '../models/configuracion-precio-lista-proveedor-obj';
import { ConfProveedorUtilidadComision } from '../models/conf-proveedor-utilidad-comision';
import { ConfProveedorCompra } from '../models/conf-proveedor-compra';
import { ConfProveedorLogistica } from '../models/conf-proveedor-logistica';
import { QueryResultVConfiguracionPrecioListaProducto } from '../models/query-result-vconfiguracion-precio-lista-producto';
import { QueryInfo } from '../models/query-info';
import { QueryResultVConfiguracionProductoProveedor } from '../models/query-result-vconfiguracion-producto-proveedor';
import { QueryResultVPrecioListaProductoClasificacion } from '../models/query-result-vprecio-lista-producto-clasificacion';
import { QueryResultVPrecioListaProveedorProducto } from '../models/query-result-vprecio-lista-proveedor-producto';
import { QueryResultVPrecioListaProveedorProductoClasificacion } from '../models/query-result-vprecio-lista-proveedor-producto-clasificacion';
import { QueryResultVPrecioListaProveedorProductoFamilia } from '../models/query-result-vprecio-lista-proveedor-producto-familia';
import { QueryResultVPrecioProductoProveedor } from '../models/query-result-vprecio-producto-proveedor';
import { QueryResultVPrecioProductoProveedorFamilia } from '../models/query-result-vprecio-producto-proveedor-familia';
import { QueryResultVPrecioProductoProveedorFamiliaInvestigacion } from '../models/query-result-vprecio-producto-proveedor-familia-investigacion';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProveedoresCalculosService extends __BaseService {
  static readonly ConfiguracionProveedorExtensionConfiguracionProveedorPath = '/ConfiguracionProveedor';
  static readonly ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadPath = '/ConfiguracionProveedorRendimiento';
  static readonly ConfiguracionProveedorExtensionConfiguracionProveedorCompraPath = '/ConfiguracionProveedorCompra';
  static readonly ConfiguracionProveedorExtensionConfiguracionProveedorLogisticaPath = '/ConfiguracionProveedorLogistica';
  static readonly ConfiguracionProveedorExtensionConfiguracionProveedorVentaPath = '/ConfiguracionProveedorVenta';
  static readonly ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadPath = '/ConfiguracionProveedorVentaUtilidad';
  static readonly vConfiguracionPrecioListaProductoQueryResultPath = '/vConfiguracionPrecioListaProducto';
  static readonly vConfiguracionProductoProveedorQueryResultPath = '/vConfiguracionProductoProveedor';
  static readonly vPrecioListaProductoClasificacionQueryResultPath = '/vPrecioListaProductoClasificacion';
  static readonly vPrecioListaProveedorProductoQueryResultPath = '/vPrecioListaProveedorProducto';
  static readonly vPrecioListaProveedorProductoClasificacionQueryResultPath = '/vPrecioListaProveedorProductoClasificacion';
  static readonly vPrecioListaProveedorProductoFamiliaQueryResultPath = '/vPrecioListaProveedorProductoFamilia';
  static readonly vPrecioProductoProveedorQueryResultPath = '/vPrecioProductoProveedor';
  static readonly vPrecioProductoProveedorFamiliaQueryResultPath = '/vPrecioProductoProveedorFamilia';
  static readonly vPrecioProductoProveedorFamiliaInvestigacionQueryResultPath = '/vPrecioProductoProveedorFamiliaInvestigacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener una configuracion de proveedor depende de la MarcaFamiliaProveedor y el Nivel de Configuración
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorParams` containing the following parameters:
   *
   * - `NivelConfiguracion`: identificador de Nivel de Configuracion (Familia, PrecioLista, AgrupadorCaracteristica o Producto)
   *
   * - `IdMarcaFamiliaProveedor`: identificador de MarcaFamiliaProveedor
   *
   * - `PrecioLista`: Precio de Lista es opcional
   *
   * - `IdProducto`: identificador de Producto es opcional
   *
   * - `IdAgrupadorCaracteristica`: identificador de AgrupadorCaracteristica es opcional
   *
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorResponse(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorParams): __Observable<__StrictHttpResponse<ConfiguracionPrecioListaProveedorObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.NivelConfiguracion != null) __params = __params.set('NivelConfiguracion', params.NivelConfiguracion.toString());
    if (params.IdMarcaFamiliaProveedor != null) __params = __params.set('IdMarcaFamiliaProveedor', params.IdMarcaFamiliaProveedor.toString());
    if (params.PrecioLista != null) __params = __params.set('PrecioLista', params.PrecioLista.toString());
    if (params.IdProducto != null) __params = __params.set('IdProducto', params.IdProducto.toString());
    if (params.IdAgrupadorCaracteristica != null) __params = __params.set('IdAgrupadorCaracteristica', params.IdAgrupadorCaracteristica.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioListaProveedorObj>;
      })
    );
  }
  /**
   * Obtener una configuracion de proveedor depende de la MarcaFamiliaProveedor y el Nivel de Configuración
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorParams` containing the following parameters:
   *
   * - `NivelConfiguracion`: identificador de Nivel de Configuracion (Familia, PrecioLista, AgrupadorCaracteristica o Producto)
   *
   * - `IdMarcaFamiliaProveedor`: identificador de MarcaFamiliaProveedor
   *
   * - `PrecioLista`: Precio de Lista es opcional
   *
   * - `IdProducto`: identificador de Producto es opcional
   *
   * - `IdAgrupadorCaracteristica`: identificador de AgrupadorCaracteristica es opcional
   *
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedor(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorParams): __Observable<ConfiguracionPrecioListaProveedorObj> {
    return this.ConfiguracionProveedorExtensionConfiguracionProveedorResponse(params).pipe(
      __map(_r => _r.body as ConfiguracionPrecioListaProveedorObj)
    );
  }

  /**
   * ConfiguracionProveedorComisionUtilidad ConfiguracionProveedorExtension
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams` containing the following parameters:
   *
   * - `IdMarcaFamilia`:
   *
   * - `IdCotPartidaCotizacionInvestigacion`:
   *
   * - `IdConfiguracionPrecioProveedorFamilia`:
   *
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadResponse(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams): __Observable<__StrictHttpResponse<ConfProveedorUtilidadComision>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.IdMarcaFamilia != null) __params = __params.set('IdMarcaFamilia', params.IdMarcaFamilia.toString());
    if (params.IdCotPartidaCotizacionInvestigacion != null) __params = __params.set('IdCotPartidaCotizacionInvestigacion', params.IdCotPartidaCotizacionInvestigacion.toString());
    if (params.IdConfiguracionPrecioProveedorFamilia != null) __params = __params.set('IdConfiguracionPrecioProveedorFamilia', params.IdConfiguracionPrecioProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorRendimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfProveedorUtilidadComision>;
      })
    );
  }
  /**
   * ConfiguracionProveedorComisionUtilidad ConfiguracionProveedorExtension
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams` containing the following parameters:
   *
   * - `IdMarcaFamilia`:
   *
   * - `IdCotPartidaCotizacionInvestigacion`:
   *
   * - `IdConfiguracionPrecioProveedorFamilia`:
   *
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidad(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams): __Observable<ConfProveedorUtilidadComision> {
    return this.ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadResponse(params).pipe(
      __map(_r => _r.body as ConfProveedorUtilidadComision)
    );
  }

  /**
   * ConfiguracionProveedorCompra ConfiguracionProveedorExtension
   * @param IdMarcaFamiliaProveedor undefined
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorCompraResponse(IdMarcaFamiliaProveedor: string): __Observable<__StrictHttpResponse<ConfProveedorCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdMarcaFamiliaProveedor != null) __params = __params.set('IdMarcaFamiliaProveedor', IdMarcaFamiliaProveedor.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfProveedorCompra>;
      })
    );
  }
  /**
   * ConfiguracionProveedorCompra ConfiguracionProveedorExtension
   * @param IdMarcaFamiliaProveedor undefined
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorCompra(IdMarcaFamiliaProveedor: string): __Observable<ConfProveedorCompra> {
    return this.ConfiguracionProveedorExtensionConfiguracionProveedorCompraResponse(IdMarcaFamiliaProveedor).pipe(
      __map(_r => _r.body as ConfProveedorCompra)
    );
  }

  /**
   * ConfiguracionProveedorLogistica ConfiguracionProveedorExtension
   * @param IdMarcaFamiliaProveedor undefined
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorLogisticaResponse(IdMarcaFamiliaProveedor: string): __Observable<__StrictHttpResponse<ConfProveedorLogistica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdMarcaFamiliaProveedor != null) __params = __params.set('IdMarcaFamiliaProveedor', IdMarcaFamiliaProveedor.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorLogistica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfProveedorLogistica>;
      })
    );
  }
  /**
   * ConfiguracionProveedorLogistica ConfiguracionProveedorExtension
   * @param IdMarcaFamiliaProveedor undefined
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorLogistica(IdMarcaFamiliaProveedor: string): __Observable<ConfProveedorLogistica> {
    return this.ConfiguracionProveedorExtensionConfiguracionProveedorLogisticaResponse(IdMarcaFamiliaProveedor).pipe(
      __map(_r => _r.body as ConfProveedorLogistica)
    );
  }

  /**
   * ConfiguracionProveedorVenta ConfiguracionProveedorExtension
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams` containing the following parameters:
   *
   * - `IdMarcaFamiliaProveedor`:
   *
   * - `IdCotPartidaCotizacionInvestigacion`:
   *
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorVentaResponse(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams): __Observable<__StrictHttpResponse<ConfProveedorUtilidadComision>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.IdMarcaFamiliaProveedor != null) __params = __params.set('IdMarcaFamiliaProveedor', params.IdMarcaFamiliaProveedor.toString());
    if (params.IdCotPartidaCotizacionInvestigacion != null) __params = __params.set('IdCotPartidaCotizacionInvestigacion', params.IdCotPartidaCotizacionInvestigacion.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorVenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfProveedorUtilidadComision>;
      })
    );
  }
  /**
   * ConfiguracionProveedorVenta ConfiguracionProveedorExtension
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams` containing the following parameters:
   *
   * - `IdMarcaFamiliaProveedor`:
   *
   * - `IdCotPartidaCotizacionInvestigacion`:
   *
   * @return OK
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorVenta(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams): __Observable<ConfProveedorUtilidadComision> {
    return this.ConfiguracionProveedorExtensionConfiguracionProveedorVentaResponse(params).pipe(
      __map(_r => _r.body as ConfProveedorUtilidadComision)
    );
  }

  /**
   * ConfiguracionProveedorVentaUtilidad ConfiguracionProveedorExtension
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadParams` containing the following parameters:
   *
   * - `idMarcaFamilia`:
   *
   * - `IdsMarcaFamiliaCatIndustria`:
   *
   * - `IdMarcaFamiliaProveedor`:
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadResponse(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idMarcaFamilia != null) __params = __params.set('idMarcaFamilia', params.idMarcaFamilia.toString());
    __body = params.IdsMarcaFamiliaCatIndustria;
    if (params.IdMarcaFamiliaProveedor != null) __params = __params.set('IdMarcaFamiliaProveedor', params.IdMarcaFamiliaProveedor.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorVentaUtilidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * ConfiguracionProveedorVentaUtilidad ConfiguracionProveedorExtension
   * @param params The `ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadParams` containing the following parameters:
   *
   * - `idMarcaFamilia`:
   *
   * - `IdsMarcaFamiliaCatIndustria`:
   *
   * - `IdMarcaFamiliaProveedor`:
   */
  ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidad(params: ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadParams): __Observable<null> {
    return this.ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consultar lista paginada de vConfiguracionPrecioListaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionPrecioListaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVConfiguracionPrecioListaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vConfiguracionPrecioListaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVConfiguracionPrecioListaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vConfiguracionPrecioListaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionPrecioListaProductoQueryResult(info: QueryInfo): __Observable<QueryResultVConfiguracionPrecioListaProducto> {
    return this.vConfiguracionPrecioListaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVConfiguracionPrecioListaProducto)
    );
  }

  /**
   * Consultar lista paginada de vConfiguracionProductoProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionProductoProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVConfiguracionProductoProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vConfiguracionProductoProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVConfiguracionProductoProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de vConfiguracionProductoProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionProductoProveedorQueryResult(info: QueryInfo): __Observable<QueryResultVConfiguracionProductoProveedor> {
    return this.vConfiguracionProductoProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVConfiguracionProductoProveedor)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaProductoClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProductoClasificacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProductoClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProductoClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProductoClasificacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaProductoClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProductoClasificacionQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProductoClasificacion> {
    return this.vPrecioListaProductoClasificacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProductoClasificacion)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaProveedorProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProveedorProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProveedorProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProveedorProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProveedorProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaProveedorProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProveedorProductoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProveedorProducto> {
    return this.vPrecioListaProveedorProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProveedorProducto)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaProveedorProductoClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProveedorProductoClasificacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProveedorProductoClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProveedorProductoClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProveedorProductoClasificacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaProveedorProductoClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProveedorProductoClasificacionQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProveedorProductoClasificacion> {
    return this.vPrecioListaProveedorProductoClasificacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProveedorProductoClasificacion)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaProveedorProductoFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProveedorProductoFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProveedorProductoFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProveedorProductoFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProveedorProductoFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaProveedorProductoFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProveedorProductoFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProveedorProductoFamilia> {
    return this.vPrecioListaProveedorProductoFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProveedorProductoFamilia)
    );
  }

  /**
   * Consultar lista paginada de vPrecioProductoProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProductoProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProductoProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProductoProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProductoProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoProveedorQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProductoProveedor> {
    return this.vPrecioProductoProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProductoProveedor)
    );
  }

  /**
   * Consultar lista paginada de vPrecioProductoProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoProveedorFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProductoProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProductoProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProductoProveedorFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProductoProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoProveedorFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProductoProveedorFamilia> {
    return this.vPrecioProductoProveedorFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProductoProveedorFamilia)
    );
  }

  /**
   * Consultar lista paginada de vPrecioProductoProveedorFamiliaInvestigacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoProveedorFamiliaInvestigacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProductoProveedorFamiliaInvestigacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProductoProveedorFamiliaInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProductoProveedorFamiliaInvestigacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProductoProveedorFamiliaInvestigacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoProveedorFamiliaInvestigacionQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProductoProveedorFamiliaInvestigacion> {
    return this.vPrecioProductoProveedorFamiliaInvestigacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProductoProveedorFamiliaInvestigacion)
    );
  }
}

module ConfiguracionProveedoresCalculosService {

  /**
   * Parameters for ConfiguracionProveedorExtensionConfiguracionProveedor
   */
  export interface ConfiguracionProveedorExtensionConfiguracionProveedorParams {

    /**
     * identificador de Nivel de Configuracion (Familia, PrecioLista, AgrupadorCaracteristica o Producto)
     */
    NivelConfiguracion: string;

    /**
     * identificador de MarcaFamiliaProveedor
     */
    IdMarcaFamiliaProveedor: string;

    /**
     * Precio de Lista es opcional
     */
    PrecioLista?: number;

    /**
     * identificador de Producto es opcional
     */
    IdProducto?: string;

    /**
     * identificador de AgrupadorCaracteristica es opcional
     */
    IdAgrupadorCaracteristica?: string;
  }

  /**
   * Parameters for ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidad
   */
  export interface ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams {
    IdMarcaFamilia: string;
    IdCotPartidaCotizacionInvestigacion?: string;
    IdConfiguracionPrecioProveedorFamilia?: string;
  }

  /**
   * Parameters for ConfiguracionProveedorExtensionConfiguracionProveedorVenta
   */
  export interface ConfiguracionProveedorExtensionConfiguracionProveedorVentaParams {
    IdMarcaFamiliaProveedor: string;
    IdCotPartidaCotizacionInvestigacion: string;
  }

  /**
   * Parameters for ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidad
   */
  export interface ConfiguracionProveedorExtensionConfiguracionProveedorVentaUtilidadParams {
    idMarcaFamilia: string;
    IdsMarcaFamiliaCatIndustria: Array<string>;
    IdMarcaFamiliaProveedor: string;
  }
}

export { ConfiguracionProveedoresCalculosService }
