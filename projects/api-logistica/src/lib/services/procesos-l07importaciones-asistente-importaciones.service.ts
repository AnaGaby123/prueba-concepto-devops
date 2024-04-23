/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VGARProveedorOrdenDespachoDetalle } from '../models/vgarproveedor-orden-despacho-detalle';
import { AsistenteImportacionAcuseReciboGraficaTotales } from '../models/asistente-importacion-acuse-recibo-grafica-totales';
import { QueryResultVGARImpOrdenDespacho } from '../models/query-result-vgarimp-orden-despacho';
import { QueryInfo } from '../models/query-info';
import { QueryResultVGARImportador } from '../models/query-result-vgarimportador';
@Injectable({
  providedIn: 'root',
})
class ProcesosL07ImportacionesAsistenteImportacionesService extends __BaseService {
  static readonly AsistenteImportacionAcuseReciboGraficaTotalesAsistenteImportacionProveedoresOrdenDespachoPath = '/AsistenteImportacionProveedoresOrdenDespacho';
  static readonly AsistenteImportacionAcuseReciboGraficaTotalesObtenerPath = '/AsistenteImportacionAcuseReciboGraficaTotales';
  static readonly vGARImpOrdenDespachoQueryResultPath = '/vGARImpOrdenDespacho';
  static readonly vGARImportadorQueryResultPath = '/vGARImportador';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * AsistenteImportacionProveedoresOrdenDespacho AsistenteImportacionAcuseReciboGraficaTotales
   * @param idImpOrdenDespacho undefined
   * @return OK
   */
  AsistenteImportacionAcuseReciboGraficaTotalesAsistenteImportacionProveedoresOrdenDespachoResponse(idImpOrdenDespacho: string): __Observable<__StrictHttpResponse<Array<VGARProveedorOrdenDespachoDetalle>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idImpOrdenDespacho != null) __params = __params.set('idImpOrdenDespacho', idImpOrdenDespacho.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/AsistenteImportacionProveedoresOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VGARProveedorOrdenDespachoDetalle>>;
      })
    );
  }
  /**
   * AsistenteImportacionProveedoresOrdenDespacho AsistenteImportacionAcuseReciboGraficaTotales
   * @param idImpOrdenDespacho undefined
   * @return OK
   */
  AsistenteImportacionAcuseReciboGraficaTotalesAsistenteImportacionProveedoresOrdenDespacho(idImpOrdenDespacho: string): __Observable<Array<VGARProveedorOrdenDespachoDetalle>> {
    return this.AsistenteImportacionAcuseReciboGraficaTotalesAsistenteImportacionProveedoresOrdenDespachoResponse(idImpOrdenDespacho).pipe(
      __map(_r => _r.body as Array<VGARProveedorOrdenDespachoDetalle>)
    );
  }

  /**
   * Obtener AsistenteImportacionAcuseReciboGraficaTotales
   * @param idUsuario undefined
   * @return OK
   */
  AsistenteImportacionAcuseReciboGraficaTotalesObtenerResponse(idUsuario?: string): __Observable<__StrictHttpResponse<AsistenteImportacionAcuseReciboGraficaTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/AsistenteImportacionAcuseReciboGraficaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AsistenteImportacionAcuseReciboGraficaTotales>;
      })
    );
  }
  /**
   * Obtener AsistenteImportacionAcuseReciboGraficaTotales
   * @param idUsuario undefined
   * @return OK
   */
  AsistenteImportacionAcuseReciboGraficaTotalesObtener(idUsuario?: string): __Observable<AsistenteImportacionAcuseReciboGraficaTotales> {
    return this.AsistenteImportacionAcuseReciboGraficaTotalesObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as AsistenteImportacionAcuseReciboGraficaTotales)
    );
  }

  /**
   * QueryResult vGARImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vGARImpOrdenDespachoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVGARImpOrdenDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vGARImpOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVGARImpOrdenDespacho>;
      })
    );
  }
  /**
   * QueryResult vGARImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vGARImpOrdenDespachoQueryResult(info: QueryInfo): __Observable<QueryResultVGARImpOrdenDespacho> {
    return this.vGARImpOrdenDespachoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVGARImpOrdenDespacho)
    );
  }

  /**
   * QueryResult vGARImportador
   * @param info undefined
   * @return OK
   */
  vGARImportadorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVGARImportador>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vGARImportador`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVGARImportador>;
      })
    );
  }
  /**
   * QueryResult vGARImportador
   * @param info undefined
   * @return OK
   */
  vGARImportadorQueryResult(info: QueryInfo): __Observable<QueryResultVGARImportador> {
    return this.vGARImportadorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVGARImportador)
    );
  }
}

module ProcesosL07ImportacionesAsistenteImportacionesService {
}

export { ProcesosL07ImportacionesAsistenteImportacionesService }
