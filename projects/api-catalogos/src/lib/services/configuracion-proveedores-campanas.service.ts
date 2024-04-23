/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Campana } from '../models/campana';
import { QueryResultCampana } from '../models/query-result-campana';
import { QueryInfo } from '../models/query-info';
import { CampanaCatClasificacionProducto } from '../models/campana-cat-clasificacion-producto';
import { QueryResultCampanaCatClasificacionProducto } from '../models/query-result-campana-cat-clasificacion-producto';
import { CampanaMarca } from '../models/campana-marca';
import { QueryResultCampanaMarca } from '../models/query-result-campana-marca';
import { CampanaProducto } from '../models/campana-producto';
import { QueryResultCampanaProducto } from '../models/query-result-campana-producto';
import { CampanaProveedorFamilia } from '../models/campana-proveedor-familia';
import { QueryResultCampanaProveedorFamilia } from '../models/query-result-campana-proveedor-familia';
import { QueryResultVCampana } from '../models/query-result-vcampana';
import { QueryResultVCampanaProducto } from '../models/query-result-vcampana-producto';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProveedoresCampanasService extends __BaseService {
  static readonly CampanaObtenerPath = '/Campana';
  static readonly CampanaGuardarOActualizarPath = '/Campana';
  static readonly CampanaQueryResultPath = '/Campana';
  static readonly CampanaDesactivarPath = '/Campana';
  static readonly CampanaCatClasificacionProductoObtenerPath = '/CampanaCatClasificacionProducto';
  static readonly CampanaCatClasificacionProductoGuardarOActualizarPath = '/CampanaCatClasificacionProducto';
  static readonly CampanaCatClasificacionProductoQueryResultPath = '/CampanaCatClasificacionProducto';
  static readonly CampanaCatClasificacionProductoDesactivarPath = '/CampanaCatClasificacionProducto';
  static readonly CampanaMarcaObtenerPath = '/CampanaMarca';
  static readonly CampanaMarcaGuardarOActualizarPath = '/CampanaMarca';
  static readonly CampanaMarcaQueryResultPath = '/CampanaMarca';
  static readonly CampanaMarcaDesactivarPath = '/CampanaMarca';
  static readonly CampanaProductoObtenerPath = '/CampanaProducto';
  static readonly CampanaProductoGuardarOActualizarPath = '/CampanaProducto';
  static readonly CampanaProductoQueryResultPath = '/CampanaProducto';
  static readonly CampanaProductoDesactivarPath = '/CampanaProducto';
  static readonly CampanaProveedorFamiliaObtenerPath = '/CampanaProveedorFamilia';
  static readonly CampanaProveedorFamiliaGuardarOActualizarPath = '/CampanaProveedorFamilia';
  static readonly CampanaProveedorFamiliaQueryResultPath = '/CampanaProveedorFamilia';
  static readonly CampanaProveedorFamiliaDesactivarPath = '/CampanaProveedorFamilia';
  static readonly vCampanaQueryResultPath = '/vCampana';
  static readonly vCampanaProductoQueryResultPath = '/vCampanaProducto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de Campana
   * @param idCampana Identificador de Campana
   * @return OK
   */
  CampanaObtenerResponse(idCampana: string): __Observable<__StrictHttpResponse<Campana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampana != null) __params = __params.set('idCampana', idCampana.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Campana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Campana>;
      })
    );
  }
  /**
   * Consultar registro de Campana
   * @param idCampana Identificador de Campana
   * @return OK
   */
  CampanaObtener(idCampana: string): __Observable<Campana> {
    return this.CampanaObtenerResponse(idCampana).pipe(
      __map(_r => _r.body as Campana)
    );
  }

  /**
   * Guardar o actualizar Campana
   * @param Campana Campana
   * @return OK
   */
  CampanaGuardarOActualizarResponse(Campana: Campana): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Campana;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Campana`,
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
   * Guardar o actualizar Campana
   * @param Campana Campana
   * @return OK
   */
  CampanaGuardarOActualizar(Campana: Campana): __Observable<string> {
    return this.CampanaGuardarOActualizarResponse(Campana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Campana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCampana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Campana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCampana>;
      })
    );
  }
  /**
   * Consultar lista paginada de Campana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaQueryResult(info: QueryInfo): __Observable<QueryResultCampana> {
    return this.CampanaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCampana)
    );
  }

  /**
   * Desactivar registro de Campana
   * @param idCampana Identificador de registro de Campana
   * @return OK
   */
  CampanaDesactivarResponse(idCampana: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampana != null) __params = __params.set('idCampana', idCampana.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Campana`,
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
   * Desactivar registro de Campana
   * @param idCampana Identificador de registro de Campana
   * @return OK
   */
  CampanaDesactivar(idCampana: string): __Observable<string> {
    return this.CampanaDesactivarResponse(idCampana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CampanaCatClasificacionProducto
   * @param idCampanaCatClasificacionProducto Identificador de CampanaCatClasificacionProducto
   * @return OK
   */
  CampanaCatClasificacionProductoObtenerResponse(idCampanaCatClasificacionProducto: string): __Observable<__StrictHttpResponse<CampanaCatClasificacionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaCatClasificacionProducto != null) __params = __params.set('idCampanaCatClasificacionProducto', idCampanaCatClasificacionProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CampanaCatClasificacionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CampanaCatClasificacionProducto>;
      })
    );
  }
  /**
   * Consultar registro de CampanaCatClasificacionProducto
   * @param idCampanaCatClasificacionProducto Identificador de CampanaCatClasificacionProducto
   * @return OK
   */
  CampanaCatClasificacionProductoObtener(idCampanaCatClasificacionProducto: string): __Observable<CampanaCatClasificacionProducto> {
    return this.CampanaCatClasificacionProductoObtenerResponse(idCampanaCatClasificacionProducto).pipe(
      __map(_r => _r.body as CampanaCatClasificacionProducto)
    );
  }

  /**
   * Guardar o actualizar CampanaCatClasificacionProducto
   * @param CampanaCatClasificacionProducto CampanaCatClasificacionProducto
   * @return OK
   */
  CampanaCatClasificacionProductoGuardarOActualizarResponse(CampanaCatClasificacionProducto: CampanaCatClasificacionProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CampanaCatClasificacionProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CampanaCatClasificacionProducto`,
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
   * Guardar o actualizar CampanaCatClasificacionProducto
   * @param CampanaCatClasificacionProducto CampanaCatClasificacionProducto
   * @return OK
   */
  CampanaCatClasificacionProductoGuardarOActualizar(CampanaCatClasificacionProducto: CampanaCatClasificacionProducto): __Observable<string> {
    return this.CampanaCatClasificacionProductoGuardarOActualizarResponse(CampanaCatClasificacionProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CampanaCatClasificacionProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaCatClasificacionProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCampanaCatClasificacionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CampanaCatClasificacionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCampanaCatClasificacionProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de CampanaCatClasificacionProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaCatClasificacionProductoQueryResult(info: QueryInfo): __Observable<QueryResultCampanaCatClasificacionProducto> {
    return this.CampanaCatClasificacionProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCampanaCatClasificacionProducto)
    );
  }

  /**
   * Desactivar registro de CampanaCatClasificacionProducto
   * @param idCampanaCatClasificacionProducto Identificador de registro de CampanaCatClasificacionProducto
   * @return OK
   */
  CampanaCatClasificacionProductoDesactivarResponse(idCampanaCatClasificacionProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaCatClasificacionProducto != null) __params = __params.set('idCampanaCatClasificacionProducto', idCampanaCatClasificacionProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CampanaCatClasificacionProducto`,
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
   * Desactivar registro de CampanaCatClasificacionProducto
   * @param idCampanaCatClasificacionProducto Identificador de registro de CampanaCatClasificacionProducto
   * @return OK
   */
  CampanaCatClasificacionProductoDesactivar(idCampanaCatClasificacionProducto: string): __Observable<string> {
    return this.CampanaCatClasificacionProductoDesactivarResponse(idCampanaCatClasificacionProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CampanaMarca
   * @param idCampanaMarca Identificador de CampanaMarca
   * @return OK
   */
  CampanaMarcaObtenerResponse(idCampanaMarca: string): __Observable<__StrictHttpResponse<CampanaMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaMarca != null) __params = __params.set('idCampanaMarca', idCampanaMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CampanaMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CampanaMarca>;
      })
    );
  }
  /**
   * Consultar registro de CampanaMarca
   * @param idCampanaMarca Identificador de CampanaMarca
   * @return OK
   */
  CampanaMarcaObtener(idCampanaMarca: string): __Observable<CampanaMarca> {
    return this.CampanaMarcaObtenerResponse(idCampanaMarca).pipe(
      __map(_r => _r.body as CampanaMarca)
    );
  }

  /**
   * Guardar o actualizar CampanaMarca
   * @param CampanaMarca CampanaMarca
   * @return OK
   */
  CampanaMarcaGuardarOActualizarResponse(CampanaMarca: CampanaMarca): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CampanaMarca;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CampanaMarca`,
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
   * Guardar o actualizar CampanaMarca
   * @param CampanaMarca CampanaMarca
   * @return OK
   */
  CampanaMarcaGuardarOActualizar(CampanaMarca: CampanaMarca): __Observable<string> {
    return this.CampanaMarcaGuardarOActualizarResponse(CampanaMarca).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CampanaMarca
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaMarcaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCampanaMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CampanaMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCampanaMarca>;
      })
    );
  }
  /**
   * Consultar lista paginada de CampanaMarca
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaMarcaQueryResult(info: QueryInfo): __Observable<QueryResultCampanaMarca> {
    return this.CampanaMarcaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCampanaMarca)
    );
  }

  /**
   * Desactivar registro de CampanaMarca
   * @param idCampanaMarca Identificador de registro de CampanaMarca
   * @return OK
   */
  CampanaMarcaDesactivarResponse(idCampanaMarca: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaMarca != null) __params = __params.set('idCampanaMarca', idCampanaMarca.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CampanaMarca`,
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
   * Desactivar registro de CampanaMarca
   * @param idCampanaMarca Identificador de registro de CampanaMarca
   * @return OK
   */
  CampanaMarcaDesactivar(idCampanaMarca: string): __Observable<string> {
    return this.CampanaMarcaDesactivarResponse(idCampanaMarca).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CampanaProducto
   * @param idCampanaProducto Identificador de CampanaProducto
   * @return OK
   */
  CampanaProductoObtenerResponse(idCampanaProducto: string): __Observable<__StrictHttpResponse<CampanaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaProducto != null) __params = __params.set('idCampanaProducto', idCampanaProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CampanaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CampanaProducto>;
      })
    );
  }
  /**
   * Consultar registro de CampanaProducto
   * @param idCampanaProducto Identificador de CampanaProducto
   * @return OK
   */
  CampanaProductoObtener(idCampanaProducto: string): __Observable<CampanaProducto> {
    return this.CampanaProductoObtenerResponse(idCampanaProducto).pipe(
      __map(_r => _r.body as CampanaProducto)
    );
  }

  /**
   * Guardar o actualizar CampanaProducto
   * @param CampanaProducto CampanaProducto
   * @return OK
   */
  CampanaProductoGuardarOActualizarResponse(CampanaProducto: CampanaProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CampanaProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CampanaProducto`,
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
   * Guardar o actualizar CampanaProducto
   * @param CampanaProducto CampanaProducto
   * @return OK
   */
  CampanaProductoGuardarOActualizar(CampanaProducto: CampanaProducto): __Observable<string> {
    return this.CampanaProductoGuardarOActualizarResponse(CampanaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CampanaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCampanaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CampanaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCampanaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de CampanaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaProductoQueryResult(info: QueryInfo): __Observable<QueryResultCampanaProducto> {
    return this.CampanaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCampanaProducto)
    );
  }

  /**
   * Desactivar registro de CampanaProducto
   * @param idCampanaProducto Identificador de registro de CampanaProducto
   * @return OK
   */
  CampanaProductoDesactivarResponse(idCampanaProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaProducto != null) __params = __params.set('idCampanaProducto', idCampanaProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CampanaProducto`,
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
   * Desactivar registro de CampanaProducto
   * @param idCampanaProducto Identificador de registro de CampanaProducto
   * @return OK
   */
  CampanaProductoDesactivar(idCampanaProducto: string): __Observable<string> {
    return this.CampanaProductoDesactivarResponse(idCampanaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CampanaProveedorFamilia
   * @param idCampanaProveedorFamilia Identificador de CampanaProveedorFamilia
   * @return OK
   */
  CampanaProveedorFamiliaObtenerResponse(idCampanaProveedorFamilia: string): __Observable<__StrictHttpResponse<CampanaProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaProveedorFamilia != null) __params = __params.set('idCampanaProveedorFamilia', idCampanaProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CampanaProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CampanaProveedorFamilia>;
      })
    );
  }
  /**
   * Consultar registro de CampanaProveedorFamilia
   * @param idCampanaProveedorFamilia Identificador de CampanaProveedorFamilia
   * @return OK
   */
  CampanaProveedorFamiliaObtener(idCampanaProveedorFamilia: string): __Observable<CampanaProveedorFamilia> {
    return this.CampanaProveedorFamiliaObtenerResponse(idCampanaProveedorFamilia).pipe(
      __map(_r => _r.body as CampanaProveedorFamilia)
    );
  }

  /**
   * Guardar o actualizar CampanaProveedorFamilia
   * @param CampanaProveedorFamilia CampanaProveedorFamilia
   * @return OK
   */
  CampanaProveedorFamiliaGuardarOActualizarResponse(CampanaProveedorFamilia: CampanaProveedorFamilia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CampanaProveedorFamilia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CampanaProveedorFamilia`,
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
   * Guardar o actualizar CampanaProveedorFamilia
   * @param CampanaProveedorFamilia CampanaProveedorFamilia
   * @return OK
   */
  CampanaProveedorFamiliaGuardarOActualizar(CampanaProveedorFamilia: CampanaProveedorFamilia): __Observable<string> {
    return this.CampanaProveedorFamiliaGuardarOActualizarResponse(CampanaProveedorFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CampanaProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaProveedorFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCampanaProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CampanaProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCampanaProveedorFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de CampanaProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CampanaProveedorFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultCampanaProveedorFamilia> {
    return this.CampanaProveedorFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCampanaProveedorFamilia)
    );
  }

  /**
   * Desactivar registro de CampanaProveedorFamilia
   * @param idCampanaProveedorFamilia Identificador de registro de CampanaProveedorFamilia
   * @return OK
   */
  CampanaProveedorFamiliaDesactivarResponse(idCampanaProveedorFamilia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCampanaProveedorFamilia != null) __params = __params.set('idCampanaProveedorFamilia', idCampanaProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CampanaProveedorFamilia`,
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
   * Desactivar registro de CampanaProveedorFamilia
   * @param idCampanaProveedorFamilia Identificador de registro de CampanaProveedorFamilia
   * @return OK
   */
  CampanaProveedorFamiliaDesactivar(idCampanaProveedorFamilia: string): __Observable<string> {
    return this.CampanaProveedorFamiliaDesactivarResponse(idCampanaProveedorFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de vCampana
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCampanaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCampana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCampana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCampana>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCampana
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCampanaQueryResult(info: QueryInfo): __Observable<QueryResultVCampana> {
    return this.vCampanaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCampana)
    );
  }

  /**
   * Consultar lista paginada de vCampanaProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCampanaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCampanaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCampanaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCampanaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCampanaProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCampanaProductoQueryResult(info: QueryInfo): __Observable<QueryResultVCampanaProducto> {
    return this.vCampanaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCampanaProducto)
    );
  }
}

module ConfiguracionProveedoresCampanasService {
}

export { ConfiguracionProveedoresCampanasService }
