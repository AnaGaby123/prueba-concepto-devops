/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DashboardData } from '../models/dashboard-data';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { QueryResultClienteppPedidoObj } from '../models/query-result-clientepp-pedido-obj';
import { QueryInfo } from '../models/query-info';
import { PpIncidenciaPartida } from '../models/pp-incidencia-partida';
import { QueryResultPpIncidenciaPartida } from '../models/query-result-pp-incidencia-partida';
import { PpPartidaPedido } from '../models/pp-partida-pedido';
import { QueryResultPpPartidaPedido } from '../models/query-result-pp-partida-pedido';
import { PpPartidaPedidoConfiguracion } from '../models/pp-partida-pedido-configuracion';
import { QueryResultPpPartidaPedidoConfiguracion } from '../models/query-result-pp-partida-pedido-configuracion';
import { GroupQueryResultPpPartidaPedidoDetalle } from '../models/group-query-result-pp-partida-pedido-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultPpPartidaPedidoDetalle } from '../models/query-result-pp-partida-pedido-detalle';
import { PpPedido } from '../models/pp-pedido';
import { QueryResultPpPedido } from '../models/query-result-pp-pedido';
import { PpPedidoConfiguracion } from '../models/pp-pedido-configuracion';
import { QueryResultPpPedidoConfiguracion } from '../models/query-result-pp-pedido-configuracion';
import { PpPedidoFleteExpress } from '../models/pp-pedido-flete-express';
import { QueryResultPpPedidoFleteExpress } from '../models/query-result-pp-pedido-flete-express';
import { QueryResultPretramitarPedidoPartidaDetalle } from '../models/query-result-pretramitar-pedido-partida-detalle';
import { GMPretramitarPedido } from '../models/gmpretramitar-pedido';
import { QueryResultVClienteppPartidaPedido } from '../models/query-result-vclientepp-partida-pedido';
import { QueryResultVClienteppPedidoObj } from '../models/query-result-vclientepp-pedido-obj';
import { VClienteppPedidoOdenDeCompraObj } from '../models/vclientepp-pedido-oden-de-compra-obj';
import { PpPedidoIntramitableBarrasObj } from '../models/pp-pedido-intramitable-barras-obj';
import { FilterTuple } from '../models/filter-tuple';
import { QueryResultPpPedidoIntramitableDonaObj } from '../models/query-result-pp-pedido-intramitable-dona-obj';
import { QueryResultVClienteppPedido } from '../models/query-result-vclientepp-pedido';
import { QueryResultVClienteTipoPartida } from '../models/query-result-vcliente-tipo-partida';
import { QueryResultVClienteTipoPartidaAjustada } from '../models/query-result-vcliente-tipo-partida-ajustada';
import { QueryResultVPpPedidoObj } from '../models/query-result-vpp-pedido-obj';
import { QueryResultVPpPedido } from '../models/query-result-vpp-pedido';
@Injectable({
  providedIn: 'root',
})
class ProcesosL04PretramitarPedidoService extends __BaseService {
  static readonly ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableDashboardPath = '/GestionarPedidoIntramitable/Dashboard';
  static readonly ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableTabsPath = '/GestionarPedidoIntramitable/Tabs';
  static readonly ClienteOrdenDeCompraObtenerPretramitarPedidoDashboardPath = '/PretramitarPedido/Dashboard';
  static readonly ClienteOrdenDeCompraObtenerPretramitarPedidoTabsPath = '/PretramitarPedido/Tabs';
  static readonly ClienteOrdenDeCompraQueryResultPath = '/ClienteOrdenDeCompra';
  static readonly ppIncidenciaPartidaObtenerPath = '/ppIncidenciaPartida';
  static readonly ppIncidenciaPartidaGuardarOActualizarPath = '/ppIncidenciaPartida';
  static readonly ppIncidenciaPartidaQueryResultPath = '/ppIncidenciaPartida';
  static readonly ppIncidenciaPartidaDesactivarPath = '/ppIncidenciaPartida';
  static readonly ppPartidaPedidoObtenerPath = '/ppPartidaPedido';
  static readonly ppPartidaPedidoGuardarOActualizarPath = '/ppPartidaPedido';
  static readonly ppPartidaPedidoQueryResultPath = '/ppPartidaPedido';
  static readonly ppPartidaPedidoDesactivarPath = '/ppPartidaPedido';
  static readonly ppPartidaPedidoConfiguracionObtenerPath = '/ppPartidaPedidoConfiguracion';
  static readonly ppPartidaPedidoConfiguracionGuardarOActualizarPath = '/ppPartidaPedidoConfiguracion';
  static readonly ppPartidaPedidoConfiguracionQueryResultPath = '/ppPartidaPedidoConfiguracion';
  static readonly ppPartidaPedidoConfiguracionDesactivarPath = '/ppPartidaPedidoConfiguracion';
  static readonly ppPartidaPedidoDetalleGroupQueryResultPath = '/GrupoListappPartidaPedidoDetalle';
  static readonly ppPartidaPedidoDetalleQueryResultPath = '/ppPartidaPedidoDetalle';
  static readonly ppPedidoObtenerPath = '/ppPedido';
  static readonly ppPedidoGuardarOActualizarPath = '/ppPedido';
  static readonly ppPedidoQueryResultPath = '/ppPedido';
  static readonly ppPedidoDesactivarPath = '/ppPedido';
  static readonly ppPedidoConfiguracionObtenerPath = '/ppPedidoConfiguracion';
  static readonly ppPedidoConfiguracionGuardarOActualizarPath = '/ppPedidoConfiguracion';
  static readonly ppPedidoConfiguracionQueryResultPath = '/ppPedidoConfiguracion';
  static readonly ppPedidoConfiguracionDesactivarPath = '/ppPedidoConfiguracion';
  static readonly ppPedidoFleteExpressObtenerPath = '/ppPedidoFleteExpress';
  static readonly ppPedidoFleteExpressGuardarOActualizarPath = '/ppPedidoFleteExpress';
  static readonly ppPedidoFleteExpressQueryResultPath = '/ppPedidoFleteExpress';
  static readonly ppPedidoFleteExpressDesactivarPath = '/ppPedidoFleteExpress';
  static readonly PretramitarPedidoPartidasDetalleQueryResultPath = '/PretramitarPedidoPartidasDetalle';
  static readonly PretramitarPedidoTramitarObtenerGMPretramitarPedidoPath = '/PretramitarPedido/ObtenerGM';
  static readonly PretramitarPedidoTramitarProcessTransaccionPath = '/PretramitarPedido/transaccion';
  static readonly PretramitarPedidoTramitarProcessTransaccionValidarAjusteOCPath = '/ValidarAjusteOC/transaccion';
  static readonly vClienteppPartidaPedidoQueryResultPath = '/vClienteppPartidaPedido';
  static readonly vClienteppPedidoObtenerClientesOrdenDeCompraPath = '/vClienteppPedidoDetalle';
  static readonly vClienteppPedidoObtenerOrdenDeCompraPath = '/vClienteppPedidoOdenDeCompra';
  static readonly vClienteppPedidoObtenerPpPedidoIntramitableBarrasPath = '/PpPedidoIntramitableBarras';
  static readonly vClienteppPedidoObtenerPpPedidoIntramitableDonaPath = '/PpPedidoIntramitableDona';
  static readonly vClienteppPedidoQueryResultPath = '/vClienteppPedido';
  static readonly vClienteppPedidoValidarAjusteDashBoardPath = '/PedidoValidarAjuste/Dashboard';
  static readonly vClienteTipoPartidaQueryResultPath = '/vClienteTipoPartida';
  static readonly vClienteTipoPartidaAjustadaQueryResultPath = '/vClienteTipoPartidaAjustada';
  static readonly vPpPedidoObtenerClientesOrdenDeCompraPath = '/vPpPedidoObj';
  static readonly vPpPedidoQueryResultPath = '/vPpPedido';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar dashboardData  de Gestionar Pedido Intramitable
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GestionarPedidoIntramitable/Dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * Consultar dashboardData  de Gestionar Pedido Intramitable
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar lista de tabs para Gestionar Pedido Intramitable
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableTabsResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GestionarPedidoIntramitable/Tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * Consultar lista de tabs para Gestionar Pedido Intramitable
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableTabs(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableTabsResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Consultar dashboardData  de PretramitarPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerPretramitarPedidoDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PretramitarPedido/Dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * Consultar dashboardData  de PretramitarPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerPretramitarPedidoDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ClienteOrdenDeCompraObtenerPretramitarPedidoDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar lista de tabs para PretramitarPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerPretramitarPedidoTabsResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PretramitarPedido/Tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * Consultar lista de tabs para PretramitarPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteOrdenDeCompraObtenerPretramitarPedidoTabs(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.ClienteOrdenDeCompraObtenerPretramitarPedidoTabsResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * QueryResult ClienteOrdenDeCompra
   * @param info undefined
   * @return OK
   */
  ClienteOrdenDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteppPedidoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteOrdenDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteppPedidoObj>;
      })
    );
  }
  /**
   * QueryResult ClienteOrdenDeCompra
   * @param info undefined
   * @return OK
   */
  ClienteOrdenDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultClienteppPedidoObj> {
    return this.ClienteOrdenDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteppPedidoObj)
    );
  }

  /**
   * Obtener un ppIncidenciaPartida por su idppIncidenciaPartida
   * @param idppIncidenciaPartida identificador del ppIncidenciaPartida
   * @return OK
   */
  ppIncidenciaPartidaObtenerResponse(idppIncidenciaPartida: string): __Observable<__StrictHttpResponse<PpIncidenciaPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppIncidenciaPartida != null) __params = __params.set('idppIncidenciaPartida', idppIncidenciaPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppIncidenciaPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpIncidenciaPartida>;
      })
    );
  }
  /**
   * Obtener un ppIncidenciaPartida por su idppIncidenciaPartida
   * @param idppIncidenciaPartida identificador del ppIncidenciaPartida
   * @return OK
   */
  ppIncidenciaPartidaObtener(idppIncidenciaPartida: string): __Observable<PpIncidenciaPartida> {
    return this.ppIncidenciaPartidaObtenerResponse(idppIncidenciaPartida).pipe(
      __map(_r => _r.body as PpIncidenciaPartida)
    );
  }

  /**
   * Guardar o actualizar un ppIncidenciaPartida
   * @param ppIncidenciaPartida ppIncidenciaPartida a actualizar o guardar
   * @return OK
   */
  ppIncidenciaPartidaGuardarOActualizarResponse(ppIncidenciaPartida: PpIncidenciaPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppIncidenciaPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppIncidenciaPartida`,
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
   * Guardar o actualizar un ppIncidenciaPartida
   * @param ppIncidenciaPartida ppIncidenciaPartida a actualizar o guardar
   * @return OK
   */
  ppIncidenciaPartidaGuardarOActualizar(ppIncidenciaPartida: PpIncidenciaPartida): __Observable<string> {
    return this.ppIncidenciaPartidaGuardarOActualizarResponse(ppIncidenciaPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppIncidenciaPartida.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppIncidenciaPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpIncidenciaPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppIncidenciaPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpIncidenciaPartida>;
      })
    );
  }
  /**
   * Obtener lista de ppIncidenciaPartida.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppIncidenciaPartidaQueryResult(info: QueryInfo): __Observable<QueryResultPpIncidenciaPartida> {
    return this.ppIncidenciaPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpIncidenciaPartida)
    );
  }

  /**
   * Desactivar un ppIncidenciaPartida.
   * @param idppIncidenciaPartida Identificador de ppIncidenciaPartida a ser desactivado.
   * @return OK
   */
  ppIncidenciaPartidaDesactivarResponse(idppIncidenciaPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppIncidenciaPartida != null) __params = __params.set('idppIncidenciaPartida', idppIncidenciaPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppIncidenciaPartida`,
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
   * Desactivar un ppIncidenciaPartida.
   * @param idppIncidenciaPartida Identificador de ppIncidenciaPartida a ser desactivado.
   * @return OK
   */
  ppIncidenciaPartidaDesactivar(idppIncidenciaPartida: string): __Observable<string> {
    return this.ppIncidenciaPartidaDesactivarResponse(idppIncidenciaPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un ppPartidaPedido por su idppPartidaPedido
   * @param idppPartidaPedido identificador del ppPartidaPedido
   * @return OK
   */
  ppPartidaPedidoObtenerResponse(idppPartidaPedido: string): __Observable<__StrictHttpResponse<PpPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPartidaPedido != null) __params = __params.set('idppPartidaPedido', idppPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPartidaPedido>;
      })
    );
  }
  /**
   * Obtener un ppPartidaPedido por su idppPartidaPedido
   * @param idppPartidaPedido identificador del ppPartidaPedido
   * @return OK
   */
  ppPartidaPedidoObtener(idppPartidaPedido: string): __Observable<PpPartidaPedido> {
    return this.ppPartidaPedidoObtenerResponse(idppPartidaPedido).pipe(
      __map(_r => _r.body as PpPartidaPedido)
    );
  }

  /**
   * Guardar o actualizar un ppPartidaPedido
   * @param ppPartidaPedido ppPartidaPedido a actualizar o guardar
   * @return OK
   */
  ppPartidaPedidoGuardarOActualizarResponse(ppPartidaPedido: PpPartidaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppPartidaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppPartidaPedido`,
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
   * Guardar o actualizar un ppPartidaPedido
   * @param ppPartidaPedido ppPartidaPedido a actualizar o guardar
   * @return OK
   */
  ppPartidaPedidoGuardarOActualizar(ppPartidaPedido: PpPartidaPedido): __Observable<string> {
    return this.ppPartidaPedidoGuardarOActualizarResponse(ppPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppPartidaPedido.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPartidaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPartidaPedido>;
      })
    );
  }
  /**
   * Obtener lista de ppPartidaPedido.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPartidaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultPpPartidaPedido> {
    return this.ppPartidaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPartidaPedido)
    );
  }

  /**
   * Desactivar un ppPartidaPedido.
   * @param idppPartidaPedido Identificador de ppPartidaPedido a ser desactivado.
   * @return OK
   */
  ppPartidaPedidoDesactivarResponse(idppPartidaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPartidaPedido != null) __params = __params.set('idppPartidaPedido', idppPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppPartidaPedido`,
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
   * Desactivar un ppPartidaPedido.
   * @param idppPartidaPedido Identificador de ppPartidaPedido a ser desactivado.
   * @return OK
   */
  ppPartidaPedidoDesactivar(idppPartidaPedido: string): __Observable<string> {
    return this.ppPartidaPedidoDesactivarResponse(idppPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un ppPartidaPedidoConfiguracion por su idppPartidaPedidoConfiguracion
   * @param idppPartidaPedidoConfiguracion identificador del ppPartidaPedidoConfiguracion
   * @return OK
   */
  ppPartidaPedidoConfiguracionObtenerResponse(idppPartidaPedidoConfiguracion: string): __Observable<__StrictHttpResponse<PpPartidaPedidoConfiguracion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPartidaPedidoConfiguracion != null) __params = __params.set('idppPartidaPedidoConfiguracion', idppPartidaPedidoConfiguracion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPartidaPedidoConfiguracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPartidaPedidoConfiguracion>;
      })
    );
  }
  /**
   * Obtener un ppPartidaPedidoConfiguracion por su idppPartidaPedidoConfiguracion
   * @param idppPartidaPedidoConfiguracion identificador del ppPartidaPedidoConfiguracion
   * @return OK
   */
  ppPartidaPedidoConfiguracionObtener(idppPartidaPedidoConfiguracion: string): __Observable<PpPartidaPedidoConfiguracion> {
    return this.ppPartidaPedidoConfiguracionObtenerResponse(idppPartidaPedidoConfiguracion).pipe(
      __map(_r => _r.body as PpPartidaPedidoConfiguracion)
    );
  }

  /**
   * Guardar o actualizar un ppPartidaPedidoConfiguracion
   * @param ppPartidaPedidoConfiguracion ppPartidaPedidoConfiguracion a actualizar o guardar
   * @return OK
   */
  ppPartidaPedidoConfiguracionGuardarOActualizarResponse(ppPartidaPedidoConfiguracion: PpPartidaPedidoConfiguracion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppPartidaPedidoConfiguracion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppPartidaPedidoConfiguracion`,
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
   * Guardar o actualizar un ppPartidaPedidoConfiguracion
   * @param ppPartidaPedidoConfiguracion ppPartidaPedidoConfiguracion a actualizar o guardar
   * @return OK
   */
  ppPartidaPedidoConfiguracionGuardarOActualizar(ppPartidaPedidoConfiguracion: PpPartidaPedidoConfiguracion): __Observable<string> {
    return this.ppPartidaPedidoConfiguracionGuardarOActualizarResponse(ppPartidaPedidoConfiguracion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppPartidaPedidoConfiguracion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPartidaPedidoConfiguracionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPartidaPedidoConfiguracion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPartidaPedidoConfiguracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPartidaPedidoConfiguracion>;
      })
    );
  }
  /**
   * Obtener lista de ppPartidaPedidoConfiguracion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPartidaPedidoConfiguracionQueryResult(info: QueryInfo): __Observable<QueryResultPpPartidaPedidoConfiguracion> {
    return this.ppPartidaPedidoConfiguracionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPartidaPedidoConfiguracion)
    );
  }

  /**
   * Desactivar un ppPartidaPedidoConfiguracion.
   * @param idppPartidaPedidoConfiguracion Identificador de ppPartidaPedidoConfiguracion a ser desactivado.
   * @return OK
   */
  ppPartidaPedidoConfiguracionDesactivarResponse(idppPartidaPedidoConfiguracion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPartidaPedidoConfiguracion != null) __params = __params.set('idppPartidaPedidoConfiguracion', idppPartidaPedidoConfiguracion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppPartidaPedidoConfiguracion`,
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
   * Desactivar un ppPartidaPedidoConfiguracion.
   * @param idppPartidaPedidoConfiguracion Identificador de ppPartidaPedidoConfiguracion a ser desactivado.
   * @return OK
   */
  ppPartidaPedidoConfiguracionDesactivar(idppPartidaPedidoConfiguracion: string): __Observable<string> {
    return this.ppPartidaPedidoConfiguracionDesactivarResponse(idppPartidaPedidoConfiguracion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult ppPartidaPedidoDetalle
   * @param info undefined
   * @return OK
   */
  ppPartidaPedidoDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultPpPartidaPedidoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListappPartidaPedidoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultPpPartidaPedidoDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult ppPartidaPedidoDetalle
   * @param info undefined
   * @return OK
   */
  ppPartidaPedidoDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultPpPartidaPedidoDetalle> {
    return this.ppPartidaPedidoDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultPpPartidaPedidoDetalle)
    );
  }

  /**
   * QueryResult ppPartidaPedidoDetalle
   * @param info undefined
   * @return OK
   */
  ppPartidaPedidoDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPartidaPedidoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPartidaPedidoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPartidaPedidoDetalle>;
      })
    );
  }
  /**
   * QueryResult ppPartidaPedidoDetalle
   * @param info undefined
   * @return OK
   */
  ppPartidaPedidoDetalleQueryResult(info: QueryInfo): __Observable<QueryResultPpPartidaPedidoDetalle> {
    return this.ppPartidaPedidoDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPartidaPedidoDetalle)
    );
  }

  /**
   * Obtener un ppPedido por su idppPedido
   * @param idppPedido identificador del ppPedido
   * @return OK
   */
  ppPedidoObtenerResponse(idppPedido: string): __Observable<__StrictHttpResponse<PpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedido != null) __params = __params.set('idppPedido', idppPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPedido>;
      })
    );
  }
  /**
   * Obtener un ppPedido por su idppPedido
   * @param idppPedido identificador del ppPedido
   * @return OK
   */
  ppPedidoObtener(idppPedido: string): __Observable<PpPedido> {
    return this.ppPedidoObtenerResponse(idppPedido).pipe(
      __map(_r => _r.body as PpPedido)
    );
  }

  /**
   * Guardar o actualizar un ppPedido
   * @param ppPedido ppPedido a actualizar o guardar
   * @return OK
   */
  ppPedidoGuardarOActualizarResponse(ppPedido: PpPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppPedido`,
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
   * Guardar o actualizar un ppPedido
   * @param ppPedido ppPedido a actualizar o guardar
   * @return OK
   */
  ppPedidoGuardarOActualizar(ppPedido: PpPedido): __Observable<string> {
    return this.ppPedidoGuardarOActualizarResponse(ppPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppPedido.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPedido>;
      })
    );
  }
  /**
   * Obtener lista de ppPedido.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoQueryResult(info: QueryInfo): __Observable<QueryResultPpPedido> {
    return this.ppPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPedido)
    );
  }

  /**
   * Desactivar un ppPedido.
   * @param idppPedido Identificador de ppPedido a ser desactivado.
   * @return OK
   */
  ppPedidoDesactivarResponse(idppPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedido != null) __params = __params.set('idppPedido', idppPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppPedido`,
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
   * Desactivar un ppPedido.
   * @param idppPedido Identificador de ppPedido a ser desactivado.
   * @return OK
   */
  ppPedidoDesactivar(idppPedido: string): __Observable<string> {
    return this.ppPedidoDesactivarResponse(idppPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un ppPedidoConfiguracion por su idppPedidoConfiguracion
   * @param idppPedidoConfiguracion identificador del ppPedidoConfiguracion
   * @return OK
   */
  ppPedidoConfiguracionObtenerResponse(idppPedidoConfiguracion: string): __Observable<__StrictHttpResponse<PpPedidoConfiguracion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedidoConfiguracion != null) __params = __params.set('idppPedidoConfiguracion', idppPedidoConfiguracion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPedidoConfiguracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPedidoConfiguracion>;
      })
    );
  }
  /**
   * Obtener un ppPedidoConfiguracion por su idppPedidoConfiguracion
   * @param idppPedidoConfiguracion identificador del ppPedidoConfiguracion
   * @return OK
   */
  ppPedidoConfiguracionObtener(idppPedidoConfiguracion: string): __Observable<PpPedidoConfiguracion> {
    return this.ppPedidoConfiguracionObtenerResponse(idppPedidoConfiguracion).pipe(
      __map(_r => _r.body as PpPedidoConfiguracion)
    );
  }

  /**
   * Guardar o actualizar un ppPedidoConfiguracion
   * @param ppPedidoConfiguracion ppPedidoConfiguracion a actualizar o guardar
   * @return OK
   */
  ppPedidoConfiguracionGuardarOActualizarResponse(ppPedidoConfiguracion: PpPedidoConfiguracion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppPedidoConfiguracion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppPedidoConfiguracion`,
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
   * Guardar o actualizar un ppPedidoConfiguracion
   * @param ppPedidoConfiguracion ppPedidoConfiguracion a actualizar o guardar
   * @return OK
   */
  ppPedidoConfiguracionGuardarOActualizar(ppPedidoConfiguracion: PpPedidoConfiguracion): __Observable<string> {
    return this.ppPedidoConfiguracionGuardarOActualizarResponse(ppPedidoConfiguracion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppPedidoConfiguracion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoConfiguracionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPedidoConfiguracion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoConfiguracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPedidoConfiguracion>;
      })
    );
  }
  /**
   * Obtener lista de ppPedidoConfiguracion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoConfiguracionQueryResult(info: QueryInfo): __Observable<QueryResultPpPedidoConfiguracion> {
    return this.ppPedidoConfiguracionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPedidoConfiguracion)
    );
  }

  /**
   * Desactivar un ppPedidoConfiguracion.
   * @param idppPedidoConfiguracion Identificador de ppPedidoConfiguracion a ser desactivado.
   * @return OK
   */
  ppPedidoConfiguracionDesactivarResponse(idppPedidoConfiguracion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedidoConfiguracion != null) __params = __params.set('idppPedidoConfiguracion', idppPedidoConfiguracion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppPedidoConfiguracion`,
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
   * Desactivar un ppPedidoConfiguracion.
   * @param idppPedidoConfiguracion Identificador de ppPedidoConfiguracion a ser desactivado.
   * @return OK
   */
  ppPedidoConfiguracionDesactivar(idppPedidoConfiguracion: string): __Observable<string> {
    return this.ppPedidoConfiguracionDesactivarResponse(idppPedidoConfiguracion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un ppPedidoFleteExpress por su idppPedidoFleteExpress
   * @param idppPedidoFleteExpress identificador del ppPedidoFleteExpress
   * @return OK
   */
  ppPedidoFleteExpressObtenerResponse(idppPedidoFleteExpress: string): __Observable<__StrictHttpResponse<PpPedidoFleteExpress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedidoFleteExpress != null) __params = __params.set('idppPedidoFleteExpress', idppPedidoFleteExpress.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPedidoFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPedidoFleteExpress>;
      })
    );
  }
  /**
   * Obtener un ppPedidoFleteExpress por su idppPedidoFleteExpress
   * @param idppPedidoFleteExpress identificador del ppPedidoFleteExpress
   * @return OK
   */
  ppPedidoFleteExpressObtener(idppPedidoFleteExpress: string): __Observable<PpPedidoFleteExpress> {
    return this.ppPedidoFleteExpressObtenerResponse(idppPedidoFleteExpress).pipe(
      __map(_r => _r.body as PpPedidoFleteExpress)
    );
  }

  /**
   * Guardar o actualizar un ppPedidoFleteExpress
   * @param ppPedidoFleteExpress ppPedidoFleteExpress a actualizar o guardar
   * @return OK
   */
  ppPedidoFleteExpressGuardarOActualizarResponse(ppPedidoFleteExpress: PpPedidoFleteExpress): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppPedidoFleteExpress;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppPedidoFleteExpress`,
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
   * Guardar o actualizar un ppPedidoFleteExpress
   * @param ppPedidoFleteExpress ppPedidoFleteExpress a actualizar o guardar
   * @return OK
   */
  ppPedidoFleteExpressGuardarOActualizar(ppPedidoFleteExpress: PpPedidoFleteExpress): __Observable<string> {
    return this.ppPedidoFleteExpressGuardarOActualizarResponse(ppPedidoFleteExpress).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppPedidoFleteExpress.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoFleteExpressQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPedidoFleteExpress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPedidoFleteExpress>;
      })
    );
  }
  /**
   * Obtener lista de ppPedidoFleteExpress.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoFleteExpressQueryResult(info: QueryInfo): __Observable<QueryResultPpPedidoFleteExpress> {
    return this.ppPedidoFleteExpressQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPedidoFleteExpress)
    );
  }

  /**
   * Desactivar un ppPedidoFleteExpress.
   * @param idppPedidoFleteExpress Identificador de ppPedidoFleteExpress a ser desactivado.
   * @return OK
   */
  ppPedidoFleteExpressDesactivarResponse(idppPedidoFleteExpress: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedidoFleteExpress != null) __params = __params.set('idppPedidoFleteExpress', idppPedidoFleteExpress.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppPedidoFleteExpress`,
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
   * Desactivar un ppPedidoFleteExpress.
   * @param idppPedidoFleteExpress Identificador de ppPedidoFleteExpress a ser desactivado.
   * @return OK
   */
  ppPedidoFleteExpressDesactivar(idppPedidoFleteExpress: string): __Observable<string> {
    return this.ppPedidoFleteExpressDesactivarResponse(idppPedidoFleteExpress).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult PretramitarPedidoPartidasDetalle
   * @param info undefined
   * @return OK
   */
  PretramitarPedidoPartidasDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPretramitarPedidoPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PretramitarPedidoPartidasDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPretramitarPedidoPartidaDetalle>;
      })
    );
  }
  /**
   * QueryResult PretramitarPedidoPartidasDetalle
   * @param info undefined
   * @return OK
   */
  PretramitarPedidoPartidasDetalleQueryResult(info: QueryInfo): __Observable<QueryResultPretramitarPedidoPartidaDetalle> {
    return this.PretramitarPedidoPartidasDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPretramitarPedidoPartidaDetalle)
    );
  }

  /**
   * ObtenerGMPretramitarPedido PretramitarPedidoTramitar
   * @param IdPPPedido undefined
   * @return OK
   */
  PretramitarPedidoTramitarObtenerGMPretramitarPedidoResponse(IdPPPedido: string): __Observable<__StrictHttpResponse<GMPretramitarPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdPPPedido != null) __params = __params.set('IdPPPedido', IdPPPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/PretramitarPedido/ObtenerGM`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPretramitarPedido>;
      })
    );
  }
  /**
   * ObtenerGMPretramitarPedido PretramitarPedidoTramitar
   * @param IdPPPedido undefined
   * @return OK
   */
  PretramitarPedidoTramitarObtenerGMPretramitarPedido(IdPPPedido: string): __Observable<GMPretramitarPedido> {
    return this.PretramitarPedidoTramitarObtenerGMPretramitarPedidoResponse(IdPPPedido).pipe(
      __map(_r => _r.body as GMPretramitarPedido)
    );
  }

  /**
   * ProcessTransaccion PretramitarPedidoTramitar
   * @param GMPretramitarPedido undefined
   * @return OK
   */
  PretramitarPedidoTramitarProcessTransaccionResponse(GMPretramitarPedido: GMPretramitarPedido): __Observable<__StrictHttpResponse<GMPretramitarPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPretramitarPedido;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PretramitarPedido/transaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPretramitarPedido>;
      })
    );
  }
  /**
   * ProcessTransaccion PretramitarPedidoTramitar
   * @param GMPretramitarPedido undefined
   * @return OK
   */
  PretramitarPedidoTramitarProcessTransaccion(GMPretramitarPedido: GMPretramitarPedido): __Observable<GMPretramitarPedido> {
    return this.PretramitarPedidoTramitarProcessTransaccionResponse(GMPretramitarPedido).pipe(
      __map(_r => _r.body as GMPretramitarPedido)
    );
  }

  /**
   * ProcessTransaccionValidarAjusteOC PretramitarPedidoTramitar
   * @param GMPretramitarPedido undefined
   * @return OK
   */
  PretramitarPedidoTramitarProcessTransaccionValidarAjusteOCResponse(GMPretramitarPedido: GMPretramitarPedido): __Observable<__StrictHttpResponse<GMPretramitarPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPretramitarPedido;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ValidarAjusteOC/transaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPretramitarPedido>;
      })
    );
  }
  /**
   * ProcessTransaccionValidarAjusteOC PretramitarPedidoTramitar
   * @param GMPretramitarPedido undefined
   * @return OK
   */
  PretramitarPedidoTramitarProcessTransaccionValidarAjusteOC(GMPretramitarPedido: GMPretramitarPedido): __Observable<GMPretramitarPedido> {
    return this.PretramitarPedidoTramitarProcessTransaccionValidarAjusteOCResponse(GMPretramitarPedido).pipe(
      __map(_r => _r.body as GMPretramitarPedido)
    );
  }

  /**
   * QueryResult vClienteppPartidaPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPartidaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteppPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteppPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteppPartidaPedido>;
      })
    );
  }
  /**
   * QueryResult vClienteppPartidaPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPartidaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVClienteppPartidaPedido> {
    return this.vClienteppPartidaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteppPartidaPedido)
    );
  }

  /**
   * ObtenerClientesOrdenDeCompra vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerClientesOrdenDeCompraResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteppPedidoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vClienteppPedidoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteppPedidoObj>;
      })
    );
  }
  /**
   * ObtenerClientesOrdenDeCompra vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerClientesOrdenDeCompra(info: QueryInfo): __Observable<QueryResultVClienteppPedidoObj> {
    return this.vClienteppPedidoObtenerClientesOrdenDeCompraResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteppPedidoObj)
    );
  }

  /**
   * ObtenerOrdenDeCompra vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerOrdenDeCompraResponse(info: QueryInfo): __Observable<__StrictHttpResponse<VClienteppPedidoOdenDeCompraObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vClienteppPedidoOdenDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VClienteppPedidoOdenDeCompraObj>;
      })
    );
  }
  /**
   * ObtenerOrdenDeCompra vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerOrdenDeCompra(info: QueryInfo): __Observable<VClienteppPedidoOdenDeCompraObj> {
    return this.vClienteppPedidoObtenerOrdenDeCompraResponse(info).pipe(
      __map(_r => _r.body as VClienteppPedidoOdenDeCompraObj)
    );
  }

  /**
   * ObtenerPpPedidoIntramitableBarras vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerPpPedidoIntramitableBarrasResponse(info: Array<FilterTuple>): __Observable<__StrictHttpResponse<PpPedidoIntramitableBarrasObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/PpPedidoIntramitableBarras`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPedidoIntramitableBarrasObj>;
      })
    );
  }
  /**
   * ObtenerPpPedidoIntramitableBarras vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerPpPedidoIntramitableBarras(info: Array<FilterTuple>): __Observable<PpPedidoIntramitableBarrasObj> {
    return this.vClienteppPedidoObtenerPpPedidoIntramitableBarrasResponse(info).pipe(
      __map(_r => _r.body as PpPedidoIntramitableBarrasObj)
    );
  }

  /**
   * ObtenerPpPedidoIntramitableDona vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerPpPedidoIntramitableDonaResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPedidoIntramitableDonaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/PpPedidoIntramitableDona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPedidoIntramitableDonaObj>;
      })
    );
  }
  /**
   * ObtenerPpPedidoIntramitableDona vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoObtenerPpPedidoIntramitableDona(info: QueryInfo): __Observable<QueryResultPpPedidoIntramitableDonaObj> {
    return this.vClienteppPedidoObtenerPpPedidoIntramitableDonaResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPedidoIntramitableDonaObj)
    );
  }

  /**
   * QueryResult vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteppPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteppPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteppPedido>;
      })
    );
  }
  /**
   * QueryResult vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVClienteppPedido> {
    return this.vClienteppPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteppPedido)
    );
  }

  /**
   * ValidarAjusteDashBoard vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoValidarAjusteDashBoardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PedidoValidarAjuste/Dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * ValidarAjusteDashBoard vClienteppPedido
   * @param info undefined
   * @return OK
   */
  vClienteppPedidoValidarAjusteDashBoard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vClienteppPedidoValidarAjusteDashBoardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * QueryResult vClienteTipoPartida
   * @param info undefined
   * @return OK
   */
  vClienteTipoPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteTipoPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteTipoPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteTipoPartida>;
      })
    );
  }
  /**
   * QueryResult vClienteTipoPartida
   * @param info undefined
   * @return OK
   */
  vClienteTipoPartidaQueryResult(info: QueryInfo): __Observable<QueryResultVClienteTipoPartida> {
    return this.vClienteTipoPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteTipoPartida)
    );
  }

  /**
   * QueryResult vClienteTipoPartidaAjustada
   * @param info undefined
   * @return OK
   */
  vClienteTipoPartidaAjustadaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteTipoPartidaAjustada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteTipoPartidaAjustada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteTipoPartidaAjustada>;
      })
    );
  }
  /**
   * QueryResult vClienteTipoPartidaAjustada
   * @param info undefined
   * @return OK
   */
  vClienteTipoPartidaAjustadaQueryResult(info: QueryInfo): __Observable<QueryResultVClienteTipoPartidaAjustada> {
    return this.vClienteTipoPartidaAjustadaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteTipoPartidaAjustada)
    );
  }

  /**
   * ObtenerClientesOrdenDeCompra vPpPedido
   * @param info undefined
   * @return OK
   */
  vPpPedidoObtenerClientesOrdenDeCompraResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPpPedidoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vPpPedidoObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPpPedidoObj>;
      })
    );
  }
  /**
   * ObtenerClientesOrdenDeCompra vPpPedido
   * @param info undefined
   * @return OK
   */
  vPpPedidoObtenerClientesOrdenDeCompra(info: QueryInfo): __Observable<QueryResultVPpPedidoObj> {
    return this.vPpPedidoObtenerClientesOrdenDeCompraResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPpPedidoObj)
    );
  }

  /**
   * QueryResult vPpPedido
   * @param info undefined
   * @return OK
   */
  vPpPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPpPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPpPedido>;
      })
    );
  }
  /**
   * QueryResult vPpPedido
   * @param info undefined
   * @return OK
   */
  vPpPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVPpPedido> {
    return this.vPpPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPpPedido)
    );
  }
}

module ProcesosL04PretramitarPedidoService {
}

export { ProcesosL04PretramitarPedidoService }
