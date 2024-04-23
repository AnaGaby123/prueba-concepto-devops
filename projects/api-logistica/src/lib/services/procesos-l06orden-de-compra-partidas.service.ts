/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcPartida } from '../models/oc-partida';
import { QueryResultOcPartida } from '../models/query-result-oc-partida';
import { QueryInfo } from '../models/query-info';
import { DatosGraficaOrdenDeCompraFleteObj } from '../models/datos-grafica-orden-de-compra-flete-obj';
import { DatosGraficaOrdenDeCompraProveedorObj } from '../models/datos-grafica-orden-de-compra-proveedor-obj';
import { DatosGraficaOrdenDeCompraTiempoDeReferenciaObj } from '../models/datos-grafica-orden-de-compra-tiempo-de-referencia-obj';
import { DatosGraficaOrdenDeCompraTipoEntregaObj } from '../models/datos-grafica-orden-de-compra-tipo-entrega-obj';
import { QueryResultVOcPartida } from '../models/query-result-voc-partida';
import { GroupQueryResultVOcPartidaDetalle } from '../models/group-query-result-voc-partida-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVOcPartidaDetalle } from '../models/query-result-voc-partida-detalle';
import { QueryResultVProductoPendienteCompra } from '../models/query-result-vproducto-pendiente-compra';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraPartidasService extends __BaseService {
  static readonly ocPartidaObtenerPath = '/ocPartida';
  static readonly ocPartidaGuardarOActualizarPath = '/ocPartida';
  static readonly ocPartidaQueryResultPath = '/ocPartida';
  static readonly ocPartidaDesactivarPath = '/ocPartida';
  static readonly ocPartidaExtensionsGenerarPartidasOcOrdenDeCompraPath = '/GenerarPartidasOcOrdenDeCompra';
  static readonly vOcPartidaDatosGraficaOrdenDeCompraFleteObjPath = '/DatosGraficaOrdenDeCompraFleteObj';
  static readonly vOcPartidaDatosGraficaOrdenDeCompraObjPath = '/DatosGraficaOrdenDeCompraObj';
  static readonly vOcPartidaDatosGraficaOrdenDeCompraTiempoDeReferenciaObjPath = '/DatosGraficaOrdenDeCompraTiempoDeReferenciaObj';
  static readonly vOcPartidaDatosGraficaOrdenDeCompraTipoEntregaObjPath = '/DatosGraficaOrdenDeCompraTipoEntregaObj';
  static readonly vOcPartidaQueryResultPath = '/vOcPartida';
  static readonly vOcPartidaDetalleGroupQueryResultPath = '/GrupoListavOcPartidaDetalle';
  static readonly vOcPartidaDetalleQueryResultPath = '/vOcPartidaDetalle';
  static readonly vOcPartidaDetalleQueryResultDetallePath = '/vOcPartidaDetalleDetalle';
  static readonly vProductoPendienteCompraQueryResultPath = '/vProductoPendienteCompra';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocPartida
   * @param idocPartida Identificador de ocPartida
   * @return OK
   */
  ocPartidaObtenerResponse(idocPartida: string): __Observable<__StrictHttpResponse<OcPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartida != null) __params = __params.set('idocPartida', idocPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPartida>;
      })
    );
  }
  /**
   * Consultar registro de ocPartida
   * @param idocPartida Identificador de ocPartida
   * @return OK
   */
  ocPartidaObtener(idocPartida: string): __Observable<OcPartida> {
    return this.ocPartidaObtenerResponse(idocPartida).pipe(
      __map(_r => _r.body as OcPartida)
    );
  }

  /**
   * Guardar o actualizar ocPartida
   * @param ocPartida ocPartida
   * @return OK
   */
  ocPartidaGuardarOActualizarResponse(ocPartida: OcPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPartida`,
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
   * Guardar o actualizar ocPartida
   * @param ocPartida ocPartida
   * @return OK
   */
  ocPartidaGuardarOActualizar(ocPartida: OcPartida): __Observable<string> {
    return this.ocPartidaGuardarOActualizarResponse(ocPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPartida>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaQueryResult(info: QueryInfo): __Observable<QueryResultOcPartida> {
    return this.ocPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPartida)
    );
  }

  /**
   * Desactivar registro de ocPartida
   * @param idocPartida Identificador de registro de ocPartida
   * @return OK
   */
  ocPartidaDesactivarResponse(idocPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartida != null) __params = __params.set('idocPartida', idocPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPartida`,
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
   * Desactivar registro de ocPartida
   * @param idocPartida Identificador de registro de ocPartida
   * @return OK
   */
  ocPartidaDesactivar(idocPartida: string): __Observable<string> {
    return this.ocPartidaDesactivarResponse(idocPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GenerarPartidasOcOrdenDeCompra ocPartidaExtensions
   * @param params The `ProcesosL06OrdenDeCompraPartidasService.OcPartidaExtensionsGenerarPartidasOcOrdenDeCompraParams` containing the following parameters:
   *
   * - `idOcOrdenDeCompra`:
   *
   * - `ListaIdOcPendienteCompraProducto`:
   *
   * @return OK
   */
  ocPartidaExtensionsGenerarPartidasOcOrdenDeCompraResponse(params: ProcesosL06OrdenDeCompraPartidasService.OcPartidaExtensionsGenerarPartidasOcOrdenDeCompraParams): __Observable<__StrictHttpResponse<Array<OcPartida>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idOcOrdenDeCompra != null) __params = __params.set('idOcOrdenDeCompra', params.idOcOrdenDeCompra.toString());
    __body = params.ListaIdOcPendienteCompraProducto;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarPartidasOcOrdenDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OcPartida>>;
      })
    );
  }
  /**
   * GenerarPartidasOcOrdenDeCompra ocPartidaExtensions
   * @param params The `ProcesosL06OrdenDeCompraPartidasService.OcPartidaExtensionsGenerarPartidasOcOrdenDeCompraParams` containing the following parameters:
   *
   * - `idOcOrdenDeCompra`:
   *
   * - `ListaIdOcPendienteCompraProducto`:
   *
   * @return OK
   */
  ocPartidaExtensionsGenerarPartidasOcOrdenDeCompra(params: ProcesosL06OrdenDeCompraPartidasService.OcPartidaExtensionsGenerarPartidasOcOrdenDeCompraParams): __Observable<Array<OcPartida>> {
    return this.ocPartidaExtensionsGenerarPartidasOcOrdenDeCompraResponse(params).pipe(
      __map(_r => _r.body as Array<OcPartida>)
    );
  }

  /**
   * DatosGraficaOrdenDeCompraFleteObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraFleteObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaOrdenDeCompraFleteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaOrdenDeCompraFleteObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaOrdenDeCompraFleteObj>;
      })
    );
  }
  /**
   * DatosGraficaOrdenDeCompraFleteObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraFleteObj(info: QueryInfo): __Observable<DatosGraficaOrdenDeCompraFleteObj> {
    return this.vOcPartidaDatosGraficaOrdenDeCompraFleteObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaOrdenDeCompraFleteObj)
    );
  }

  /**
   * DatosGraficaOrdenDeCompraObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaOrdenDeCompraProveedorObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaOrdenDeCompraObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaOrdenDeCompraProveedorObj>;
      })
    );
  }
  /**
   * DatosGraficaOrdenDeCompraObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraObj(info: QueryInfo): __Observable<DatosGraficaOrdenDeCompraProveedorObj> {
    return this.vOcPartidaDatosGraficaOrdenDeCompraObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaOrdenDeCompraProveedorObj)
    );
  }

  /**
   * DatosGraficaOrdenDeCompraTiempoDeReferenciaObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraTiempoDeReferenciaObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaOrdenDeCompraTiempoDeReferenciaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaOrdenDeCompraTiempoDeReferenciaObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaOrdenDeCompraTiempoDeReferenciaObj>;
      })
    );
  }
  /**
   * DatosGraficaOrdenDeCompraTiempoDeReferenciaObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraTiempoDeReferenciaObj(info: QueryInfo): __Observable<DatosGraficaOrdenDeCompraTiempoDeReferenciaObj> {
    return this.vOcPartidaDatosGraficaOrdenDeCompraTiempoDeReferenciaObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaOrdenDeCompraTiempoDeReferenciaObj)
    );
  }

  /**
   * DatosGraficaOrdenDeCompraTipoEntregaObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraTipoEntregaObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaOrdenDeCompraTipoEntregaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaOrdenDeCompraTipoEntregaObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaOrdenDeCompraTipoEntregaObj>;
      })
    );
  }
  /**
   * DatosGraficaOrdenDeCompraTipoEntregaObj vOcPartida
   * @param info undefined
   * @return OK
   */
  vOcPartidaDatosGraficaOrdenDeCompraTipoEntregaObj(info: QueryInfo): __Observable<DatosGraficaOrdenDeCompraTipoEntregaObj> {
    return this.vOcPartidaDatosGraficaOrdenDeCompraTipoEntregaObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaOrdenDeCompraTipoEntregaObj)
    );
  }

  /**
   * Consultar lista paginada de vOcPartida
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcPartida>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcPartida
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcPartidaQueryResult(info: QueryInfo): __Observable<QueryResultVOcPartida> {
    return this.vOcPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcPartida)
    );
  }

  /**
   * GroupQueryResult vOcPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vOcPartidaDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVOcPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavOcPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVOcPartidaDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vOcPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vOcPartidaDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVOcPartidaDetalle> {
    return this.vOcPartidaDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVOcPartidaDetalle)
    );
  }

  /**
   * Consultar lista paginada de vOcPartidaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcPartidaDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcPartidaDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcPartidaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcPartidaDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVOcPartidaDetalle> {
    return this.vOcPartidaDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcPartidaDetalle)
    );
  }

  /**
   * QueryResultDetalle vOcPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vOcPartidaDetalleQueryResultDetalleResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcPartidaDetalleDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcPartidaDetalle>;
      })
    );
  }
  /**
   * QueryResultDetalle vOcPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vOcPartidaDetalleQueryResultDetalle(info: QueryInfo): __Observable<QueryResultVOcPartidaDetalle> {
    return this.vOcPartidaDetalleQueryResultDetalleResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcPartidaDetalle)
    );
  }

  /**
   * Consultar lista paginada de vProductoPendienteCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProductoPendienteCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProductoPendienteCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProductoPendienteCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProductoPendienteCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProductoPendienteCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProductoPendienteCompraQueryResult(info: QueryInfo): __Observable<QueryResultVProductoPendienteCompra> {
    return this.vProductoPendienteCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProductoPendienteCompra)
    );
  }
}

module ProcesosL06OrdenDeCompraPartidasService {

  /**
   * Parameters for ocPartidaExtensionsGenerarPartidasOcOrdenDeCompra
   */
  export interface OcPartidaExtensionsGenerarPartidasOcOrdenDeCompraParams {
    idOcOrdenDeCompra: string;
    ListaIdOcPendienteCompraProducto: Array<string>;
  }
}

export { ProcesosL06OrdenDeCompraPartidasService }
