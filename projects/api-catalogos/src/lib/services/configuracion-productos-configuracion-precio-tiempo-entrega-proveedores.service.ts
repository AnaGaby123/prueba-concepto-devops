/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConfiguracionComisionProveedor } from '../models/configuracion-comision-proveedor';
import { QueryResultConfiguracionComisionProveedor } from '../models/query-result-configuracion-comision-proveedor';
import { QueryInfo } from '../models/query-info';
import { ConfiguracionPrecioProveedor } from '../models/configuracion-precio-proveedor';
import { QueryResultConfiguracionPrecioProveedor } from '../models/query-result-configuracion-precio-proveedor';
import { ConfiguracionPrecioProveedorFamilia } from '../models/configuracion-precio-proveedor-familia';
import { QueryResultConfiguracionPrecioProveedorFamilia } from '../models/query-result-configuracion-precio-proveedor-familia';
import { ConfiguracionPrecioUtilidadCategoriaProveedor } from '../models/configuracion-precio-utilidad-categoria-proveedor';
import { QueryResultConfiguracionPrecioUtilidadCategoriaProveedor } from '../models/query-result-configuracion-precio-utilidad-categoria-proveedor';
import { ConfiguracionProveedorFamiliaClasificacion } from '../models/configuracion-proveedor-familia-clasificacion';
import { QueryResultConfiguracionProveedorFamiliaClasificacion } from '../models/query-result-configuracion-proveedor-familia-clasificacion';
import { ConfiguracionProveedorFamiliaCosto } from '../models/configuracion-proveedor-familia-costo';
import { QueryResultConfiguracionProveedorFamiliaCosto } from '../models/query-result-configuracion-proveedor-familia-costo';
import { ConfiguracionProveedorFamiliaGeneral } from '../models/configuracion-proveedor-familia-general';
import { QueryResultConfiguracionProveedorFamiliaGeneral } from '../models/query-result-configuracion-proveedor-familia-general';
import { ConfiguracionProveedorFamiliaProducto } from '../models/configuracion-proveedor-familia-producto';
import { QueryResultConfiguracionProveedorFamiliaProducto } from '../models/query-result-configuracion-proveedor-familia-producto';
import { ConfiguracionTiempoEntregaProveedorFamilia } from '../models/configuracion-tiempo-entrega-proveedor-familia';
import { QueryResultConfiguracionTiempoEntregaProveedorFamilia } from '../models/query-result-configuracion-tiempo-entrega-proveedor-familia';
import { ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega } from '../models/configuracion-tiempo-entrega-proveedor-familia-ruta-entrega';
import { QueryResultConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega } from '../models/query-result-configuracion-tiempo-entrega-proveedor-familia-ruta-entrega';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService extends __BaseService {
  static readonly ConfiguracionComisionProveedorObtenerPath = '/ConfiguracionComisionProveedor';
  static readonly ConfiguracionComisionProveedorGuardarOActualizarPath = '/ConfiguracionComisionProveedor';
  static readonly ConfiguracionComisionProveedorQueryResultPath = '/ConfiguracionComisionProveedor';
  static readonly ConfiguracionPrecioProveedorObtenerPath = '/ConfiguracionPrecioProveedor';
  static readonly ConfiguracionPrecioProveedorGuardarOActualizarPath = '/ConfiguracionPrecioProveedor';
  static readonly ConfiguracionPrecioProveedorQueryResultPath = '/ConfiguracionPrecioProveedor';
  static readonly ConfiguracionPrecioProveedorDesactivarPath = '/ConfiguracionPrecioProveedor';
  static readonly ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorPath = '/DesactivarComisionesUtilidadProveedor';
  static readonly ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorPath = '/DesactivarConfiguracionProveedor';
  static readonly ConfiguracionPrecioProveedorFamiliaObtenerPath = '/ConfiguracionPrecioProveedorFamilia';
  static readonly ConfiguracionPrecioProveedorFamiliaGuardarOActualizarPath = '/ConfiguracionPrecioProveedorFamilia';
  static readonly ConfiguracionPrecioProveedorFamiliaQueryResultPath = '/ConfiguracionPrecioProveedorFamilia';
  static readonly ConfiguracionPrecioProveedorFamiliaDesactivarPath = '/ConfiguracionPrecioProveedorFamilia';
  static readonly ConfiguracionPrecioUtilidadCategoriaProveedorObtenerPath = '/ConfiguracionPrecioUtilidadCategoriaProveedor';
  static readonly ConfiguracionPrecioUtilidadCategoriaProveedorGuardarOActualizarPath = '/ConfiguracionPrecioUtilidadCategoriaProveedor';
  static readonly ConfiguracionPrecioUtilidadCategoriaProveedorQueryResultPath = '/ConfiguracionPrecioUtilidadCategoriaProveedor';
  static readonly ConfiguracionProveedorFamiliaClasificacionObtenerPath = '/ConfiguracionProveedorFamiliaClasificacion';
  static readonly ConfiguracionProveedorFamiliaClasificacionGuardarOActualizarPath = '/ConfiguracionProveedorFamiliaClasificacion';
  static readonly ConfiguracionProveedorFamiliaClasificacionQueryResultPath = '/ConfiguracionProveedorFamiliaClasificacion';
  static readonly ConfiguracionProveedorFamiliaClasificacionDesactivarPath = '/ConfiguracionProveedorFamiliaClasificacion';
  static readonly ConfiguracionProveedorFamiliaCostoObtenerPath = '/ConfiguracionProveedorFamiliaCosto';
  static readonly ConfiguracionProveedorFamiliaCostoGuardarOActualizarPath = '/ConfiguracionProveedorFamiliaCosto';
  static readonly ConfiguracionProveedorFamiliaCostoDesactivarPath = '/ConfiguracionProveedorFamiliaCosto';
  static readonly ConfiguracionProveedorFamiliaCostoQueryResultPath = '/configuracionProveedorFamiliaCosto';
  static readonly ConfiguracionProveedorFamiliaGeneralObtenerPath = '/ConfiguracionProveedorFamiliaGeneral';
  static readonly ConfiguracionProveedorFamiliaGeneralGuardarOActualizarPath = '/ConfiguracionProveedorFamiliaGeneral';
  static readonly ConfiguracionProveedorFamiliaGeneralQueryResultPath = '/ConfiguracionProveedorFamiliaGeneral';
  static readonly ConfiguracionProveedorFamiliaGeneralDesactivarPath = '/ConfiguracionProveedorFamiliaGeneral';
  static readonly ConfiguracionProveedorFamiliaProductoObtenerPath = '/ConfiguracionProveedorFamiliaProducto';
  static readonly ConfiguracionProveedorFamiliaProductoGuardarOActualizarPath = '/ConfiguracionProveedorFamiliaProducto';
  static readonly ConfiguracionProveedorFamiliaProductoQueryResultPath = '/ConfiguracionProveedorFamiliaProducto';
  static readonly ConfiguracionProveedorFamiliaProductoDesactivarPath = '/ConfiguracionProveedorFamiliaProducto';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaObtenerPath = '/ConfiguracionTiempoEntregaProveedorFamilia';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaGuardarOActualizarPath = '/ConfiguracionTiempoEntregaProveedorFamilia';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaQueryResultPath = '/ConfiguracionTiempoEntregaProveedorFamilia';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaDesactivarPath = '/ConfiguracionTiempoEntregaProveedorFamilia';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObtenerPath = '/ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaGuardarOActualizarPath = '/ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega';
  static readonly ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaQueryResultPath = '/ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ConfiguracionComisionProveedor
   * @param idConfiguracionComisionProveedor Identificador de
   * ConfiguracionComisionProveedor
   * @return OK
   */
  ConfiguracionComisionProveedorObtenerResponse(idConfiguracionComisionProveedor: string): __Observable<__StrictHttpResponse<ConfiguracionComisionProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionComisionProveedor != null) __params = __params.set('idConfiguracionComisionProveedor', idConfiguracionComisionProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionComisionProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionComisionProveedor>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionComisionProveedor
   * @param idConfiguracionComisionProveedor Identificador de
   * ConfiguracionComisionProveedor
   * @return OK
   */
  ConfiguracionComisionProveedorObtener(idConfiguracionComisionProveedor: string): __Observable<ConfiguracionComisionProveedor> {
    return this.ConfiguracionComisionProveedorObtenerResponse(idConfiguracionComisionProveedor).pipe(
      __map(_r => _r.body as ConfiguracionComisionProveedor)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionComisionProveedor
   * @param ConfiguracionComisionProveedor ConfiguracionComisionProveedor
   * @return OK
   */
  ConfiguracionComisionProveedorGuardarOActualizarResponse(ConfiguracionComisionProveedor: ConfiguracionComisionProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionComisionProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionComisionProveedor`,
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
   * Guardar o actualizar ConfiguracionComisionProveedor
   * @param ConfiguracionComisionProveedor ConfiguracionComisionProveedor
   * @return OK
   */
  ConfiguracionComisionProveedorGuardarOActualizar(ConfiguracionComisionProveedor: ConfiguracionComisionProveedor): __Observable<string> {
    return this.ConfiguracionComisionProveedorGuardarOActualizarResponse(ConfiguracionComisionProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionComisionProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionComisionProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionComisionProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionComisionProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionComisionProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionComisionProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionComisionProveedorQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionComisionProveedor> {
    return this.ConfiguracionComisionProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionComisionProveedor)
    );
  }

  /**
   * Consultar registro de ConfiguracionPrecioProveedor
   * @param idConfiguracionPrecioProveedor Identificador de ConfiguracionPrecioProveedor
   * @return OK
   */
  ConfiguracionPrecioProveedorObtenerResponse(idConfiguracionPrecioProveedor: string): __Observable<__StrictHttpResponse<ConfiguracionPrecioProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioProveedor != null) __params = __params.set('idConfiguracionPrecioProveedor', idConfiguracionPrecioProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPrecioProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioProveedor>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionPrecioProveedor
   * @param idConfiguracionPrecioProveedor Identificador de ConfiguracionPrecioProveedor
   * @return OK
   */
  ConfiguracionPrecioProveedorObtener(idConfiguracionPrecioProveedor: string): __Observable<ConfiguracionPrecioProveedor> {
    return this.ConfiguracionPrecioProveedorObtenerResponse(idConfiguracionPrecioProveedor).pipe(
      __map(_r => _r.body as ConfiguracionPrecioProveedor)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionPrecioProveedor
   * @param ConfiguracionPrecioProveedor ConfiguracionPrecioProveedor
   * @return OK
   */
  ConfiguracionPrecioProveedorGuardarOActualizarResponse(ConfiguracionPrecioProveedor: ConfiguracionPrecioProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionPrecioProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionPrecioProveedor`,
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
   * Guardar o actualizar ConfiguracionPrecioProveedor
   * @param ConfiguracionPrecioProveedor ConfiguracionPrecioProveedor
   * @return OK
   */
  ConfiguracionPrecioProveedorGuardarOActualizar(ConfiguracionPrecioProveedor: ConfiguracionPrecioProveedor): __Observable<string> {
    return this.ConfiguracionPrecioProveedorGuardarOActualizarResponse(ConfiguracionPrecioProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionPrecioProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionPrecioProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionPrecioProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionPrecioProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionPrecioProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioProveedorQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionPrecioProveedor> {
    return this.ConfiguracionPrecioProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionPrecioProveedor)
    );
  }

  /**
   * Desactivar registro de ConfiguracionPrecioProveedor
   * @param idConfiguracionPrecioProveedor Identificador de registro de ConfiguracionPrecioProveedor
   * @return OK
   */
  ConfiguracionPrecioProveedorDesactivarResponse(idConfiguracionPrecioProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioProveedor != null) __params = __params.set('idConfiguracionPrecioProveedor', idConfiguracionPrecioProveedor.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionPrecioProveedor`,
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
   * Desactivar registro de ConfiguracionPrecioProveedor
   * @param idConfiguracionPrecioProveedor Identificador de registro de ConfiguracionPrecioProveedor
   * @return OK
   */
  ConfiguracionPrecioProveedorDesactivar(idConfiguracionPrecioProveedor: string): __Observable<string> {
    return this.ConfiguracionPrecioProveedorDesactivarResponse(idConfiguracionPrecioProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar los registros de ConfiguracionPrecioUtilidadCategoriaProveedor y de ConfiguracionComisionProveedor por el Sector e Industría de una configuración
   * @param params The `ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorParams` containing the following parameters:
   *
   * - `idMarcaFamiliaCatIndustria`: Identificador de MarcaFamiliaCatIndustria por Sector e Industria de la marcaFamilia
   *
   * - `idConfiguracionPrecioProveedorFamilia`: Identificador de registro de ConfiguracionPrecioProveedorFamilia
   *
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorResponse(params: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorParams): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idMarcaFamiliaCatIndustria != null) __params = __params.set('idMarcaFamiliaCatIndustria', params.idMarcaFamiliaCatIndustria.toString());
    if (params.idConfiguracionPrecioProveedorFamilia != null) __params = __params.set('idConfiguracionPrecioProveedorFamilia', params.idConfiguracionPrecioProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DesactivarComisionesUtilidadProveedor`,
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
   * Desactivar los registros de ConfiguracionPrecioUtilidadCategoriaProveedor y de ConfiguracionComisionProveedor por el Sector e Industría de una configuración
   * @param params The `ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorParams` containing the following parameters:
   *
   * - `idMarcaFamiliaCatIndustria`: Identificador de MarcaFamiliaCatIndustria por Sector e Industria de la marcaFamilia
   *
   * - `idConfiguracionPrecioProveedorFamilia`: Identificador de registro de ConfiguracionPrecioProveedorFamilia
   *
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedor(params: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorParams): __Observable<string> {
    return this.ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorResponse(params).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar de ConfiguracionPrecioProveedorFamilia y lo relacionado a esta entidad con respecto al nivel de Configuracion
   * @param params The `ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorParams` containing the following parameters:
   *
   * - `idConfiguracionPrecioProveedorFamilia`: Identificador de registro de ConfiguracionPrecioProveedorFamilia
   *
   * - `NivelConfiguracion`: identificador de Nivel de Configuracion (Familia, PrecioLista, AgrupadorCaracteristica o Producto)
   *
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorResponse(params: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorParams): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idConfiguracionPrecioProveedorFamilia != null) __params = __params.set('idConfiguracionPrecioProveedorFamilia', params.idConfiguracionPrecioProveedorFamilia.toString());
    if (params.NivelConfiguracion != null) __params = __params.set('NivelConfiguracion', params.NivelConfiguracion.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DesactivarConfiguracionProveedor`,
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
   * Desactivar de ConfiguracionPrecioProveedorFamilia y lo relacionado a esta entidad con respecto al nivel de Configuracion
   * @param params The `ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorParams` containing the following parameters:
   *
   * - `idConfiguracionPrecioProveedorFamilia`: Identificador de registro de ConfiguracionPrecioProveedorFamilia
   *
   * - `NivelConfiguracion`: identificador de Nivel de Configuracion (Familia, PrecioLista, AgrupadorCaracteristica o Producto)
   *
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedor(params: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService.ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorParams): __Observable<string> {
    return this.ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorResponse(params).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionPrecioProveedorFamilia
   * @param idConfiguracionPrecioProveedorFamilia Identificador de ConfiguracionPrecioProveedorFamilia
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaObtenerResponse(idConfiguracionPrecioProveedorFamilia: string): __Observable<__StrictHttpResponse<ConfiguracionPrecioProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioProveedorFamilia != null) __params = __params.set('idConfiguracionPrecioProveedorFamilia', idConfiguracionPrecioProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPrecioProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioProveedorFamilia>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionPrecioProveedorFamilia
   * @param idConfiguracionPrecioProveedorFamilia Identificador de ConfiguracionPrecioProveedorFamilia
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaObtener(idConfiguracionPrecioProveedorFamilia: string): __Observable<ConfiguracionPrecioProveedorFamilia> {
    return this.ConfiguracionPrecioProveedorFamiliaObtenerResponse(idConfiguracionPrecioProveedorFamilia).pipe(
      __map(_r => _r.body as ConfiguracionPrecioProveedorFamilia)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionPrecioProveedorFamilia
   * @param ConfiguracionPrecioProveedorFamilia ConfiguracionPrecioProveedorFamilia
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaGuardarOActualizarResponse(ConfiguracionPrecioProveedorFamilia: ConfiguracionPrecioProveedorFamilia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionPrecioProveedorFamilia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionPrecioProveedorFamilia`,
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
   * Guardar o actualizar ConfiguracionPrecioProveedorFamilia
   * @param ConfiguracionPrecioProveedorFamilia ConfiguracionPrecioProveedorFamilia
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaGuardarOActualizar(ConfiguracionPrecioProveedorFamilia: ConfiguracionPrecioProveedorFamilia): __Observable<string> {
    return this.ConfiguracionPrecioProveedorFamiliaGuardarOActualizarResponse(ConfiguracionPrecioProveedorFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionPrecioProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionPrecioProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionPrecioProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionPrecioProveedorFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionPrecioProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionPrecioProveedorFamilia> {
    return this.ConfiguracionPrecioProveedorFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionPrecioProveedorFamilia)
    );
  }

  /**
   * Desactivar registro de ConfiguracionPrecioProveedorFamilia
   * @param idConfiguracionPrecioProveedorFamilia Identificador de registro de ConfiguracionPrecioProveedorFamilia
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaDesactivarResponse(idConfiguracionPrecioProveedorFamilia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioProveedorFamilia != null) __params = __params.set('idConfiguracionPrecioProveedorFamilia', idConfiguracionPrecioProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionPrecioProveedorFamilia`,
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
   * Desactivar registro de ConfiguracionPrecioProveedorFamilia
   * @param idConfiguracionPrecioProveedorFamilia Identificador de registro de ConfiguracionPrecioProveedorFamilia
   * @return OK
   */
  ConfiguracionPrecioProveedorFamiliaDesactivar(idConfiguracionPrecioProveedorFamilia: string): __Observable<string> {
    return this.ConfiguracionPrecioProveedorFamiliaDesactivarResponse(idConfiguracionPrecioProveedorFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionPrecioUtilidadCategoriaProveedor
   * @param idConfiguracionPrecioUtilidadCategoriaProveedor Identificador de
   * ConfiguracionPrecioUtilidadCategoriaProveedor
   * @return OK
   */
  ConfiguracionPrecioUtilidadCategoriaProveedorObtenerResponse(idConfiguracionPrecioUtilidadCategoriaProveedor: string): __Observable<__StrictHttpResponse<ConfiguracionPrecioUtilidadCategoriaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPrecioUtilidadCategoriaProveedor != null) __params = __params.set('idConfiguracionPrecioUtilidadCategoriaProveedor', idConfiguracionPrecioUtilidadCategoriaProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPrecioUtilidadCategoriaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPrecioUtilidadCategoriaProveedor>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionPrecioUtilidadCategoriaProveedor
   * @param idConfiguracionPrecioUtilidadCategoriaProveedor Identificador de
   * ConfiguracionPrecioUtilidadCategoriaProveedor
   * @return OK
   */
  ConfiguracionPrecioUtilidadCategoriaProveedorObtener(idConfiguracionPrecioUtilidadCategoriaProveedor: string): __Observable<ConfiguracionPrecioUtilidadCategoriaProveedor> {
    return this.ConfiguracionPrecioUtilidadCategoriaProveedorObtenerResponse(idConfiguracionPrecioUtilidadCategoriaProveedor).pipe(
      __map(_r => _r.body as ConfiguracionPrecioUtilidadCategoriaProveedor)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionPrecioUtilidadCategoriaProveedor
   * @param ConfiguracionPrecioUtilidadCategoriaProveedor ConfiguracionPrecioUtilidadCategoriaProveedor
   * @return OK
   */
  ConfiguracionPrecioUtilidadCategoriaProveedorGuardarOActualizarResponse(ConfiguracionPrecioUtilidadCategoriaProveedor: ConfiguracionPrecioUtilidadCategoriaProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionPrecioUtilidadCategoriaProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionPrecioUtilidadCategoriaProveedor`,
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
   * Guardar o actualizar ConfiguracionPrecioUtilidadCategoriaProveedor
   * @param ConfiguracionPrecioUtilidadCategoriaProveedor ConfiguracionPrecioUtilidadCategoriaProveedor
   * @return OK
   */
  ConfiguracionPrecioUtilidadCategoriaProveedorGuardarOActualizar(ConfiguracionPrecioUtilidadCategoriaProveedor: ConfiguracionPrecioUtilidadCategoriaProveedor): __Observable<string> {
    return this.ConfiguracionPrecioUtilidadCategoriaProveedorGuardarOActualizarResponse(ConfiguracionPrecioUtilidadCategoriaProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionPrecioUtilidadCategoriaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioUtilidadCategoriaProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionPrecioUtilidadCategoriaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionPrecioUtilidadCategoriaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionPrecioUtilidadCategoriaProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionPrecioUtilidadCategoriaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionPrecioUtilidadCategoriaProveedorQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionPrecioUtilidadCategoriaProveedor> {
    return this.ConfiguracionPrecioUtilidadCategoriaProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionPrecioUtilidadCategoriaProveedor)
    );
  }

  /**
   * Obtener un ConfiguracionProveedorFamiliaClasificacion por su idConfiguracionProveedorFamiliaClasificacion
   * @param idConfiguracionProveedorFamiliaClasificacion Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionObtenerResponse(idConfiguracionProveedorFamiliaClasificacion: string): __Observable<__StrictHttpResponse<ConfiguracionProveedorFamiliaClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaClasificacion != null) __params = __params.set('idConfiguracionProveedorFamiliaClasificacion', idConfiguracionProveedorFamiliaClasificacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionProveedorFamiliaClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionProveedorFamiliaClasificacion>;
      })
    );
  }
  /**
   * Obtener un ConfiguracionProveedorFamiliaClasificacion por su idConfiguracionProveedorFamiliaClasificacion
   * @param idConfiguracionProveedorFamiliaClasificacion Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionObtener(idConfiguracionProveedorFamiliaClasificacion: string): __Observable<ConfiguracionProveedorFamiliaClasificacion> {
    return this.ConfiguracionProveedorFamiliaClasificacionObtenerResponse(idConfiguracionProveedorFamiliaClasificacion).pipe(
      __map(_r => _r.body as ConfiguracionProveedorFamiliaClasificacion)
    );
  }

  /**
   * Guardar o actualizar un ConfiguracionProveedorFamiliaClasificacion.
   * @param configuracionProveedorFamiliaClasificacion Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionGuardarOActualizarResponse(configuracionProveedorFamiliaClasificacion: ConfiguracionProveedorFamiliaClasificacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = configuracionProveedorFamiliaClasificacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionProveedorFamiliaClasificacion`,
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
   * Guardar o actualizar un ConfiguracionProveedorFamiliaClasificacion.
   * @param configuracionProveedorFamiliaClasificacion Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionGuardarOActualizar(configuracionProveedorFamiliaClasificacion: ConfiguracionProveedorFamiliaClasificacion): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaClasificacionGuardarOActualizarResponse(configuracionProveedorFamiliaClasificacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ConfiguracionProveedorFamiliaClasificacion.
   * @param info Objeto de tipo QueryInfo para realizar la consulta paginada con ordenamiento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaClasificacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorFamiliaClasificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaClasificacion>;
      })
    );
  }
  /**
   * Obtener lista de ConfiguracionProveedorFamiliaClasificacion.
   * @param info Objeto de tipo QueryInfo para realizar la consulta paginada con ordenamiento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionProveedorFamiliaClasificacion> {
    return this.ConfiguracionProveedorFamiliaClasificacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionProveedorFamiliaClasificacion)
    );
  }

  /**
   * Desactivar un configuracionProveedorFamiliaClasificacion.
   * @param idConfiguracionProveedorFamiliaClasificacion Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionDesactivarResponse(idConfiguracionProveedorFamiliaClasificacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaClasificacion != null) __params = __params.set('idConfiguracionProveedorFamiliaClasificacion', idConfiguracionProveedorFamiliaClasificacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionProveedorFamiliaClasificacion`,
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
   * Desactivar un configuracionProveedorFamiliaClasificacion.
   * @param idConfiguracionProveedorFamiliaClasificacion Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaClasificacionDesactivar(idConfiguracionProveedorFamiliaClasificacion: string): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaClasificacionDesactivarResponse(idConfiguracionProveedorFamiliaClasificacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un configuracionProveedorFamiliaCosto por su idConfiguracionProveedorFamiliaCosto
   * @param idConfiguracionProveedorFamiliaCosto Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoObtenerResponse(idConfiguracionProveedorFamiliaCosto: string): __Observable<__StrictHttpResponse<ConfiguracionProveedorFamiliaCosto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaCosto != null) __params = __params.set('idConfiguracionProveedorFamiliaCosto', idConfiguracionProveedorFamiliaCosto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionProveedorFamiliaCosto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionProveedorFamiliaCosto>;
      })
    );
  }
  /**
   * Obtener un configuracionProveedorFamiliaCosto por su idConfiguracionProveedorFamiliaCosto
   * @param idConfiguracionProveedorFamiliaCosto Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoObtener(idConfiguracionProveedorFamiliaCosto: string): __Observable<ConfiguracionProveedorFamiliaCosto> {
    return this.ConfiguracionProveedorFamiliaCostoObtenerResponse(idConfiguracionProveedorFamiliaCosto).pipe(
      __map(_r => _r.body as ConfiguracionProveedorFamiliaCosto)
    );
  }

  /**
   * Guardar o actualizar un ConfiguracionProveedorFamiliaCosto.
   * @param configuracionProveedorFamiliaCosto Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoGuardarOActualizarResponse(configuracionProveedorFamiliaCosto: ConfiguracionProveedorFamiliaCosto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = configuracionProveedorFamiliaCosto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionProveedorFamiliaCosto`,
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
   * Guardar o actualizar un ConfiguracionProveedorFamiliaCosto.
   * @param configuracionProveedorFamiliaCosto Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoGuardarOActualizar(configuracionProveedorFamiliaCosto: ConfiguracionProveedorFamiliaCosto): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaCostoGuardarOActualizarResponse(configuracionProveedorFamiliaCosto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar un ConfiguracionProveedorFamiliaCosto.
   * @param idConfiguracionProveedorFamiliaCosto Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoDesactivarResponse(idConfiguracionProveedorFamiliaCosto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaCosto != null) __params = __params.set('idConfiguracionProveedorFamiliaCosto', idConfiguracionProveedorFamiliaCosto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionProveedorFamiliaCosto`,
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
   * Desactivar un ConfiguracionProveedorFamiliaCosto.
   * @param idConfiguracionProveedorFamiliaCosto Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoDesactivar(idConfiguracionProveedorFamiliaCosto: string): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaCostoDesactivarResponse(idConfiguracionProveedorFamiliaCosto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ConfiguracionProveedorFamiliaCosto.
   * @param info Objeto de tipo QueryInfo para realizar la consulta paginada con ordenamiento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaCosto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/configuracionProveedorFamiliaCosto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaCosto>;
      })
    );
  }
  /**
   * Obtener lista de ConfiguracionProveedorFamiliaCosto.
   * @param info Objeto de tipo QueryInfo para realizar la consulta paginada con ordenamiento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaCostoQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionProveedorFamiliaCosto> {
    return this.ConfiguracionProveedorFamiliaCostoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionProveedorFamiliaCosto)
    );
  }

  /**
   * Obtener un ConfiguracionProveedorFamiliaGeneral por su idConfiguracionProveedorFamiliaGeneral
   * @param idConfiguracionProveedorFamiliaGeneral Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralObtenerResponse(idConfiguracionProveedorFamiliaGeneral: string): __Observable<__StrictHttpResponse<ConfiguracionProveedorFamiliaGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaGeneral != null) __params = __params.set('idConfiguracionProveedorFamiliaGeneral', idConfiguracionProveedorFamiliaGeneral.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionProveedorFamiliaGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionProveedorFamiliaGeneral>;
      })
    );
  }
  /**
   * Obtener un ConfiguracionProveedorFamiliaGeneral por su idConfiguracionProveedorFamiliaGeneral
   * @param idConfiguracionProveedorFamiliaGeneral Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralObtener(idConfiguracionProveedorFamiliaGeneral: string): __Observable<ConfiguracionProveedorFamiliaGeneral> {
    return this.ConfiguracionProveedorFamiliaGeneralObtenerResponse(idConfiguracionProveedorFamiliaGeneral).pipe(
      __map(_r => _r.body as ConfiguracionProveedorFamiliaGeneral)
    );
  }

  /**
   * Guardar o actualizar un ConfiguracionProveedorFamiliaGeneral.
   * @param configuracionProveedorFamiliaGeneral Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralGuardarOActualizarResponse(configuracionProveedorFamiliaGeneral: ConfiguracionProveedorFamiliaGeneral): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = configuracionProveedorFamiliaGeneral;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionProveedorFamiliaGeneral`,
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
   * Guardar o actualizar un ConfiguracionProveedorFamiliaGeneral.
   * @param configuracionProveedorFamiliaGeneral Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralGuardarOActualizar(configuracionProveedorFamiliaGeneral: ConfiguracionProveedorFamiliaGeneral): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaGeneralGuardarOActualizarResponse(configuracionProveedorFamiliaGeneral).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ConfiguracionProveedorFamiliaGeneral.
   * @param info Objeto de tipo QueryInfo para realizar la consulta paginada con ordenamiento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorFamiliaGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaGeneral>;
      })
    );
  }
  /**
   * Obtener lista de ConfiguracionProveedorFamiliaGeneral.
   * @param info Objeto de tipo QueryInfo para realizar la consulta paginada con ordenamiento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionProveedorFamiliaGeneral> {
    return this.ConfiguracionProveedorFamiliaGeneralQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionProveedorFamiliaGeneral)
    );
  }

  /**
   * Desactivar un configuracionProveedorFamiliaGeneral.
   * @param idConfiguracionProveedorFamiliaGeneral Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralDesactivarResponse(idConfiguracionProveedorFamiliaGeneral: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaGeneral != null) __params = __params.set('idConfiguracionProveedorFamiliaGeneral', idConfiguracionProveedorFamiliaGeneral.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionProveedorFamiliaGeneral`,
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
   * Desactivar un configuracionProveedorFamiliaGeneral.
   * @param idConfiguracionProveedorFamiliaGeneral Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaGeneralDesactivar(idConfiguracionProveedorFamiliaGeneral: string): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaGeneralDesactivarResponse(idConfiguracionProveedorFamiliaGeneral).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un ConfiguracionProveedorFamiliaProducto por su idConfiguracionProveedorFamiliaProducto
   * @param idConfiguracionProveedorFamiliaProducto Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoObtenerResponse(idConfiguracionProveedorFamiliaProducto: string): __Observable<__StrictHttpResponse<ConfiguracionProveedorFamiliaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaProducto != null) __params = __params.set('idConfiguracionProveedorFamiliaProducto', idConfiguracionProveedorFamiliaProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionProveedorFamiliaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionProveedorFamiliaProducto>;
      })
    );
  }
  /**
   * Obtener un ConfiguracionProveedorFamiliaProducto por su idConfiguracionProveedorFamiliaProducto
   * @param idConfiguracionProveedorFamiliaProducto Identificador de elemento.
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoObtener(idConfiguracionProveedorFamiliaProducto: string): __Observable<ConfiguracionProveedorFamiliaProducto> {
    return this.ConfiguracionProveedorFamiliaProductoObtenerResponse(idConfiguracionProveedorFamiliaProducto).pipe(
      __map(_r => _r.body as ConfiguracionProveedorFamiliaProducto)
    );
  }

  /**
   * Guardar o actualizar un ConfiguracionProveedorFamiliaProducto.
   * @param configuracionProveedorFamiliaProducto Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoGuardarOActualizarResponse(configuracionProveedorFamiliaProducto: ConfiguracionProveedorFamiliaProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = configuracionProveedorFamiliaProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionProveedorFamiliaProducto`,
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
   * Guardar o actualizar un ConfiguracionProveedorFamiliaProducto.
   * @param configuracionProveedorFamiliaProducto Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoGuardarOActualizar(configuracionProveedorFamiliaProducto: ConfiguracionProveedorFamiliaProducto): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaProductoGuardarOActualizarResponse(configuracionProveedorFamiliaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionProveedorFamiliaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionProveedorFamiliaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionProveedorFamiliaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionProveedorFamiliaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionProveedorFamiliaProducto> {
    return this.ConfiguracionProveedorFamiliaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionProveedorFamiliaProducto)
    );
  }

  /**
   * Desactivar un ConfiguracionProveedorFamiliaProducto.
   * @param idConfiguracionProveedorFamiliaProducto Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoDesactivarResponse(idConfiguracionProveedorFamiliaProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionProveedorFamiliaProducto != null) __params = __params.set('idConfiguracionProveedorFamiliaProducto', idConfiguracionProveedorFamiliaProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionProveedorFamiliaProducto`,
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
   * Desactivar un ConfiguracionProveedorFamiliaProducto.
   * @param idConfiguracionProveedorFamiliaProducto Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionProveedorFamiliaProductoDesactivar(idConfiguracionProveedorFamiliaProducto: string): __Observable<string> {
    return this.ConfiguracionProveedorFamiliaProductoDesactivarResponse(idConfiguracionProveedorFamiliaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un ConfiguracionTiempoEntregaProveedorFamilia por su idConfiguracionTiempoEntregaProveedorFamilia
   * @param idConfiguracionTiempoEntregaProveedorFamilia Identificador de elemento.
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaObtenerResponse(idConfiguracionTiempoEntregaProveedorFamilia: string): __Observable<__StrictHttpResponse<ConfiguracionTiempoEntregaProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionTiempoEntregaProveedorFamilia != null) __params = __params.set('idConfiguracionTiempoEntregaProveedorFamilia', idConfiguracionTiempoEntregaProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionTiempoEntregaProveedorFamilia>;
      })
    );
  }
  /**
   * Obtener un ConfiguracionTiempoEntregaProveedorFamilia por su idConfiguracionTiempoEntregaProveedorFamilia
   * @param idConfiguracionTiempoEntregaProveedorFamilia Identificador de elemento.
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaObtener(idConfiguracionTiempoEntregaProveedorFamilia: string): __Observable<ConfiguracionTiempoEntregaProveedorFamilia> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaObtenerResponse(idConfiguracionTiempoEntregaProveedorFamilia).pipe(
      __map(_r => _r.body as ConfiguracionTiempoEntregaProveedorFamilia)
    );
  }

  /**
   * Guardar o actualizar un ConfiguracionTiempoEntregaProveedorFamilia.
   * @param configuracionTiempoEntregaProveedorFamilia Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaGuardarOActualizarResponse(configuracionTiempoEntregaProveedorFamilia: ConfiguracionTiempoEntregaProveedorFamilia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = configuracionTiempoEntregaProveedorFamilia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamilia`,
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
   * Guardar o actualizar un ConfiguracionTiempoEntregaProveedorFamilia.
   * @param configuracionTiempoEntregaProveedorFamilia Elemento a guardar o actualizar.
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaGuardarOActualizar(configuracionTiempoEntregaProveedorFamilia: ConfiguracionTiempoEntregaProveedorFamilia): __Observable<string> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaGuardarOActualizarResponse(configuracionTiempoEntregaProveedorFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionTiempoEntregaProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionTiempoEntregaProveedorFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionTiempoEntregaProveedorFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionTiempoEntregaProveedorFamilia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionTiempoEntregaProveedorFamilia> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionTiempoEntregaProveedorFamilia)
    );
  }

  /**
   * Desactivar un ConfiguracionTiempoEntregaProveedorFamilia.
   * @param idConfiguracionTiempoEntregaProveedorFamilia Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaDesactivarResponse(idConfiguracionTiempoEntregaProveedorFamilia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionTiempoEntregaProveedorFamilia != null) __params = __params.set('idConfiguracionTiempoEntregaProveedorFamilia', idConfiguracionTiempoEntregaProveedorFamilia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamilia`,
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
   * Desactivar un ConfiguracionTiempoEntregaProveedorFamilia.
   * @param idConfiguracionTiempoEntregaProveedorFamilia Identificador de elemento a desactivar.
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaDesactivar(idConfiguracionTiempoEntregaProveedorFamilia: string): __Observable<string> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaDesactivarResponse(idConfiguracionTiempoEntregaProveedorFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @param idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega Identificador de
   * ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObtenerResponse(idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: string): __Observable<__StrictHttpResponse<ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega != null) __params = __params.set('idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega', idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @param idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega Identificador de
   * ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObtener(idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: string): __Observable<ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObtenerResponse(idConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega).pipe(
      __map(_r => _r.body as ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @param ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaGuardarOActualizarResponse(ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega`,
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
   * Guardar o actualizar ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @param ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaGuardarOActualizar(ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega): __Observable<string> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaGuardarOActualizarResponse(ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega> {
    return this.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega)
    );
  }
}

module ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService {

  /**
   * Parameters for ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedor
   */
  export interface ConfiguracionPrecioProveedorFamiliaDesactivarComisionesUtilidadProveedorParams {

    /**
     * Identificador de MarcaFamiliaCatIndustria por Sector e Industria de la marcaFamilia
     */
    idMarcaFamiliaCatIndustria: string;

    /**
     * Identificador de registro de ConfiguracionPrecioProveedorFamilia
     */
    idConfiguracionPrecioProveedorFamilia: string;
  }

  /**
   * Parameters for ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedor
   */
  export interface ConfiguracionPrecioProveedorFamiliaDesactivarConfiguracionProveedorParams {

    /**
     * Identificador de registro de ConfiguracionPrecioProveedorFamilia
     */
    idConfiguracionPrecioProveedorFamilia: string;

    /**
     * identificador de Nivel de Configuracion (Familia, PrecioLista, AgrupadorCaracteristica o Producto)
     */
    NivelConfiguracion?: string;
  }
}

export { ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService }
