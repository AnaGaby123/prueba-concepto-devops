/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Empresa } from '../models/empresa';
import { QueryResultEmpresa } from '../models/query-result-empresa';
import { QueryInfo } from '../models/query-info';
import { EmpresaDatosBancarios } from '../models/empresa-datos-bancarios';
import { QueryResultEmpresaDatosBancarios } from '../models/query-result-empresa-datos-bancarios';
import { GroupQueryResultEmpresaDatosBancariosDetalle } from '../models/group-query-result-empresa-datos-bancarios-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultEmpresaDatosBancariosDetalle } from '../models/query-result-empresa-datos-bancarios-detalle';
import { EstrategiaInterfacturacion } from '../models/estrategia-interfacturacion';
import { QueryResultEstrategiaInterfacturacion } from '../models/query-result-estrategia-interfacturacion';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionEmpresasService extends __BaseService {
  static readonly EmpresaObtenerPath = '/Empresa';
  static readonly EmpresaGuardarOActualizarPath = '/Empresa';
  static readonly EmpresaQueryResultPath = '/Empresa';
  static readonly EmpresaDatosBancariosObtenerPath = '/EmpresaDatosBancarios';
  static readonly EmpresaDatosBancariosGuardarOActualizarPath = '/EmpresaDatosBancarios';
  static readonly EmpresaDatosBancariosQueryResultPath = '/EmpresaDatosBancarios';
  static readonly EmpresaDatosBancariosDesactivarPath = '/EmpresaDatosBancarios';
  static readonly EmpresaDatosBancariosDetalleGroupQueryResultPath = '/GrupoListaEmpresaDatosBancariosDetalle';
  static readonly EmpresaDatosBancariosDetalleQueryResultPath = '/EmpresaDatosBancariosDetalle';
  static readonly EstrategiaInterfacturacionObtenerPath = '/EmpresaEstrategiaInterfacturacion';
  static readonly EstrategiaInterfacturacionGuardarOActualizarPath = '/EmpresaEstrategiaInterfacturacion';
  static readonly EstrategiaInterfacturacionQueryResultPath = '/EmpresaEstrategiaInterfacturacion';
  static readonly EstrategiaInterfacturacionDesactivarPath = '/EmpresaEstrategiaInterfacturacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener una empresa por su idEmpresa.
   * @param idEmpresa Identificador de empresa.
   * @return OK
   */
  EmpresaObtenerResponse(idEmpresa: string): __Observable<__StrictHttpResponse<Empresa>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idEmpresa != null) __params = __params.set('idEmpresa', idEmpresa.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Empresa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Empresa>;
      })
    );
  }
  /**
   * Obtener una empresa por su idEmpresa.
   * @param idEmpresa Identificador de empresa.
   * @return OK
   */
  EmpresaObtener(idEmpresa: string): __Observable<Empresa> {
    return this.EmpresaObtenerResponse(idEmpresa).pipe(
      __map(_r => _r.body as Empresa)
    );
  }

  /**
   * Guardar o actualizar una empresa.
   * @param empresa Empresa.
   * @return OK
   */
  EmpresaGuardarOActualizarResponse(empresa: Empresa): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = empresa;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Empresa`,
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
   * Guardar o actualizar una empresa.
   * @param empresa Empresa.
   * @return OK
   */
  EmpresaGuardarOActualizar(empresa: Empresa): __Observable<string> {
    return this.EmpresaGuardarOActualizarResponse(empresa).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de empresa.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  EmpresaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEmpresa>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Empresa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEmpresa>;
      })
    );
  }
  /**
   * Obtener lista de empresa.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  EmpresaQueryResult(info: QueryInfo): __Observable<QueryResultEmpresa> {
    return this.EmpresaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEmpresa)
    );
  }

  /**
   * Obtener un EmpresaDatosBancarios por su idEmpresaDatosBancarios
   * @param idEmpresaDatosBancarios identificador del EmpresaDatosBancarios
   * @return OK
   */
  EmpresaDatosBancariosObtenerResponse(idEmpresaDatosBancarios: string): __Observable<__StrictHttpResponse<EmpresaDatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idEmpresaDatosBancarios != null) __params = __params.set('idEmpresaDatosBancarios', idEmpresaDatosBancarios.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/EmpresaDatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EmpresaDatosBancarios>;
      })
    );
  }
  /**
   * Obtener un EmpresaDatosBancarios por su idEmpresaDatosBancarios
   * @param idEmpresaDatosBancarios identificador del EmpresaDatosBancarios
   * @return OK
   */
  EmpresaDatosBancariosObtener(idEmpresaDatosBancarios: string): __Observable<EmpresaDatosBancarios> {
    return this.EmpresaDatosBancariosObtenerResponse(idEmpresaDatosBancarios).pipe(
      __map(_r => _r.body as EmpresaDatosBancarios)
    );
  }

  /**
   * Guardar o actualizar un EmpresaDatosBancarios
   * @param empresaDatosBancarios EmpresaDatosBancarios a actualizar o guardar
   * @return OK
   */
  EmpresaDatosBancariosGuardarOActualizarResponse(empresaDatosBancarios: EmpresaDatosBancarios): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = empresaDatosBancarios;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/EmpresaDatosBancarios`,
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
   * Guardar o actualizar un EmpresaDatosBancarios
   * @param empresaDatosBancarios EmpresaDatosBancarios a actualizar o guardar
   * @return OK
   */
  EmpresaDatosBancariosGuardarOActualizar(empresaDatosBancarios: EmpresaDatosBancarios): __Observable<string> {
    return this.EmpresaDatosBancariosGuardarOActualizarResponse(empresaDatosBancarios).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de EmpresaDatosBancarios.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  EmpresaDatosBancariosQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEmpresaDatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/EmpresaDatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEmpresaDatosBancarios>;
      })
    );
  }
  /**
   * Obtener lista de EmpresaDatosBancarios.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  EmpresaDatosBancariosQueryResult(info: QueryInfo): __Observable<QueryResultEmpresaDatosBancarios> {
    return this.EmpresaDatosBancariosQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEmpresaDatosBancarios)
    );
  }

  /**
   * Desactivar EmpresaDatosBancarios
   * @param idEmpresaDatosBancarios undefined
   * @return OK
   */
  EmpresaDatosBancariosDesactivarResponse(idEmpresaDatosBancarios: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idEmpresaDatosBancarios != null) __params = __params.set('idEmpresaDatosBancarios', idEmpresaDatosBancarios.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/EmpresaDatosBancarios`,
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
   * Desactivar EmpresaDatosBancarios
   * @param idEmpresaDatosBancarios undefined
   * @return OK
   */
  EmpresaDatosBancariosDesactivar(idEmpresaDatosBancarios: string): __Observable<string> {
    return this.EmpresaDatosBancariosDesactivarResponse(idEmpresaDatosBancarios).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult EmpresaDatosBancariosDetalle
   * @param info undefined
   * @return OK
   */
  EmpresaDatosBancariosDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultEmpresaDatosBancariosDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaEmpresaDatosBancariosDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultEmpresaDatosBancariosDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult EmpresaDatosBancariosDetalle
   * @param info undefined
   * @return OK
   */
  EmpresaDatosBancariosDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultEmpresaDatosBancariosDetalle> {
    return this.EmpresaDatosBancariosDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultEmpresaDatosBancariosDetalle)
    );
  }

  /**
   * Obtener lista de EmpresaDatosBancariosDetalle.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  EmpresaDatosBancariosDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEmpresaDatosBancariosDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/EmpresaDatosBancariosDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEmpresaDatosBancariosDetalle>;
      })
    );
  }
  /**
   * Obtener lista de EmpresaDatosBancariosDetalle.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  EmpresaDatosBancariosDetalleQueryResult(info: QueryInfo): __Observable<QueryResultEmpresaDatosBancariosDetalle> {
    return this.EmpresaDatosBancariosDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEmpresaDatosBancariosDetalle)
    );
  }

  /**
   * Obtener un EstrategiaInterfacturacion por su idEstrategiaInterfacturacion
   * @param idEstrategiaInterfacturacion identificador del EstrategiaInterfacturacion
   * @return OK
   */
  EstrategiaInterfacturacionObtenerResponse(idEstrategiaInterfacturacion: string): __Observable<__StrictHttpResponse<EstrategiaInterfacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idEstrategiaInterfacturacion != null) __params = __params.set('idEstrategiaInterfacturacion', idEstrategiaInterfacturacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/EmpresaEstrategiaInterfacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EstrategiaInterfacturacion>;
      })
    );
  }
  /**
   * Obtener un EstrategiaInterfacturacion por su idEstrategiaInterfacturacion
   * @param idEstrategiaInterfacturacion identificador del EstrategiaInterfacturacion
   * @return OK
   */
  EstrategiaInterfacturacionObtener(idEstrategiaInterfacturacion: string): __Observable<EstrategiaInterfacturacion> {
    return this.EstrategiaInterfacturacionObtenerResponse(idEstrategiaInterfacturacion).pipe(
      __map(_r => _r.body as EstrategiaInterfacturacion)
    );
  }

  /**
   * Guardar o actualizar un EstrategiaInterfacturacion
   * @param empresaEstrategiaInterfacturacion EstrategiaInterfacturacion a actualizar o guardar
   * @return OK
   */
  EstrategiaInterfacturacionGuardarOActualizarResponse(empresaEstrategiaInterfacturacion: EstrategiaInterfacturacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = empresaEstrategiaInterfacturacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/EmpresaEstrategiaInterfacturacion`,
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
   * Guardar o actualizar un EstrategiaInterfacturacion
   * @param empresaEstrategiaInterfacturacion EstrategiaInterfacturacion a actualizar o guardar
   * @return OK
   */
  EstrategiaInterfacturacionGuardarOActualizar(empresaEstrategiaInterfacturacion: EstrategiaInterfacturacion): __Observable<string> {
    return this.EstrategiaInterfacturacionGuardarOActualizarResponse(empresaEstrategiaInterfacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de EstrategiaInterfacturacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  EstrategiaInterfacturacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEstrategiaInterfacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/EmpresaEstrategiaInterfacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEstrategiaInterfacturacion>;
      })
    );
  }
  /**
   * Obtener lista de EstrategiaInterfacturacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  EstrategiaInterfacturacionQueryResult(info: QueryInfo): __Observable<QueryResultEstrategiaInterfacturacion> {
    return this.EstrategiaInterfacturacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEstrategiaInterfacturacion)
    );
  }

  /**
   * Desactivar una EstrategiaInterfacturacion.
   * @param idEstrategiaInterfacturacion Identificador de EstrategiaInterfacturacion a desactivar.
   * @return OK
   */
  EstrategiaInterfacturacionDesactivarResponse(idEstrategiaInterfacturacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idEstrategiaInterfacturacion != null) __params = __params.set('idEstrategiaInterfacturacion', idEstrategiaInterfacturacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/EmpresaEstrategiaInterfacturacion`,
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
   * Desactivar una EstrategiaInterfacturacion.
   * @param idEstrategiaInterfacturacion Identificador de EstrategiaInterfacturacion a desactivar.
   * @return OK
   */
  EstrategiaInterfacturacionDesactivar(idEstrategiaInterfacturacion: string): __Observable<string> {
    return this.EstrategiaInterfacturacionDesactivarResponse(idEstrategiaInterfacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionEmpresasService {
}

export { ConfiguracionEmpresasService }
