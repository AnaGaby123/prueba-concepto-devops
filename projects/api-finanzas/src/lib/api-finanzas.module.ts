/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiFinanzasConfiguration, ApiFinanzasConfigurationInterface } from './api-finanzas-configuration';

import { CFDIsService } from './services/cfdis.service';
import { CobranzaClientesService } from './services/cobranza-clientes.service';
import { CobranzaClientesAnticiposService } from './services/cobranza-clientes-anticipos.service';
import { CobranzaClientesArchivosService } from './services/cobranza-clientes-archivos.service';
import { CobranzaClientesCalendariosService } from './services/cobranza-clientes-calendarios.service';
import { CobranzaClientesCorreosService } from './services/cobranza-clientes-correos.service';
import { CobranzaClientesEjecutarCobranzaService } from './services/cobranza-clientes-ejecutar-cobranza.service';
import { CobranzaClientesMonitoreoCobrosService } from './services/cobranza-clientes-monitoreo-cobros.service';
import { CobranzaClientesNotasCreditoService } from './services/cobranza-clientes-notas-credito.service';
import { CobranzaClientesParcialidadesPagosService } from './services/cobranza-clientes-parcialidades-pagos.service';
import { CobranzaClientesResultadosRevisionService } from './services/cobranza-clientes-resultados-revision.service';
import { CobranzaClientesRevisionService } from './services/cobranza-clientes-revision.service';
import { CobrosService } from './services/cobros.service';
import { InterfacturacionService } from './services/interfacturacion.service';
import { InterfacturacionNotaCreditoService } from './services/interfacturacion-nota-credito.service';
import { PagosService } from './services/pagos.service';
import { SistemaService } from './services/sistema.service';
import { STPService } from './services/stp.service';
import { TimbradorService } from './services/timbrador.service';
import { TransaccionesService } from './services/transacciones.service';

/**
 * Provider for all ApiFinanzas services, plus ApiFinanzasConfiguration
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
    ApiFinanzasConfiguration,
    CFDIsService,
    CobranzaClientesService,
    CobranzaClientesAnticiposService,
    CobranzaClientesArchivosService,
    CobranzaClientesCalendariosService,
    CobranzaClientesCorreosService,
    CobranzaClientesEjecutarCobranzaService,
    CobranzaClientesMonitoreoCobrosService,
    CobranzaClientesNotasCreditoService,
    CobranzaClientesParcialidadesPagosService,
    CobranzaClientesResultadosRevisionService,
    CobranzaClientesRevisionService,
    CobrosService,
    InterfacturacionService,
    InterfacturacionNotaCreditoService,
    PagosService,
    SistemaService,
    STPService,
    TimbradorService,
    TransaccionesService
  ],
})
export class ApiFinanzasModule {
  static forRoot(customParams: ApiFinanzasConfigurationInterface): ModuleWithProviders<ApiFinanzasModule> {
    return {
      ngModule: ApiFinanzasModule,
      providers: [
        {
          provide: ApiFinanzasConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
