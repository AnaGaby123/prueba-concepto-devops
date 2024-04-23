import {ITabOption} from '@appModels/botonera/botonera-option';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {ImpOrdenDespacho, OcEnvio, SegVisitante, SegVisitaVisitanteDetalle} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  DEFAULT_DATE,
  DEFAULT_UUID,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {IFile} from '@appModels/files/files.models';

export interface ISecurityGuardDetails {
  selectedCustomAgent: ISegVisitaVisitanteDetalle;
  searchTerm: string;
  actualStep: number;
  searchVisitor: string;
  needsToReloadCustomAgent: boolean;
  customAgentList: Array<ISegVisitaVisitanteDetalle>;
  tabSteps: Array<ITabOption>;
  tabSelected: ITabOption;
  barOptions: Array<BarActivityOption>;
  customLegendStatus: number;
  statusImageCharger: number;
  desiredPage: number;
  pageSize: number;
  totalItems: number;
  newVisitor: SegVisitante;
  visitorImage: IFile;
  imageFile: string;
  imageFileBackUp: IFile;
  packageImages: Array<IFile>;
  backupVisitor: SegVisitante;
  errorPop: boolean;
}

export const initialSecurityGuardDetailsState = (): ISecurityGuardDetails => ({
  selectedCustomAgent: null,
  customLegendStatus: API_REQUEST_STATUS_DEFAULT,
  statusImageCharger: API_REQUEST_STATUS_DEFAULT,
  customAgentList: [],
  searchTerm: '',
  searchVisitor: '',
  actualStep: 0,
  needsToReloadCustomAgent: true,
  newVisitor: initialNewVisitor(),
  tabSteps: [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'VISITAS',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: 'FLETERAS',
      activeSubtitle: true,
      labelSubtitle: 'VISITAS',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: 'AA',
      activeSubtitle: true,
      labelSubtitle: 'VISITAS',
      totalSubtitle: 0,
    },
  ],
  barOptions: [
    {id: 1, label: 'REGISTRAR', activeSubtitle: false},
    {id: 2, label: 'GUÍAS DE EMBARQUE', activeSubtitle: false},
  ],
  tabSelected: {
    id: '1',
    label: 'TODOS',
    activeSubtitle: true,
    labelSubtitle: 'VISITAS',
    totalSubtitle: 24,
  },
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
  totalItems: 0,
  visitorImage: {},
  imageFile: null,
  imageFileBackUp: null,
  packageImages: [],
  backupVisitor: null,
  errorPop: false,
});

export interface ISegVisitaVisitanteDetalle extends SegVisitaVisitanteDetalle {
  Index?: number;
  isSelected?: boolean;
  visitorList: Array<SegVisitante>;
  selectedVehicleType: DropListOption;
  selectedVehicleBrand: DropListOption;
  selectedNameVisitor: DropListOption;
  selectedBoardingGuide: OcEnvio | ImpOrdenDespacho;
  ListaimpOrdenDespacho?: Array<IImpOrdenDespacho>;
  ListaocEnvioList?: Array<IOcEnvio>;
  guideSelected: any;
  totalGuides: number;
}

export interface IImpOrdenDespacho extends ImpOrdenDespacho {
  isSelected: boolean;
}

export interface IOcEnvio extends OcEnvio {
  isSelected: boolean;
}

export const initialNewVisitor = (): SegVisitante => ({
  IdSegVisitante: DEFAULT_UUID,
  Telefono: '',
  Email: '',
  NombreCompleto: '',
  Activo: true,
  Celular: '',
  Extension: '',
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivoFoto: null,
  IdCatOrigenVisitante: DEFAULT_UUID,
});
