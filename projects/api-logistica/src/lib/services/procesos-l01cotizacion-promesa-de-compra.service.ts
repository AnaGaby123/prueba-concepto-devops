/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ControlarSeguimientoPromesaDeCompraGraficas } from '../models/controlar-seguimiento-promesa-de-compra-graficas';
import { QueryInfo } from '../models/query-info';
import { CotPromesaDeCompraPartida } from '../models/cot-promesa-de-compra-partida';
import { QueryResultCotPromesaDeCompraPartida } from '../models/query-result-cot-promesa-de-compra-partida';
import { PcPromesaDeCompra } from '../models/pc-promesa-de-compra';
import { GenerarPromesaDeCompraSinOCParametro } from '../models/generar-promesa-de-compra-sin-ocparametro';
import { DashboardData } from '../models/dashboard-data';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { QueryResultVClienteCotizacionesPromesaDeCompra } from '../models/query-result-vcliente-cotizaciones-promesa-de-compra';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionPromesaDeCompraService extends __BaseService {
  static readonly ControlarSeguimientoPromesaDeCompraGraficasObtenerPath = '/ControlarSeguimientoPromesaDeCompraGraficas';
  static readonly cotPromesaDeCompraPartidaGetHistorialPorPartidaCotizacionPath = '/cotPromesaDeCompraPartida/{idCotPartidaCotizacion}/historial';
  static readonly cotPromesaDeCompraPartidaObtenerPath = '/cotPromesaDeCompraPartida';
  static readonly cotPromesaDeCompraPartidaGuardarOActualizarPath = '/cotPromesaDeCompraPartida';
  static readonly cotPromesaDeCompraPartidaQueryResultPath = '/cotPromesaDeCompraPartida';
  static readonly cotPromesaDeCompraPartidaDesactivarPath = '/cotPromesaDeCompraPartida';
  static readonly GenerarPromesaDeCompraSinOCProcessPath = '/GenerarPromesaDeCompraSinOC';
  static readonly vClienteCotizacionesPromesaDeCompraObtenerDashboardPath = '/vClienteCotizacionesPromesaDeCompra/dashboard';
  static readonly vClienteCotizacionesPromesaDeCompraObtenerTabsDashboardPath = '/vClienteCotizacionesPromesaDeCompra/tabs';
  static readonly vClienteCotizacionesPromesaDeCompraQueryResultPath = '/vClienteCotizacionesPromesaDeCompra';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ControlarSeguimientoPromesaDeCompraGraficas
   * @param params The `ProcesosL01CotizacionPromesaDeCompraService.ControlarSeguimientoPromesaDeCompraGraficasObtenerParams` containing the following parameters:
   *
   * - `info`:
   *
   * - `idUsuario`:
   *
   * @return OK
   */
  ControlarSeguimientoPromesaDeCompraGraficasObtenerResponse(params: ProcesosL01CotizacionPromesaDeCompraService.ControlarSeguimientoPromesaDeCompraGraficasObtenerParams): __Observable<__StrictHttpResponse<ControlarSeguimientoPromesaDeCompraGraficas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.info;
    if (params.idUsuario != null) __params = __params.set('idUsuario', params.idUsuario.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ControlarSeguimientoPromesaDeCompraGraficas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ControlarSeguimientoPromesaDeCompraGraficas>;
      })
    );
  }
  /**
   * Obtener ControlarSeguimientoPromesaDeCompraGraficas
   * @param params The `ProcesosL01CotizacionPromesaDeCompraService.ControlarSeguimientoPromesaDeCompraGraficasObtenerParams` containing the following parameters:
   *
   * - `info`:
   *
   * - `idUsuario`:
   *
   * @return OK
   */
  ControlarSeguimientoPromesaDeCompraGraficasObtener(params: ProcesosL01CotizacionPromesaDeCompraService.ControlarSeguimientoPromesaDeCompraGraficasObtenerParams): __Observable<ControlarSeguimientoPromesaDeCompraGraficas> {
    return this.ControlarSeguimientoPromesaDeCompraGraficasObtenerResponse(params).pipe(
      __map(_r => _r.body as ControlarSeguimientoPromesaDeCompraGraficas)
    );
  }

  /**
   * GetHistorialPorPartidaCotizacion cotPromesaDeCompraPartida
   * @param idCotPartidaCotizacion undefined
   * @return OK
   */
  cotPromesaDeCompraPartidaGetHistorialPorPartidaCotizacionResponse(idCotPartidaCotizacion: string): __Observable<__StrictHttpResponse<Array<CotPromesaDeCompraPartida>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPromesaDeCompraPartida/${encodeURIComponent(String(idCotPartidaCotizacion))}/historial`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CotPromesaDeCompraPartida>>;
      })
    );
  }
  /**
   * GetHistorialPorPartidaCotizacion cotPromesaDeCompraPartida
   * @param idCotPartidaCotizacion undefined
   * @return OK
   */
  cotPromesaDeCompraPartidaGetHistorialPorPartidaCotizacion(idCotPartidaCotizacion: string): __Observable<Array<CotPromesaDeCompraPartida>> {
    return this.cotPromesaDeCompraPartidaGetHistorialPorPartidaCotizacionResponse(idCotPartidaCotizacion).pipe(
      __map(_r => _r.body as Array<CotPromesaDeCompraPartida>)
    );
  }

  /**
   * Obtener un cotPromesaDeCompraPartida por su idcotPromesaDeCompraPartida
   * @param idcotPromesaDeCompraPartida identificador del cotPromesaDeCompraPartida
   * @return OK
   */
  cotPromesaDeCompraPartidaObtenerResponse(idcotPromesaDeCompraPartida: string): __Observable<__StrictHttpResponse<CotPromesaDeCompraPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPromesaDeCompraPartida != null) __params = __params.set('idcotPromesaDeCompraPartida', idcotPromesaDeCompraPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPromesaDeCompraPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPromesaDeCompraPartida>;
      })
    );
  }
  /**
   * Obtener un cotPromesaDeCompraPartida por su idcotPromesaDeCompraPartida
   * @param idcotPromesaDeCompraPartida identificador del cotPromesaDeCompraPartida
   * @return OK
   */
  cotPromesaDeCompraPartidaObtener(idcotPromesaDeCompraPartida: string): __Observable<CotPromesaDeCompraPartida> {
    return this.cotPromesaDeCompraPartidaObtenerResponse(idcotPromesaDeCompraPartida).pipe(
      __map(_r => _r.body as CotPromesaDeCompraPartida)
    );
  }

  /**
   * Guardar o actualizar un cotPromesaDeCompraPartida
   * @param cotPromesaDeCompraPartida cotPromesaDeCompraPartida a actualizar o guardar
   * @return OK
   */
  cotPromesaDeCompraPartidaGuardarOActualizarResponse(cotPromesaDeCompraPartida: CotPromesaDeCompraPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotPromesaDeCompraPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPromesaDeCompraPartida`,
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
   * Guardar o actualizar un cotPromesaDeCompraPartida
   * @param cotPromesaDeCompraPartida cotPromesaDeCompraPartida a actualizar o guardar
   * @return OK
   */
  cotPromesaDeCompraPartidaGuardarOActualizar(cotPromesaDeCompraPartida: CotPromesaDeCompraPartida): __Observable<string> {
    return this.cotPromesaDeCompraPartidaGuardarOActualizarResponse(cotPromesaDeCompraPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPromesaDeCompraPartida.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPromesaDeCompraPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPromesaDeCompraPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPromesaDeCompraPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPromesaDeCompraPartida>;
      })
    );
  }
  /**
   * Obtener lista de cotPromesaDeCompraPartida.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPromesaDeCompraPartidaQueryResult(info: QueryInfo): __Observable<QueryResultCotPromesaDeCompraPartida> {
    return this.cotPromesaDeCompraPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPromesaDeCompraPartida)
    );
  }

  /**
   * Desactivar cotPromesaDeCompraPartida
   * @param idcotPromesaDeCompraPartida undefined
   * @return OK
   */
  cotPromesaDeCompraPartidaDesactivarResponse(idcotPromesaDeCompraPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPromesaDeCompraPartida != null) __params = __params.set('idcotPromesaDeCompraPartida', idcotPromesaDeCompraPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPromesaDeCompraPartida`,
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
   * Desactivar cotPromesaDeCompraPartida
   * @param idcotPromesaDeCompraPartida undefined
   * @return OK
   */
  cotPromesaDeCompraPartidaDesactivar(idcotPromesaDeCompraPartida: string): __Observable<string> {
    return this.cotPromesaDeCompraPartidaDesactivarResponse(idcotPromesaDeCompraPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process GenerarPromesaDeCompraSinOC
   * @param param undefined
   * @return OK
   */
  GenerarPromesaDeCompraSinOCProcessResponse(param: GenerarPromesaDeCompraSinOCParametro): __Observable<__StrictHttpResponse<PcPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarPromesaDeCompraSinOC`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PcPromesaDeCompra>;
      })
    );
  }
  /**
   * Process GenerarPromesaDeCompraSinOC
   * @param param undefined
   * @return OK
   */
  GenerarPromesaDeCompraSinOCProcess(param: GenerarPromesaDeCompraSinOCParametro): __Observable<PcPromesaDeCompra> {
    return this.GenerarPromesaDeCompraSinOCProcessResponse(param).pipe(
      __map(_r => _r.body as PcPromesaDeCompra)
    );
  }

  /**
   * ObtenerDashboard vClienteCotizacionesPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraObtenerDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionesPromesaDeCompra/dashboard`,
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
   * ObtenerDashboard vClienteCotizacionesPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraObtenerDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vClienteCotizacionesPromesaDeCompraObtenerDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * ObtenerTabsDashboard vClienteCotizacionesPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraObtenerTabsDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionesPromesaDeCompra/tabs`,
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
   * ObtenerTabsDashboard vClienteCotizacionesPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraObtenerTabsDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.vClienteCotizacionesPromesaDeCompraObtenerTabsDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Consultar lista paginada de vClienteCotizacionesPromesaDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteCotizacionesPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionesPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteCotizacionesPromesaDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClienteCotizacionesPromesaDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVClienteCotizacionesPromesaDeCompra> {
    return this.vClienteCotizacionesPromesaDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteCotizacionesPromesaDeCompra)
    );
  }
}

module ProcesosL01CotizacionPromesaDeCompraService {

  /**
   * Parameters for ControlarSeguimientoPromesaDeCompraGraficasObtener
   */
  export interface ControlarSeguimientoPromesaDeCompraGraficasObtenerParams {
    info: QueryInfo;
    idUsuario: string;
  }
}

export { ProcesosL01CotizacionPromesaDeCompraService }
