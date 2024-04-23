/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GroupQueryResultConfiguracionAplicadaClienteObj } from '../models/group-query-result-configuracion-aplicada-cliente-obj';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultConfiguracionAplicadaClienteObj } from '../models/query-result-configuracion-aplicada-cliente-obj';
import { QueryInfo } from '../models/query-info';
import { GroupQueryResultConfiguracionAplicadaClientePrecioListaObj } from '../models/group-query-result-configuracion-aplicada-cliente-precio-lista-obj';
import { QueryResultConfiguracionAplicadaClientePrecioListaObj } from '../models/query-result-configuracion-aplicada-cliente-precio-lista-obj';
import { GroupQueryResultConfiguracionAplicadaProveedorObj } from '../models/group-query-result-configuracion-aplicada-proveedor-obj';
import { QueryResultConfiguracionAplicadaProveedorObj } from '../models/query-result-configuracion-aplicada-proveedor-obj';
import { ConfiguracionPrecioClienteObj } from '../models/configuracion-precio-cliente-obj';
import { ConfiguracionPrecioContratoClienteObj } from '../models/configuracion-precio-contrato-cliente-obj';
import { QueryResultVClasificacionProductoCliente } from '../models/query-result-vclasificacion-producto-cliente';
import { QueryResultVClasificacionProductoMarcaCliente } from '../models/query-result-vclasificacion-producto-marca-cliente';
import { QueryResultVConfiguracionAplicadaCliente } from '../models/query-result-vconfiguracion-aplicada-cliente';
import { QueryResultVPrecioListaClienteProducto } from '../models/query-result-vprecio-lista-cliente-producto';
import { QueryResultVPrecioListaClienteProductoClasificacion } from '../models/query-result-vprecio-lista-cliente-producto-clasificacion';
import { QueryResultVPrecioListaClienteProductoFamilia } from '../models/query-result-vprecio-lista-cliente-producto-familia';
import { QueryResultVPrecioListaProductoMarcaCliente } from '../models/query-result-vprecio-lista-producto-marca-cliente';
import { QueryResultVPrecioProductoCliente } from '../models/query-result-vprecio-producto-cliente';
import { QueryResultVPrecioProductoContrato } from '../models/query-result-vprecio-producto-contrato';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesCalculosService extends __BaseService {
  static readonly ConfiguracionAplicadaClienteGroupQueryResultPath = '/GrupoListaConfiguracionAplicadaCliente';
  static readonly ConfiguracionAplicadaClienteQueryResultPath = '/ConfiguracionAplicadaCliente';
  static readonly ConfiguracionAplicadaClientePrecioListaGroupQueryResultPath = '/GrupoListaConfiguracionAplicadaClientePrecioLista';
  static readonly ConfiguracionAplicadaClientePrecioListaQueryResultPath = '/ConfiguracionAplicadaClientePrecioLista';
  static readonly ConfiguracionAplicadaProveedoGroupQueryResultPath = '/GrupoListaConfiguracionAplicadaProveedor';
  static readonly ConfiguracionAplicadaProveedoQueryResultPath = '/ConfiguracionAplicadaProveedor';
  static readonly ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorPath = '/ConfiguracionClienteProveedor';
  static readonly ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorPath = '/ConfiguracionContratoClienteProveedor';
  static readonly vClasificacionProductoClienteQueryResultPath = '/vClasificacionProductoCliente';
  static readonly vClasificacionProductoMarcaClienteQueryResultPath = '/vClasificacionProductoMarcaCliente';
  static readonly vConfiguracionAplicadaClienteQueryResultPath = '/vConfiguracionAplicadaCliente';
  static readonly vPrecioListaClienteProductoQueryResultPath = '/vPrecioListaClienteProducto';
  static readonly vPrecioListaClienteProductoClasificacionQueryResultPath = '/vPrecioListaClienteProductoClasificacion';
  static readonly vPrecioListaClienteProductoFamiliaQueryResultPath = '/vPrecioListaClienteProductoFamilia';
  static readonly vPrecioListaProductoMarcaClienteQueryResultPath = '/vPrecioListaProductoMarcaCliente';
  static readonly vPrecioProductoClienteQueryResultPath = '/vPrecioProductoCliente';
  static readonly vPrecioProductoContratoQueryResultPath = '/vPrecioProductoContrato';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * GroupQueryResult ConfiguracionAplicadaCliente
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClienteGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultConfiguracionAplicadaClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaConfiguracionAplicadaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultConfiguracionAplicadaClienteObj>;
      })
    );
  }
  /**
   * GroupQueryResult ConfiguracionAplicadaCliente
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClienteGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultConfiguracionAplicadaClienteObj> {
    return this.ConfiguracionAplicadaClienteGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultConfiguracionAplicadaClienteObj)
    );
  }

  /**
   * QueryResult ConfiguracionAplicadaCliente
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionAplicadaClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionAplicadaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionAplicadaClienteObj>;
      })
    );
  }
  /**
   * QueryResult ConfiguracionAplicadaCliente
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClienteQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionAplicadaClienteObj> {
    return this.ConfiguracionAplicadaClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionAplicadaClienteObj)
    );
  }

  /**
   * GroupQueryResult ConfiguracionAplicadaClientePrecioLista
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClientePrecioListaGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultConfiguracionAplicadaClientePrecioListaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaConfiguracionAplicadaClientePrecioLista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultConfiguracionAplicadaClientePrecioListaObj>;
      })
    );
  }
  /**
   * GroupQueryResult ConfiguracionAplicadaClientePrecioLista
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClientePrecioListaGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultConfiguracionAplicadaClientePrecioListaObj> {
    return this.ConfiguracionAplicadaClientePrecioListaGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultConfiguracionAplicadaClientePrecioListaObj)
    );
  }

  /**
   * QueryResult ConfiguracionAplicadaClientePrecioLista
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClientePrecioListaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionAplicadaClientePrecioListaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionAplicadaClientePrecioLista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionAplicadaClientePrecioListaObj>;
      })
    );
  }
  /**
   * QueryResult ConfiguracionAplicadaClientePrecioLista
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaClientePrecioListaQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionAplicadaClientePrecioListaObj> {
    return this.ConfiguracionAplicadaClientePrecioListaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionAplicadaClientePrecioListaObj)
    );
  }

  /**
   * GroupQueryResult ConfiguracionAplicadaProveedo
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaProveedoGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultConfiguracionAplicadaProveedorObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaConfiguracionAplicadaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultConfiguracionAplicadaProveedorObj>;
      })
    );
  }
  /**
   * GroupQueryResult ConfiguracionAplicadaProveedo
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaProveedoGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultConfiguracionAplicadaProveedorObj> {
    return this.ConfiguracionAplicadaProveedoGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultConfiguracionAplicadaProveedorObj)
    );
  }

  /**
   * QueryResult ConfiguracionAplicadaProveedo
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaProveedoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionAplicadaProveedorObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionAplicadaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionAplicadaProveedorObj>;
      })
    );
  }
  /**
   * QueryResult ConfiguracionAplicadaProveedo
   * @param info undefined
   * @return OK
   */
  ConfiguracionAplicadaProveedoQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionAplicadaProveedorObj> {
    return this.ConfiguracionAplicadaProveedoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionAplicadaProveedorObj)
    );
  }

  /**
   * ConfiguracionClienteProveedor ConfiguracionClienteProveedorExtension
   * @param params The `ConfiguracionClientesCalculosService.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams` containing the following parameters:
   *
   * - `NivelConfiguracionProveedor`:
   *
   * - `NivelConfiguracionCliente`:
   *
   * - `IdMarcaFamiliaProveedor`:
   *
   * - `IdCliente`:
   *
   * - `PrecioLista`:
   *
   * - `IdProducto`:
   *
   * - `IdAgrupadorCaracteristica`:
   *
   * @return OK
   */
  ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorResponse(params: ConfiguracionClientesCalculosService.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams): __Observable<__StrictHttpResponse<ConfiguracionPrecioClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.NivelConfiguracionProveedor != null) __params = __params.set('NivelConfiguracionProveedor', params.NivelConfiguracionProveedor.toString());
    if (params.NivelConfiguracionCliente != null) __params = __params.set('NivelConfiguracionCliente', params.NivelConfiguracionCliente.toString());
    if (params.IdMarcaFamiliaProveedor != null) __params = __params.set('IdMarcaFamiliaProveedor', params.IdMarcaFamiliaProveedor.toString());
    if (params.IdCliente != null) __params = __params.set('IdCliente', params.IdCliente.toString());
    if (params.PrecioLista != null) __params = __params.set('PrecioLista', params.PrecioLista.toString());
    if (params.IdProducto != null) __params = __params.set('IdProducto', params.IdProducto.toString());
    if (params.IdAgrupadorCaracteristica != null) __params = __params.set('IdAgrupadorCaracteristica', params.IdAgrupadorCaracteristica.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionClienteProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioClienteObj>;
      })
    );
  }
  /**
   * ConfiguracionClienteProveedor ConfiguracionClienteProveedorExtension
   * @param params The `ConfiguracionClientesCalculosService.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams` containing the following parameters:
   *
   * - `NivelConfiguracionProveedor`:
   *
   * - `NivelConfiguracionCliente`:
   *
   * - `IdMarcaFamiliaProveedor`:
   *
   * - `IdCliente`:
   *
   * - `PrecioLista`:
   *
   * - `IdProducto`:
   *
   * - `IdAgrupadorCaracteristica`:
   *
   * @return OK
   */
  ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedor(params: ConfiguracionClientesCalculosService.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams): __Observable<ConfiguracionPrecioClienteObj> {
    return this.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorResponse(params).pipe(
      __map(_r => _r.body as ConfiguracionPrecioClienteObj)
    );
  }

  /**
   * ConfiguracionContratoClienteProveedor ConfiguracionContratoClienteProveedorExtension
   * @param params The `ConfiguracionClientesCalculosService.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams` containing the following parameters:
   *
   * - `idMarcaFamiliaProveedor`:
   *
   * - `idCliente`:
   *
   * - `NivelConfiguracionProveedor`:
   *
   * - `NivelConfiguracionCliente`:
   *
   * - `precioLista`:
   *
   * - `idProducto`:
   *
   * - `idMarca`:
   *
   * - `idContratoCliente`:
   *
   * - `idAgrupadorCaracteristica`:
   *
   * @return OK
   */
  ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorResponse(params: ConfiguracionClientesCalculosService.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams): __Observable<__StrictHttpResponse<ConfiguracionPrecioContratoClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idMarcaFamiliaProveedor != null) __params = __params.set('idMarcaFamiliaProveedor', params.idMarcaFamiliaProveedor.toString());
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.NivelConfiguracionProveedor != null) __params = __params.set('NivelConfiguracionProveedor', params.NivelConfiguracionProveedor.toString());
    if (params.NivelConfiguracionCliente != null) __params = __params.set('NivelConfiguracionCliente', params.NivelConfiguracionCliente.toString());
    if (params.precioLista != null) __params = __params.set('precioLista', params.precioLista.toString());
    if (params.idProducto != null) __params = __params.set('idProducto', params.idProducto.toString());
    if (params.idMarca != null) __params = __params.set('idMarca', params.idMarca.toString());
    if (params.idContratoCliente != null) __params = __params.set('idContratoCliente', params.idContratoCliente.toString());
    if (params.idAgrupadorCaracteristica != null) __params = __params.set('idAgrupadorCaracteristica', params.idAgrupadorCaracteristica.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionContratoClienteProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioContratoClienteObj>;
      })
    );
  }
  /**
   * ConfiguracionContratoClienteProveedor ConfiguracionContratoClienteProveedorExtension
   * @param params The `ConfiguracionClientesCalculosService.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams` containing the following parameters:
   *
   * - `idMarcaFamiliaProveedor`:
   *
   * - `idCliente`:
   *
   * - `NivelConfiguracionProveedor`:
   *
   * - `NivelConfiguracionCliente`:
   *
   * - `precioLista`:
   *
   * - `idProducto`:
   *
   * - `idMarca`:
   *
   * - `idContratoCliente`:
   *
   * - `idAgrupadorCaracteristica`:
   *
   * @return OK
   */
  ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedor(params: ConfiguracionClientesCalculosService.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams): __Observable<ConfiguracionPrecioContratoClienteObj> {
    return this.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorResponse(params).pipe(
      __map(_r => _r.body as ConfiguracionPrecioContratoClienteObj)
    );
  }

  /**
   * Consultar lista paginada de vClasificacionProductoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vClasificacionProductoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClasificacionProductoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClasificacionProductoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClasificacionProductoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClasificacionProductoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vClasificacionProductoClienteQueryResult(info: QueryInfo): __Observable<QueryResultVClasificacionProductoCliente> {
    return this.vClasificacionProductoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClasificacionProductoCliente)
    );
  }

  /**
   * Consultar lista paginada de vClasificacionProductoMarcaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vClasificacionProductoMarcaClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClasificacionProductoMarcaCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClasificacionProductoMarcaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClasificacionProductoMarcaCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClasificacionProductoMarcaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vClasificacionProductoMarcaClienteQueryResult(info: QueryInfo): __Observable<QueryResultVClasificacionProductoMarcaCliente> {
    return this.vClasificacionProductoMarcaClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClasificacionProductoMarcaCliente)
    );
  }

  /**
   * Consultar lista paginada de vConfiguracionAplicadaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionAplicadaClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVConfiguracionAplicadaCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vConfiguracionAplicadaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVConfiguracionAplicadaCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vConfiguracionAplicadaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionAplicadaClienteQueryResult(info: QueryInfo): __Observable<QueryResultVConfiguracionAplicadaCliente> {
    return this.vConfiguracionAplicadaClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVConfiguracionAplicadaCliente)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaClienteProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaClienteProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaClienteProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaClienteProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaClienteProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaClienteProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaClienteProductoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaClienteProducto> {
    return this.vPrecioListaClienteProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaClienteProducto)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaClienteProductoClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaClienteProductoClasificacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaClienteProductoClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaClienteProductoClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaClienteProductoClasificacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaClienteProductoClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaClienteProductoClasificacionQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaClienteProductoClasificacion> {
    return this.vPrecioListaClienteProductoClasificacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaClienteProductoClasificacion)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaClienteProductoFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaClienteProductoFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaClienteProductoFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaClienteProductoFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaClienteProductoFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaClienteProductoFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaClienteProductoFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaClienteProductoFamilia> {
    return this.vPrecioListaClienteProductoFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaClienteProductoFamilia)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaProductoMarcaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProductoMarcaClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProductoMarcaCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProductoMarcaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProductoMarcaCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaProductoMarcaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioListaProductoMarcaClienteQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProductoMarcaCliente> {
    return this.vPrecioListaProductoMarcaClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProductoMarcaCliente)
    );
  }

  /**
   * Consultar lista paginada de vPrecioProductoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProductoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProductoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProductoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProductoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoClienteQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProductoCliente> {
    return this.vPrecioProductoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProductoCliente)
    );
  }

  /**
   * Consultar lista paginada de vPrecioProductoContrato
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoContratoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProductoContrato>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProductoContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProductoContrato>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProductoContrato
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vPrecioProductoContratoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProductoContrato> {
    return this.vPrecioProductoContratoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProductoContrato)
    );
  }
}

module ConfiguracionClientesCalculosService {

  /**
   * Parameters for ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedor
   */
  export interface ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams {
    NivelConfiguracionProveedor: string;
    NivelConfiguracionCliente: string;
    IdMarcaFamiliaProveedor: string;
    IdCliente: string;
    PrecioLista?: number;
    IdProducto?: string;
    IdAgrupadorCaracteristica?: string;
  }

  /**
   * Parameters for ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedor
   */
  export interface ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams {
    idMarcaFamiliaProveedor: string;
    idCliente: string;
    NivelConfiguracionProveedor: string;
    NivelConfiguracionCliente: string;
    precioLista?: number;
    idProducto?: string;
    idMarca?: string;
    idContratoCliente?: string;
    idAgrupadorCaracteristica?: string;
  }
}

export { ConfiguracionClientesCalculosService }
