/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AgrupadorCaracteristica } from '../models/agrupador-caracteristica';
import { QueryResultAgrupadorCaracteristica } from '../models/query-result-agrupador-caracteristica';
import { QueryInfo } from '../models/query-info';
import { ConfiguracionTiempoEntregaProveedor } from '../models/configuracion-tiempo-entrega-proveedor';
import { QueryResultConfiguracionTiempoEntregaProveedor } from '../models/query-result-configuracion-tiempo-entrega-proveedor';
import { ContactoProveedor } from '../models/contacto-proveedor';
import { QueryResultContactoProveedor } from '../models/query-result-contacto-proveedor';
import { MarcaFamiliaProveedor } from '../models/marca-familia-proveedor';
import { QueryResultMarcaFamiliaProveedor } from '../models/query-result-marca-familia-proveedor';
import { MarcaFamiliaProveedorConsolidacion } from '../models/marca-familia-proveedor-consolidacion';
import { QueryResultMarcaFamiliaProveedorConsolidacion } from '../models/query-result-marca-familia-proveedor-consolidacion';
import { MarcaFamiliaProveedorIndustria } from '../models/marca-familia-proveedor-industria';
import { QueryResultMarcaFamiliaProveedorIndustria } from '../models/query-result-marca-familia-proveedor-industria';
import { ProveedorAgenteAduanal } from '../models/proveedor-agente-aduanal';
import { QueryResultProveedorAgenteAduanal } from '../models/query-result-proveedor-agente-aduanal';
import { ProveedorEmpresa } from '../models/proveedor-empresa';
import { QueryResultProveedorEmpresa } from '../models/query-result-proveedor-empresa';
import { ProveedorRegalias } from '../models/proveedor-regalias';
import { QueryResultProveedorRegalias } from '../models/query-result-proveedor-regalias';
import { QueryResultVAgrupadorCaracteristica } from '../models/query-result-vagrupador-caracteristica';
import { GroupQueryResultVMarcaDetalle } from '../models/group-query-result-vmarca-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVMarcaDetalle } from '../models/query-result-vmarca-detalle';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProveedoresRelacionesService extends __BaseService {
  static readonly AgrupadorCaracteristicaObtenerPath = '/AgrupadorCaracteristica';
  static readonly AgrupadorCaracteristicaGuardarOActualizarPath = '/AgrupadorCaracteristica';
  static readonly AgrupadorCaracteristicaQueryResultPath = '/AgrupadorCaracteristica';
  static readonly AgrupadorCaracteristicaDesactivarPath = '/AgrupadorCaracteristica';
  static readonly ConfiguracionTiempoEntregaProveedorObtenerPath = '/ConfiguracionTiempoEntregaProveedor';
  static readonly ConfiguracionTiempoEntregaProveedorGuardarOActualizarPath = '/ConfiguracionTiempoEntregaProveedor';
  static readonly ConfiguracionTiempoEntregaProveedorQueryResultPath = '/ConfiguracionTiempoEntregaProveedor';
  static readonly ContactoProveedorObtenerPath = '/ContactoProveedor';
  static readonly ContactoProveedorGuardarOActualizarPath = '/ContactoProveedor';
  static readonly ContactoProveedorQueryResultPath = '/ContactoProveedor';
  static readonly ContactoProveedorDesactivarPath = '/ContactoProveedor';
  static readonly MarcaFamiliaProveedorPorValidarPath = '/PorValidarMarcaFamiliaProveedor';
  static readonly MarcaFamiliaProveedorObtenerPath = '/MarcaFamiliaProveedor';
  static readonly MarcaFamiliaProveedorGuardarOActualizarPath = '/MarcaFamiliaProveedor';
  static readonly MarcaFamiliaProveedorQueryResultPath = '/MarcaFamiliaProveedor';
  static readonly MarcaFamiliaProveedorConsolidacionObtenerPath = '/MarcaFamiliaProveedorConsolidacion';
  static readonly MarcaFamiliaProveedorConsolidacionGuardarOActualizarPath = '/MarcaFamiliaProveedorConsolidacion';
  static readonly MarcaFamiliaProveedorConsolidacionQueryResultPath = '/MarcaFamiliaProveedorConsolidacion';
  static readonly MarcaFamiliaProveedorIndustriaObtenerPath = '/MarcaFamiliaProveedorIndustria';
  static readonly MarcaFamiliaProveedorIndustriaGuardarOActualizarPath = '/MarcaFamiliaProveedorIndustria';
  static readonly MarcaFamiliaProveedorIndustriaQueryResultPath = '/MarcaFamiliaProveedorIndustria';
  static readonly ProveedorAgenteAduanalObtenerPath = '/ProveedorAgenteAduanal';
  static readonly ProveedorAgenteAduanalGuardarOActualizarPath = '/ProveedorAgenteAduanal';
  static readonly ProveedorAgenteAduanalQueryResultPath = '/ProveedorAgenteAduanal';
  static readonly ProveedorAgenteAduanalDesactivarPath = '/ProveedorAgenteAduanal';
  static readonly ProveedorEmpresaObtenerPath = '/ProveedorEmpresa';
  static readonly ProveedorEmpresaGuardarOActualizarPath = '/ProveedorEmpresa';
  static readonly ProveedorEmpresaQueryResultPath = '/ProveedorEmpresa';
  static readonly ProveedorEmpresaDesactivarPath = '/ProveedorEmpresa';
  static readonly ProveedorRegaliasDesactivarPath = '/GrupoListaProveedorRegalias';
  static readonly ProveedorRegaliasObtenerPath = '/ProveedorRegalias';
  static readonly ProveedorRegaliasGuardarOActualizarPath = '/ProveedorRegalias';
  static readonly ProveedorRegaliasQueryResultPath = '/ProveedorRegalias';
  static readonly vAgrupadorCaracteristicaQueryResultPath = '/vAgrupadorCaracteristica';
  static readonly vMarcaDetalleGroupQueryResultPath = '/GrupoListavMarcaDetalle';
  static readonly vMarcaDetalleQueryResultPath = '/vMarcaDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de AgrupadorCaracteristica
   * @param idAgrupadorCaracteristica Identificador de AgrupadorCaracteristica
   * @return OK
   */
  AgrupadorCaracteristicaObtenerResponse(idAgrupadorCaracteristica: string): __Observable<__StrictHttpResponse<AgrupadorCaracteristica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAgrupadorCaracteristica != null) __params = __params.set('idAgrupadorCaracteristica', idAgrupadorCaracteristica.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/AgrupadorCaracteristica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AgrupadorCaracteristica>;
      })
    );
  }
  /**
   * Consultar registro de AgrupadorCaracteristica
   * @param idAgrupadorCaracteristica Identificador de AgrupadorCaracteristica
   * @return OK
   */
  AgrupadorCaracteristicaObtener(idAgrupadorCaracteristica: string): __Observable<AgrupadorCaracteristica> {
    return this.AgrupadorCaracteristicaObtenerResponse(idAgrupadorCaracteristica).pipe(
      __map(_r => _r.body as AgrupadorCaracteristica)
    );
  }

  /**
   * Guardar o actualizar AgrupadorCaracteristica
   * @param AgrupadorCaracteristica AgrupadorCaracteristica
   * @return OK
   */
  AgrupadorCaracteristicaGuardarOActualizarResponse(AgrupadorCaracteristica: AgrupadorCaracteristica): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = AgrupadorCaracteristica;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/AgrupadorCaracteristica`,
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
   * Guardar o actualizar AgrupadorCaracteristica
   * @param AgrupadorCaracteristica AgrupadorCaracteristica
   * @return OK
   */
  AgrupadorCaracteristicaGuardarOActualizar(AgrupadorCaracteristica: AgrupadorCaracteristica): __Observable<string> {
    return this.AgrupadorCaracteristicaGuardarOActualizarResponse(AgrupadorCaracteristica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de AgrupadorCaracteristica
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  AgrupadorCaracteristicaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAgrupadorCaracteristica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AgrupadorCaracteristica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAgrupadorCaracteristica>;
      })
    );
  }
  /**
   * Consultar lista paginada de AgrupadorCaracteristica
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  AgrupadorCaracteristicaQueryResult(info: QueryInfo): __Observable<QueryResultAgrupadorCaracteristica> {
    return this.AgrupadorCaracteristicaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAgrupadorCaracteristica)
    );
  }

  /**
   * Desactivar registro de AgrupadorCaracteristica
   * @param idAgrupadorCaracteristica Identificador de registro de AgrupadorCaracteristica
   * @return OK
   */
  AgrupadorCaracteristicaDesactivarResponse(idAgrupadorCaracteristica: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAgrupadorCaracteristica != null) __params = __params.set('idAgrupadorCaracteristica', idAgrupadorCaracteristica.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/AgrupadorCaracteristica`,
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
   * Desactivar registro de AgrupadorCaracteristica
   * @param idAgrupadorCaracteristica Identificador de registro de AgrupadorCaracteristica
   * @return OK
   */
  AgrupadorCaracteristicaDesactivar(idAgrupadorCaracteristica: string): __Observable<string> {
    return this.AgrupadorCaracteristicaDesactivarResponse(idAgrupadorCaracteristica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ConfiguracionTiempoEntregaProveedor
   * @param idConfiguracionTiempoEntregaProveedor Identificador de ConfiguracionTiempoEntregaProveedor
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorObtenerResponse(idConfiguracionTiempoEntregaProveedor: string): __Observable<__StrictHttpResponse<ConfiguracionTiempoEntregaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionTiempoEntregaProveedor != null) __params = __params.set('idConfiguracionTiempoEntregaProveedor', idConfiguracionTiempoEntregaProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionTiempoEntregaProveedor>;
      })
    );
  }
  /**
   * Consultar registro de ConfiguracionTiempoEntregaProveedor
   * @param idConfiguracionTiempoEntregaProveedor Identificador de ConfiguracionTiempoEntregaProveedor
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorObtener(idConfiguracionTiempoEntregaProveedor: string): __Observable<ConfiguracionTiempoEntregaProveedor> {
    return this.ConfiguracionTiempoEntregaProveedorObtenerResponse(idConfiguracionTiempoEntregaProveedor).pipe(
      __map(_r => _r.body as ConfiguracionTiempoEntregaProveedor)
    );
  }

  /**
   * Guardar o actualizar ConfiguracionTiempoEntregaProveedor
   * @param ConfiguracionTiempoEntregaProveedor ConfiguracionTiempoEntregaProveedor
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorGuardarOActualizarResponse(ConfiguracionTiempoEntregaProveedor: ConfiguracionTiempoEntregaProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionTiempoEntregaProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedor`,
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
   * Guardar o actualizar ConfiguracionTiempoEntregaProveedor
   * @param ConfiguracionTiempoEntregaProveedor ConfiguracionTiempoEntregaProveedor
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorGuardarOActualizar(ConfiguracionTiempoEntregaProveedor: ConfiguracionTiempoEntregaProveedor): __Observable<string> {
    return this.ConfiguracionTiempoEntregaProveedorGuardarOActualizarResponse(ConfiguracionTiempoEntregaProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConfiguracionTiempoEntregaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionTiempoEntregaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionTiempoEntregaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionTiempoEntregaProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConfiguracionTiempoEntregaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConfiguracionTiempoEntregaProveedorQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionTiempoEntregaProveedor> {
    return this.ConfiguracionTiempoEntregaProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionTiempoEntregaProveedor)
    );
  }

  /**
   * Consultar registro de ContactoProveedor
   * @param idContactoProveedor Identificador de ContactoProveedor
   * @return OK
   */
  ContactoProveedorObtenerResponse(idContactoProveedor: string): __Observable<__StrictHttpResponse<ContactoProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContactoProveedor != null) __params = __params.set('idContactoProveedor', idContactoProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContactoProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactoProveedor>;
      })
    );
  }
  /**
   * Consultar registro de ContactoProveedor
   * @param idContactoProveedor Identificador de ContactoProveedor
   * @return OK
   */
  ContactoProveedorObtener(idContactoProveedor: string): __Observable<ContactoProveedor> {
    return this.ContactoProveedorObtenerResponse(idContactoProveedor).pipe(
      __map(_r => _r.body as ContactoProveedor)
    );
  }

  /**
   * Guardar o actualizar ContactoProveedor
   * @param ContactoProveedor ContactoProveedor
   * @return OK
   */
  ContactoProveedorGuardarOActualizarResponse(ContactoProveedor: ContactoProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContactoProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContactoProveedor`,
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
   * Guardar o actualizar ContactoProveedor
   * @param ContactoProveedor ContactoProveedor
   * @return OK
   */
  ContactoProveedorGuardarOActualizar(ContactoProveedor: ContactoProveedor): __Observable<string> {
    return this.ContactoProveedorGuardarOActualizarResponse(ContactoProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContactoProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContactoProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContactoProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContactoProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContactoProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContactoProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContactoProveedorQueryResult(info: QueryInfo): __Observable<QueryResultContactoProveedor> {
    return this.ContactoProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContactoProveedor)
    );
  }

  /**
   * Desactivar registro de ContactoProveedor
   * @param idContactoProveedor Identificador de registro de ContactoProveedor
   * @return OK
   */
  ContactoProveedorDesactivarResponse(idContactoProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContactoProveedor != null) __params = __params.set('idContactoProveedor', idContactoProveedor.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ContactoProveedor`,
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
   * Desactivar registro de ContactoProveedor
   * @param idContactoProveedor Identificador de registro de ContactoProveedor
   * @return OK
   */
  ContactoProveedorDesactivar(idContactoProveedor: string): __Observable<string> {
    return this.ContactoProveedorDesactivarResponse(idContactoProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Se actualiza una MarcaFamiliaProveedor y se pone por Validar
   * @param idMarcaFamiliaProveedor Identificador de MarcaFamiliaProveedor
   * @return OK
   */
  MarcaFamiliaProveedorPorValidarResponse(idMarcaFamiliaProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamiliaProveedor != null) __params = __params.set('idMarcaFamiliaProveedor', idMarcaFamiliaProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/PorValidarMarcaFamiliaProveedor`,
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
   * Se actualiza una MarcaFamiliaProveedor y se pone por Validar
   * @param idMarcaFamiliaProveedor Identificador de MarcaFamiliaProveedor
   * @return OK
   */
  MarcaFamiliaProveedorPorValidar(idMarcaFamiliaProveedor: string): __Observable<string> {
    return this.MarcaFamiliaProveedorPorValidarResponse(idMarcaFamiliaProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de MarcaFamiliaProveedor
   * @param idMarcaFamiliaProveedor Identificador de MarcaFamiliaProveedor
   * @return OK
   */
  MarcaFamiliaProveedorObtenerResponse(idMarcaFamiliaProveedor: string): __Observable<__StrictHttpResponse<MarcaFamiliaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamiliaProveedor != null) __params = __params.set('idMarcaFamiliaProveedor', idMarcaFamiliaProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MarcaFamiliaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamiliaProveedor>;
      })
    );
  }
  /**
   * Consultar registro de MarcaFamiliaProveedor
   * @param idMarcaFamiliaProveedor Identificador de MarcaFamiliaProveedor
   * @return OK
   */
  MarcaFamiliaProveedorObtener(idMarcaFamiliaProveedor: string): __Observable<MarcaFamiliaProveedor> {
    return this.MarcaFamiliaProveedorObtenerResponse(idMarcaFamiliaProveedor).pipe(
      __map(_r => _r.body as MarcaFamiliaProveedor)
    );
  }

  /**
   * Guardar o actualizar MarcaFamiliaProveedor
   * @param MarcaFamiliaProveedor MarcaFamiliaProveedor
   * @return OK
   */
  MarcaFamiliaProveedorGuardarOActualizarResponse(MarcaFamiliaProveedor: MarcaFamiliaProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MarcaFamiliaProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/MarcaFamiliaProveedor`,
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
   * Guardar o actualizar MarcaFamiliaProveedor
   * @param MarcaFamiliaProveedor MarcaFamiliaProveedor
   * @return OK
   */
  MarcaFamiliaProveedorGuardarOActualizar(MarcaFamiliaProveedor: MarcaFamiliaProveedor): __Observable<string> {
    return this.MarcaFamiliaProveedorGuardarOActualizarResponse(MarcaFamiliaProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de MarcaFamiliaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultMarcaFamiliaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/MarcaFamiliaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultMarcaFamiliaProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de MarcaFamiliaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaProveedorQueryResult(info: QueryInfo): __Observable<QueryResultMarcaFamiliaProveedor> {
    return this.MarcaFamiliaProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultMarcaFamiliaProveedor)
    );
  }

  /**
   * Consultar registro de MarcaFamiliaProveedorConsolidacion
   * @param idMarcaFamiliaProveedorConsolidacion Identificador de MarcaFamiliaProveedorConsolidacion
   * @return OK
   */
  MarcaFamiliaProveedorConsolidacionObtenerResponse(idMarcaFamiliaProveedorConsolidacion: string): __Observable<__StrictHttpResponse<MarcaFamiliaProveedorConsolidacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamiliaProveedorConsolidacion != null) __params = __params.set('idMarcaFamiliaProveedorConsolidacion', idMarcaFamiliaProveedorConsolidacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MarcaFamiliaProveedorConsolidacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamiliaProveedorConsolidacion>;
      })
    );
  }
  /**
   * Consultar registro de MarcaFamiliaProveedorConsolidacion
   * @param idMarcaFamiliaProveedorConsolidacion Identificador de MarcaFamiliaProveedorConsolidacion
   * @return OK
   */
  MarcaFamiliaProveedorConsolidacionObtener(idMarcaFamiliaProveedorConsolidacion: string): __Observable<MarcaFamiliaProveedorConsolidacion> {
    return this.MarcaFamiliaProveedorConsolidacionObtenerResponse(idMarcaFamiliaProveedorConsolidacion).pipe(
      __map(_r => _r.body as MarcaFamiliaProveedorConsolidacion)
    );
  }

  /**
   * Guardar o actualizar MarcaFamiliaProveedorConsolidacion
   * @param MarcaFamiliaProveedorConsolidacion MarcaFamiliaProveedorConsolidacion
   * @return OK
   */
  MarcaFamiliaProveedorConsolidacionGuardarOActualizarResponse(MarcaFamiliaProveedorConsolidacion: MarcaFamiliaProveedorConsolidacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MarcaFamiliaProveedorConsolidacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/MarcaFamiliaProveedorConsolidacion`,
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
   * Guardar o actualizar MarcaFamiliaProveedorConsolidacion
   * @param MarcaFamiliaProveedorConsolidacion MarcaFamiliaProveedorConsolidacion
   * @return OK
   */
  MarcaFamiliaProveedorConsolidacionGuardarOActualizar(MarcaFamiliaProveedorConsolidacion: MarcaFamiliaProveedorConsolidacion): __Observable<string> {
    return this.MarcaFamiliaProveedorConsolidacionGuardarOActualizarResponse(MarcaFamiliaProveedorConsolidacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de MarcaFamiliaProveedorConsolidacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaProveedorConsolidacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultMarcaFamiliaProveedorConsolidacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/MarcaFamiliaProveedorConsolidacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultMarcaFamiliaProveedorConsolidacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de MarcaFamiliaProveedorConsolidacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaProveedorConsolidacionQueryResult(info: QueryInfo): __Observable<QueryResultMarcaFamiliaProveedorConsolidacion> {
    return this.MarcaFamiliaProveedorConsolidacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultMarcaFamiliaProveedorConsolidacion)
    );
  }

  /**
   * Consultar registro de MarcaFamiliaProveedorIndustria
   * @param idMarcaFamiliaProveedorIndustria Identificador de MarcaFamiliaProveedorIndustria
   * @return OK
   */
  MarcaFamiliaProveedorIndustriaObtenerResponse(idMarcaFamiliaProveedorIndustria: string): __Observable<__StrictHttpResponse<MarcaFamiliaProveedorIndustria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idMarcaFamiliaProveedorIndustria != null) __params = __params.set('idMarcaFamiliaProveedorIndustria', idMarcaFamiliaProveedorIndustria.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/MarcaFamiliaProveedorIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MarcaFamiliaProveedorIndustria>;
      })
    );
  }
  /**
   * Consultar registro de MarcaFamiliaProveedorIndustria
   * @param idMarcaFamiliaProveedorIndustria Identificador de MarcaFamiliaProveedorIndustria
   * @return OK
   */
  MarcaFamiliaProveedorIndustriaObtener(idMarcaFamiliaProveedorIndustria: string): __Observable<MarcaFamiliaProveedorIndustria> {
    return this.MarcaFamiliaProveedorIndustriaObtenerResponse(idMarcaFamiliaProveedorIndustria).pipe(
      __map(_r => _r.body as MarcaFamiliaProveedorIndustria)
    );
  }

  /**
   * Guardar o actualizar MarcaFamiliaProveedorIndustria
   * @param MarcaFamiliaProveedorIndustria MarcaFamiliaProveedorIndustria
   * @return OK
   */
  MarcaFamiliaProveedorIndustriaGuardarOActualizarResponse(MarcaFamiliaProveedorIndustria: MarcaFamiliaProveedorIndustria): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = MarcaFamiliaProveedorIndustria;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/MarcaFamiliaProveedorIndustria`,
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
   * Guardar o actualizar MarcaFamiliaProveedorIndustria
   * @param MarcaFamiliaProveedorIndustria MarcaFamiliaProveedorIndustria
   * @return OK
   */
  MarcaFamiliaProveedorIndustriaGuardarOActualizar(MarcaFamiliaProveedorIndustria: MarcaFamiliaProveedorIndustria): __Observable<string> {
    return this.MarcaFamiliaProveedorIndustriaGuardarOActualizarResponse(MarcaFamiliaProveedorIndustria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de MarcaFamiliaProveedorIndustria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaProveedorIndustriaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultMarcaFamiliaProveedorIndustria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/MarcaFamiliaProveedorIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultMarcaFamiliaProveedorIndustria>;
      })
    );
  }
  /**
   * Consultar lista paginada de MarcaFamiliaProveedorIndustria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  MarcaFamiliaProveedorIndustriaQueryResult(info: QueryInfo): __Observable<QueryResultMarcaFamiliaProveedorIndustria> {
    return this.MarcaFamiliaProveedorIndustriaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultMarcaFamiliaProveedorIndustria)
    );
  }

  /**
   * Consultar registro de ProveedorAgenteAduanal
   * @param idProveedorAgenteAduanal Identificador de ProveedorAgenteAduanal
   * @return OK
   */
  ProveedorAgenteAduanalObtenerResponse(idProveedorAgenteAduanal: string): __Observable<__StrictHttpResponse<ProveedorAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedorAgenteAduanal != null) __params = __params.set('idProveedorAgenteAduanal', idProveedorAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProveedorAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProveedorAgenteAduanal>;
      })
    );
  }
  /**
   * Consultar registro de ProveedorAgenteAduanal
   * @param idProveedorAgenteAduanal Identificador de ProveedorAgenteAduanal
   * @return OK
   */
  ProveedorAgenteAduanalObtener(idProveedorAgenteAduanal: string): __Observable<ProveedorAgenteAduanal> {
    return this.ProveedorAgenteAduanalObtenerResponse(idProveedorAgenteAduanal).pipe(
      __map(_r => _r.body as ProveedorAgenteAduanal)
    );
  }

  /**
   * Guardar o actualizar ProveedorAgenteAduanal
   * @param ProveedorAgenteAduanal ProveedorAgenteAduanal
   * @return OK
   */
  ProveedorAgenteAduanalGuardarOActualizarResponse(ProveedorAgenteAduanal: ProveedorAgenteAduanal): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProveedorAgenteAduanal;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProveedorAgenteAduanal`,
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
   * Guardar o actualizar ProveedorAgenteAduanal
   * @param ProveedorAgenteAduanal ProveedorAgenteAduanal
   * @return OK
   */
  ProveedorAgenteAduanalGuardarOActualizar(ProveedorAgenteAduanal: ProveedorAgenteAduanal): __Observable<string> {
    return this.ProveedorAgenteAduanalGuardarOActualizarResponse(ProveedorAgenteAduanal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProveedorAgenteAduanal
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorAgenteAduanalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProveedorAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProveedorAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProveedorAgenteAduanal>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProveedorAgenteAduanal
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorAgenteAduanalQueryResult(info: QueryInfo): __Observable<QueryResultProveedorAgenteAduanal> {
    return this.ProveedorAgenteAduanalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProveedorAgenteAduanal)
    );
  }

  /**
   * Desactivar registro de ProveedorAgenteAduanal
   * @param idProveedorAgenteAduanal Identificador de registro de ProveedorAgenteAduanal
   * @return OK
   */
  ProveedorAgenteAduanalDesactivarResponse(idProveedorAgenteAduanal: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedorAgenteAduanal != null) __params = __params.set('idProveedorAgenteAduanal', idProveedorAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProveedorAgenteAduanal`,
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
   * Desactivar registro de ProveedorAgenteAduanal
   * @param idProveedorAgenteAduanal Identificador de registro de ProveedorAgenteAduanal
   * @return OK
   */
  ProveedorAgenteAduanalDesactivar(idProveedorAgenteAduanal: string): __Observable<string> {
    return this.ProveedorAgenteAduanalDesactivarResponse(idProveedorAgenteAduanal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProveedorEmpresa
   * @param idProveedorEmpresa Identificador de ProveedorEmpresa
   * @return OK
   */
  ProveedorEmpresaObtenerResponse(idProveedorEmpresa: string): __Observable<__StrictHttpResponse<ProveedorEmpresa>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedorEmpresa != null) __params = __params.set('idProveedorEmpresa', idProveedorEmpresa.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProveedorEmpresa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProveedorEmpresa>;
      })
    );
  }
  /**
   * Consultar registro de ProveedorEmpresa
   * @param idProveedorEmpresa Identificador de ProveedorEmpresa
   * @return OK
   */
  ProveedorEmpresaObtener(idProveedorEmpresa: string): __Observable<ProveedorEmpresa> {
    return this.ProveedorEmpresaObtenerResponse(idProveedorEmpresa).pipe(
      __map(_r => _r.body as ProveedorEmpresa)
    );
  }

  /**
   * Guardar o actualizar una relaci�n de proveedor con empresa.
   * @param proveedorEmpresa Relaci�n de proveedor con empresa.
   * @return OK
   */
  ProveedorEmpresaGuardarOActualizarResponse(proveedorEmpresa: ProveedorEmpresa): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = proveedorEmpresa;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProveedorEmpresa`,
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
   * Guardar o actualizar una relaci�n de proveedor con empresa.
   * @param proveedorEmpresa Relaci�n de proveedor con empresa.
   * @return OK
   */
  ProveedorEmpresaGuardarOActualizar(proveedorEmpresa: ProveedorEmpresa): __Observable<string> {
    return this.ProveedorEmpresaGuardarOActualizarResponse(proveedorEmpresa).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProveedorEmpresa
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorEmpresaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProveedorEmpresa>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProveedorEmpresa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProveedorEmpresa>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProveedorEmpresa
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorEmpresaQueryResult(info: QueryInfo): __Observable<QueryResultProveedorEmpresa> {
    return this.ProveedorEmpresaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProveedorEmpresa)
    );
  }

  /**
   * Desactivar registro de ProveedorEmpresa
   * @param idProveedorEmpresa Identificador de registro de ProveedorEmpresa
   * @return OK
   */
  ProveedorEmpresaDesactivarResponse(idProveedorEmpresa: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedorEmpresa != null) __params = __params.set('idProveedorEmpresa', idProveedorEmpresa.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProveedorEmpresa`,
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
   * Desactivar registro de ProveedorEmpresa
   * @param idProveedorEmpresa Identificador de registro de ProveedorEmpresa
   * @return OK
   */
  ProveedorEmpresaDesactivar(idProveedorEmpresa: string): __Observable<string> {
    return this.ProveedorEmpresaDesactivarResponse(idProveedorEmpresa).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar ProveedorRegalias
   * @param idProveedorRegalias undefined
   * @return OK
   */
  ProveedorRegaliasDesactivarResponse(idProveedorRegalias: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedorRegalias != null) __params = __params.set('idProveedorRegalias', idProveedorRegalias.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/GrupoListaProveedorRegalias`,
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
   * Desactivar ProveedorRegalias
   * @param idProveedorRegalias undefined
   * @return OK
   */
  ProveedorRegaliasDesactivar(idProveedorRegalias: string): __Observable<string> {
    return this.ProveedorRegaliasDesactivarResponse(idProveedorRegalias).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProveedorRegalias
   * @param idProveedorRegalias Identificador de ProveedorRegalias
   * @return OK
   */
  ProveedorRegaliasObtenerResponse(idProveedorRegalias: string): __Observable<__StrictHttpResponse<ProveedorRegalias>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedorRegalias != null) __params = __params.set('idProveedorRegalias', idProveedorRegalias.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProveedorRegalias`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProveedorRegalias>;
      })
    );
  }
  /**
   * Consultar registro de ProveedorRegalias
   * @param idProveedorRegalias Identificador de ProveedorRegalias
   * @return OK
   */
  ProveedorRegaliasObtener(idProveedorRegalias: string): __Observable<ProveedorRegalias> {
    return this.ProveedorRegaliasObtenerResponse(idProveedorRegalias).pipe(
      __map(_r => _r.body as ProveedorRegalias)
    );
  }

  /**
   * Guardar o actualizar ProveedorRegalias
   * @param ProveedorRegalias ProveedorRegalias
   * @return OK
   */
  ProveedorRegaliasGuardarOActualizarResponse(ProveedorRegalias: ProveedorRegalias): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProveedorRegalias;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProveedorRegalias`,
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
   * Guardar o actualizar ProveedorRegalias
   * @param ProveedorRegalias ProveedorRegalias
   * @return OK
   */
  ProveedorRegaliasGuardarOActualizar(ProveedorRegalias: ProveedorRegalias): __Observable<string> {
    return this.ProveedorRegaliasGuardarOActualizarResponse(ProveedorRegalias).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProveedorRegalias
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorRegaliasQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProveedorRegalias>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProveedorRegalias`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProveedorRegalias>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProveedorRegalias
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorRegaliasQueryResult(info: QueryInfo): __Observable<QueryResultProveedorRegalias> {
    return this.ProveedorRegaliasQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProveedorRegalias)
    );
  }

  /**
   * Consultar lista paginada de vAgrupadorCaracteristica
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vAgrupadorCaracteristicaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVAgrupadorCaracteristica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vAgrupadorCaracteristica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVAgrupadorCaracteristica>;
      })
    );
  }
  /**
   * Consultar lista paginada de vAgrupadorCaracteristica
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vAgrupadorCaracteristicaQueryResult(info: QueryInfo): __Observable<QueryResultVAgrupadorCaracteristica> {
    return this.vAgrupadorCaracteristicaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVAgrupadorCaracteristica)
    );
  }

  /**
   * GroupQueryResult vMarcaDetalle
   * @param info undefined
   * @return OK
   */
  vMarcaDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVMarcaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavMarcaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVMarcaDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vMarcaDetalle
   * @param info undefined
   * @return OK
   */
  vMarcaDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVMarcaDetalle> {
    return this.vMarcaDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVMarcaDetalle)
    );
  }

  /**
   * Consultar lista paginada de vMarcaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vMarcaDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVMarcaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vMarcaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVMarcaDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vMarcaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vMarcaDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVMarcaDetalle> {
    return this.vMarcaDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVMarcaDetalle)
    );
  }
}

module ConfiguracionProveedoresRelacionesService {
}

export { ConfiguracionProveedoresRelacionesService }
