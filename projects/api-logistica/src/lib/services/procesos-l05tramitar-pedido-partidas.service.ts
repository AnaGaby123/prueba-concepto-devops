/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpPartidaPedido } from '../models/tp-partida-pedido';
import { QueryResultTpPartidaPedido } from '../models/query-result-tp-partida-pedido';
import { QueryInfo } from '../models/query-info';
import { TupleBooleanString } from '../models/tuple-boolean-string';
import { TpPedidoPartidasDetalleBO } from '../models/tp-pedido-partidas-detalle-bo';
import { GroupQueryResultVTramitarPedidoPartidaDetalle } from '../models/group-query-result-vtramitar-pedido-partida-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { VTramitarPedidoPartidaDetalle } from '../models/vtramitar-pedido-partida-detalle';
import { QueryResultVTramitarPedidoPartidaDetalle } from '../models/query-result-vtramitar-pedido-partida-detalle';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoPartidasService extends __BaseService {
  static readonly tpPartidaPedidoObtenerPath = '/tpPartidaPedido';
  static readonly tpPartidaPedidoGuardarOActualizarPath = '/tpPartidaPedido';
  static readonly tpPartidaPedidoQueryResultPath = '/tpPartidaPedido';
  static readonly tpPartidaPedidoDesactivarPath = '/tpPartidaPedido';
  static readonly tpPartidaPedidoEliminarProcessPath = '/tpPartidaPedidoEliminar';
  static readonly tpPedidoPartidasDetallePartidasDetallePath = '/tpPedido/tpPedidoPartidasDetalle';
  static readonly vTramitarPedidoPartidaDetalleGroupQueryResultPath = '/GrupoListavTramitarPedidoPartidaDetalle';
  static readonly vTramitarPedidoPartidaDetalleObtenerPath = '/vTramitarPedidoPartidaDetalle';
  static readonly vTramitarPedidoPartidaDetalleQueryResultPath = '/vTramitarPedidoPartidaDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener pPartidaPedido por su idpPartidaPedido
   * @param idtpPartidaPedido Identificador de pPartidaPedido
   * @return OK
   */
  tpPartidaPedidoObtenerResponse(idtpPartidaPedido: string): __Observable<__StrictHttpResponse<TpPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPartidaPedido != null) __params = __params.set('idtpPartidaPedido', idtpPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPartidaPedido>;
      })
    );
  }
  /**
   * Obtener pPartidaPedido por su idpPartidaPedido
   * @param idtpPartidaPedido Identificador de pPartidaPedido
   * @return OK
   */
  tpPartidaPedidoObtener(idtpPartidaPedido: string): __Observable<TpPartidaPedido> {
    return this.tpPartidaPedidoObtenerResponse(idtpPartidaPedido).pipe(
      __map(_r => _r.body as TpPartidaPedido)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpPartidaPedidoGuardarOActualizarResponse(tpPartidaPedido: TpPartidaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPartidaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPartidaPedido`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param tpPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpPartidaPedidoGuardarOActualizar(tpPartidaPedido: TpPartidaPedido): __Observable<string> {
    return this.tpPartidaPedidoGuardarOActualizarResponse(tpPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPartidaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPartidaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPartidaPedido>;
      })
    );
  }
  /**
   * Obtener lista de pPartidaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPartidaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultTpPartidaPedido> {
    return this.tpPartidaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPartidaPedido)
    );
  }

  /**
   * Desactivar un pPartidaPedido.
   * @param idtpPartidaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpPartidaPedidoDesactivarResponse(idtpPartidaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPartidaPedido != null) __params = __params.set('idtpPartidaPedido', idtpPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPartidaPedido`,
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
   * Desactivar un pPartidaPedido.
   * @param idtpPartidaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpPartidaPedidoDesactivar(idtpPartidaPedido: string): __Observable<string> {
    return this.tpPartidaPedidoDesactivarResponse(idtpPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process tpPartidaPedidoEliminar
   * @param idtpPartidaPedido undefined
   * @return OK
   */
  tpPartidaPedidoEliminarProcessResponse(idtpPartidaPedido: string): __Observable<__StrictHttpResponse<TupleBooleanString>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPartidaPedido != null) __params = __params.set('idtpPartidaPedido', idtpPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPartidaPedidoEliminar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TupleBooleanString>;
      })
    );
  }
  /**
   * Process tpPartidaPedidoEliminar
   * @param idtpPartidaPedido undefined
   * @return OK
   */
  tpPartidaPedidoEliminarProcess(idtpPartidaPedido: string): __Observable<TupleBooleanString> {
    return this.tpPartidaPedidoEliminarProcessResponse(idtpPartidaPedido).pipe(
      __map(_r => _r.body as TupleBooleanString)
    );
  }

  /**
   * Servicio para obtener el detalle de las tpPartidasPedido
   * y su cotPartidaCotizacionDetalle relacionado.
   * @param IdtpPedido IdtpPedido para obtener tpPartidasPedido
   *            a consultar
   * @return OK
   */
  tpPedidoPartidasDetallePartidasDetalleResponse(IdtpPedido: string): __Observable<__StrictHttpResponse<TpPedidoPartidasDetalleBO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdtpPedido != null) __params = __params.set('IdtpPedido', IdtpPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedido/tpPedidoPartidasDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoPartidasDetalleBO>;
      })
    );
  }
  /**
   * Servicio para obtener el detalle de las tpPartidasPedido
   * y su cotPartidaCotizacionDetalle relacionado.
   * @param IdtpPedido IdtpPedido para obtener tpPartidasPedido
   *            a consultar
   * @return OK
   */
  tpPedidoPartidasDetallePartidasDetalle(IdtpPedido: string): __Observable<TpPedidoPartidasDetalleBO> {
    return this.tpPedidoPartidasDetallePartidasDetalleResponse(IdtpPedido).pipe(
      __map(_r => _r.body as TpPedidoPartidasDetalleBO)
    );
  }

  /**
   * GroupQueryResult vTramitarPedidoPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoPartidaDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVTramitarPedidoPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavTramitarPedidoPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVTramitarPedidoPartidaDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vTramitarPedidoPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoPartidaDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVTramitarPedidoPartidaDetalle> {
    return this.vTramitarPedidoPartidaDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVTramitarPedidoPartidaDetalle)
    );
  }

  /**
   * Obtener vTramitarPedidoPartidaDetalle
   * @param idTPPartidaPedido undefined
   * @return OK
   */
  vTramitarPedidoPartidaDetalleObtenerResponse(idTPPartidaPedido: string): __Observable<__StrictHttpResponse<VTramitarPedidoPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTPPartidaPedido != null) __params = __params.set('idTPPartidaPedido', idTPPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vTramitarPedidoPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VTramitarPedidoPartidaDetalle>;
      })
    );
  }
  /**
   * Obtener vTramitarPedidoPartidaDetalle
   * @param idTPPartidaPedido undefined
   * @return OK
   */
  vTramitarPedidoPartidaDetalleObtener(idTPPartidaPedido: string): __Observable<VTramitarPedidoPartidaDetalle> {
    return this.vTramitarPedidoPartidaDetalleObtenerResponse(idTPPartidaPedido).pipe(
      __map(_r => _r.body as VTramitarPedidoPartidaDetalle)
    );
  }

  /**
   * QueryResult vTramitarPedidoPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoPartidaDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTramitarPedidoPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTramitarPedidoPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTramitarPedidoPartidaDetalle>;
      })
    );
  }
  /**
   * QueryResult vTramitarPedidoPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoPartidaDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVTramitarPedidoPartidaDetalle> {
    return this.vTramitarPedidoPartidaDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTramitarPedidoPartidaDetalle)
    );
  }
}

module ProcesosL05TramitarPedidoPartidasService {
}

export { ProcesosL05TramitarPedidoPartidasService }
