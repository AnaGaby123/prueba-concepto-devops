/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FiltrosMarcaFamiliaObj } from '../models/filtros-marca-familia-obj';
import { Marca } from '../models/marca';
import { QueryResultMarca } from '../models/query-result-marca';
import { QueryInfo } from '../models/query-info';
import { MarcaFamiliaCatIndustriaDetalle } from '../models/marca-familia-cat-industria-detalle';
import { VSectorIndustriaFamilia } from '../models/vsector-industria-familia';
import { GroupQueryResultProveedorMarcaObj } from '../models/group-query-result-proveedor-marca-obj';
import { GroupQueryInfo } from '../models/group-query-info';
import { ProveedorMarcaObj } from '../models/proveedor-marca-obj';
import { QueryResultProveedorMarcaObj } from '../models/query-result-proveedor-marca-obj';
import { QueryResultVMarca } from '../models/query-result-vmarca';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosMarcasService extends __BaseService {
  static readonly FiltrosMarcasObjObtenerPath = '/FiltrosMarcaFamilia';
  static readonly MarcaObtenerPath = '/Marca';
  static readonly MarcaGuardarOActualizarPath = '/Marca';
  static readonly MarcaQueryResultPath = '/Marca';
  static readonly MarcaDesactivarPath = '/Marca';
  static readonly MarcaFamiliaCatIndustriaDetalleObtenerPath = '/MarcaFamiliaCatIndustriaDetalle';
  static readonly MarcaFamiliaCatIndustriaDetalleGuardarOActualizarPath = '/MarcaFamiliaCatIndustriaDetalle';
  static readonly MarcaFamiliaCatIndustriaDetalleObtenerMarcaFamiliaIndustriaSectorPath = '/MarcaFamiliaIndustriaSector';
  static readonly ProveedorMarcaDetalleGroupQueryResultPath = '/GrupoListaProveedorMarcaDetalle';
  static readonly ProveedorMarcaDetalleObtenerPath = '/ProveedorMarcaDetalle';
  static readonly ProveedorMarcaDetalleQueryResultPath = '/ProveedorMarcaDetalle';
  static readonly vMarcaQueryResultPath = '/vMarca';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener los filtros para el modulo marcas
   * @return OK
   */
  FiltrosMarcasObjObtenerResponse(): __Observable<__StrictHttpResponse<FiltrosMarcaFamiliaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/FiltrosMarcaFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiltrosMarcaFamiliaObj>;
      })
    );
  }
  /**
   * Obtener los filtros para el modulo marcas
   * @return OK
   */
  FiltrosMarcasObjObtener(): __Observable<FiltrosMarcaFamiliaObj> {
    return this.FiltrosMarcasObjObtenerResponse().pipe(
      __map(_r => _r.body as FiltrosMarcaFamiliaObj)
    );
  }

  /**
   * Obtener una marca por su idMarca.
   * @param idMarca Identificador del marca.
   * @return OK
   */
  MarcaObtenerResponse(idMarca: string): __Observable<__StrictHttpResponse<Marca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarca != null) __params = __params.set('idMarca', idMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Marca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Marca>;
      })
    );
  }
  /**
   * Obtener una marca por su idMarca.
   * @param idMarca Identificador del marca.
   * @return OK
   */
  MarcaObtener(idMarca: string): __Observable<Marca> {
    return this.MarcaObtenerResponse(idMarca).pipe(
      __map(_r => _r.body as Marca)
    );
  }

  /**
   * Guardar o actualizar una marca.
   * @param marca Marca a guardar o actualizar en el sistema.
   * @return OK
   */
  MarcaGuardarOActualizarResponse(marca: Marca): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = marca;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Marca`,
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
   * Guardar o actualizar una marca.
   * @param marca Marca a guardar o actualizar en el sistema.
   * @return OK
   */
  MarcaGuardarOActualizar(marca: Marca): __Observable<string> {
    return this.MarcaGuardarOActualizarResponse(marca).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de marca.
   * @param info Objeto de tipo QueryInfo para obtener la lista paginada.
   * @return OK
   */
  MarcaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Marca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultMarca>;
      })
    );
  }
  /**
   * Obtener lista de marca.
   * @param info Objeto de tipo QueryInfo para obtener la lista paginada.
   * @return OK
   */
  MarcaQueryResult(info: QueryInfo): __Observable<QueryResultMarca> {
    return this.MarcaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultMarca)
    );
  }

  /**
   * Desactivar una marca por idMarca.
   * @param idMarca Identificador del marca a ser desactivado.
   * @return OK
   */
  MarcaDesactivarResponse(idMarca: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarca != null) __params = __params.set('idMarca', idMarca.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Marca`,
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
   * Desactivar una marca por idMarca.
   * @param idMarca Identificador del marca a ser desactivado.
   * @return OK
   */
  MarcaDesactivar(idMarca: string): __Observable<string> {
    return this.MarcaDesactivarResponse(idMarca).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener detalle de configuracion de marca por su idMarca
   * @param idMarca
   * @return OK
   */
  MarcaFamiliaCatIndustriaDetalleObtenerResponse(idMarca?: string): __Observable<__StrictHttpResponse<MarcaFamiliaCatIndustriaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarca != null) __params = __params.set('idMarca', idMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MarcaFamiliaCatIndustriaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamiliaCatIndustriaDetalle>;
      })
    );
  }
  /**
   * Obtener detalle de configuracion de marca por su idMarca
   * @param idMarca
   * @return OK
   */
  MarcaFamiliaCatIndustriaDetalleObtener(idMarca?: string): __Observable<MarcaFamiliaCatIndustriaDetalle> {
    return this.MarcaFamiliaCatIndustriaDetalleObtenerResponse(idMarca).pipe(
      __map(_r => _r.body as MarcaFamiliaCatIndustriaDetalle)
    );
  }

  /**
   * Guardar detalle de configuración por marca
   * @param MarcaFamiliaCatIndustriaDetalle
   * @return OK
   */
  MarcaFamiliaCatIndustriaDetalleGuardarOActualizarResponse(MarcaFamiliaCatIndustriaDetalle: MarcaFamiliaCatIndustriaDetalle): __Observable<__StrictHttpResponse<MarcaFamiliaCatIndustriaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MarcaFamiliaCatIndustriaDetalle;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/MarcaFamiliaCatIndustriaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamiliaCatIndustriaDetalle>;
      })
    );
  }
  /**
   * Guardar detalle de configuración por marca
   * @param MarcaFamiliaCatIndustriaDetalle
   * @return OK
   */
  MarcaFamiliaCatIndustriaDetalleGuardarOActualizar(MarcaFamiliaCatIndustriaDetalle: MarcaFamiliaCatIndustriaDetalle): __Observable<MarcaFamiliaCatIndustriaDetalle> {
    return this.MarcaFamiliaCatIndustriaDetalleGuardarOActualizarResponse(MarcaFamiliaCatIndustriaDetalle).pipe(
      __map(_r => _r.body as MarcaFamiliaCatIndustriaDetalle)
    );
  }

  /**
   * Obtener detalle de configuracion de marca por su idMarca
   * @param info
   * @return OK
   */
  MarcaFamiliaCatIndustriaDetalleObtenerMarcaFamiliaIndustriaSectorResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<VSectorIndustriaFamilia>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/MarcaFamiliaIndustriaSector`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VSectorIndustriaFamilia>>;
      })
    );
  }
  /**
   * Obtener detalle de configuracion de marca por su idMarca
   * @param info
   * @return OK
   */
  MarcaFamiliaCatIndustriaDetalleObtenerMarcaFamiliaIndustriaSector(info: QueryInfo): __Observable<Array<VSectorIndustriaFamilia>> {
    return this.MarcaFamiliaCatIndustriaDetalleObtenerMarcaFamiliaIndustriaSectorResponse(info).pipe(
      __map(_r => _r.body as Array<VSectorIndustriaFamilia>)
    );
  }

  /**
   * GroupQueryResult ProveedorMarcaDetalle
   * @param info undefined
   * @return OK
   */
  ProveedorMarcaDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultProveedorMarcaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaProveedorMarcaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultProveedorMarcaObj>;
      })
    );
  }
  /**
   * GroupQueryResult ProveedorMarcaDetalle
   * @param info undefined
   * @return OK
   */
  ProveedorMarcaDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultProveedorMarcaObj> {
    return this.ProveedorMarcaDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultProveedorMarcaObj)
    );
  }

  /**
   * Obtener ProveedorMarcaDetalle
   * @param idMarca undefined
   * @return OK
   */
  ProveedorMarcaDetalleObtenerResponse(idMarca: string): __Observable<__StrictHttpResponse<ProveedorMarcaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarca != null) __params = __params.set('idMarca', idMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProveedorMarcaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProveedorMarcaObj>;
      })
    );
  }
  /**
   * Obtener ProveedorMarcaDetalle
   * @param idMarca undefined
   * @return OK
   */
  ProveedorMarcaDetalleObtener(idMarca: string): __Observable<ProveedorMarcaObj> {
    return this.ProveedorMarcaDetalleObtenerResponse(idMarca).pipe(
      __map(_r => _r.body as ProveedorMarcaObj)
    );
  }

  /**
   * QueryResult ProveedorMarcaDetalle
   * @param info undefined
   * @return OK
   */
  ProveedorMarcaDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProveedorMarcaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProveedorMarcaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProveedorMarcaObj>;
      })
    );
  }
  /**
   * QueryResult ProveedorMarcaDetalle
   * @param info undefined
   * @return OK
   */
  ProveedorMarcaDetalleQueryResult(info: QueryInfo): __Observable<QueryResultProveedorMarcaObj> {
    return this.ProveedorMarcaDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProveedorMarcaObj)
    );
  }

  /**
   * QueryResult vMarca
   * @param info undefined
   * @return OK
   */
  vMarcaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVMarca>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vMarca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVMarca>;
      })
    );
  }
  /**
   * QueryResult vMarca
   * @param info undefined
   * @return OK
   */
  vMarcaQueryResult(info: QueryInfo): __Observable<QueryResultVMarca> {
    return this.vMarcaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVMarca)
    );
  }
}

module ConfiguracionProductosMarcasService {
}

export { ConfiguracionProductosMarcasService }
