/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VUsuario } from '../models/vusuario';
import { FccRevisionProgramadaArchivoDetalle } from '../models/fcc-revision-programada-archivo-detalle';
import { ResultadosRevisionTotales } from '../models/resultados-revision-totales';
import { QueryResultVRevisionFactura } from '../models/query-result-vrevision-factura';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesResultadosRevisionService extends __BaseService {
  static readonly ConsultarUsuariosMensajerosResultadosRevisionProcessPath = '/ConsultarUsuariosMensajerosResultadosRevision';
  static readonly fccRevisionProgramadaArchivoDetalleObtenerPath = '/fccRevisionProgramadaArchivoDetalle';
  static readonly ResultadosRevisionTotalesProcessPath = '/ResultadosRevisionTotales';
  static readonly vRevisionFacturaQueryResultPath = '/vRevisionFactura';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process ConsultarUsuariosMensajerosResultadosRevision
   * @param idUsuarioSesion undefined
   * @return OK
   */
  ConsultarUsuariosMensajerosResultadosRevisionProcessResponse(idUsuarioSesion: string): __Observable<__StrictHttpResponse<Array<VUsuario>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuarioSesion != null) __params = __params.set('idUsuarioSesion', idUsuarioSesion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConsultarUsuariosMensajerosResultadosRevision`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VUsuario>>;
      })
    );
  }
  /**
   * Process ConsultarUsuariosMensajerosResultadosRevision
   * @param idUsuarioSesion undefined
   * @return OK
   */
  ConsultarUsuariosMensajerosResultadosRevisionProcess(idUsuarioSesion: string): __Observable<Array<VUsuario>> {
    return this.ConsultarUsuariosMensajerosResultadosRevisionProcessResponse(idUsuarioSesion).pipe(
      __map(_r => _r.body as Array<VUsuario>)
    );
  }

  /**
   * Obtener fccRevisionProgramadaArchivoDetalle
   * @param idFCCRevisionProgramada undefined
   * @return OK
   */
  fccRevisionProgramadaArchivoDetalleObtenerResponse(idFCCRevisionProgramada: string): __Observable<__StrictHttpResponse<FccRevisionProgramadaArchivoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFCCRevisionProgramada != null) __params = __params.set('idFCCRevisionProgramada', idFCCRevisionProgramada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccRevisionProgramadaArchivoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccRevisionProgramadaArchivoDetalle>;
      })
    );
  }
  /**
   * Obtener fccRevisionProgramadaArchivoDetalle
   * @param idFCCRevisionProgramada undefined
   * @return OK
   */
  fccRevisionProgramadaArchivoDetalleObtener(idFCCRevisionProgramada: string): __Observable<FccRevisionProgramadaArchivoDetalle> {
    return this.fccRevisionProgramadaArchivoDetalleObtenerResponse(idFCCRevisionProgramada).pipe(
      __map(_r => _r.body as FccRevisionProgramadaArchivoDetalle)
    );
  }

  /**
   * Process ResultadosRevisionTotales
   * @param idUsuario undefined
   * @return OK
   */
  ResultadosRevisionTotalesProcessResponse(idUsuario: string): __Observable<__StrictHttpResponse<ResultadosRevisionTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ResultadosRevisionTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResultadosRevisionTotales>;
      })
    );
  }
  /**
   * Process ResultadosRevisionTotales
   * @param idUsuario undefined
   * @return OK
   */
  ResultadosRevisionTotalesProcess(idUsuario: string): __Observable<ResultadosRevisionTotales> {
    return this.ResultadosRevisionTotalesProcessResponse(idUsuario).pipe(
      __map(_r => _r.body as ResultadosRevisionTotales)
    );
  }

  /**
   * Consultar lista paginada de vRevisionFactura
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vRevisionFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVRevisionFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vRevisionFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVRevisionFactura>;
      })
    );
  }
  /**
   * Consultar lista paginada de vRevisionFactura
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vRevisionFacturaQueryResult(info: QueryInfo): __Observable<QueryResultVRevisionFactura> {
    return this.vRevisionFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVRevisionFactura)
    );
  }
}

module CobranzaClientesResultadosRevisionService {
}

export { CobranzaClientesResultadosRevisionService }
