/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContratoCliente } from '../models/contrato-cliente';
import { QueryResultContratoCliente } from '../models/query-result-contrato-cliente';
import { QueryInfo } from '../models/query-info';
import { GroupQueryResultContratoClienteDetalle } from '../models/group-query-result-contrato-cliente-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { ContratoClienteDetalle } from '../models/contrato-cliente-detalle';
import { QueryResultContratoClienteDetalle } from '../models/query-result-contrato-cliente-detalle';
import { ConfiguracionContratoCliente } from '../models/configuracion-contrato-cliente';
import { GMConfiguracionProquifaNetCliente } from '../models/gmconfiguracion-proquifa-net-cliente';
import { EnlaceExterno } from '../models/enlace-externo';
import { QueryResultVContratoCliente } from '../models/query-result-vcontrato-cliente';
import { QueryResultVContratoClienteProducto } from '../models/query-result-vcontrato-cliente-producto';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesContratoService extends __BaseService {
  static readonly ContratoClienteObtenerPath = '/ContratoCliente';
  static readonly ContratoClienteGuardarOActualizarPath = '/ContratoCliente';
  static readonly ContratoClienteQueryResultPath = '/ContratoCliente';
  static readonly ContratoClienteDesactivarPath = '/ContratoCliente';
  static readonly ContratoClienteDetalleGroupQueryResultPath = '/GrupoListaContratoClienteDetalle';
  static readonly ContratoClienteDetalleObtenerPath = '/ContratoClienteDetalle';
  static readonly ContratoClienteDetalleQueryResultPath = '/ContratoClienteDetalle';
  static readonly ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoPath = '/ContratoCliente/GetConfiguracionProquifaNetClienteContrato';
  static readonly ContratoClienteExtensionsGetConfiguracionProquifaNetClienteProductosPath = '/ContratoCliente/GetConfiguracionProquifaNetClienteProductos';
  static readonly ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPath = '/ContratoCliente/ObtenerPrecioProquifaNetClienteContrato';
  static readonly ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaPath = '/ContratoCliente/ObtenerPrecioProquifaNetClienteContratoPrecioLista';
  static readonly ContratoClienteExtensionsUrlPDFPath = '/UrlPDFContratoCliente';
  static readonly vContratoClienteQueryResultPath = '/vContratoCliente';
  static readonly vContratoClienteProductoQueryResultPath = '/vContratoClienteProducto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ContratoCliente
   * @param idContratoCliente Identificador de ContratoCliente
   * @return OK
   */
  ContratoClienteObtenerResponse(idContratoCliente: string): __Observable<__StrictHttpResponse<ContratoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoCliente != null) __params = __params.set('idContratoCliente', idContratoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoCliente>;
      })
    );
  }
  /**
   * Consultar registro de ContratoCliente
   * @param idContratoCliente Identificador de ContratoCliente
   * @return OK
   */
  ContratoClienteObtener(idContratoCliente: string): __Observable<ContratoCliente> {
    return this.ContratoClienteObtenerResponse(idContratoCliente).pipe(
      __map(_r => _r.body as ContratoCliente)
    );
  }

  /**
   * Guardar o actualizar ContratoCliente
   * @param ContratoCliente ContratoCliente
   * @return OK
   */
  ContratoClienteGuardarOActualizarResponse(ContratoCliente: ContratoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Guardar o actualizar ContratoCliente
   * @param ContratoCliente ContratoCliente
   * @return OK
   */
  ContratoClienteGuardarOActualizar(ContratoCliente: ContratoCliente): __Observable<string> {
    return this.ContratoClienteGuardarOActualizarResponse(ContratoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteQueryResult(info: QueryInfo): __Observable<QueryResultContratoCliente> {
    return this.ContratoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoCliente)
    );
  }

  /**
   * Desactivar registro de ContratoCliente
   * @param idContratoCliente Identificador de registro de ContratoCliente
   * @return OK
   */
  ContratoClienteDesactivarResponse(idContratoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoCliente != null) __params = __params.set('idContratoCliente', idContratoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Desactivar registro de ContratoCliente
   * @param idContratoCliente Identificador de registro de ContratoCliente
   * @return OK
   */
  ContratoClienteDesactivar(idContratoCliente: string): __Observable<string> {
    return this.ContratoClienteDesactivarResponse(idContratoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult ContratoClienteDetalle
   * @param info undefined
   * @return OK
   */
  ContratoClienteDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultContratoClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaContratoClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultContratoClienteDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult ContratoClienteDetalle
   * @param info undefined
   * @return OK
   */
  ContratoClienteDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultContratoClienteDetalle> {
    return this.ContratoClienteDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultContratoClienteDetalle)
    );
  }

  /**
   * Obtener ContratoClienteDetalle
   * @param idContratoCliente undefined
   * @return OK
   */
  ContratoClienteDetalleObtenerResponse(idContratoCliente: string): __Observable<__StrictHttpResponse<ContratoClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoCliente != null) __params = __params.set('idContratoCliente', idContratoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteDetalle>;
      })
    );
  }
  /**
   * Obtener ContratoClienteDetalle
   * @param idContratoCliente undefined
   * @return OK
   */
  ContratoClienteDetalleObtener(idContratoCliente: string): __Observable<ContratoClienteDetalle> {
    return this.ContratoClienteDetalleObtenerResponse(idContratoCliente).pipe(
      __map(_r => _r.body as ContratoClienteDetalle)
    );
  }

  /**
   * QueryResult ContratoClienteDetalle
   * @param info undefined
   * @return OK
   */
  ContratoClienteDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteDetalle>;
      })
    );
  }
  /**
   * QueryResult ContratoClienteDetalle
   * @param info undefined
   * @return OK
   */
  ContratoClienteDetalleQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteDetalle> {
    return this.ContratoClienteDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteDetalle)
    );
  }

  /**
   * GetConfiguracionProquifaNetClienteContrato ContratoClienteExtensions
   * @param params The `ConfiguracionClientesContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams` containing the following parameters:
   *
   * - `piezas`:
   *
   * - `idProducto`:
   *
   * - `idCliente`:
   *
   * - `idCatMoneda`:
   *
   * @return OK
   */
  ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoResponse(params: ConfiguracionClientesContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams): __Observable<__StrictHttpResponse<ConfiguracionContratoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.piezas != null) __params = __params.set('piezas', params.piezas.toString());
    if (params.idProducto != null) __params = __params.set('idProducto', params.idProducto.toString());
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.idCatMoneda != null) __params = __params.set('idCatMoneda', params.idCatMoneda.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoCliente/GetConfiguracionProquifaNetClienteContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionContratoCliente>;
      })
    );
  }
  /**
   * GetConfiguracionProquifaNetClienteContrato ContratoClienteExtensions
   * @param params The `ConfiguracionClientesContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams` containing the following parameters:
   *
   * - `piezas`:
   *
   * - `idProducto`:
   *
   * - `idCliente`:
   *
   * - `idCatMoneda`:
   *
   * @return OK
   */
  ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(params: ConfiguracionClientesContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams): __Observable<ConfiguracionContratoCliente> {
    return this.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoResponse(params).pipe(
      __map(_r => _r.body as ConfiguracionContratoCliente)
    );
  }

  /**
   * GetConfiguracionProquifaNetClienteProductos ContratoClienteExtensions
   * @param peticiones undefined
   * @return OK
   */
  ContratoClienteExtensionsGetConfiguracionProquifaNetClienteProductosResponse(peticiones: Array<GMConfiguracionProquifaNetCliente>): __Observable<__StrictHttpResponse<Array<ConfiguracionContratoCliente>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = peticiones;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoCliente/GetConfiguracionProquifaNetClienteProductos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConfiguracionContratoCliente>>;
      })
    );
  }
  /**
   * GetConfiguracionProquifaNetClienteProductos ContratoClienteExtensions
   * @param peticiones undefined
   * @return OK
   */
  ContratoClienteExtensionsGetConfiguracionProquifaNetClienteProductos(peticiones: Array<GMConfiguracionProquifaNetCliente>): __Observable<Array<ConfiguracionContratoCliente>> {
    return this.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteProductosResponse(peticiones).pipe(
      __map(_r => _r.body as Array<ConfiguracionContratoCliente>)
    );
  }

  /**
   * ObtenerPrecioProquifaDotNetClienteContrato ContratoClienteExtensions
   * @param params The `ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams` containing the following parameters:
   *
   * - `piezas`:
   *
   * - `idProducto`:
   *
   * - `idCliente`:
   *
   * - `utilidad`:
   *
   * - `idCatMoneda`:
   *
   * - `factorDeCostoFijo`:
   *
   * @return OK
   */
  ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoResponse(params: ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.piezas != null) __params = __params.set('piezas', params.piezas.toString());
    if (params.idProducto != null) __params = __params.set('idProducto', params.idProducto.toString());
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.utilidad != null) __params = __params.set('utilidad', params.utilidad.toString());
    if (params.idCatMoneda != null) __params = __params.set('idCatMoneda', params.idCatMoneda.toString());
    if (params.factorDeCostoFijo != null) __params = __params.set('factorDeCostoFijo', params.factorDeCostoFijo.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoCliente/ObtenerPrecioProquifaNetClienteContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * ObtenerPrecioProquifaDotNetClienteContrato ContratoClienteExtensions
   * @param params The `ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams` containing the following parameters:
   *
   * - `piezas`:
   *
   * - `idProducto`:
   *
   * - `idCliente`:
   *
   * - `utilidad`:
   *
   * - `idCatMoneda`:
   *
   * - `factorDeCostoFijo`:
   *
   * @return OK
   */
  ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContrato(params: ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams): __Observable<number> {
    return this.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoResponse(params).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * ObtenerPrecioProquifaDotNetClienteContratoPrecioLista ContratoClienteExtensions
   * @param params The `ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaParams` containing the following parameters:
   *
   * - `precioLista`:
   *
   * - `piezas`:
   *
   * - `idProveedorFamilia`:
   *
   * - `idMarca`:
   *
   * - `idContratoCliente`:
   *
   * - `idCliente`:
   *
   * - `utilidad`:
   *
   * - `idCatMoneda`:
   *
   * - `factorDeCostoFijo`:
   *
   * @return OK
   */
  ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaResponse(params: ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaParams): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.precioLista != null) __params = __params.set('precioLista', params.precioLista.toString());
    if (params.piezas != null) __params = __params.set('piezas', params.piezas.toString());
    if (params.idProveedorFamilia != null) __params = __params.set('idProveedorFamilia', params.idProveedorFamilia.toString());
    if (params.idMarca != null) __params = __params.set('idMarca', params.idMarca.toString());
    if (params.idContratoCliente != null) __params = __params.set('idContratoCliente', params.idContratoCliente.toString());
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.utilidad != null) __params = __params.set('utilidad', params.utilidad.toString());
    if (params.idCatMoneda != null) __params = __params.set('idCatMoneda', params.idCatMoneda.toString());
    if (params.factorDeCostoFijo != null) __params = __params.set('factorDeCostoFijo', params.factorDeCostoFijo.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoCliente/ObtenerPrecioProquifaNetClienteContratoPrecioLista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * ObtenerPrecioProquifaDotNetClienteContratoPrecioLista ContratoClienteExtensions
   * @param params The `ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaParams` containing the following parameters:
   *
   * - `precioLista`:
   *
   * - `piezas`:
   *
   * - `idProveedorFamilia`:
   *
   * - `idMarca`:
   *
   * - `idContratoCliente`:
   *
   * - `idCliente`:
   *
   * - `utilidad`:
   *
   * - `idCatMoneda`:
   *
   * - `factorDeCostoFijo`:
   *
   * @return OK
   */
  ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioLista(params: ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaParams): __Observable<number> {
    return this.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaResponse(params).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * UrlPDF ContratoClienteExtensions
   * @param idContratoCliente undefined
   * @return OK
   */
  ContratoClienteExtensionsUrlPDFResponse(idContratoCliente: string): __Observable<__StrictHttpResponse<EnlaceExterno>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoCliente != null) __params = __params.set('idContratoCliente', idContratoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/UrlPDFContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EnlaceExterno>;
      })
    );
  }
  /**
   * UrlPDF ContratoClienteExtensions
   * @param idContratoCliente undefined
   * @return OK
   */
  ContratoClienteExtensionsUrlPDF(idContratoCliente: string): __Observable<EnlaceExterno> {
    return this.ContratoClienteExtensionsUrlPDFResponse(idContratoCliente).pipe(
      __map(_r => _r.body as EnlaceExterno)
    );
  }

  /**
   * Consultar lista paginada de vContratoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vContratoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVContratoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVContratoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vContratoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vContratoClienteQueryResult(info: QueryInfo): __Observable<QueryResultVContratoCliente> {
    return this.vContratoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVContratoCliente)
    );
  }

  /**
   * Consultar lista paginada de vContratoClienteProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vContratoClienteProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVContratoClienteProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vContratoClienteProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVContratoClienteProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vContratoClienteProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vContratoClienteProductoQueryResult(info: QueryInfo): __Observable<QueryResultVContratoClienteProducto> {
    return this.vContratoClienteProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVContratoClienteProducto)
    );
  }
}

module ConfiguracionClientesContratoService {

  /**
   * Parameters for ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato
   */
  export interface ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams {
    piezas: number;
    idProducto: string;
    idCliente: string;
    idCatMoneda?: string;
  }

  /**
   * Parameters for ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContrato
   */
  export interface ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams {
    piezas: number;
    idProducto: string;
    idCliente: string;
    utilidad?: number;
    idCatMoneda?: string;
    factorDeCostoFijo?: number;
  }

  /**
   * Parameters for ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioLista
   */
  export interface ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoPrecioListaParams {
    precioLista: number;
    piezas: number;
    idProveedorFamilia: string;
    idMarca: string;
    idContratoCliente: string;
    idCliente: string;
    utilidad?: number;
    idCatMoneda?: string;
    factorDeCostoFijo?: number;
  }
}

export { ConfiguracionClientesContratoService }
