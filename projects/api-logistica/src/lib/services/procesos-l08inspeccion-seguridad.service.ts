/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SegEvidencia } from '../models/seg-evidencia';
import { QueryResultSegEvidencia } from '../models/query-result-seg-evidencia';
import { QueryInfo } from '../models/query-info';
import { SegVehiculoVisitante } from '../models/seg-vehiculo-visitante';
import { QueryResultSegVehiculoVisitante } from '../models/query-result-seg-vehiculo-visitante';
import { SegVisitante } from '../models/seg-visitante';
import { QueryResultSegVisitante } from '../models/query-result-seg-visitante';
import { SegVisitaVisitante } from '../models/seg-visita-visitante';
import { QueryResultSegVisitaVisitante } from '../models/query-result-seg-visita-visitante';
import { GroupQueryResultSegVisitaVisitanteDetalle } from '../models/group-query-result-seg-visita-visitante-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultSegVisitaVisitanteDetalle } from '../models/query-result-seg-visita-visitante-detalle';
import { SegVisitaVisitanteTotales } from '../models/seg-visita-visitante-totales';
@Injectable({
  providedIn: 'root',
})
class ProcesosL08InspeccionSeguridadService extends __BaseService {
  static readonly segEvidenciaObtenerPath = '/segEvidencia';
  static readonly segEvidenciaGuardarOActualizarPath = '/segEvidencia';
  static readonly segEvidenciaQueryResultPath = '/segEvidencia';
  static readonly segEvidenciaDesactivarPath = '/segEvidencia';
  static readonly segVehiculoVisitanteObtenerPath = '/segVehiculoVisitante';
  static readonly segVehiculoVisitanteGuardarOActualizarPath = '/segVehiculoVisitante';
  static readonly segVehiculoVisitanteQueryResultPath = '/segVehiculoVisitante';
  static readonly segVehiculoVisitanteDesactivarPath = '/segVehiculoVisitante';
  static readonly segVisitanteObtenerPath = '/segVisitante';
  static readonly segVisitanteGuardarOActualizarPath = '/segVisitante';
  static readonly segVisitanteQueryResultPath = '/segVisitante';
  static readonly segVisitanteDesactivarPath = '/segVisitante';
  static readonly segVisitaVisitanteObtenerPath = '/segVisitaVisitante';
  static readonly segVisitaVisitanteGuardarOActualizarPath = '/segVisitaVisitante';
  static readonly segVisitaVisitanteQueryResultPath = '/segVisitaVisitante';
  static readonly segVisitaVisitanteDesactivarPath = '/segVisitaVisitante';
  static readonly segVisitaVisitanteDetalleGroupQueryResultPath = '/GrupoListasegVisitaVisitanteDetalle';
  static readonly segVisitaVisitanteDetalleQueryResultPath = '/segVisitaVisitanteDetalle';
  static readonly segVisitaVisitanteTotalesObtenerPath = '/segVisitaVisitanteTotales';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener segEvidencia
   * @param idsegEvidencia undefined
   * @return OK
   */
  segEvidenciaObtenerResponse(idsegEvidencia: string): __Observable<__StrictHttpResponse<SegEvidencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegEvidencia != null) __params = __params.set('idsegEvidencia', idsegEvidencia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/segEvidencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SegEvidencia>;
      })
    );
  }
  /**
   * Obtener segEvidencia
   * @param idsegEvidencia undefined
   * @return OK
   */
  segEvidenciaObtener(idsegEvidencia: string): __Observable<SegEvidencia> {
    return this.segEvidenciaObtenerResponse(idsegEvidencia).pipe(
      __map(_r => _r.body as SegEvidencia)
    );
  }

  /**
   * GuardarOActualizar segEvidencia
   * @param segEvidencia undefined
   * @return OK
   */
  segEvidenciaGuardarOActualizarResponse(segEvidencia: SegEvidencia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = segEvidencia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/segEvidencia`,
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
   * GuardarOActualizar segEvidencia
   * @param segEvidencia undefined
   * @return OK
   */
  segEvidenciaGuardarOActualizar(segEvidencia: SegEvidencia): __Observable<string> {
    return this.segEvidenciaGuardarOActualizarResponse(segEvidencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult segEvidencia
   * @param info undefined
   * @return OK
   */
  segEvidenciaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultSegEvidencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/segEvidencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultSegEvidencia>;
      })
    );
  }
  /**
   * QueryResult segEvidencia
   * @param info undefined
   * @return OK
   */
  segEvidenciaQueryResult(info: QueryInfo): __Observable<QueryResultSegEvidencia> {
    return this.segEvidenciaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultSegEvidencia)
    );
  }

  /**
   * Desactivar segEvidencia
   * @param IdSegEvidencia undefined
   * @return OK
   */
  segEvidenciaDesactivarResponse(IdSegEvidencia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdSegEvidencia != null) __params = __params.set('IdSegEvidencia', IdSegEvidencia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/segEvidencia`,
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
   * Desactivar segEvidencia
   * @param IdSegEvidencia undefined
   * @return OK
   */
  segEvidenciaDesactivar(IdSegEvidencia: string): __Observable<string> {
    return this.segEvidenciaDesactivarResponse(IdSegEvidencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de segVehiculoVisitante
   * @param idsegVehiculoVisitante Identificador de segVehiculoVisitante
   * @return OK
   */
  segVehiculoVisitanteObtenerResponse(idsegVehiculoVisitante: string): __Observable<__StrictHttpResponse<SegVehiculoVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegVehiculoVisitante != null) __params = __params.set('idsegVehiculoVisitante', idsegVehiculoVisitante.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/segVehiculoVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SegVehiculoVisitante>;
      })
    );
  }
  /**
   * Consultar registro de segVehiculoVisitante
   * @param idsegVehiculoVisitante Identificador de segVehiculoVisitante
   * @return OK
   */
  segVehiculoVisitanteObtener(idsegVehiculoVisitante: string): __Observable<SegVehiculoVisitante> {
    return this.segVehiculoVisitanteObtenerResponse(idsegVehiculoVisitante).pipe(
      __map(_r => _r.body as SegVehiculoVisitante)
    );
  }

  /**
   * Guardar o actualizar segVehiculoVisitante
   * @param segVehiculoVisitante segVehiculoVisitante
   * @return OK
   */
  segVehiculoVisitanteGuardarOActualizarResponse(segVehiculoVisitante: SegVehiculoVisitante): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = segVehiculoVisitante;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/segVehiculoVisitante`,
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
   * Guardar o actualizar segVehiculoVisitante
   * @param segVehiculoVisitante segVehiculoVisitante
   * @return OK
   */
  segVehiculoVisitanteGuardarOActualizar(segVehiculoVisitante: SegVehiculoVisitante): __Observable<string> {
    return this.segVehiculoVisitanteGuardarOActualizarResponse(segVehiculoVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de segVehiculoVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  segVehiculoVisitanteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultSegVehiculoVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/segVehiculoVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultSegVehiculoVisitante>;
      })
    );
  }
  /**
   * Consultar lista paginada de segVehiculoVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  segVehiculoVisitanteQueryResult(info: QueryInfo): __Observable<QueryResultSegVehiculoVisitante> {
    return this.segVehiculoVisitanteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultSegVehiculoVisitante)
    );
  }

  /**
   * Desactivar registro de segVehiculoVisitante
   * @param idsegVehiculoVisitante Identificador de registro de segVehiculoVisitante
   * @return OK
   */
  segVehiculoVisitanteDesactivarResponse(idsegVehiculoVisitante: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegVehiculoVisitante != null) __params = __params.set('idsegVehiculoVisitante', idsegVehiculoVisitante.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/segVehiculoVisitante`,
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
   * Desactivar registro de segVehiculoVisitante
   * @param idsegVehiculoVisitante Identificador de registro de segVehiculoVisitante
   * @return OK
   */
  segVehiculoVisitanteDesactivar(idsegVehiculoVisitante: string): __Observable<string> {
    return this.segVehiculoVisitanteDesactivarResponse(idsegVehiculoVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de segVisitante
   * @param idsegVisitante Identificador de segVisitante
   * @return OK
   */
  segVisitanteObtenerResponse(idsegVisitante: string): __Observable<__StrictHttpResponse<SegVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegVisitante != null) __params = __params.set('idsegVisitante', idsegVisitante.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/segVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SegVisitante>;
      })
    );
  }
  /**
   * Consultar registro de segVisitante
   * @param idsegVisitante Identificador de segVisitante
   * @return OK
   */
  segVisitanteObtener(idsegVisitante: string): __Observable<SegVisitante> {
    return this.segVisitanteObtenerResponse(idsegVisitante).pipe(
      __map(_r => _r.body as SegVisitante)
    );
  }

  /**
   * Guardar o actualizar segVisitante
   * @param segVisitante segVisitante
   * @return OK
   */
  segVisitanteGuardarOActualizarResponse(segVisitante: SegVisitante): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = segVisitante;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/segVisitante`,
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
   * Guardar o actualizar segVisitante
   * @param segVisitante segVisitante
   * @return OK
   */
  segVisitanteGuardarOActualizar(segVisitante: SegVisitante): __Observable<string> {
    return this.segVisitanteGuardarOActualizarResponse(segVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de segVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  segVisitanteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultSegVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/segVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultSegVisitante>;
      })
    );
  }
  /**
   * Consultar lista paginada de segVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  segVisitanteQueryResult(info: QueryInfo): __Observable<QueryResultSegVisitante> {
    return this.segVisitanteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultSegVisitante)
    );
  }

  /**
   * Desactivar registro de segVisitante
   * @param idsegVisitante Identificador de registro de segVisitante
   * @return OK
   */
  segVisitanteDesactivarResponse(idsegVisitante: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegVisitante != null) __params = __params.set('idsegVisitante', idsegVisitante.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/segVisitante`,
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
   * Desactivar registro de segVisitante
   * @param idsegVisitante Identificador de registro de segVisitante
   * @return OK
   */
  segVisitanteDesactivar(idsegVisitante: string): __Observable<string> {
    return this.segVisitanteDesactivarResponse(idsegVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de segVisitaVisitante
   * @param idsegVisitaVisitante Identificador de segVisitaVisitante
   * @return OK
   */
  segVisitaVisitanteObtenerResponse(idsegVisitaVisitante: string): __Observable<__StrictHttpResponse<SegVisitaVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegVisitaVisitante != null) __params = __params.set('idsegVisitaVisitante', idsegVisitaVisitante.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/segVisitaVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SegVisitaVisitante>;
      })
    );
  }
  /**
   * Consultar registro de segVisitaVisitante
   * @param idsegVisitaVisitante Identificador de segVisitaVisitante
   * @return OK
   */
  segVisitaVisitanteObtener(idsegVisitaVisitante: string): __Observable<SegVisitaVisitante> {
    return this.segVisitaVisitanteObtenerResponse(idsegVisitaVisitante).pipe(
      __map(_r => _r.body as SegVisitaVisitante)
    );
  }

  /**
   * Guardar o actualizar segVisitaVisitante
   * @param segVisitaVisitante segVisitaVisitante
   * @return OK
   */
  segVisitaVisitanteGuardarOActualizarResponse(segVisitaVisitante: SegVisitaVisitante): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = segVisitaVisitante;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/segVisitaVisitante`,
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
   * Guardar o actualizar segVisitaVisitante
   * @param segVisitaVisitante segVisitaVisitante
   * @return OK
   */
  segVisitaVisitanteGuardarOActualizar(segVisitaVisitante: SegVisitaVisitante): __Observable<string> {
    return this.segVisitaVisitanteGuardarOActualizarResponse(segVisitaVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de segVisitaVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  segVisitaVisitanteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultSegVisitaVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/segVisitaVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultSegVisitaVisitante>;
      })
    );
  }
  /**
   * Consultar lista paginada de segVisitaVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  segVisitaVisitanteQueryResult(info: QueryInfo): __Observable<QueryResultSegVisitaVisitante> {
    return this.segVisitaVisitanteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultSegVisitaVisitante)
    );
  }

  /**
   * Desactivar registro de segVisitaVisitante
   * @param idsegVisitaVisitante Identificador de registro de segVisitaVisitante
   * @return OK
   */
  segVisitaVisitanteDesactivarResponse(idsegVisitaVisitante: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idsegVisitaVisitante != null) __params = __params.set('idsegVisitaVisitante', idsegVisitaVisitante.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/segVisitaVisitante`,
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
   * Desactivar registro de segVisitaVisitante
   * @param idsegVisitaVisitante Identificador de registro de segVisitaVisitante
   * @return OK
   */
  segVisitaVisitanteDesactivar(idsegVisitaVisitante: string): __Observable<string> {
    return this.segVisitaVisitanteDesactivarResponse(idsegVisitaVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult segVisitaVisitanteDetalle
   * @param info undefined
   * @return OK
   */
  segVisitaVisitanteDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultSegVisitaVisitanteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListasegVisitaVisitanteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultSegVisitaVisitanteDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult segVisitaVisitanteDetalle
   * @param info undefined
   * @return OK
   */
  segVisitaVisitanteDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultSegVisitaVisitanteDetalle> {
    return this.segVisitaVisitanteDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultSegVisitaVisitanteDetalle)
    );
  }

  /**
   * Consultar lista paginada de segVisitaVisitanteDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  segVisitaVisitanteDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultSegVisitaVisitanteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/segVisitaVisitanteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultSegVisitaVisitanteDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de segVisitaVisitanteDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  segVisitaVisitanteDetalleQueryResult(info: QueryInfo): __Observable<QueryResultSegVisitaVisitanteDetalle> {
    return this.segVisitaVisitanteDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultSegVisitaVisitanteDetalle)
    );
  }

  /**
   * Obtener segVisitaVisitanteTotales
   * @return OK
   */
  segVisitaVisitanteTotalesObtenerResponse(): __Observable<__StrictHttpResponse<SegVisitaVisitanteTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/segVisitaVisitanteTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SegVisitaVisitanteTotales>;
      })
    );
  }
  /**
   * Obtener segVisitaVisitanteTotales
   * @return OK
   */
  segVisitaVisitanteTotalesObtener(): __Observable<SegVisitaVisitanteTotales> {
    return this.segVisitaVisitanteTotalesObtenerResponse().pipe(
      __map(_r => _r.body as SegVisitaVisitanteTotales)
    );
  }
}

module ProcesosL08InspeccionSeguridadService {
}

export { ProcesosL08InspeccionSeguridadService }
