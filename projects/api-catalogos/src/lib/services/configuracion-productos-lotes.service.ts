/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Lote } from '../models/lote';
import { QueryResultLote } from '../models/query-result-lote';
import { QueryInfo } from '../models/query-info';
import { LoteArchivoCertificado } from '../models/lote-archivo-certificado';
import { QueryResultLoteArchivoCertificado } from '../models/query-result-lote-archivo-certificado';
import { QueryResultVLote } from '../models/query-result-vlote';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosLotesService extends __BaseService {
  static readonly LoteObtenerPath = '/Lote';
  static readonly LoteGuardarOActualizarPath = '/Lote';
  static readonly LoteQueryResultPath = '/Lote';
  static readonly LoteDesactivarPath = '/Lote';
  static readonly LoteArchivoCertificadoObtenerPath = '/LoteArchivoCertificado';
  static readonly LoteArchivoCertificadoGuardarOActualizarPath = '/LoteArchivoCertificado';
  static readonly LoteArchivoCertificadoQueryResultPath = '/LoteArchivoCertificado';
  static readonly LoteArchivoCertificadoDesactivarPath = '/LoteArchivoCertificado';
  static readonly vLoteQueryResultPath = '/vLote';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de Lote
   * @param idLote Identificador de Lote
   * @return OK
   */
  LoteObtenerResponse(idLote: string): __Observable<__StrictHttpResponse<Lote>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idLote != null) __params = __params.set('idLote', idLote.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Lote`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Lote>;
      })
    );
  }
  /**
   * Consultar registro de Lote
   * @param idLote Identificador de Lote
   * @return OK
   */
  LoteObtener(idLote: string): __Observable<Lote> {
    return this.LoteObtenerResponse(idLote).pipe(
      __map(_r => _r.body as Lote)
    );
  }

  /**
   * Guardar o actualizar Lote
   * @param Lote Lote
   * @return OK
   */
  LoteGuardarOActualizarResponse(Lote: Lote): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Lote;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Lote`,
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
   * Guardar o actualizar Lote
   * @param Lote Lote
   * @return OK
   */
  LoteGuardarOActualizar(Lote: Lote): __Observable<string> {
    return this.LoteGuardarOActualizarResponse(Lote).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Lote
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  LoteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultLote>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Lote`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultLote>;
      })
    );
  }
  /**
   * Consultar lista paginada de Lote
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  LoteQueryResult(info: QueryInfo): __Observable<QueryResultLote> {
    return this.LoteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultLote)
    );
  }

  /**
   * Desactivar registro de Lote
   * @param idLote Identificador de registro de Lote
   * @return OK
   */
  LoteDesactivarResponse(idLote: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idLote != null) __params = __params.set('idLote', idLote.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Lote`,
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
   * Desactivar registro de Lote
   * @param idLote Identificador de registro de Lote
   * @return OK
   */
  LoteDesactivar(idLote: string): __Observable<string> {
    return this.LoteDesactivarResponse(idLote).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de LoteArchivoCertificado
   * @param idLoteArchivoCertificado Identificador de LoteArchivoCertificado
   * @return OK
   */
  LoteArchivoCertificadoObtenerResponse(idLoteArchivoCertificado: string): __Observable<__StrictHttpResponse<LoteArchivoCertificado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idLoteArchivoCertificado != null) __params = __params.set('idLoteArchivoCertificado', idLoteArchivoCertificado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/LoteArchivoCertificado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LoteArchivoCertificado>;
      })
    );
  }
  /**
   * Consultar registro de LoteArchivoCertificado
   * @param idLoteArchivoCertificado Identificador de LoteArchivoCertificado
   * @return OK
   */
  LoteArchivoCertificadoObtener(idLoteArchivoCertificado: string): __Observable<LoteArchivoCertificado> {
    return this.LoteArchivoCertificadoObtenerResponse(idLoteArchivoCertificado).pipe(
      __map(_r => _r.body as LoteArchivoCertificado)
    );
  }

  /**
   * Guardar o actualizar LoteArchivoCertificado
   * @param LoteArchivoCertificado LoteArchivoCertificado
   * @return OK
   */
  LoteArchivoCertificadoGuardarOActualizarResponse(LoteArchivoCertificado: LoteArchivoCertificado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = LoteArchivoCertificado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/LoteArchivoCertificado`,
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
   * Guardar o actualizar LoteArchivoCertificado
   * @param LoteArchivoCertificado LoteArchivoCertificado
   * @return OK
   */
  LoteArchivoCertificadoGuardarOActualizar(LoteArchivoCertificado: LoteArchivoCertificado): __Observable<string> {
    return this.LoteArchivoCertificadoGuardarOActualizarResponse(LoteArchivoCertificado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de LoteArchivoCertificado
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  LoteArchivoCertificadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultLoteArchivoCertificado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/LoteArchivoCertificado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultLoteArchivoCertificado>;
      })
    );
  }
  /**
   * Consultar lista paginada de LoteArchivoCertificado
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  LoteArchivoCertificadoQueryResult(info: QueryInfo): __Observable<QueryResultLoteArchivoCertificado> {
    return this.LoteArchivoCertificadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultLoteArchivoCertificado)
    );
  }

  /**
   * Desactivar registro de LoteArchivoCertificado
   * @param idLoteArchivoCertificado Identificador de registro de LoteArchivoCertificado
   * @return OK
   */
  LoteArchivoCertificadoDesactivarResponse(idLoteArchivoCertificado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idLoteArchivoCertificado != null) __params = __params.set('idLoteArchivoCertificado', idLoteArchivoCertificado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/LoteArchivoCertificado`,
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
   * Desactivar registro de LoteArchivoCertificado
   * @param idLoteArchivoCertificado Identificador de registro de LoteArchivoCertificado
   * @return OK
   */
  LoteArchivoCertificadoDesactivar(idLoteArchivoCertificado: string): __Observable<string> {
    return this.LoteArchivoCertificadoDesactivarResponse(idLoteArchivoCertificado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de vLote
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vLoteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVLote>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vLote`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVLote>;
      })
    );
  }
  /**
   * Consultar lista paginada de vLote
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vLoteQueryResult(info: QueryInfo): __Observable<QueryResultVLote> {
    return this.vLoteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVLote)
    );
  }
}

module ConfiguracionProductosLotesService {
}

export { ConfiguracionProductosLotesService }
