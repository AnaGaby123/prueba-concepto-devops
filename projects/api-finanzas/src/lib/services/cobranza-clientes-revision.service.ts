/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccRevisionNoRealizada } from '../models/fcc-revision-no-realizada';
import { QueryResultFccRevisionNoRealizada } from '../models/query-result-fcc-revision-no-realizada';
import { QueryInfo } from '../models/query-info';
import { FccRevisionProgramada } from '../models/fcc-revision-programada';
import { QueryResultFccRevisionProgramada } from '../models/query-result-fcc-revision-programada';
import { FccRevisionProgramadaArchivo } from '../models/fcc-revision-programada-archivo';
import { QueryResultFccRevisionProgramadaArchivo } from '../models/query-result-fcc-revision-programada-archivo';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesRevisionService extends __BaseService {
  static readonly fccRevisionNoRealizadaObtenerPath = '/fccRevisionNoRealizada';
  static readonly fccRevisionNoRealizadaGuardarOActualizarPath = '/fccRevisionNoRealizada';
  static readonly fccRevisionNoRealizadaQueryResultPath = '/fccRevisionNoRealizada';
  static readonly fccRevisionNoRealizadaDesactivarPath = '/fccRevisionNoRealizada';
  static readonly fccRevisionProgramadaObtenerPath = '/fccRevisionProgramada';
  static readonly fccRevisionProgramadaGuardarOActualizarPath = '/fccRevisionProgramada';
  static readonly fccRevisionProgramadaQueryResultPath = '/fccRevisionProgramada';
  static readonly fccRevisionProgramadaDesactivarPath = '/fccRevisionProgramada';
  static readonly fccRevisionProgramadaArchivoObtenerPath = '/fccRevisionProgramadaArchivo';
  static readonly fccRevisionProgramadaArchivoGuardarOActualizarPath = '/fccRevisionProgramadaArchivo';
  static readonly fccRevisionProgramadaArchivoQueryResultPath = '/fccRevisionProgramadaArchivo';
  static readonly fccRevisionProgramadaArchivoDesactivarPath = '/fccRevisionProgramadaArchivo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener fccRevisionNoRealizada
   * @param idfccRevisionNoRealizada undefined
   * @return OK
   */
  fccRevisionNoRealizadaObtenerResponse(idfccRevisionNoRealizada: string): __Observable<__StrictHttpResponse<FccRevisionNoRealizada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccRevisionNoRealizada != null) __params = __params.set('idfccRevisionNoRealizada', idfccRevisionNoRealizada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccRevisionNoRealizada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccRevisionNoRealizada>;
      })
    );
  }
  /**
   * Obtener fccRevisionNoRealizada
   * @param idfccRevisionNoRealizada undefined
   * @return OK
   */
  fccRevisionNoRealizadaObtener(idfccRevisionNoRealizada: string): __Observable<FccRevisionNoRealizada> {
    return this.fccRevisionNoRealizadaObtenerResponse(idfccRevisionNoRealizada).pipe(
      __map(_r => _r.body as FccRevisionNoRealizada)
    );
  }

  /**
   * GuardarOActualizar fccRevisionNoRealizada
   * @param fccRevisionNoRealizada undefined
   * @return OK
   */
  fccRevisionNoRealizadaGuardarOActualizarResponse(fccRevisionNoRealizada: FccRevisionNoRealizada): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccRevisionNoRealizada;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccRevisionNoRealizada`,
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
   * GuardarOActualizar fccRevisionNoRealizada
   * @param fccRevisionNoRealizada undefined
   * @return OK
   */
  fccRevisionNoRealizadaGuardarOActualizar(fccRevisionNoRealizada: FccRevisionNoRealizada): __Observable<string> {
    return this.fccRevisionNoRealizadaGuardarOActualizarResponse(fccRevisionNoRealizada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult fccRevisionNoRealizada
   * @param info undefined
   * @return OK
   */
  fccRevisionNoRealizadaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccRevisionNoRealizada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccRevisionNoRealizada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccRevisionNoRealizada>;
      })
    );
  }
  /**
   * QueryResult fccRevisionNoRealizada
   * @param info undefined
   * @return OK
   */
  fccRevisionNoRealizadaQueryResult(info: QueryInfo): __Observable<QueryResultFccRevisionNoRealizada> {
    return this.fccRevisionNoRealizadaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccRevisionNoRealizada)
    );
  }

  /**
   * Desactivar fccRevisionNoRealizada
   * @param fccRevisionNoRealizada undefined
   * @return OK
   */
  fccRevisionNoRealizadaDesactivarResponse(fccRevisionNoRealizada: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (fccRevisionNoRealizada != null) __params = __params.set('fccRevisionNoRealizada', fccRevisionNoRealizada.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccRevisionNoRealizada`,
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
   * Desactivar fccRevisionNoRealizada
   * @param fccRevisionNoRealizada undefined
   * @return OK
   */
  fccRevisionNoRealizadaDesactivar(fccRevisionNoRealizada: string): __Observable<string> {
    return this.fccRevisionNoRealizadaDesactivarResponse(fccRevisionNoRealizada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener fccRevisionProgramada por su idfccRevisionProgramada
   * @param idfccRevisionProgramada Identificador de fccRevisionProgramada
   * @return OK
   */
  fccRevisionProgramadaObtenerResponse(idfccRevisionProgramada: string): __Observable<__StrictHttpResponse<FccRevisionProgramada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccRevisionProgramada != null) __params = __params.set('idfccRevisionProgramada', idfccRevisionProgramada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccRevisionProgramada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccRevisionProgramada>;
      })
    );
  }
  /**
   * Obtener fccRevisionProgramada por su idfccRevisionProgramada
   * @param idfccRevisionProgramada Identificador de fccRevisionProgramada
   * @return OK
   */
  fccRevisionProgramadaObtener(idfccRevisionProgramada: string): __Observable<FccRevisionProgramada> {
    return this.fccRevisionProgramadaObtenerResponse(idfccRevisionProgramada).pipe(
      __map(_r => _r.body as FccRevisionProgramada)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccRevisionProgramada Dirección de empresa.
   * @return OK
   */
  fccRevisionProgramadaGuardarOActualizarResponse(fccRevisionProgramada: FccRevisionProgramada): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccRevisionProgramada;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccRevisionProgramada`,
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
   * @param fccRevisionProgramada Dirección de empresa.
   * @return OK
   */
  fccRevisionProgramadaGuardarOActualizar(fccRevisionProgramada: FccRevisionProgramada): __Observable<string> {
    return this.fccRevisionProgramadaGuardarOActualizarResponse(fccRevisionProgramada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccRevisionProgramada
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccRevisionProgramadaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccRevisionProgramada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccRevisionProgramada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccRevisionProgramada>;
      })
    );
  }
  /**
   * Obtener lista de fccRevisionProgramada
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccRevisionProgramadaQueryResult(info: QueryInfo): __Observable<QueryResultFccRevisionProgramada> {
    return this.fccRevisionProgramadaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccRevisionProgramada)
    );
  }

  /**
   * Desactivar un fccRevisionProgramada.
   * @param idfccRevisionProgramada Identificador de elemento a desactivar.
   * @return OK
   */
  fccRevisionProgramadaDesactivarResponse(idfccRevisionProgramada: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccRevisionProgramada != null) __params = __params.set('idfccRevisionProgramada', idfccRevisionProgramada.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccRevisionProgramada`,
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
   * Desactivar un fccRevisionProgramada.
   * @param idfccRevisionProgramada Identificador de elemento a desactivar.
   * @return OK
   */
  fccRevisionProgramadaDesactivar(idfccRevisionProgramada: string): __Observable<string> {
    return this.fccRevisionProgramadaDesactivarResponse(idfccRevisionProgramada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener fccRevisionProgramadaArchivo por su idfccRevisionProgramadaArchivo
   * @param idfccRevisionProgramadaArchivo Identificador de fccRevisionProgramadaArchivo
   * @return OK
   */
  fccRevisionProgramadaArchivoObtenerResponse(idfccRevisionProgramadaArchivo: string): __Observable<__StrictHttpResponse<FccRevisionProgramadaArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccRevisionProgramadaArchivo != null) __params = __params.set('idfccRevisionProgramadaArchivo', idfccRevisionProgramadaArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccRevisionProgramadaArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccRevisionProgramadaArchivo>;
      })
    );
  }
  /**
   * Obtener fccRevisionProgramadaArchivo por su idfccRevisionProgramadaArchivo
   * @param idfccRevisionProgramadaArchivo Identificador de fccRevisionProgramadaArchivo
   * @return OK
   */
  fccRevisionProgramadaArchivoObtener(idfccRevisionProgramadaArchivo: string): __Observable<FccRevisionProgramadaArchivo> {
    return this.fccRevisionProgramadaArchivoObtenerResponse(idfccRevisionProgramadaArchivo).pipe(
      __map(_r => _r.body as FccRevisionProgramadaArchivo)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccRevisionProgramadaArchivo Dirección de empresa.
   * @return OK
   */
  fccRevisionProgramadaArchivoGuardarOActualizarResponse(fccRevisionProgramadaArchivo: FccRevisionProgramadaArchivo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccRevisionProgramadaArchivo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccRevisionProgramadaArchivo`,
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
   * @param fccRevisionProgramadaArchivo Dirección de empresa.
   * @return OK
   */
  fccRevisionProgramadaArchivoGuardarOActualizar(fccRevisionProgramadaArchivo: FccRevisionProgramadaArchivo): __Observable<string> {
    return this.fccRevisionProgramadaArchivoGuardarOActualizarResponse(fccRevisionProgramadaArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccRevisionProgramadaArchivo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccRevisionProgramadaArchivoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccRevisionProgramadaArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccRevisionProgramadaArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccRevisionProgramadaArchivo>;
      })
    );
  }
  /**
   * Obtener lista de fccRevisionProgramadaArchivo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccRevisionProgramadaArchivoQueryResult(info: QueryInfo): __Observable<QueryResultFccRevisionProgramadaArchivo> {
    return this.fccRevisionProgramadaArchivoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccRevisionProgramadaArchivo)
    );
  }

  /**
   * Desactivar un fccRevisionProgramadaArchivo.
   * @param idfccRevisionProgramadaArchivo Identificador de elemento a desactivar.
   * @return OK
   */
  fccRevisionProgramadaArchivoDesactivarResponse(idfccRevisionProgramadaArchivo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccRevisionProgramadaArchivo != null) __params = __params.set('idfccRevisionProgramadaArchivo', idfccRevisionProgramadaArchivo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccRevisionProgramadaArchivo`,
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
   * Desactivar un fccRevisionProgramadaArchivo.
   * @param idfccRevisionProgramadaArchivo Identificador de elemento a desactivar.
   * @return OK
   */
  fccRevisionProgramadaArchivoDesactivar(idfccRevisionProgramadaArchivo: string): __Observable<string> {
    return this.fccRevisionProgramadaArchivoDesactivarResponse(idfccRevisionProgramadaArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CobranzaClientesRevisionService {
}

export { CobranzaClientesRevisionService }
