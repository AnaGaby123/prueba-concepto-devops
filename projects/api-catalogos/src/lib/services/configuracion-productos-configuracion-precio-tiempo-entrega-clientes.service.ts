/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConfiguracionClienteFamiliaClasificacion } from '../models/configuracion-cliente-familia-clasificacion';
import { QueryResultConfiguracionClienteFamiliaClasificacion } from '../models/query-result-configuracion-cliente-familia-clasificacion';
import { QueryInfo } from '../models/query-info';
import { ConfiguracionClienteFamiliaCosto } from '../models/configuracion-cliente-familia-costo';
import { QueryResultConfiguracionClienteFamiliaCosto } from '../models/query-result-configuracion-cliente-familia-costo';
import { ConfiguracionClienteFamiliaGeneral } from '../models/configuracion-cliente-familia-general';
import { QueryResultConfiguracionClienteFamiliaGeneral } from '../models/query-result-configuracion-cliente-familia-general';
import { ConfiguracionClienteFamiliaProducto } from '../models/configuracion-cliente-familia-producto';
import { QueryResultConfiguracionClienteFamiliaProducto } from '../models/query-result-configuracion-cliente-familia-producto';
import { ConfiguracionPrecioCliente } from '../models/configuracion-precio-cliente';
import { QueryResultConfiguracionPrecioCliente } from '../models/query-result-configuracion-precio-cliente';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosConfiguracionPrecioTiempoEntregaClientesService extends __BaseService {
  static readonly ConfiguracionClienteFamiliaClasificacionObtenerPath = '/ConfiguracionClienteFamiliaClasificacion';
  static readonly ConfiguracionClienteFamiliaClasificacionGuardarOActualizarPath = '/ConfiguracionClienteFamiliaClasificacion';
  static readonly ConfiguracionClienteFamiliaClasificacionQueryResultPath = '/ConfiguracionClienteFamiliaClasificacion';
  static readonly ConfiguracionClienteFamiliaClasificacionDesactivarPath = '/ConfiguracionClienteFamiliaClasificacion';
  static readonly ConfiguracionClienteFamiliaCostoObtenerPath = '/ConfiguracionClienteFamiliaCosto';
  static readonly ConfiguracionClienteFamiliaCostoGuardarOActualizarPath = '/ConfiguracionClienteFamiliaCosto';
  static readonly ConfiguracionClienteFamiliaCostoQueryResultPath = '/ConfiguracionClienteFamiliaCosto';
  static readonly ConfiguracionClienteFamiliaCostoDesactivarPath = '/ConfiguracionClienteFamiliaCosto';
  static readonly ConfiguracionClienteFamiliaGeneralObtenerPath = '/ConfiguracionClienteFamiliaGeneral';
  static readonly ConfiguracionClienteFamiliaGeneralGuardarOActualizarPath = '/ConfiguracionClienteFamiliaGeneral';
  static readonly ConfiguracionClienteFamiliaGeneralQueryResultPath = '/ConfiguracionClienteFamiliaGeneral';
  static readonly ConfiguracionClienteFamiliaGeneralDesactivarPath = '/ConfiguracionClienteFamiliaGeneral';
  static readonly ConfiguracionClienteFamiliaProductoObtenerPath = '/ConfiguracionClienteFamiliaProducto';
  static readonly ConfiguracionClienteFamiliaProductoGuardarOActualizarPath = '/ConfiguracionClienteFamiliaProducto';
  static readonly ConfiguracionClienteFamiliaProductoQueryResultPath = '/ConfiguracionClienteFamiliaProducto';
  static readonly ConfiguracionClienteFamiliaProductoDesactivarPath = '/ConfiguracionClienteFamiliaProducto';
  static readonly ConfiguracionPrecioClienteObtenerPath = '/ConfiguracionPrecioCliente';
  static readonly ConfiguracionPrecioClienteGuardarOActualizarPath = '/ConfiguracionPrecioCliente';
  static readonly ConfiguracionPrecioClienteQueryResultPath = '/ConfiguracionPrecioCliente';
  static readonly ConfiguracionPrecioClienteDesactivarPath = '/ConfiguracionPrecioCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ConfiguracionClienteFamiliaClasificacion
   * @param idConfiguracionClienteFamiliaClasificacion Identificador de ConfiguracionClienteFamiliaClasificacion
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionObtenerResponse(idConfiguracionClienteFamiliaClasificacion: string): __Observable<__StrictHttpResponse<ConfiguracionClienteFamiliaClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaClasificacion != null) __params = __params.set('idConfiguracionClienteFamiliaClasificacion', idConfiguracionClienteFamiliaClasificacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionClienteFamiliaClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionClienteFamiliaClasificacion>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionClienteFamiliaClasificacion
   * @param idConfiguracionClienteFamiliaClasificacion Identificador de ConfiguracionClienteFamiliaClasificacion
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionObtener(idConfiguracionClienteFamiliaClasificacion: string): __Observable<ConfiguracionClienteFamiliaClasificacion> {
    return this.ConfiguracionClienteFamiliaClasificacionObtenerResponse(idConfiguracionClienteFamiliaClasificacion).pipe(
      __map(_r => _r.body as ConfiguracionClienteFamiliaClasificacion)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionClienteFamiliaClasificacion
   * @param ConfiguracionClienteFamiliaClasificacion ConfiguracionClienteFamiliaClasificacion
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionGuardarOActualizarResponse(ConfiguracionClienteFamiliaClasificacion: ConfiguracionClienteFamiliaClasificacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionClienteFamiliaClasificacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionClienteFamiliaClasificacion`,
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
   * Guardar o actualizar ConfiguracionClienteFamiliaClasificacion
   * @param ConfiguracionClienteFamiliaClasificacion ConfiguracionClienteFamiliaClasificacion
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionGuardarOActualizar(ConfiguracionClienteFamiliaClasificacion: ConfiguracionClienteFamiliaClasificacion): __Observable<string> {
    return this.ConfiguracionClienteFamiliaClasificacionGuardarOActualizarResponse(ConfiguracionClienteFamiliaClasificacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionClienteFamiliaClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionClienteFamiliaClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionClienteFamiliaClasificacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaClasificacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionClienteFamiliaClasificacion> {
    return this.ConfiguracionClienteFamiliaClasificacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionClienteFamiliaClasificacion)
    );
  }

  /**
   * Desactivar registro de ConfiguracionClienteFamiliaClasificacion
   * @param idConfiguracionClienteFamiliaClasificacion Identificador de registro de
   * ConfiguracionClienteFamiliaClasificacion
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionDesactivarResponse(idConfiguracionClienteFamiliaClasificacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaClasificacion != null) __params = __params.set('idConfiguracionClienteFamiliaClasificacion', idConfiguracionClienteFamiliaClasificacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionClienteFamiliaClasificacion`,
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
   * Desactivar registro de ConfiguracionClienteFamiliaClasificacion
   * @param idConfiguracionClienteFamiliaClasificacion Identificador de registro de
   * ConfiguracionClienteFamiliaClasificacion
   * @return OK
   */
  ConfiguracionClienteFamiliaClasificacionDesactivar(idConfiguracionClienteFamiliaClasificacion: string): __Observable<string> {
    return this.ConfiguracionClienteFamiliaClasificacionDesactivarResponse(idConfiguracionClienteFamiliaClasificacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionClienteFamiliaCosto
   * @param idConfiguracionClienteFamiliaCosto Identificador de ConfiguracionClienteFamiliaCosto
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoObtenerResponse(idConfiguracionClienteFamiliaCosto: string): __Observable<__StrictHttpResponse<ConfiguracionClienteFamiliaCosto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaCosto != null) __params = __params.set('idConfiguracionClienteFamiliaCosto', idConfiguracionClienteFamiliaCosto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionClienteFamiliaCosto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionClienteFamiliaCosto>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionClienteFamiliaCosto
   * @param idConfiguracionClienteFamiliaCosto Identificador de ConfiguracionClienteFamiliaCosto
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoObtener(idConfiguracionClienteFamiliaCosto: string): __Observable<ConfiguracionClienteFamiliaCosto> {
    return this.ConfiguracionClienteFamiliaCostoObtenerResponse(idConfiguracionClienteFamiliaCosto).pipe(
      __map(_r => _r.body as ConfiguracionClienteFamiliaCosto)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionClienteFamiliaCosto
   * @param ConfiguracionClienteFamiliaCosto ConfiguracionClienteFamiliaCosto
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoGuardarOActualizarResponse(ConfiguracionClienteFamiliaCosto: ConfiguracionClienteFamiliaCosto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionClienteFamiliaCosto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionClienteFamiliaCosto`,
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
   * Guardar o actualizar ConfiguracionClienteFamiliaCosto
   * @param ConfiguracionClienteFamiliaCosto ConfiguracionClienteFamiliaCosto
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoGuardarOActualizar(ConfiguracionClienteFamiliaCosto: ConfiguracionClienteFamiliaCosto): __Observable<string> {
    return this.ConfiguracionClienteFamiliaCostoGuardarOActualizarResponse(ConfiguracionClienteFamiliaCosto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaCosto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionClienteFamiliaCosto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionClienteFamiliaCosto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionClienteFamiliaCosto>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaCosto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionClienteFamiliaCosto> {
    return this.ConfiguracionClienteFamiliaCostoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionClienteFamiliaCosto)
    );
  }

  /**
   * Desactivar registro de ConfiguracionClienteFamiliaCosto
   * @param idConfiguracionClienteFamiliaCosto Identificador de registro de ConfiguracionClienteFamiliaCosto
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoDesactivarResponse(idConfiguracionClienteFamiliaCosto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaCosto != null) __params = __params.set('idConfiguracionClienteFamiliaCosto', idConfiguracionClienteFamiliaCosto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionClienteFamiliaCosto`,
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
   * Desactivar registro de ConfiguracionClienteFamiliaCosto
   * @param idConfiguracionClienteFamiliaCosto Identificador de registro de ConfiguracionClienteFamiliaCosto
   * @return OK
   */
  ConfiguracionClienteFamiliaCostoDesactivar(idConfiguracionClienteFamiliaCosto: string): __Observable<string> {
    return this.ConfiguracionClienteFamiliaCostoDesactivarResponse(idConfiguracionClienteFamiliaCosto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionClienteFamiliaGeneral
   * @param idConfiguracionClienteFamiliaGeneral Identificador de ConfiguracionClienteFamiliaGeneral
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralObtenerResponse(idConfiguracionClienteFamiliaGeneral: string): __Observable<__StrictHttpResponse<ConfiguracionClienteFamiliaGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaGeneral != null) __params = __params.set('idConfiguracionClienteFamiliaGeneral', idConfiguracionClienteFamiliaGeneral.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionClienteFamiliaGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionClienteFamiliaGeneral>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionClienteFamiliaGeneral
   * @param idConfiguracionClienteFamiliaGeneral Identificador de ConfiguracionClienteFamiliaGeneral
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralObtener(idConfiguracionClienteFamiliaGeneral: string): __Observable<ConfiguracionClienteFamiliaGeneral> {
    return this.ConfiguracionClienteFamiliaGeneralObtenerResponse(idConfiguracionClienteFamiliaGeneral).pipe(
      __map(_r => _r.body as ConfiguracionClienteFamiliaGeneral)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionClienteFamiliaGeneral
   * @param ConfiguracionClienteFamiliaGeneral ConfiguracionClienteFamiliaGeneral
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralGuardarOActualizarResponse(ConfiguracionClienteFamiliaGeneral: ConfiguracionClienteFamiliaGeneral): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionClienteFamiliaGeneral;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionClienteFamiliaGeneral`,
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
   * Guardar o actualizar ConfiguracionClienteFamiliaGeneral
   * @param ConfiguracionClienteFamiliaGeneral ConfiguracionClienteFamiliaGeneral
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralGuardarOActualizar(ConfiguracionClienteFamiliaGeneral: ConfiguracionClienteFamiliaGeneral): __Observable<string> {
    return this.ConfiguracionClienteFamiliaGeneralGuardarOActualizarResponse(ConfiguracionClienteFamiliaGeneral).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaGeneral
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionClienteFamiliaGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionClienteFamiliaGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionClienteFamiliaGeneral>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaGeneral
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionClienteFamiliaGeneral> {
    return this.ConfiguracionClienteFamiliaGeneralQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionClienteFamiliaGeneral)
    );
  }

  /**
   * Desactivar registro de ConfiguracionClienteFamiliaGeneral
   * @param idConfiguracionClienteFamiliaGeneral Identificador de registro de ConfiguracionClienteFamiliaGeneral
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralDesactivarResponse(idConfiguracionClienteFamiliaGeneral: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaGeneral != null) __params = __params.set('idConfiguracionClienteFamiliaGeneral', idConfiguracionClienteFamiliaGeneral.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionClienteFamiliaGeneral`,
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
   * Desactivar registro de ConfiguracionClienteFamiliaGeneral
   * @param idConfiguracionClienteFamiliaGeneral Identificador de registro de ConfiguracionClienteFamiliaGeneral
   * @return OK
   */
  ConfiguracionClienteFamiliaGeneralDesactivar(idConfiguracionClienteFamiliaGeneral: string): __Observable<string> {
    return this.ConfiguracionClienteFamiliaGeneralDesactivarResponse(idConfiguracionClienteFamiliaGeneral).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionClienteFamiliaProducto
   * @param idConfiguracionClienteFamiliaProducto Identificador de ConfiguracionClienteFamiliaProducto
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoObtenerResponse(idConfiguracionClienteFamiliaProducto: string): __Observable<__StrictHttpResponse<ConfiguracionClienteFamiliaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaProducto != null) __params = __params.set('idConfiguracionClienteFamiliaProducto', idConfiguracionClienteFamiliaProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionClienteFamiliaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionClienteFamiliaProducto>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionClienteFamiliaProducto
   * @param idConfiguracionClienteFamiliaProducto Identificador de ConfiguracionClienteFamiliaProducto
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoObtener(idConfiguracionClienteFamiliaProducto: string): __Observable<ConfiguracionClienteFamiliaProducto> {
    return this.ConfiguracionClienteFamiliaProductoObtenerResponse(idConfiguracionClienteFamiliaProducto).pipe(
      __map(_r => _r.body as ConfiguracionClienteFamiliaProducto)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionClienteFamiliaProducto
   * @param ConfiguracionClienteFamiliaProducto ConfiguracionClienteFamiliaProducto
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoGuardarOActualizarResponse(ConfiguracionClienteFamiliaProducto: ConfiguracionClienteFamiliaProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionClienteFamiliaProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionClienteFamiliaProducto`,
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
   * Guardar o actualizar ConfiguracionClienteFamiliaProducto
   * @param ConfiguracionClienteFamiliaProducto ConfiguracionClienteFamiliaProducto
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoGuardarOActualizar(ConfiguracionClienteFamiliaProducto: ConfiguracionClienteFamiliaProducto): __Observable<string> {
    return this.ConfiguracionClienteFamiliaProductoGuardarOActualizarResponse(ConfiguracionClienteFamiliaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionClienteFamiliaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionClienteFamiliaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionClienteFamiliaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionClienteFamiliaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionClienteFamiliaProducto> {
    return this.ConfiguracionClienteFamiliaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionClienteFamiliaProducto)
    );
  }

  /**
   * Desactivar registro de ConfiguracionClienteFamiliaProducto
   * @param idConfiguracionClienteFamiliaProducto Identificador de registro de ConfiguracionClienteFamiliaProducto
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoDesactivarResponse(idConfiguracionClienteFamiliaProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionClienteFamiliaProducto != null) __params = __params.set('idConfiguracionClienteFamiliaProducto', idConfiguracionClienteFamiliaProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionClienteFamiliaProducto`,
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
   * Desactivar registro de ConfiguracionClienteFamiliaProducto
   * @param idConfiguracionClienteFamiliaProducto Identificador de registro de ConfiguracionClienteFamiliaProducto
   * @return OK
   */
  ConfiguracionClienteFamiliaProductoDesactivar(idConfiguracionClienteFamiliaProducto: string): __Observable<string> {
    return this.ConfiguracionClienteFamiliaProductoDesactivarResponse(idConfiguracionClienteFamiliaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionPrecioCliente
   * @param idConfiguracionPrecioCliente Identificador de ConfiguracionPrecioCliente
   * @return OK
   */
  ConfiguracionPrecioClienteObtenerResponse(idConfiguracionPrecioCliente: string): __Observable<__StrictHttpResponse<ConfiguracionPrecioCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioCliente != null) __params = __params.set('idConfiguracionPrecioCliente', idConfiguracionPrecioCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPrecioCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioCliente>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionPrecioCliente
   * @param idConfiguracionPrecioCliente Identificador de ConfiguracionPrecioCliente
   * @return OK
   */
  ConfiguracionPrecioClienteObtener(idConfiguracionPrecioCliente: string): __Observable<ConfiguracionPrecioCliente> {
    return this.ConfiguracionPrecioClienteObtenerResponse(idConfiguracionPrecioCliente).pipe(
      __map(_r => _r.body as ConfiguracionPrecioCliente)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionPrecioCliente
   * @param ConfiguracionPrecioCliente ConfiguracionPrecioCliente
   * @return OK
   */
  ConfiguracionPrecioClienteGuardarOActualizarResponse(ConfiguracionPrecioCliente: ConfiguracionPrecioCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionPrecioCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionPrecioCliente`,
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
   * Guardar o actualizar ConfiguracionPrecioCliente
   * @param ConfiguracionPrecioCliente ConfiguracionPrecioCliente
   * @return OK
   */
  ConfiguracionPrecioClienteGuardarOActualizar(ConfiguracionPrecioCliente: ConfiguracionPrecioCliente): __Observable<string> {
    return this.ConfiguracionPrecioClienteGuardarOActualizarResponse(ConfiguracionPrecioCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionPrecioCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionPrecioCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionPrecioCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionPrecioCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionPrecioCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioClienteQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionPrecioCliente> {
    return this.ConfiguracionPrecioClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionPrecioCliente)
    );
  }

  /**
   * Desactivar registro de ConfiguracionPrecioCliente
   * @param idConfiguracionPrecioCliente Identificador de registro de ConfiguracionPrecioCliente
   * @return OK
   */
  ConfiguracionPrecioClienteDesactivarResponse(idConfiguracionPrecioCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioCliente != null) __params = __params.set('idConfiguracionPrecioCliente', idConfiguracionPrecioCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionPrecioCliente`,
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
   * Desactivar registro de ConfiguracionPrecioCliente
   * @param idConfiguracionPrecioCliente Identificador de registro de ConfiguracionPrecioCliente
   * @return OK
   */
  ConfiguracionPrecioClienteDesactivar(idConfiguracionPrecioCliente: string): __Observable<string> {
    return this.ConfiguracionPrecioClienteDesactivarResponse(idConfiguracionPrecioCliente).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionProductosConfiguracionPrecioTiempoEntregaClientesService {
}

export { ConfiguracionProductosConfiguracionPrecioTiempoEntregaClientesService }
