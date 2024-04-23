/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ImpListaArribo } from '../models/imp-lista-arribo';
import { ParametroCancelarGuiaMonitorearDespacho } from '../models/parametro-cancelar-guia-monitorear-despacho';
import { ParametroConfirmarMonitorearDespacho } from '../models/parametro-confirmar-monitorear-despacho';
import { ParametroFEEMonitorearDespacho } from '../models/parametro-feemonitorear-despacho';
import { MonitorearDespachoTotales } from '../models/monitorear-despacho-totales';
import { QueryResultVImpMDGuia } from '../models/query-result-vimp-mdguia';
import { QueryInfo } from '../models/query-info';
import { QueryResultVImpMDProveedor } from '../models/query-result-vimp-mdproveedor';
@Injectable({
  providedIn: 'root',
})
class ProcesosL07ImportacionesMonitorearDespachoService extends __BaseService {
  static readonly CancelarGuiaMonitorearDespachoProcessPath = '/CancelarGuiaMonitorearDespacho';
  static readonly ConfirmarMonitorearDespachoProcessPath = '/ConfirmarMonitorearDespacho';
  static readonly FEEMonitorearDespachoProcessPath = '/FEEMonitorearDespacho';
  static readonly MonitorearDespachoTotalesObtenerPath = '/MonitorearDespachoTotales';
  static readonly vImpMDGuiaQueryResultPath = '/vImpMDGuia';
  static readonly vImpMDProveedorQueryResultPath = '/vImpMDProveedor';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process CancelarGuiaMonitorearDespacho
   * @param param undefined
   * @return OK
   */
  CancelarGuiaMonitorearDespachoProcessResponse(param: ParametroCancelarGuiaMonitorearDespacho): __Observable<__StrictHttpResponse<ImpListaArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CancelarGuiaMonitorearDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpListaArribo>;
      })
    );
  }
  /**
   * Process CancelarGuiaMonitorearDespacho
   * @param param undefined
   * @return OK
   */
  CancelarGuiaMonitorearDespachoProcess(param: ParametroCancelarGuiaMonitorearDespacho): __Observable<ImpListaArribo> {
    return this.CancelarGuiaMonitorearDespachoProcessResponse(param).pipe(
      __map(_r => _r.body as ImpListaArribo)
    );
  }

  /**
   * Process ConfirmarMonitorearDespacho
   * @param param undefined
   * @return OK
   */
  ConfirmarMonitorearDespachoProcessResponse(param: ParametroConfirmarMonitorearDespacho): __Observable<__StrictHttpResponse<ImpListaArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ConfirmarMonitorearDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpListaArribo>;
      })
    );
  }
  /**
   * Process ConfirmarMonitorearDespacho
   * @param param undefined
   * @return OK
   */
  ConfirmarMonitorearDespachoProcess(param: ParametroConfirmarMonitorearDespacho): __Observable<ImpListaArribo> {
    return this.ConfirmarMonitorearDespachoProcessResponse(param).pipe(
      __map(_r => _r.body as ImpListaArribo)
    );
  }

  /**
   * Process FEEMonitorearDespacho
   * @param param undefined
   * @return OK
   */
  FEEMonitorearDespachoProcessResponse(param: ParametroFEEMonitorearDespacho): __Observable<__StrictHttpResponse<ImpListaArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/FEEMonitorearDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpListaArribo>;
      })
    );
  }
  /**
   * Process FEEMonitorearDespacho
   * @param param undefined
   * @return OK
   */
  FEEMonitorearDespachoProcess(param: ParametroFEEMonitorearDespacho): __Observable<ImpListaArribo> {
    return this.FEEMonitorearDespachoProcessResponse(param).pipe(
      __map(_r => _r.body as ImpListaArribo)
    );
  }

  /**
   * Obtener MonitorearDespachoTotales
   * @return OK
   */
  MonitorearDespachoTotalesObtenerResponse(): __Observable<__StrictHttpResponse<MonitorearDespachoTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MonitorearDespachoTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MonitorearDespachoTotales>;
      })
    );
  }
  /**
   * Obtener MonitorearDespachoTotales
   * @return OK
   */
  MonitorearDespachoTotalesObtener(): __Observable<MonitorearDespachoTotales> {
    return this.MonitorearDespachoTotalesObtenerResponse().pipe(
      __map(_r => _r.body as MonitorearDespachoTotales)
    );
  }

  /**
   * Consultar lista paginada de vImpMDGuia
   * @param info Filtros (NombreProveedor, OrdenDeCompraProveedor) y ordenamientos
   * @return OK
   */
  vImpMDGuiaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVImpMDGuia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vImpMDGuia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVImpMDGuia>;
      })
    );
  }
  /**
   * Consultar lista paginada de vImpMDGuia
   * @param info Filtros (NombreProveedor, OrdenDeCompraProveedor) y ordenamientos
   * @return OK
   */
  vImpMDGuiaQueryResult(info: QueryInfo): __Observable<QueryResultVImpMDGuia> {
    return this.vImpMDGuiaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVImpMDGuia)
    );
  }

  /**
   * Consultar lista paginada de vImpMDProveedor
   * @param info Filtros (NombreProveedor, OrdenDeCompraProveedor) y ordenamientos
   * @return OK
   */
  vImpMDProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVImpMDProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vImpMDProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVImpMDProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de vImpMDProveedor
   * @param info Filtros (NombreProveedor, OrdenDeCompraProveedor) y ordenamientos
   * @return OK
   */
  vImpMDProveedorQueryResult(info: QueryInfo): __Observable<QueryResultVImpMDProveedor> {
    return this.vImpMDProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVImpMDProveedor)
    );
  }
}

module ProcesosL07ImportacionesMonitorearDespachoService {
}

export { ProcesosL07ImportacionesMonitorearDespachoService }
