/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProductoAlternativoRelacion } from '../models/producto-alternativo-relacion';
import { QueryResultProductoAlternativoRelacion } from '../models/query-result-producto-alternativo-relacion';
import { QueryInfo } from '../models/query-info';
import { ProductoComplementarioRelacion } from '../models/producto-complementario-relacion';
import { QueryResultProductoComplementarioRelacion } from '../models/query-result-producto-complementario-relacion';
import { ProductoSuplementario } from '../models/producto-suplementario';
import { QueryResultProductoSuplementario } from '../models/query-result-producto-suplementario';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosRelacionService extends __BaseService {
  static readonly ProductoAlternativoRelacionObtenerPath = '/ProductoAlternativoRelacion';
  static readonly ProductoAlternativoRelacionGuardarOActualizarPath = '/ProductoAlternativoRelacion';
  static readonly ProductoAlternativoRelacionQueryResultPath = '/ProductoAlternativoRelacion';
  static readonly ProductoAlternativoRelacionDesactivarPath = '/ProductoAlternativoRelacion';
  static readonly ProductoComplementarioRelacionObtenerPath = '/ProductoComplementarioRelacion';
  static readonly ProductoComplementarioRelacionGuardarOActualizarPath = '/ProductoComplementarioRelacion';
  static readonly ProductoComplementarioRelacionQueryResultPath = '/ProductoComplementarioRelacion';
  static readonly ProductoComplementarioRelacionDesactivarPath = '/ProductoComplementarioRelacion';
  static readonly ProductoSuplementarioObtenerPath = '/ProductoSuplementario';
  static readonly ProductoSuplementarioGuardarOActualizarPath = '/ProductoSuplementario';
  static readonly ProductoSuplementarioQueryResultPath = '/ProductoSuplementario';
  static readonly ProductoSuplementarioDesactivarPath = '/ProductoSuplementario';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ProductoAlternativoRelacion
   * @param idProductoAlternativoRelacion Identificador de ProductoAlternativoRelacion
   * @return OK
   */
  ProductoAlternativoRelacionObtenerResponse(idProductoAlternativoRelacion: string): __Observable<__StrictHttpResponse<ProductoAlternativoRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoAlternativoRelacion != null) __params = __params.set('idProductoAlternativoRelacion', idProductoAlternativoRelacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoAlternativoRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoAlternativoRelacion>;
      })
    );
  }
  /**
   * Consultar registro de ProductoAlternativoRelacion
   * @param idProductoAlternativoRelacion Identificador de ProductoAlternativoRelacion
   * @return OK
   */
  ProductoAlternativoRelacionObtener(idProductoAlternativoRelacion: string): __Observable<ProductoAlternativoRelacion> {
    return this.ProductoAlternativoRelacionObtenerResponse(idProductoAlternativoRelacion).pipe(
      __map(_r => _r.body as ProductoAlternativoRelacion)
    );
  }

  /**
   * Guardar o actualizar ProductoAlternativoRelacion
   * @param ProductoAlternativoRelacion ProductoAlternativoRelacion
   * @return OK
   */
  ProductoAlternativoRelacionGuardarOActualizarResponse(ProductoAlternativoRelacion: ProductoAlternativoRelacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoAlternativoRelacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoAlternativoRelacion`,
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
   * Guardar o actualizar ProductoAlternativoRelacion
   * @param ProductoAlternativoRelacion ProductoAlternativoRelacion
   * @return OK
   */
  ProductoAlternativoRelacionGuardarOActualizar(ProductoAlternativoRelacion: ProductoAlternativoRelacion): __Observable<string> {
    return this.ProductoAlternativoRelacionGuardarOActualizarResponse(ProductoAlternativoRelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoAlternativoRelacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoAlternativoRelacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoAlternativoRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoAlternativoRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoAlternativoRelacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoAlternativoRelacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoAlternativoRelacionQueryResult(info: QueryInfo): __Observable<QueryResultProductoAlternativoRelacion> {
    return this.ProductoAlternativoRelacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoAlternativoRelacion)
    );
  }

  /**
   * Desactivar registro de ProductoAlternativoRelacion
   * @param idProductoAlternativoRelacion Identificador de registro de ProductoAlternativoRelacion
   * @return OK
   */
  ProductoAlternativoRelacionDesactivarResponse(idProductoAlternativoRelacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoAlternativoRelacion != null) __params = __params.set('idProductoAlternativoRelacion', idProductoAlternativoRelacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoAlternativoRelacion`,
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
   * Desactivar registro de ProductoAlternativoRelacion
   * @param idProductoAlternativoRelacion Identificador de registro de ProductoAlternativoRelacion
   * @return OK
   */
  ProductoAlternativoRelacionDesactivar(idProductoAlternativoRelacion: string): __Observable<string> {
    return this.ProductoAlternativoRelacionDesactivarResponse(idProductoAlternativoRelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoComplementarioRelacion
   * @param idProductoComplementarioRelacion Identificador de ProductoComplementarioRelacion
   * @return OK
   */
  ProductoComplementarioRelacionObtenerResponse(idProductoComplementarioRelacion: string): __Observable<__StrictHttpResponse<ProductoComplementarioRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoComplementarioRelacion != null) __params = __params.set('idProductoComplementarioRelacion', idProductoComplementarioRelacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoComplementarioRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoComplementarioRelacion>;
      })
    );
  }
  /**
   * Consultar registro de ProductoComplementarioRelacion
   * @param idProductoComplementarioRelacion Identificador de ProductoComplementarioRelacion
   * @return OK
   */
  ProductoComplementarioRelacionObtener(idProductoComplementarioRelacion: string): __Observable<ProductoComplementarioRelacion> {
    return this.ProductoComplementarioRelacionObtenerResponse(idProductoComplementarioRelacion).pipe(
      __map(_r => _r.body as ProductoComplementarioRelacion)
    );
  }

  /**
   * Guardar o actualizar ProductoComplementarioRelacion
   * @param ProductoComplementarioRelacion ProductoComplementarioRelacion
   * @return OK
   */
  ProductoComplementarioRelacionGuardarOActualizarResponse(ProductoComplementarioRelacion: ProductoComplementarioRelacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoComplementarioRelacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoComplementarioRelacion`,
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
   * Guardar o actualizar ProductoComplementarioRelacion
   * @param ProductoComplementarioRelacion ProductoComplementarioRelacion
   * @return OK
   */
  ProductoComplementarioRelacionGuardarOActualizar(ProductoComplementarioRelacion: ProductoComplementarioRelacion): __Observable<string> {
    return this.ProductoComplementarioRelacionGuardarOActualizarResponse(ProductoComplementarioRelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoComplementarioRelacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoComplementarioRelacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoComplementarioRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoComplementarioRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoComplementarioRelacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoComplementarioRelacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoComplementarioRelacionQueryResult(info: QueryInfo): __Observable<QueryResultProductoComplementarioRelacion> {
    return this.ProductoComplementarioRelacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoComplementarioRelacion)
    );
  }

  /**
   * Desactivar registro de ProductoComplementarioRelacion
   * @param idProductoComplementarioRelacion Identificador de registro de ProductoComplementarioRelacion
   * @return OK
   */
  ProductoComplementarioRelacionDesactivarResponse(idProductoComplementarioRelacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoComplementarioRelacion != null) __params = __params.set('idProductoComplementarioRelacion', idProductoComplementarioRelacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoComplementarioRelacion`,
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
   * Desactivar registro de ProductoComplementarioRelacion
   * @param idProductoComplementarioRelacion Identificador de registro de ProductoComplementarioRelacion
   * @return OK
   */
  ProductoComplementarioRelacionDesactivar(idProductoComplementarioRelacion: string): __Observable<string> {
    return this.ProductoComplementarioRelacionDesactivarResponse(idProductoComplementarioRelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoSuplementario
   * @param idProductoSuplementario Identificador de ProductoSuplementario
   * @return OK
   */
  ProductoSuplementarioObtenerResponse(idProductoSuplementario: string): __Observable<__StrictHttpResponse<ProductoSuplementario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoSuplementario != null) __params = __params.set('idProductoSuplementario', idProductoSuplementario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoSuplementario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoSuplementario>;
      })
    );
  }
  /**
   * Consultar registro de ProductoSuplementario
   * @param idProductoSuplementario Identificador de ProductoSuplementario
   * @return OK
   */
  ProductoSuplementarioObtener(idProductoSuplementario: string): __Observable<ProductoSuplementario> {
    return this.ProductoSuplementarioObtenerResponse(idProductoSuplementario).pipe(
      __map(_r => _r.body as ProductoSuplementario)
    );
  }

  /**
   * Guardar o actualizar ProductoSuplementario
   * @param ProductoSuplementario ProductoSuplementario
   * @return OK
   */
  ProductoSuplementarioGuardarOActualizarResponse(ProductoSuplementario: ProductoSuplementario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoSuplementario;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoSuplementario`,
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
   * Guardar o actualizar ProductoSuplementario
   * @param ProductoSuplementario ProductoSuplementario
   * @return OK
   */
  ProductoSuplementarioGuardarOActualizar(ProductoSuplementario: ProductoSuplementario): __Observable<string> {
    return this.ProductoSuplementarioGuardarOActualizarResponse(ProductoSuplementario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoSuplementario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoSuplementarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoSuplementario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoSuplementario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoSuplementario>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoSuplementario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoSuplementarioQueryResult(info: QueryInfo): __Observable<QueryResultProductoSuplementario> {
    return this.ProductoSuplementarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoSuplementario)
    );
  }

  /**
   * Desactivar registro de ProductoSuplementario
   * @param idProductoSuplementario Identificador de registro de ProductoSuplementario
   * @return OK
   */
  ProductoSuplementarioDesactivarResponse(idProductoSuplementario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoSuplementario != null) __params = __params.set('idProductoSuplementario', idProductoSuplementario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoSuplementario`,
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
   * Desactivar registro de ProductoSuplementario
   * @param idProductoSuplementario Identificador de registro de ProductoSuplementario
   * @return OK
   */
  ProductoSuplementarioDesactivar(idProductoSuplementario: string): __Observable<string> {
    return this.ProductoSuplementarioDesactivarResponse(idProductoSuplementario).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionProductosRelacionService {
}

export { ConfiguracionProductosRelacionService }
