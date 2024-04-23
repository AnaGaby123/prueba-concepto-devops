/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Direccion } from '../models/direccion';
import { QueryResultDireccion } from '../models/query-result-direccion';
import { QueryInfo } from '../models/query-info';
import { ParametroValidarCodigoPostal } from '../models/parametro-validar-codigo-postal';
import { ResultadoValidarCodigoPostal } from '../models/resultado-validar-codigo-postal';
import { InformacionCodigoPostal } from '../models/informacion-codigo-postal';
import { QueryResultVCatPais } from '../models/query-result-vcat-pais';
import { VDireccion } from '../models/vdireccion';
import { QueryResultVDireccion } from '../models/query-result-vdireccion';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionDireccionesService extends __BaseService {
  static readonly DireccionObtenerPath = '/Direccion';
  static readonly DireccionGuardarOActualizarPath = '/Direccion';
  static readonly DireccionQueryResultPath = '/Direccion';
  static readonly DireccionDesactivarPath = '/Direccion';
  static readonly DireccionExtensionsValidarCodigoPostalPaisPath = '/ValidarCodigoPostalPais';
  static readonly DireccionExtensionsValidarInformacionCodigoPostalPath = '/ValidarInformacionCodigoPostal';
  static readonly vCatPaisQueryResultPath = '/vCatPais';
  static readonly vDireccionObtenerPath = '/vDireccion';
  static readonly vDireccionQueryResultPath = '/vDireccion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener una dirección por su idDireccion.
   * @param idDireccion Identificador de dirección.
   * @return OK
   */
  DireccionObtenerResponse(idDireccion: string): __Observable<__StrictHttpResponse<Direccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDireccion != null) __params = __params.set('idDireccion', idDireccion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Direccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Direccion>;
      })
    );
  }
  /**
   * Obtener una dirección por su idDireccion.
   * @param idDireccion Identificador de dirección.
   * @return OK
   */
  DireccionObtener(idDireccion: string): __Observable<Direccion> {
    return this.DireccionObtenerResponse(idDireccion).pipe(
      __map(_r => _r.body as Direccion)
    );
  }

  /**
   * Guardar o actualizar una dirección.
   * @param direccion Dirección.
   * @return OK
   */
  DireccionGuardarOActualizarResponse(direccion: Direccion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = direccion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Direccion`,
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
   * Guardar o actualizar una dirección.
   * @param direccion Dirección.
   * @return OK
   */
  DireccionGuardarOActualizar(direccion: Direccion): __Observable<string> {
    return this.DireccionGuardarOActualizarResponse(direccion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de dirección.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  DireccionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDireccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Direccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDireccion>;
      })
    );
  }
  /**
   * Obtener lista de dirección.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  DireccionQueryResult(info: QueryInfo): __Observable<QueryResultDireccion> {
    return this.DireccionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDireccion)
    );
  }

  /**
   * Desactivar una dirección.
   * @param idDireccion Identificador de dirección.
   * @return OK
   */
  DireccionDesactivarResponse(idDireccion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = idDireccion;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Direccion`,
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
   * Desactivar una dirección.
   * @param idDireccion Identificador de dirección.
   * @return OK
   */
  DireccionDesactivar(idDireccion: string): __Observable<string> {
    return this.DireccionDesactivarResponse(idDireccion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * ValidarCodigoPostalPais DireccionExtensions
   * @param source undefined
   * @return OK
   */
  DireccionExtensionsValidarCodigoPostalPaisResponse(source: ParametroValidarCodigoPostal): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = source;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ValidarCodigoPostalPais`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * ValidarCodigoPostalPais DireccionExtensions
   * @param source undefined
   * @return OK
   */
  DireccionExtensionsValidarCodigoPostalPais(source: ParametroValidarCodigoPostal): __Observable<boolean> {
    return this.DireccionExtensionsValidarCodigoPostalPaisResponse(source).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * ValidarInformacionCodigoPostal DireccionExtensions
   * @param source undefined
   * @return OK
   */
  DireccionExtensionsValidarInformacionCodigoPostalResponse(source: InformacionCodigoPostal): __Observable<__StrictHttpResponse<ResultadoValidarCodigoPostal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = source;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ValidarInformacionCodigoPostal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResultadoValidarCodigoPostal>;
      })
    );
  }
  /**
   * ValidarInformacionCodigoPostal DireccionExtensions
   * @param source undefined
   * @return OK
   */
  DireccionExtensionsValidarInformacionCodigoPostal(source: InformacionCodigoPostal): __Observable<ResultadoValidarCodigoPostal> {
    return this.DireccionExtensionsValidarInformacionCodigoPostalResponse(source).pipe(
      __map(_r => _r.body as ResultadoValidarCodigoPostal)
    );
  }

  /**
   * QueryResult vCatPais
   * @param info undefined
   * @return OK
   */
  vCatPaisQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCatPais>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCatPais`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCatPais>;
      })
    );
  }
  /**
   * QueryResult vCatPais
   * @param info undefined
   * @return OK
   */
  vCatPaisQueryResult(info: QueryInfo): __Observable<QueryResultVCatPais> {
    return this.vCatPaisQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCatPais)
    );
  }

  /**
   * Obtener vDireccion
   * @param IdDireccion undefined
   * @return OK
   */
  vDireccionObtenerResponse(IdDireccion: string): __Observable<__StrictHttpResponse<VDireccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdDireccion != null) __params = __params.set('IdDireccion', IdDireccion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vDireccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VDireccion>;
      })
    );
  }
  /**
   * Obtener vDireccion
   * @param IdDireccion undefined
   * @return OK
   */
  vDireccionObtener(IdDireccion: string): __Observable<VDireccion> {
    return this.vDireccionObtenerResponse(IdDireccion).pipe(
      __map(_r => _r.body as VDireccion)
    );
  }

  /**
   * QueryResult vDireccion
   * @param info undefined
   * @return OK
   */
  vDireccionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVDireccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vDireccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVDireccion>;
      })
    );
  }
  /**
   * QueryResult vDireccion
   * @param info undefined
   * @return OK
   */
  vDireccionQueryResult(info: QueryInfo): __Observable<QueryResultVDireccion> {
    return this.vDireccionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVDireccion)
    );
  }
}

module ConfiguracionDireccionesService {
}

export { ConfiguracionDireccionesService }
