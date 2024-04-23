/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProductoCapacitacion } from '../models/producto-capacitacion';
import { QueryResultProductoCapacitacion } from '../models/query-result-producto-capacitacion';
import { QueryInfo } from '../models/query-info';
import { ProductoDispositivoMedico } from '../models/producto-dispositivo-medico';
import { QueryResultProductoDispositivoMedico } from '../models/query-result-producto-dispositivo-medico';
import { ProductoEstandar } from '../models/producto-estandar';
import { QueryResultProductoEstandar } from '../models/query-result-producto-estandar';
import { ProductoLabware } from '../models/producto-labware';
import { QueryResultProductoLabware } from '../models/query-result-producto-labware';
import { ProductoPublicacion } from '../models/producto-publicacion';
import { QueryResultProductoPublicacion } from '../models/query-result-producto-publicacion';
import { ProductoReactivo } from '../models/producto-reactivo';
import { QueryResultProductoReactivo } from '../models/query-result-producto-reactivo';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosTipoEspecificadoService extends __BaseService {
  static readonly ProductoCapacitacionObtenerPath = '/ProductoCapacitacion';
  static readonly ProductoCapacitacionGuardarOActualizarPath = '/ProductoCapacitacion';
  static readonly ProductoCapacitacionQueryResultPath = '/ProductoCapacitacion';
  static readonly ProductoCapacitacionDesactivarPath = '/ProductoCapacitacion';
  static readonly ProductoDispositivoMedicoObtenerPath = '/ProductoDispositivoMedico';
  static readonly ProductoDispositivoMedicoGuardarOActualizarPath = '/ProductoDispositivoMedico';
  static readonly ProductoDispositivoMedicoQueryResultPath = '/ProductoDispositivoMedico';
  static readonly ProductoDispositivoMedicoDesactivarPath = '/ProductoDispositivoMedico';
  static readonly ProductoEstandarObtenerPath = '/ProductoEstandar';
  static readonly ProductoEstandarGuardarOActualizarPath = '/ProductoEstandar';
  static readonly ProductoEstandarQueryResultPath = '/ProductoEstandar';
  static readonly ProductoEstandarDesactivarPath = '/ProductoEstandar';
  static readonly ProductoLabwareObtenerPath = '/ProductoLabware';
  static readonly ProductoLabwareGuardarOActualizarPath = '/ProductoLabware';
  static readonly ProductoLabwareQueryResultPath = '/ProductoLabware';
  static readonly ProductoLabwareDesactivarPath = '/ProductoLabware';
  static readonly ProductoPublicacionObtenerPath = '/ProductoPublicacion';
  static readonly ProductoPublicacionGuardarOActualizarPath = '/ProductoPublicacion';
  static readonly ProductoPublicacionQueryResultPath = '/ProductoPublicacion';
  static readonly ProductoPublicacionDesactivarPath = '/ProductoPublicacion';
  static readonly ProductoReactivoObtenerPath = '/ProductoReactivo';
  static readonly ProductoReactivoGuardarOActualizarPath = '/ProductoReactivo';
  static readonly ProductoReactivoQueryResultPath = '/ProductoReactivo';
  static readonly ProductoReactivoDesactivarPath = '/ProductoReactivo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ProductoCapacitacion
   * @param idProductoCapacitacion Identificador de ProductoCapacitacion
   * @return OK
   */
  ProductoCapacitacionObtenerResponse(idProductoCapacitacion: string): __Observable<__StrictHttpResponse<ProductoCapacitacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoCapacitacion != null) __params = __params.set('idProductoCapacitacion', idProductoCapacitacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoCapacitacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoCapacitacion>;
      })
    );
  }
  /**
   * Consultar registro de ProductoCapacitacion
   * @param idProductoCapacitacion Identificador de ProductoCapacitacion
   * @return OK
   */
  ProductoCapacitacionObtener(idProductoCapacitacion: string): __Observable<ProductoCapacitacion> {
    return this.ProductoCapacitacionObtenerResponse(idProductoCapacitacion).pipe(
      __map(_r => _r.body as ProductoCapacitacion)
    );
  }

  /**
   * Guardar o actualizar ProductoCapacitacion
   * @param ProductoCapacitacion ProductoCapacitacion
   * @return OK
   */
  ProductoCapacitacionGuardarOActualizarResponse(ProductoCapacitacion: ProductoCapacitacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoCapacitacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoCapacitacion`,
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
   * Guardar o actualizar ProductoCapacitacion
   * @param ProductoCapacitacion ProductoCapacitacion
   * @return OK
   */
  ProductoCapacitacionGuardarOActualizar(ProductoCapacitacion: ProductoCapacitacion): __Observable<string> {
    return this.ProductoCapacitacionGuardarOActualizarResponse(ProductoCapacitacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoCapacitacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoCapacitacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoCapacitacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoCapacitacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoCapacitacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoCapacitacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoCapacitacionQueryResult(info: QueryInfo): __Observable<QueryResultProductoCapacitacion> {
    return this.ProductoCapacitacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoCapacitacion)
    );
  }

  /**
   * Elimina ProductoCapacitacion
   * @param idProductoCapacitacion Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoCapacitacionDesactivarResponse(idProductoCapacitacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoCapacitacion != null) __params = __params.set('idProductoCapacitacion', idProductoCapacitacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoCapacitacion`,
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
   * Elimina ProductoCapacitacion
   * @param idProductoCapacitacion Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoCapacitacionDesactivar(idProductoCapacitacion: string): __Observable<string> {
    return this.ProductoCapacitacionDesactivarResponse(idProductoCapacitacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoDispositivoMedico
   * @param idProductoDispositivoMedico Identificador de ProductoDispositivoMedico
   * @return OK
   */
  ProductoDispositivoMedicoObtenerResponse(idProductoDispositivoMedico: string): __Observable<__StrictHttpResponse<ProductoDispositivoMedico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoDispositivoMedico != null) __params = __params.set('idProductoDispositivoMedico', idProductoDispositivoMedico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoDispositivoMedico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoDispositivoMedico>;
      })
    );
  }
  /**
   * Consultar registro de ProductoDispositivoMedico
   * @param idProductoDispositivoMedico Identificador de ProductoDispositivoMedico
   * @return OK
   */
  ProductoDispositivoMedicoObtener(idProductoDispositivoMedico: string): __Observable<ProductoDispositivoMedico> {
    return this.ProductoDispositivoMedicoObtenerResponse(idProductoDispositivoMedico).pipe(
      __map(_r => _r.body as ProductoDispositivoMedico)
    );
  }

  /**
   * Guardar o actualizar ProductoDispositivoMedico
   * @param ProductoDispositivoMedico ProductoDispositivoMedico
   * @return OK
   */
  ProductoDispositivoMedicoGuardarOActualizarResponse(ProductoDispositivoMedico: ProductoDispositivoMedico): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoDispositivoMedico;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoDispositivoMedico`,
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
   * Guardar o actualizar ProductoDispositivoMedico
   * @param ProductoDispositivoMedico ProductoDispositivoMedico
   * @return OK
   */
  ProductoDispositivoMedicoGuardarOActualizar(ProductoDispositivoMedico: ProductoDispositivoMedico): __Observable<string> {
    return this.ProductoDispositivoMedicoGuardarOActualizarResponse(ProductoDispositivoMedico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoDispositivoMedico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoDispositivoMedicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoDispositivoMedico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoDispositivoMedico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoDispositivoMedico>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoDispositivoMedico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoDispositivoMedicoQueryResult(info: QueryInfo): __Observable<QueryResultProductoDispositivoMedico> {
    return this.ProductoDispositivoMedicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoDispositivoMedico)
    );
  }

  /**
   * Elimina ProductoDispositivoMedico
   * @param idProductoDispositivoMedico Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoDispositivoMedicoDesactivarResponse(idProductoDispositivoMedico: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoDispositivoMedico != null) __params = __params.set('idProductoDispositivoMedico', idProductoDispositivoMedico.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoDispositivoMedico`,
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
   * Elimina ProductoDispositivoMedico
   * @param idProductoDispositivoMedico Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoDispositivoMedicoDesactivar(idProductoDispositivoMedico: string): __Observable<string> {
    return this.ProductoDispositivoMedicoDesactivarResponse(idProductoDispositivoMedico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoEstandar
   * @param idProductoEstandar Identificador de ProductoEstandar
   * @return OK
   */
  ProductoEstandarObtenerResponse(idProductoEstandar: string): __Observable<__StrictHttpResponse<ProductoEstandar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoEstandar != null) __params = __params.set('idProductoEstandar', idProductoEstandar.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoEstandar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoEstandar>;
      })
    );
  }
  /**
   * Consultar registro de ProductoEstandar
   * @param idProductoEstandar Identificador de ProductoEstandar
   * @return OK
   */
  ProductoEstandarObtener(idProductoEstandar: string): __Observable<ProductoEstandar> {
    return this.ProductoEstandarObtenerResponse(idProductoEstandar).pipe(
      __map(_r => _r.body as ProductoEstandar)
    );
  }

  /**
   * Guardar o actualizar ProductoEstandar
   * @param ProductoEstandar ProductoEstandar
   * @return OK
   */
  ProductoEstandarGuardarOActualizarResponse(ProductoEstandar: ProductoEstandar): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoEstandar;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoEstandar`,
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
   * Guardar o actualizar ProductoEstandar
   * @param ProductoEstandar ProductoEstandar
   * @return OK
   */
  ProductoEstandarGuardarOActualizar(ProductoEstandar: ProductoEstandar): __Observable<string> {
    return this.ProductoEstandarGuardarOActualizarResponse(ProductoEstandar).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoEstandar
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoEstandarQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoEstandar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoEstandar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoEstandar>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoEstandar
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoEstandarQueryResult(info: QueryInfo): __Observable<QueryResultProductoEstandar> {
    return this.ProductoEstandarQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoEstandar)
    );
  }

  /**
   * Elimina ProductoEstandar
   * @param idProductoEstandar Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoEstandarDesactivarResponse(idProductoEstandar: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoEstandar != null) __params = __params.set('idProductoEstandar', idProductoEstandar.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoEstandar`,
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
   * Elimina ProductoEstandar
   * @param idProductoEstandar Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoEstandarDesactivar(idProductoEstandar: string): __Observable<string> {
    return this.ProductoEstandarDesactivarResponse(idProductoEstandar).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoLabware
   * @param idProductoLabware Identificador de ProductoLabware
   * @return OK
   */
  ProductoLabwareObtenerResponse(idProductoLabware: string): __Observable<__StrictHttpResponse<ProductoLabware>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoLabware != null) __params = __params.set('idProductoLabware', idProductoLabware.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoLabware`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoLabware>;
      })
    );
  }
  /**
   * Consultar registro de ProductoLabware
   * @param idProductoLabware Identificador de ProductoLabware
   * @return OK
   */
  ProductoLabwareObtener(idProductoLabware: string): __Observable<ProductoLabware> {
    return this.ProductoLabwareObtenerResponse(idProductoLabware).pipe(
      __map(_r => _r.body as ProductoLabware)
    );
  }

  /**
   * Guardar o actualizar ProductoLabware
   * @param ProductoLabware ProductoLabware
   * @return OK
   */
  ProductoLabwareGuardarOActualizarResponse(ProductoLabware: ProductoLabware): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoLabware;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoLabware`,
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
   * Guardar o actualizar ProductoLabware
   * @param ProductoLabware ProductoLabware
   * @return OK
   */
  ProductoLabwareGuardarOActualizar(ProductoLabware: ProductoLabware): __Observable<string> {
    return this.ProductoLabwareGuardarOActualizarResponse(ProductoLabware).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoLabware
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoLabwareQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoLabware>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoLabware`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoLabware>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoLabware
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoLabwareQueryResult(info: QueryInfo): __Observable<QueryResultProductoLabware> {
    return this.ProductoLabwareQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoLabware)
    );
  }

  /**
   * Elimina ProductoLabware
   * @param idProductoLabware Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoLabwareDesactivarResponse(idProductoLabware: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoLabware != null) __params = __params.set('idProductoLabware', idProductoLabware.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoLabware`,
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
   * Elimina ProductoLabware
   * @param idProductoLabware Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoLabwareDesactivar(idProductoLabware: string): __Observable<string> {
    return this.ProductoLabwareDesactivarResponse(idProductoLabware).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoPublicacion
   * @param idProductoPublicacion Identificador de ProductoPublicacion
   * @return OK
   */
  ProductoPublicacionObtenerResponse(idProductoPublicacion: string): __Observable<__StrictHttpResponse<ProductoPublicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoPublicacion != null) __params = __params.set('idProductoPublicacion', idProductoPublicacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoPublicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoPublicacion>;
      })
    );
  }
  /**
   * Consultar registro de ProductoPublicacion
   * @param idProductoPublicacion Identificador de ProductoPublicacion
   * @return OK
   */
  ProductoPublicacionObtener(idProductoPublicacion: string): __Observable<ProductoPublicacion> {
    return this.ProductoPublicacionObtenerResponse(idProductoPublicacion).pipe(
      __map(_r => _r.body as ProductoPublicacion)
    );
  }

  /**
   * Guardar o actualizar ProductoPublicacion
   * @param ProductoPublicacion ProductoPublicacion
   * @return OK
   */
  ProductoPublicacionGuardarOActualizarResponse(ProductoPublicacion: ProductoPublicacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoPublicacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoPublicacion`,
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
   * Guardar o actualizar ProductoPublicacion
   * @param ProductoPublicacion ProductoPublicacion
   * @return OK
   */
  ProductoPublicacionGuardarOActualizar(ProductoPublicacion: ProductoPublicacion): __Observable<string> {
    return this.ProductoPublicacionGuardarOActualizarResponse(ProductoPublicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoPublicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoPublicacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoPublicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoPublicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoPublicacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoPublicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoPublicacionQueryResult(info: QueryInfo): __Observable<QueryResultProductoPublicacion> {
    return this.ProductoPublicacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoPublicacion)
    );
  }

  /**
   * Elimina ProductoPublicacion
   * @param idProductoPublicacion Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoPublicacionDesactivarResponse(idProductoPublicacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoPublicacion != null) __params = __params.set('idProductoPublicacion', idProductoPublicacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoPublicacion`,
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
   * Elimina ProductoPublicacion
   * @param idProductoPublicacion Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoPublicacionDesactivar(idProductoPublicacion: string): __Observable<string> {
    return this.ProductoPublicacionDesactivarResponse(idProductoPublicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProductoReactivo
   * @param idProductoReactivo Identificador de ProductoReactivo
   * @return OK
   */
  ProductoReactivoObtenerResponse(idProductoReactivo: string): __Observable<__StrictHttpResponse<ProductoReactivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProductoReactivo != null) __params = __params.set('idProductoReactivo', idProductoReactivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoReactivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoReactivo>;
      })
    );
  }
  /**
   * Consultar registro de ProductoReactivo
   * @param idProductoReactivo Identificador de ProductoReactivo
   * @return OK
   */
  ProductoReactivoObtener(idProductoReactivo: string): __Observable<ProductoReactivo> {
    return this.ProductoReactivoObtenerResponse(idProductoReactivo).pipe(
      __map(_r => _r.body as ProductoReactivo)
    );
  }

  /**
   * Guardar o actualizar ProductoReactivo
   * @param ProductoReactivo ProductoReactivo
   * @return OK
   */
  ProductoReactivoGuardarOActualizarResponse(ProductoReactivo: ProductoReactivo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductoReactivo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProductoReactivo`,
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
   * Guardar o actualizar ProductoReactivo
   * @param ProductoReactivo ProductoReactivo
   * @return OK
   */
  ProductoReactivoGuardarOActualizar(ProductoReactivo: ProductoReactivo): __Observable<string> {
    return this.ProductoReactivoGuardarOActualizarResponse(ProductoReactivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProductoReactivo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoReactivoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoReactivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoReactivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoReactivo>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProductoReactivo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoReactivoQueryResult(info: QueryInfo): __Observable<QueryResultProductoReactivo> {
    return this.ProductoReactivoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoReactivo)
    );
  }

  /**
   * Elimina ProductoReactivo
   * @param IdProductoReactivo Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoReactivoDesactivarResponse(IdProductoReactivo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdProductoReactivo != null) __params = __params.set('IdProductoReactivo', IdProductoReactivo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProductoReactivo`,
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
   * Elimina ProductoReactivo
   * @param IdProductoReactivo Objeto Guid de elemento a eliminar
   * @return OK
   */
  ProductoReactivoDesactivar(IdProductoReactivo: string): __Observable<string> {
    return this.ProductoReactivoDesactivarResponse(IdProductoReactivo).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionProductosTipoEspecificadoService {
}

export { ConfiguracionProductosTipoEspecificadoService }
