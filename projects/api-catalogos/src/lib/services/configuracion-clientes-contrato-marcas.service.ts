/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContratoClienteMarca } from '../models/contrato-cliente-marca';
import { QueryResultContratoClienteMarca } from '../models/query-result-contrato-cliente-marca';
import { QueryInfo } from '../models/query-info';
import { QueryResultResultObtenerContratosContemporaneosMismasMarcas } from '../models/query-result-result-obtener-contratos-contemporaneos-mismas-marcas';
import { RequestObtenerContratosContemporaneosMismasMarcas } from '../models/request-obtener-contratos-contemporaneos-mismas-marcas';
import { QueryResultVContratoClienteMarca } from '../models/query-result-vcontrato-cliente-marca';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesContratoMarcasService extends __BaseService {
  static readonly ContratoClienteMarcaObtenerPath = '/ContratoClienteMarca';
  static readonly ContratoClienteMarcaGuardarOActualizarPath = '/ContratoClienteMarca';
  static readonly ContratoClienteMarcaQueryResultPath = '/ContratoClienteMarca';
  static readonly ContratoClienteMarcaDesactivarPath = '/ContratoClienteMarca';
  static readonly ContratoClienteMarcaExtensionsValidarPath = '/ValidarContratoClienteMarca';
  static readonly vContratoClienteMarcaQueryResultPath = '/vContratoClienteMarca';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ContratoClienteMarca
   * @param idContratoClienteMarca Identificador de ContratoClienteMarca
   * @return OK
   */
  ContratoClienteMarcaObtenerResponse(idContratoClienteMarca: string): __Observable<__StrictHttpResponse<ContratoClienteMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarca != null) __params = __params.set('idContratoClienteMarca', idContratoClienteMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteMarca>;
      })
    );
  }
  /**
   * Consultar registro de ContratoClienteMarca
   * @param idContratoClienteMarca Identificador de ContratoClienteMarca
   * @return OK
   */
  ContratoClienteMarcaObtener(idContratoClienteMarca: string): __Observable<ContratoClienteMarca> {
    return this.ContratoClienteMarcaObtenerResponse(idContratoClienteMarca).pipe(
      __map(_r => _r.body as ContratoClienteMarca)
    );
  }

  /**
   * Guardar o actualizar ContratoClienteMarca
   * @param ContratoClienteMarca ContratoClienteMarca
   * @return OK
   */
  ContratoClienteMarcaGuardarOActualizarResponse(ContratoClienteMarca: ContratoClienteMarca): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoClienteMarca;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoClienteMarca`,
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
   * Guardar o actualizar ContratoClienteMarca
   * @param ContratoClienteMarca ContratoClienteMarca
   * @return OK
   */
  ContratoClienteMarcaGuardarOActualizar(ContratoClienteMarca: ContratoClienteMarca): __Observable<string> {
    return this.ContratoClienteMarcaGuardarOActualizarResponse(ContratoClienteMarca).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoClienteMarca
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteMarca>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoClienteMarca
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteMarca> {
    return this.ContratoClienteMarcaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteMarca)
    );
  }

  /**
   * Desactivar registro de ContratoClienteMarca
   * @param idContratoClienteMarca Identificador de registro de ContratoClienteMarca
   * @return OK
   */
  ContratoClienteMarcaDesactivarResponse(idContratoClienteMarca: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarca != null) __params = __params.set('idContratoClienteMarca', idContratoClienteMarca.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ContratoClienteMarca`,
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
   * Desactivar registro de ContratoClienteMarca
   * @param idContratoClienteMarca Identificador de registro de ContratoClienteMarca
   * @return OK
   */
  ContratoClienteMarcaDesactivar(idContratoClienteMarca: string): __Observable<string> {
    return this.ContratoClienteMarcaDesactivarResponse(idContratoClienteMarca).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Validar ContratoClienteMarcaExtensions
   * @param param undefined
   * @return OK
   */
  ContratoClienteMarcaExtensionsValidarResponse(param: RequestObtenerContratosContemporaneosMismasMarcas): __Observable<__StrictHttpResponse<QueryResultResultObtenerContratosContemporaneosMismasMarcas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ValidarContratoClienteMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultResultObtenerContratosContemporaneosMismasMarcas>;
      })
    );
  }
  /**
   * Validar ContratoClienteMarcaExtensions
   * @param param undefined
   * @return OK
   */
  ContratoClienteMarcaExtensionsValidar(param: RequestObtenerContratosContemporaneosMismasMarcas): __Observable<QueryResultResultObtenerContratosContemporaneosMismasMarcas> {
    return this.ContratoClienteMarcaExtensionsValidarResponse(param).pipe(
      __map(_r => _r.body as QueryResultResultObtenerContratosContemporaneosMismasMarcas)
    );
  }

  /**
   * Consultar lista paginada de vContratoClienteMarca
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vContratoClienteMarcaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVContratoClienteMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vContratoClienteMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVContratoClienteMarca>;
      })
    );
  }
  /**
   * Consultar lista paginada de vContratoClienteMarca
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vContratoClienteMarcaQueryResult(info: QueryInfo): __Observable<QueryResultVContratoClienteMarca> {
    return this.vContratoClienteMarcaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVContratoClienteMarca)
    );
  }
}

module ConfiguracionClientesContratoMarcasService {
}

export { ConfiguracionClientesContratoMarcasService }
