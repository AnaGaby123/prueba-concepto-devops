/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Contacto } from '../models/contacto';
import { QueryResultContacto } from '../models/query-result-contacto';
import { QueryInfo } from '../models/query-info';
import { GroupQueryResultContactoDetalleObj } from '../models/group-query-result-contacto-detalle-obj';
import { GroupQueryInfo } from '../models/group-query-info';
import { ContactoDetalleObj } from '../models/contacto-detalle-obj';
import { QueryResultContactoDetalleObj } from '../models/query-result-contacto-detalle-obj';
import { GroupQueryResultContactoDetalleProvObj } from '../models/group-query-result-contacto-detalle-prov-obj';
import { ContactoDetalleProvObj } from '../models/contacto-detalle-prov-obj';
import { QueryResultContactoDetalleProvObj } from '../models/query-result-contacto-detalle-prov-obj';
import { CorreoElectronico } from '../models/correo-electronico';
import { QueryResultCorreoElectronico } from '../models/query-result-correo-electronico';
import { DatosPersona } from '../models/datos-persona';
import { QueryResultDatosPersona } from '../models/query-result-datos-persona';
import { NumeroTelefonico } from '../models/numero-telefonico';
import { QueryResultNumeroTelefonico } from '../models/query-result-numero-telefonico';
import { VContacto } from '../models/vcontacto';
import { QueryResultVContacto } from '../models/query-result-vcontacto';
import { GroupQueryResultVNumeroTelefonico } from '../models/group-query-result-vnumero-telefonico';
import { QueryResultVNumeroTelefonico } from '../models/query-result-vnumero-telefonico';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionContactosService extends __BaseService {
  static readonly ContactoObtenerPath = '/Contacto';
  static readonly ContactoGuardarOActualizarPath = '/Contacto';
  static readonly ContactoQueryResultPath = '/Contacto';
  static readonly ContactoDesactivarPath = '/Contacto';
  static readonly ContactoDetalleGroupQueryResultPath = '/GrupoListaContactoDetalle';
  static readonly ContactoDetalleObtenerPath = '/ContactoDetalle';
  static readonly ContactoDetalleQueryResultPath = '/ContactoDetalle';
  static readonly ContactoDetalleProvGroupQueryResultPath = '/GrupoListaContactoDetalleProv';
  static readonly ContactoDetalleProvObtenerPath = '/ContactoDetalleProv';
  static readonly ContactoDetalleProvQueryResultPath = '/ContactoDetalleProv';
  static readonly CorreoElectronicoObtenerPath = '/CorreoElectronico';
  static readonly CorreoElectronicoGuardarOActualizarPath = '/CorreoElectronico';
  static readonly CorreoElectronicoQueryResultPath = '/CorreoElectronico';
  static readonly CorreoElectronicoDesactivarPath = '/CorreoElectronico';
  static readonly DatosPersonaObtenerPath = '/DatosPersona';
  static readonly DatosPersonaGuardarOActualizarPath = '/DatosPersona';
  static readonly DatosPersonaQueryResultPath = '/DatosPersona';
  static readonly DatosPersonaDesactivarPath = '/DatosPersona';
  static readonly NumeroTelefonicoObtenerPath = '/NumeroTelefonico';
  static readonly NumeroTelefonicoGuardarOActualizarPath = '/NumeroTelefonico';
  static readonly NumeroTelefonicoQueryResultPath = '/NumeroTelefonico';
  static readonly NumeroTelefonicoDesactivarPath = '/NumeroTelefonico';
  static readonly vContactoObtenerPath = '/vContacto';
  static readonly vContactoQueryResultPath = '/vContacto';
  static readonly vNumeroTelefonicoGroupQueryResultPath = '/GrupoListavNumeroTelefonico';
  static readonly vNumeroTelefonicoQueryResultPath = '/vNumeroTelefonico';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un contacto por su idContacto
   * @param idContacto Identificador de contacto.
   * @return OK
   */
  ContactoObtenerResponse(idContacto: string): __Observable<__StrictHttpResponse<Contacto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContacto != null) __params = __params.set('idContacto', idContacto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Contacto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Contacto>;
      })
    );
  }
  /**
   * Obtener un contacto por su idContacto
   * @param idContacto Identificador de contacto.
   * @return OK
   */
  ContactoObtener(idContacto: string): __Observable<Contacto> {
    return this.ContactoObtenerResponse(idContacto).pipe(
      __map(_r => _r.body as Contacto)
    );
  }

  /**
   * Guardar o actualizar un contacto.
   * @param contacto Contacto.
   * @return OK
   */
  ContactoGuardarOActualizarResponse(contacto: Contacto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = contacto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Contacto`,
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
   * Guardar o actualizar un contacto.
   * @param contacto Contacto.
   * @return OK
   */
  ContactoGuardarOActualizar(contacto: Contacto): __Observable<string> {
    return this.ContactoGuardarOActualizarResponse(contacto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de contacto.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  ContactoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContacto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Contacto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContacto>;
      })
    );
  }
  /**
   * Obtener lista de contacto.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  ContactoQueryResult(info: QueryInfo): __Observable<QueryResultContacto> {
    return this.ContactoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContacto)
    );
  }

  /**
   * Desactivar un contacto.
   * @param idContacto Identificador de contacto a desactivar.
   * @return OK
   */
  ContactoDesactivarResponse(idContacto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContacto != null) __params = __params.set('idContacto', idContacto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Contacto`,
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
   * Desactivar un contacto.
   * @param idContacto Identificador de contacto a desactivar.
   * @return OK
   */
  ContactoDesactivar(idContacto: string): __Observable<string> {
    return this.ContactoDesactivarResponse(idContacto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult ContactoDetalle
   * @param info undefined
   * @return OK
   */
  ContactoDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultContactoDetalleObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaContactoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultContactoDetalleObj>;
      })
    );
  }
  /**
   * GroupQueryResult ContactoDetalle
   * @param info undefined
   * @return OK
   */
  ContactoDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultContactoDetalleObj> {
    return this.ContactoDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultContactoDetalleObj)
    );
  }

  /**
   * Obtener ContactoDetalle
   * @param idContacto undefined
   * @return OK
   */
  ContactoDetalleObtenerResponse(idContacto: string): __Observable<__StrictHttpResponse<ContactoDetalleObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContacto != null) __params = __params.set('idContacto', idContacto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContactoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactoDetalleObj>;
      })
    );
  }
  /**
   * Obtener ContactoDetalle
   * @param idContacto undefined
   * @return OK
   */
  ContactoDetalleObtener(idContacto: string): __Observable<ContactoDetalleObj> {
    return this.ContactoDetalleObtenerResponse(idContacto).pipe(
      __map(_r => _r.body as ContactoDetalleObj)
    );
  }

  /**
   * QueryResult ContactoDetalle
   * @param info undefined
   * @return OK
   */
  ContactoDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContactoDetalleObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContactoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContactoDetalleObj>;
      })
    );
  }
  /**
   * QueryResult ContactoDetalle
   * @param info undefined
   * @return OK
   */
  ContactoDetalleQueryResult(info: QueryInfo): __Observable<QueryResultContactoDetalleObj> {
    return this.ContactoDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContactoDetalleObj)
    );
  }

  /**
   * GroupQueryResult ContactoDetalleProv
   * @param info undefined
   * @return OK
   */
  ContactoDetalleProvGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultContactoDetalleProvObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaContactoDetalleProv`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultContactoDetalleProvObj>;
      })
    );
  }
  /**
   * GroupQueryResult ContactoDetalleProv
   * @param info undefined
   * @return OK
   */
  ContactoDetalleProvGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultContactoDetalleProvObj> {
    return this.ContactoDetalleProvGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultContactoDetalleProvObj)
    );
  }

  /**
   * Obtener ContactoDetalleProv
   * @param idContacto undefined
   * @return OK
   */
  ContactoDetalleProvObtenerResponse(idContacto: string): __Observable<__StrictHttpResponse<ContactoDetalleProvObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContacto != null) __params = __params.set('idContacto', idContacto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContactoDetalleProv`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactoDetalleProvObj>;
      })
    );
  }
  /**
   * Obtener ContactoDetalleProv
   * @param idContacto undefined
   * @return OK
   */
  ContactoDetalleProvObtener(idContacto: string): __Observable<ContactoDetalleProvObj> {
    return this.ContactoDetalleProvObtenerResponse(idContacto).pipe(
      __map(_r => _r.body as ContactoDetalleProvObj)
    );
  }

  /**
   * QueryResult ContactoDetalleProv
   * @param info undefined
   * @return OK
   */
  ContactoDetalleProvQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContactoDetalleProvObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContactoDetalleProv`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContactoDetalleProvObj>;
      })
    );
  }
  /**
   * QueryResult ContactoDetalleProv
   * @param info undefined
   * @return OK
   */
  ContactoDetalleProvQueryResult(info: QueryInfo): __Observable<QueryResultContactoDetalleProvObj> {
    return this.ContactoDetalleProvQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContactoDetalleProvObj)
    );
  }

  /**
   * Obtener los correos electrónicos de datos de persona por su idCorreoElectronico.
   * @param idCorreoElectronico Identificador de datos de persona.
   * @return OK
   */
  CorreoElectronicoObtenerResponse(idCorreoElectronico: string): __Observable<__StrictHttpResponse<CorreoElectronico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoElectronico != null) __params = __params.set('idCorreoElectronico', idCorreoElectronico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoElectronico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoElectronico>;
      })
    );
  }
  /**
   * Obtener los correos electrónicos de datos de persona por su idCorreoElectronico.
   * @param idCorreoElectronico Identificador de datos de persona.
   * @return OK
   */
  CorreoElectronicoObtener(idCorreoElectronico: string): __Observable<CorreoElectronico> {
    return this.CorreoElectronicoObtenerResponse(idCorreoElectronico).pipe(
      __map(_r => _r.body as CorreoElectronico)
    );
  }

  /**
   * Actualizar correos electrónicos de datos de persona.
   * @param correoElectronico Lista de correos electrónicos configurados para persona.
   * @return OK
   */
  CorreoElectronicoGuardarOActualizarResponse(correoElectronico: CorreoElectronico): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = correoElectronico;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoElectronico`,
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
   * Actualizar correos electrónicos de datos de persona.
   * @param correoElectronico Lista de correos electrónicos configurados para persona.
   * @return OK
   */
  CorreoElectronicoGuardarOActualizar(correoElectronico: CorreoElectronico): __Observable<string> {
    return this.CorreoElectronicoGuardarOActualizarResponse(correoElectronico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CorreoElectronico
   * @param info undefined
   * @return OK
   */
  CorreoElectronicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoElectronico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoElectronico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoElectronico>;
      })
    );
  }
  /**
   * QueryResult CorreoElectronico
   * @param info undefined
   * @return OK
   */
  CorreoElectronicoQueryResult(info: QueryInfo): __Observable<QueryResultCorreoElectronico> {
    return this.CorreoElectronicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoElectronico)
    );
  }

  /**
   * Desactivar CorreoElectronico
   * @param idCorreoElectronico undefined
   * @return OK
   */
  CorreoElectronicoDesactivarResponse(idCorreoElectronico: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoElectronico != null) __params = __params.set('idCorreoElectronico', idCorreoElectronico.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoElectronico`,
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
   * Desactivar CorreoElectronico
   * @param idCorreoElectronico undefined
   * @return OK
   */
  CorreoElectronicoDesactivar(idCorreoElectronico: string): __Observable<string> {
    return this.CorreoElectronicoDesactivarResponse(idCorreoElectronico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener unos datos de persona por su idDatosPersona.
   * @param idDatosPersona Identificador de datos de persona.
   * @return OK
   */
  DatosPersonaObtenerResponse(idDatosPersona: string): __Observable<__StrictHttpResponse<DatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosPersona != null) __params = __params.set('idDatosPersona', idDatosPersona.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosPersona>;
      })
    );
  }
  /**
   * Obtener unos datos de persona por su idDatosPersona.
   * @param idDatosPersona Identificador de datos de persona.
   * @return OK
   */
  DatosPersonaObtener(idDatosPersona: string): __Observable<DatosPersona> {
    return this.DatosPersonaObtenerResponse(idDatosPersona).pipe(
      __map(_r => _r.body as DatosPersona)
    );
  }

  /**
   * Guardar o actualizar datos de persona.
   * @param datosPersona Datos de persona.
   * @return OK
   */
  DatosPersonaGuardarOActualizarResponse(datosPersona: DatosPersona): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = datosPersona;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/DatosPersona`,
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
   * Guardar o actualizar datos de persona.
   * @param datosPersona Datos de persona.
   * @return OK
   */
  DatosPersonaGuardarOActualizar(datosPersona: DatosPersona): __Observable<string> {
    return this.DatosPersonaGuardarOActualizarResponse(datosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de datos de persona.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  DatosPersonaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDatosPersona>;
      })
    );
  }
  /**
   * Obtener lista de datos de persona.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  DatosPersonaQueryResult(info: QueryInfo): __Observable<QueryResultDatosPersona> {
    return this.DatosPersonaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDatosPersona)
    );
  }

  /**
   * Desactivar DatosPersona
   * @param idDatosPersona undefined
   * @return OK
   */
  DatosPersonaDesactivarResponse(idDatosPersona: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosPersona != null) __params = __params.set('idDatosPersona', idDatosPersona.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/DatosPersona`,
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
   * Desactivar DatosPersona
   * @param idDatosPersona undefined
   * @return OK
   */
  DatosPersonaDesactivar(idDatosPersona: string): __Observable<string> {
    return this.DatosPersonaDesactivarResponse(idDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener NumeroTelefonico
   * @param idNumeroTelefonico undefined
   * @return OK
   */
  NumeroTelefonicoObtenerResponse(idNumeroTelefonico: string): __Observable<__StrictHttpResponse<NumeroTelefonico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idNumeroTelefonico != null) __params = __params.set('idNumeroTelefonico', idNumeroTelefonico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/NumeroTelefonico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NumeroTelefonico>;
      })
    );
  }
  /**
   * Obtener NumeroTelefonico
   * @param idNumeroTelefonico undefined
   * @return OK
   */
  NumeroTelefonicoObtener(idNumeroTelefonico: string): __Observable<NumeroTelefonico> {
    return this.NumeroTelefonicoObtenerResponse(idNumeroTelefonico).pipe(
      __map(_r => _r.body as NumeroTelefonico)
    );
  }

  /**
   * GuardarOActualizar NumeroTelefonico
   * @param NumeroTelefonico undefined
   * @return OK
   */
  NumeroTelefonicoGuardarOActualizarResponse(NumeroTelefonico: NumeroTelefonico): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = NumeroTelefonico;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/NumeroTelefonico`,
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
   * GuardarOActualizar NumeroTelefonico
   * @param NumeroTelefonico undefined
   * @return OK
   */
  NumeroTelefonicoGuardarOActualizar(NumeroTelefonico: NumeroTelefonico): __Observable<string> {
    return this.NumeroTelefonicoGuardarOActualizarResponse(NumeroTelefonico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult NumeroTelefonico
   * @param info undefined
   * @return OK
   */
  NumeroTelefonicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultNumeroTelefonico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/NumeroTelefonico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultNumeroTelefonico>;
      })
    );
  }
  /**
   * QueryResult NumeroTelefonico
   * @param info undefined
   * @return OK
   */
  NumeroTelefonicoQueryResult(info: QueryInfo): __Observable<QueryResultNumeroTelefonico> {
    return this.NumeroTelefonicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultNumeroTelefonico)
    );
  }

  /**
   * Desactivar NumeroTelefonico
   * @param idNumeroTelefonico undefined
   * @return OK
   */
  NumeroTelefonicoDesactivarResponse(idNumeroTelefonico: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idNumeroTelefonico != null) __params = __params.set('idNumeroTelefonico', idNumeroTelefonico.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/NumeroTelefonico`,
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
   * Desactivar NumeroTelefonico
   * @param idNumeroTelefonico undefined
   * @return OK
   */
  NumeroTelefonicoDesactivar(idNumeroTelefonico: string): __Observable<string> {
    return this.NumeroTelefonicoDesactivarResponse(idNumeroTelefonico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener vContacto
   * @param idContacto undefined
   * @return OK
   */
  vContactoObtenerResponse(idContacto: string): __Observable<__StrictHttpResponse<VContacto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContacto != null) __params = __params.set('idContacto', idContacto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vContacto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VContacto>;
      })
    );
  }
  /**
   * Obtener vContacto
   * @param idContacto undefined
   * @return OK
   */
  vContactoObtener(idContacto: string): __Observable<VContacto> {
    return this.vContactoObtenerResponse(idContacto).pipe(
      __map(_r => _r.body as VContacto)
    );
  }

  /**
   * Consultar lista paginada de vContacto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vContactoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVContacto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vContacto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVContacto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vContacto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vContactoQueryResult(info: QueryInfo): __Observable<QueryResultVContacto> {
    return this.vContactoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVContacto)
    );
  }

  /**
   * GroupQueryResult vNumeroTelefonico
   * @param info undefined
   * @return OK
   */
  vNumeroTelefonicoGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVNumeroTelefonico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavNumeroTelefonico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVNumeroTelefonico>;
      })
    );
  }
  /**
   * GroupQueryResult vNumeroTelefonico
   * @param info undefined
   * @return OK
   */
  vNumeroTelefonicoGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVNumeroTelefonico> {
    return this.vNumeroTelefonicoGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVNumeroTelefonico)
    );
  }

  /**
   * QueryResult vNumeroTelefonico
   * @param info undefined
   * @return OK
   */
  vNumeroTelefonicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVNumeroTelefonico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vNumeroTelefonico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVNumeroTelefonico>;
      })
    );
  }
  /**
   * QueryResult vNumeroTelefonico
   * @param info undefined
   * @return OK
   */
  vNumeroTelefonicoQueryResult(info: QueryInfo): __Observable<QueryResultVNumeroTelefonico> {
    return this.vNumeroTelefonicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVNumeroTelefonico)
    );
  }
}

module ConfiguracionContactosService {
}

export { ConfiguracionContactosService }
