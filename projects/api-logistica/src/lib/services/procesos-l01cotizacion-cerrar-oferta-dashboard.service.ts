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
import { QueryResultVCotCotizacion } from '../models/query-result-vcot-cotizacion';
import { QueryInfo } from '../models/query-info';
import { TiposAjustesCliente } from '../models/tipos-ajustes-cliente';
import { TupleDecimalInt32 } from '../models/tuple-decimal-int-32';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCerrarOfertaDashboardService extends __BaseService {
  static readonly DashBoardCerrarOfertaObtenerDashboardPath = '/DashBoardCerrarOferta/dashboard';
  static readonly DashBoardCerrarOfertaObtenerTabsDashboardPath = '/DashBoardCerrarOferta/tabs';
  static readonly DashBoardCerrarOfertaQueryResultPath = '/DashBoardCerrarOferta';
  static readonly TiposPartidaPorCotizacionCierreObtenerTiposAjustesClientePath = '/TiposAjustePorClienteCierre';
  static readonly TiposPartidaPorCotizacionCierreProcessPath = '/TiposPartidaPorCotizacionCierre';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ObtenerDashboard DashBoardCerrarOferta
   * @param info undefined
   * @return OK
   */
  DashBoardCerrarOfertaObtenerDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DashBoardCerrarOferta/dashboard`,
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
   * ObtenerDashboard DashBoardCerrarOferta
   * @param info undefined
   * @return OK
   */
  DashBoardCerrarOfertaObtenerDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.DashBoardCerrarOfertaObtenerDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * ObtenerTabsDashboard DashBoardCerrarOferta
   * @param info undefined
   * @return OK
   */
  DashBoardCerrarOfertaObtenerTabsDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DashBoardCerrarOferta/tabs`,
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
   * ObtenerTabsDashboard DashBoardCerrarOferta
   * @param info undefined
   * @return OK
   */
  DashBoardCerrarOfertaObtenerTabsDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.DashBoardCerrarOfertaObtenerTabsDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * QueryResult DashBoardCerrarOferta
   * @param info undefined
   * @return OK
   */
  DashBoardCerrarOfertaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DashBoardCerrarOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCotCotizacion>;
      })
    );
  }
  /**
   * QueryResult DashBoardCerrarOferta
   * @param info undefined
   * @return OK
   */
  DashBoardCerrarOfertaQueryResult(info: QueryInfo): __Observable<QueryResultVCotCotizacion> {
    return this.DashBoardCerrarOfertaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCotCotizacion)
    );
  }

  /**
   * ObtenerTiposAjustesCliente TiposPartidaPorCotizacionCierre
   * @param idCliente undefined
   * @return OK
   */
  TiposPartidaPorCotizacionCierreObtenerTiposAjustesClienteResponse(idCliente: string): __Observable<__StrictHttpResponse<TiposAjustesCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TiposAjustePorClienteCierre`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TiposAjustesCliente>;
      })
    );
  }
  /**
   * ObtenerTiposAjustesCliente TiposPartidaPorCotizacionCierre
   * @param idCliente undefined
   * @return OK
   */
  TiposPartidaPorCotizacionCierreObtenerTiposAjustesCliente(idCliente: string): __Observable<TiposAjustesCliente> {
    return this.TiposPartidaPorCotizacionCierreObtenerTiposAjustesClienteResponse(idCliente).pipe(
      __map(_r => _r.body as TiposAjustesCliente)
    );
  }

  /**
   * Process TiposPartidaPorCotizacionCierre
   * @param idCotCotizacion undefined
   * @return OK
   */
  TiposPartidaPorCotizacionCierreProcessResponse(idCotCotizacion?: string): __Observable<__StrictHttpResponse<{[key: string]: TupleDecimalInt32}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TiposPartidaPorCotizacionCierre`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: TupleDecimalInt32}>;
      })
    );
  }
  /**
   * Process TiposPartidaPorCotizacionCierre
   * @param idCotCotizacion undefined
   * @return OK
   */
  TiposPartidaPorCotizacionCierreProcess(idCotCotizacion?: string): __Observable<{[key: string]: TupleDecimalInt32}> {
    return this.TiposPartidaPorCotizacionCierreProcessResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as {[key: string]: TupleDecimalInt32})
    );
  }
}

module ProcesosL01CotizacionCerrarOfertaDashboardService {
}

export { ProcesosL01CotizacionCerrarOfertaDashboardService }
