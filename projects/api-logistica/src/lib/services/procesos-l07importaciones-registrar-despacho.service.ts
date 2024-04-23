/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ImpArchivoEvidencia } from '../models/imp-archivo-evidencia';
import { QueryResultImpArchivoEvidencia } from '../models/query-result-imp-archivo-evidencia';
import { QueryInfo } from '../models/query-info';
import { RegistrarDespachoGraficaTotales } from '../models/registrar-despacho-grafica-totales';
import { VRDProveedorOrdenDespachoDetalle } from '../models/vrdproveedor-orden-despacho-detalle';
import { QueryResultVRDImpOrdenDespacho } from '../models/query-result-vrdimp-orden-despacho';
import { QueryResultVRDImportador } from '../models/query-result-vrdimportador';
@Injectable({
  providedIn: 'root',
})
class ProcesosL07ImportacionesRegistrarDespachoService extends __BaseService {
  static readonly impArchivoEvidenciaObtenerPath = '/impArchivoEvidencia';
  static readonly impArchivoEvidenciaGuardarOActualizarPath = '/impArchivoEvidencia';
  static readonly impArchivoEvidenciaQueryResultPath = '/impArchivoEvidencia';
  static readonly impArchivoEvidenciaDesactivarPath = '/impArchivoEvidencia';
  static readonly RegistrarDespachoGraficaTotalesObtenerPath = '/RegistrarDespachoGraficaTotales';
  static readonly RegistrarDespachoGraficaTotalesRegistrarDespachoProveedoresOrdenDespachoPath = '/RegistrarDespachoProveedoresOrdenDespacho';
  static readonly vRDImpOrdenDespachoQueryResultPath = '/vRDImpOrdenDespacho';
  static readonly vRDImportadorQueryResultPath = '/vRDImportador';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de impArchivoEvidencia
   * @param idimpArchivoEvidencia Identificador de impArchivoEvidencia
   * @return OK
   */
  impArchivoEvidenciaObtenerResponse(idimpArchivoEvidencia: string): __Observable<__StrictHttpResponse<ImpArchivoEvidencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpArchivoEvidencia != null) __params = __params.set('idimpArchivoEvidencia', idimpArchivoEvidencia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impArchivoEvidencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpArchivoEvidencia>;
      })
    );
  }
  /**
   * Consultar registro de impArchivoEvidencia
   * @param idimpArchivoEvidencia Identificador de impArchivoEvidencia
   * @return OK
   */
  impArchivoEvidenciaObtener(idimpArchivoEvidencia: string): __Observable<ImpArchivoEvidencia> {
    return this.impArchivoEvidenciaObtenerResponse(idimpArchivoEvidencia).pipe(
      __map(_r => _r.body as ImpArchivoEvidencia)
    );
  }

  /**
   * Guardar o actualizar impArchivoEvidencia
   * @param impArchivoEvidencia impArchivoEvidencia
   * @return OK
   */
  impArchivoEvidenciaGuardarOActualizarResponse(impArchivoEvidencia: ImpArchivoEvidencia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = impArchivoEvidencia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/impArchivoEvidencia`,
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
   * Guardar o actualizar impArchivoEvidencia
   * @param impArchivoEvidencia impArchivoEvidencia
   * @return OK
   */
  impArchivoEvidenciaGuardarOActualizar(impArchivoEvidencia: ImpArchivoEvidencia): __Observable<string> {
    return this.impArchivoEvidenciaGuardarOActualizarResponse(impArchivoEvidencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de impArchivoEvidencia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impArchivoEvidenciaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultImpArchivoEvidencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/impArchivoEvidencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultImpArchivoEvidencia>;
      })
    );
  }
  /**
   * Consultar lista paginada de impArchivoEvidencia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impArchivoEvidenciaQueryResult(info: QueryInfo): __Observable<QueryResultImpArchivoEvidencia> {
    return this.impArchivoEvidenciaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultImpArchivoEvidencia)
    );
  }

  /**
   * Desactivar registro de impArchivoEvidencia
   * @param idimpArchivoEvidencia Identificador de registro de impArchivoEvidencia
   * @return OK
   */
  impArchivoEvidenciaDesactivarResponse(idimpArchivoEvidencia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpArchivoEvidencia != null) __params = __params.set('idimpArchivoEvidencia', idimpArchivoEvidencia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/impArchivoEvidencia`,
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
   * Desactivar registro de impArchivoEvidencia
   * @param idimpArchivoEvidencia Identificador de registro de impArchivoEvidencia
   * @return OK
   */
  impArchivoEvidenciaDesactivar(idimpArchivoEvidencia: string): __Observable<string> {
    return this.impArchivoEvidenciaDesactivarResponse(idimpArchivoEvidencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener RegistrarDespachoGraficaTotales
   * @param idUsuario undefined
   * @return OK
   */
  RegistrarDespachoGraficaTotalesObtenerResponse(idUsuario?: string): __Observable<__StrictHttpResponse<RegistrarDespachoGraficaTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/RegistrarDespachoGraficaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrarDespachoGraficaTotales>;
      })
    );
  }
  /**
   * Obtener RegistrarDespachoGraficaTotales
   * @param idUsuario undefined
   * @return OK
   */
  RegistrarDespachoGraficaTotalesObtener(idUsuario?: string): __Observable<RegistrarDespachoGraficaTotales> {
    return this.RegistrarDespachoGraficaTotalesObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as RegistrarDespachoGraficaTotales)
    );
  }

  /**
   * RegistrarDespachoProveedoresOrdenDespacho RegistrarDespachoGraficaTotales
   * @param idImpOrdenDespacho undefined
   * @return OK
   */
  RegistrarDespachoGraficaTotalesRegistrarDespachoProveedoresOrdenDespachoResponse(idImpOrdenDespacho: string): __Observable<__StrictHttpResponse<Array<VRDProveedorOrdenDespachoDetalle>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idImpOrdenDespacho != null) __params = __params.set('idImpOrdenDespacho', idImpOrdenDespacho.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/RegistrarDespachoProveedoresOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VRDProveedorOrdenDespachoDetalle>>;
      })
    );
  }
  /**
   * RegistrarDespachoProveedoresOrdenDespacho RegistrarDespachoGraficaTotales
   * @param idImpOrdenDespacho undefined
   * @return OK
   */
  RegistrarDespachoGraficaTotalesRegistrarDespachoProveedoresOrdenDespacho(idImpOrdenDespacho: string): __Observable<Array<VRDProveedorOrdenDespachoDetalle>> {
    return this.RegistrarDespachoGraficaTotalesRegistrarDespachoProveedoresOrdenDespachoResponse(idImpOrdenDespacho).pipe(
      __map(_r => _r.body as Array<VRDProveedorOrdenDespachoDetalle>)
    );
  }

  /**
   * QueryResult vRDImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRDImpOrdenDespachoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVRDImpOrdenDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vRDImpOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVRDImpOrdenDespacho>;
      })
    );
  }
  /**
   * QueryResult vRDImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRDImpOrdenDespachoQueryResult(info: QueryInfo): __Observable<QueryResultVRDImpOrdenDespacho> {
    return this.vRDImpOrdenDespachoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVRDImpOrdenDespacho)
    );
  }

  /**
   * QueryResult vRDImportador
   * @param info undefined
   * @return OK
   */
  vRDImportadorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVRDImportador>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vRDImportador`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVRDImportador>;
      })
    );
  }
  /**
   * QueryResult vRDImportador
   * @param info undefined
   * @return OK
   */
  vRDImportadorQueryResult(info: QueryInfo): __Observable<QueryResultVRDImportador> {
    return this.vRDImportadorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVRDImportador)
    );
  }
}

module ProcesosL07ImportacionesRegistrarDespachoService {
}

export { ProcesosL07ImportacionesRegistrarDespachoService }
