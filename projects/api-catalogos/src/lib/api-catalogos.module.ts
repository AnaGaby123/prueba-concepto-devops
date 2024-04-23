/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiCatalogosConfiguration, ApiCatalogosConfigurationInterface } from './api-catalogos-configuration';

import { CatalogosService } from './services/catalogos.service';
import { ConfiguracionAduanasService } from './services/configuracion-aduanas.service';
import { ConfiguracionClientesService } from './services/configuracion-clientes.service';
import { ConfiguracionClientesCalculosService } from './services/configuracion-clientes-calculos.service';
import { ConfiguracionClientesCarteraService } from './services/configuracion-clientes-cartera.service';
import { ConfiguracionClientesConfiguracionService } from './services/configuracion-clientes-configuracion.service';
import { ConfiguracionClientesContratoService } from './services/configuracion-clientes-contrato.service';
import { ConfiguracionClientesContratoCalculosService } from './services/configuracion-clientes-contrato-calculos.service';
import { ConfiguracionClientesContratoMarcasService } from './services/configuracion-clientes-contrato-marcas.service';
import { ConfiguracionClientesContratoMarcasConfiguracionesService } from './services/configuracion-clientes-contrato-marcas-configuraciones.service';
import { ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService } from './services/configuracion-clientes-contrato-marcas-configuraciones-parametrizacion.service';
import { ConfiguracionClientesCorreosService } from './services/configuracion-clientes-correos.service';
import { ConfiguracionClientesDireccionesService } from './services/configuracion-clientes-direcciones.service';
import { ConfiguracionClientesRelacionesService } from './services/configuracion-clientes-relaciones.service';
import { ConfiguracionContactosService } from './services/configuracion-contactos.service';
import { ConfiguracionCuentasService } from './services/configuracion-cuentas.service';
import { ConfiguracionDireccionesService } from './services/configuracion-direcciones.service';
import { ConfiguracionDireccionesGoogleService } from './services/configuracion-direcciones-google.service';
import { ConfiguracionDireccionesUtilsService } from './services/configuracion-direcciones-utils.service';
import { ConfiguracionDireccionesValidadorService } from './services/configuracion-direcciones-validador.service';
import { ConfiguracionEmpresasService } from './services/configuracion-empresas.service';
import { ConfiguracionIndicadoresService } from './services/configuracion-indicadores.service';
import { ConfiguracionProductosService } from './services/configuracion-productos.service';
import { ConfiguracionProductosAlmacenajeService } from './services/configuracion-productos-almacenaje.service';
import { ConfiguracionProductosArchivosService } from './services/configuracion-productos-archivos.service';
import { ConfiguracionProductosCalculosService } from './services/configuracion-productos-calculos.service';
import { ConfiguracionProductosClasificacionService } from './services/configuracion-productos-clasificacion.service';
import { ConfiguracionProductosConfiguracionFamiliasService } from './services/configuracion-productos-configuracion-familias.service';
import { ConfiguracionProductosConfiguracionLogisticaService } from './services/configuracion-productos-configuracion-logistica.service';
import { ConfiguracionProductosConfiguracionPrecioTiempoEntregaService } from './services/configuracion-productos-configuracion-precio-tiempo-entrega.service';
import { ConfiguracionProductosConfiguracionPrecioTiempoEntregaClientesService } from './services/configuracion-productos-configuracion-precio-tiempo-entrega-clientes.service';
import { ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService } from './services/configuracion-productos-configuracion-precio-tiempo-entrega-proveedores.service';
import { ConfiguracionProductosConsultaExternaService } from './services/configuracion-productos-consulta-externa.service';
import { ConfiguracionProductosFletesService } from './services/configuracion-productos-fletes.service';
import { ConfiguracionProductosLotesService } from './services/configuracion-productos-lotes.service';
import { ConfiguracionProductosMarcasService } from './services/configuracion-productos-marcas.service';
import { ConfiguracionProductosMarcasFamiliasService } from './services/configuracion-productos-marcas-familias.service';
import { ConfiguracionProductosRelacionService } from './services/configuracion-productos-relacion.service';
import { ConfiguracionProductosTipoEspecificadoService } from './services/configuracion-productos-tipo-especificado.service';
import { ConfiguracionProductosWizardContenidoService } from './services/configuracion-productos-wizard-contenido.service';
import { ConfiguracionProveedoresService } from './services/configuracion-proveedores.service';
import { ConfiguracionProveedoresCalculosService } from './services/configuracion-proveedores-calculos.service';
import { ConfiguracionProveedoresCampanasService } from './services/configuracion-proveedores-campanas.service';
import { ConfiguracionProveedoresRelacionesService } from './services/configuracion-proveedores-relaciones.service';
import { SistemaService } from './services/sistema.service';
import { SistemaArchivosService } from './services/sistema-archivos.service';
import { SistemaArchivosCSVsService } from './services/sistema-archivos-csvs.service';
import { SistemaArchivosPDFsService } from './services/sistema-archivos-pdfs.service';
import { SistemaBitacoraService } from './services/sistema-bitacora.service';
import { SistemaCorreosService } from './services/sistema-correos.service';
import { SistemaCorreosEnvioService } from './services/sistema-correos-envio.service';
import { SistemaCorreosMailBotsClientesService } from './services/sistema-correos-mail-bots-clientes.service';
import { SistemaServiciosSistemaService } from './services/sistema-servicios-sistema.service';
import { SistemaUsuariosService } from './services/sistema-usuarios.service';
import { SistemaUsuariosAccessosService } from './services/sistema-usuarios-accessos.service';
import { SistemaUXService } from './services/sistema-ux.service';

