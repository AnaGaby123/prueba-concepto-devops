/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MarcaFamilia } from '../models/marca-familia';
import { QueryResultMarcaFamilia } from '../models/query-result-marca-familia';
import { QueryInfo } from '../models/query-info';
import { MarcaFamiliaCatIndustria } from '../models/marca-familia-cat-industria';
import { QueryResultMarcaFamiliaCatIndustria } from '../models/query-result-marca-familia-cat-industria';
import { VCatMarcaFamiliaCatIndustria } from '../models/vcat-marca-familia-cat-industria';
import { GroupQueryResultVMarcaFamilia } from '../models/group-query-result-vmarca-familia';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVMarcaFamilia } from '../models/query-result-vmarca-familia';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosMarcasFamiliasService extends __BaseService {
  static readonly MarcaFamiliaObtenerPath = '/MarcaFamilia';
  static readonly MarcaFamiliaGuardarOActualizarPath = '/MarcaFamilia';
  static readonly MarcaFamiliaQueryResultPath = '/MarcaFamilia';
  static readonly MarcaFamiliaDesactivarPath = '/MarcaFamilia';
  static readonly MarcaFamiliaCatIndustriaObtenerPath = '/MarcaFamiliaCatIndustria';
  static readonly MarcaFamiliaCatIndustriaGuardarOActualizarPath = '/MarcaFamiliaCatIndustria';
  static readonly MarcaFamiliaCatIndustriaQueryResultPath = '/MarcaFamiliaCatIndustria';
  static readonly MarcaFamiliaCatIndustriaDesactivarPath = '/MarcaFamiliaCatIndustria';
  static readonly vCatMarcaFamiliaCatIndustriaProcessPath = '/vCatMarcaFamiliaCatIndustria';
  static readonly vMarcaFamiliaGroupQueryResultPath = '/GrupoListavMarcaFamilia';
  static readonly vMarcaFamiliaQueryResultPath = '/vMarcaFamilia';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener una MarcaFamilia por su idMarcaFamilia.
   * @param idMarcaFamilia Identificador del MarcaFamilia.
   * @return OK
   */
  MarcaFamiliaObtenerResponse(idMarcaFamilia: string): __Observable<__StrictHttpResponse<MarcaFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamilia != null) __params = __params.set('idMarcaFamilia', idMarcaFamilia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MarcaFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamilia>;
      })
    );
  }
  /**
   * Obtener una MarcaFamilia por su idMarcaFamilia.
   * @param idMarcaFamilia Identificador del MarcaFamilia.
   * @return OK
   */
  MarcaFamiliaObtener(idMarcaFamilia: string): __Observable<MarcaFamilia> {
    return this.MarcaFamiliaObtenerResponse(idMarcaFamilia).pipe(
      __map(_r => _r.body as MarcaFamilia)
    );
  }

  /**
   * Guardar o actualizar una MarcaFamilia.
   * @param MarcaFamilia MarcaFamilia a guardar o actualizar en el sistema.
   * @return OK
   */
  MarcaFamiliaGuardarOActualizarResponse(MarcaFamilia: MarcaFamilia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MarcaFamilia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/MarcaFamilia`,
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
   * Guardar o actualizar una MarcaFamilia.
   * @param MarcaFamilia MarcaFamilia a guardar o actualizar en el sistema.
   * @return OK
   */
  MarcaFamiliaGuardarOActualizar(MarcaFamilia: MarcaFamilia): __Observable<string> {
    return this.MarcaFamiliaGuardarOActualizarResponse(MarcaFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de MarcaFamilia.
   * @param info Objeto de tipo QueryInfo para obtener la lista paginada.
   * @return OK
   */
  MarcaFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultMarcaFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/MarcaFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultMarcaFamilia>;
      })
    );
  }
  /**
   * Obtener lista de MarcaFamilia.
   * @param info Objeto de tipo QueryInfo para obtener la lista paginada.
   * @return OK
   */
  MarcaFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultMarcaFamilia> {
    return this.MarcaFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultMarcaFamilia)
    );
  }

  /**
   * Desactivar una MarcaFamilia.
   * @param idMarcaFamilia Identificador del MarcaFamilia a ser desactivado.
   * @return OK
   */
  MarcaFamiliaDesactivarResponse(idMarcaFamilia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamilia != null) __params = __params.set('idMarcaFamilia', idMarcaFamilia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/MarcaFamilia`,
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
   * Desactivar una MarcaFamilia.
   * @param idMarcaFamilia Identificador del MarcaFamilia a ser desactivado.
   * @return OK
   */
  MarcaFamiliaDesactivar(idMarcaFamilia: string): __Observable<string> {
    return this.MarcaFamiliaDesactivarResponse(idMarcaFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de MarcaFamiliaCatIndustria
   * @param idMarcaFamiliaCatIndustria Identificador de MarcaFamiliaCatIndustria
   * @return OK
   */
  MarcaFamiliaCatIndustriaObtenerResponse(idMarcaFamiliaCatIndustria: string): __Observable<__StrictHttpResponse<MarcaFamiliaCatIndustria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamiliaCatIndustria != null) __params = __params.set('idMarcaFamiliaCatIndustria', idMarcaFamiliaCatIndustria.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MarcaFamiliaCatIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamiliaCatIndustria>;
      })
    );
  }
  /**
   * Consultar registro de MarcaFamiliaCatIndustria
   * @param idMarcaFamiliaCatIndustria Identificador de MarcaFamiliaCatIndustria
   * @return OK
   */
  MarcaFamiliaCatIndustriaObtener(idMarcaFamiliaCatIndustria: string): __Observable<MarcaFamiliaCatIndustria> {
    return this.MarcaFamiliaCatIndustriaObtenerResponse(idMarcaFamiliaCatIndustria).pipe(
      __map(_r => _r.body as MarcaFamiliaCatIndustria)
    );
  }

  /**
   * Guardar o actualizar MarcaFamiliaCatIndustria
   * @param MarcaFamiliaCatIndustria MarcaFamiliaCatIndustria
   * @return OK
   */
  MarcaFamiliaCatIndustriaGuardarOActualizarResponse(MarcaFamiliaCatIndustria: MarcaFamiliaCatIndustria): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MarcaFamiliaCatIndustria;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/MarcaFamiliaCatIndustria`,
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
   * Guardar o actualizar MarcaFamiliaCatIndustria
   * @param MarcaFamiliaCatIndustria MarcaFamiliaCatIndustria
   * @return OK
   */
  MarcaFamiliaCatIndustriaGuardarOActualizar(MarcaFamiliaCatIndustria: MarcaFamiliaCatIndustria): __Observable<string> {
    return this.MarcaFamiliaCatIndustriaGuardarOActualizarResponse(MarcaFamiliaCatIndustria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de MarcaFamiliaCatIndustria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaCatIndustriaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultMarcaFamiliaCatIndustria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/MarcaFamiliaCatIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultMarcaFamiliaCatIndustria>;
      })
    );
  }
  /**
   * Consultar lista paginada de MarcaFamiliaCatIndustria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaCatIndustriaQueryResult(info: QueryInfo): __Observable<QueryResultMarcaFamiliaCatIndustria> {
    return this.MarcaFamiliaCatIndustriaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultMarcaFamiliaCatIndustria)
    );
  }

  /**
   * Desactivar registro de MarcaFamiliaCatIndustria
   * @param idMarcaFamiliaCatIndustria Identificador de registro de MarcaFamiliaCatIndustria
   * @return OK
   */
  MarcaFamiliaCatIndustriaDesactivarResponse(idMarcaFamiliaCatIndustria: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamiliaCatIndustria != null) __params = __params.set('idMarcaFamiliaCatIndustria', idMarcaFamiliaCatIndustria.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/MarcaFamiliaCatIndustria`,
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
   * Desactivar registro de MarcaFamiliaCatIndustria
   * @param idMarcaFamiliaCatIndustria Identificador de registro de MarcaFamiliaCatIndustria
   * @return OK
   */
  MarcaFamiliaCatIndustriaDesactivar(idMarcaFamiliaCatIndustria: string): __Observable<string> {
    return this.MarcaFamiliaCatIndustriaDesactivarResponse(idMarcaFamiliaCatIndustria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process vCatMarcaFamiliaCatIndustria
   * @param idMarca undefined
   * @return OK
   */
  vCatMarcaFamiliaCatIndustriaProcessResponse(idMarca: string): __Observable<__StrictHttpResponse<Array<VCatMarcaFamiliaCatIndustria>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarca != null) __params = __params.set('idMarca', idMarca.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vCatMarcaFamiliaCatIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VCatMarcaFamiliaCatIndustria>>;
      })
    );
  }
  /**
   * Process vCatMarcaFamiliaCatIndustria
   * @param idMarca undefined
   * @return OK
   */
  vCatMarcaFamiliaCatIndustriaProcess(idMarca: string): __Observable<Array<VCatMarcaFamiliaCatIndustria>> {
    return this.vCatMarcaFamiliaCatIndustriaProcessResponse(idMarca).pipe(
      __map(_r => _r.body as Array<VCatMarcaFamiliaCatIndustria>)
    );
  }

  /**
   * Consultar lista agrupada paginada de vMarcaFamilia
   * @param info Filtros, agrupado y ordenamientos
   * @return OK
   */
  vMarcaFamiliaGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVMarcaFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavMarcaFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVMarcaFamilia>;
      })
    );
  }
  /**
   * Consultar lista agrupada paginada de vMarcaFamilia
   * @param info Filtros, agrupado y ordenamientos
   * @return OK
   */
  vMarcaFamiliaGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVMarcaFamilia> {
    return this.vMarcaFamiliaGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVMarcaFamilia)
    );
  }

  /**
   * Consultar lista paginada de vMarcaFamilia
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vMarcaFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVMarcaFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vMarcaFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVMarcaFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de vMarcaFamilia
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vMarcaFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultVMarcaFamilia> {
    return this.vMarcaFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVMarcaFamilia)
    );
  }
}

module ConfiguracionProductosMarcasFamiliasService {
}

export { ConfiguracionProductosMarcasFamiliasService }