/**
 * Provider for all ApiCatalogos services, plus ApiCatalogosConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiCatalogosConfiguration,
    CatalogosService,
    ConfiguracionAduanasService,
    ConfiguracionClientesService,
    ConfiguracionClientesCalculosService,
    ConfiguracionClientesCarteraService,
    ConfiguracionClientesConfiguracionService,
    ConfiguracionClientesContratoService,
    ConfiguracionClientesContratoCalculosService,
    ConfiguracionClientesContratoMarcasService,
    ConfiguracionClientesContratoMarcasConfiguracionesService,
    ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService,
    ConfiguracionClientesCorreosService,
    ConfiguracionClientesDireccionesService,
    ConfiguracionClientesRelacionesService,
    ConfiguracionContactosService,
    ConfiguracionCuentasService,
    ConfiguracionDireccionesService,
    ConfiguracionDireccionesGoogleService,
    ConfiguracionDireccionesUtilsService,
    ConfiguracionDireccionesValidadorService,
    ConfiguracionEmpresasService,
    ConfiguracionIndicadoresService,
    ConfiguracionProductosService,
    ConfiguracionProductosAlmacenajeService,
    ConfiguracionProductosArchivosService,
    ConfiguracionProductosCalculosService,
    ConfiguracionProductosClasificacionService,
    ConfiguracionProductosConfiguracionFamiliasService,
    ConfiguracionProductosConfiguracionLogisticaService,
    ConfiguracionProductosConfiguracionPrecioTiempoEntregaService,
    ConfiguracionProductosConfiguracionPrecioTiempoEntregaClientesService,
    ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
    ConfiguracionProductosConsultaExternaService,
    ConfiguracionProductosFletesService,
    ConfiguracionProductosLotesService,
    ConfiguracionProductosMarcasService,
    ConfiguracionProductosMarcasFamiliasService,
    ConfiguracionProductosRelacionService,
    ConfiguracionProductosTipoEspecificadoService,
    ConfiguracionProductosWizardContenidoService,
    ConfiguracionProveedoresService,
    ConfiguracionProveedoresCalculosService,
    ConfiguracionProveedoresCampanasService,
    ConfiguracionProveedoresRelacionesService,
    SistemaService,
    SistemaArchivosService,
    SistemaArchivosCSVsService,
    SistemaArchivosPDFsService,
    SistemaBitacoraService,
    SistemaCorreosService,
    SistemaCorreosEnvioService,
    SistemaCorreosMailBotsClientesService,
    SistemaServiciosSistemaService,
    SistemaUsuariosService,
    SistemaUsuariosAccessosService,
    SistemaUXService
  ],
})
export class ApiCatalogosModule {
  static forRoot(customParams: ApiCatalogosConfigurationInterface): ModuleWithProviders<ApiCatalogosModule> {
    return {
      ngModule: ApiCatalogosModule,
      providers: [
        {
          provide: ApiCatalogosConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
