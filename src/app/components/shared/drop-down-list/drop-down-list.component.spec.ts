import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DropDownListComponent} from '@appComponents/shared/drop-down-list/drop-down-list.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {getArrayForDropDownList} from '@appUtil/util';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

describe('DropDownListComponent', () => {
  let component: DropDownListComponent;
  let fixture: ComponentFixture<DropDownListComponent>;
  let mockMouseEvent: MouseEvent;
  let dropDownList: DropListOption[];
  const mockItems = [
    {
      IdCatRolCliente: '7bf18175-cc0a-415c-92db-159beb8421a3',
      Nombre: 'Distribuidor',
      Activo: true,
      Clave: 'distribuidor',
    },
    {
      IdCatRolCliente: 'fbbb9016-7809-49cf-adc4-95532a18b591',
      Nombre: 'Laboratorio',
      Activo: true,
      Clave: 'laboratorio',
    },
    {
      IdCatRolCliente: 'c7723bf9-e24a-4cca-a421-65b3022620d5',
      Nombre: 'Ninguno',
      Activo: true,
      Clave: 'ninguno',
    },
    {
      IdCatRolCliente: 'da1d208b-c1d4-449e-8d32-83fce090fd08',
      Nombre: '--NINGUNO--',
      Activo: true,
      Clave: '--ninguno--',
    },
    {
      IdCatRolCliente: '9471b4bc-2255-4c7d-a1da-65dfa270d4d3',
      Nombre: 'Otro',
      Activo: true,
      Clave: 'otro',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownListComponent],
      imports: [FormsModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.clearAllMocks();
    // DOCS: CREA UN MOCK PARA SIMULAR EL EVENTO DE CLICK
    mockMouseEvent = ({
      stopPropagation: jest.fn(),
    } as unknown) as MouseEvent; // DOCS: INDICA A TYPESCRIPT QUE NO SE PREOCUPE POR VERIFICACIÓN DE LOS TIPOS Y CONFIRMAMOS QUE EL OBJETO TIENE LA ESTRUCTURA CORRECTA
    dropDownList = getArrayForDropDownList(mockItems, 'IdCatRolCliente', 'Nombre');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('La función openDropList debe cambiar a true el valor de showDropList para mostrar las opciones del dropdown', () => {
    component.openDropList(mockMouseEvent);

    expect(component.showDropList).toBeTruthy();
  });

  it('La función openDropList debe cambiar a false el valor de showDropList para mostrar las opciones del dropdown', () => {
    component.closeDropList();
    expect(component.showDropList).toBeFalsy();
  });

  it('La variable showDropList para mostrar las opciones, debe estar permanecer en false si el el dropdown está inhabilitado', () => {
    // DOCS: ESTABLECE VALORES DE @INPUT disable;
    component.disable = true;

    fixture.detectChanges(); // DOCS: DETECTA EL CAMBIO DEL VALOR disable

    component.openDropList(mockMouseEvent);

    expect(component.showDropList).toBeFalsy();
  });

  it('La función fillArrayAux debe ser llamada al dar click al dropdown', () => {
    const fillArrayAuxSpy = jest.spyOn(component, 'fillArrayAux');

    component.openDropList(mockMouseEvent);

    expect(fillArrayAuxSpy).toHaveBeenCalled();
  });

  it('El arreglo arrayAux debe tener elementos al llamar la función fillArrayAux', () => {
    // DOCS: ESTABLECE VALORES DE @INPUT items;
    component.items = dropDownList;

    component.fillArrayAux();

    expect(component.arrayAux.length).toBeGreaterThan(0);
  });

  it('Debe llamar la función handleGlobalClick si se da click fuera del componente y showDropList debe estar en true', () => {
    const handleGlobalClickSpy = jest.spyOn(component, 'handleGlobalClick');

    component.showDropList = true;

    component.clickOut(mockMouseEvent);

    expect(handleGlobalClickSpy).toHaveBeenCalledWith(mockMouseEvent);
  });

  it('Debe encontrar la coincidencia cuando isSearchable es true', () => {
    component.items = dropDownList;
    component.changeSearchTerm('Laboratorio');

    expect(component.arrayAux.length).toBeGreaterThan(0);
  });

  it('El arreglo arrayAux debe estar vacío al no encontrar ninguna coincidencia', () => {
    // DOCS: ESTABLECE VALORES DE @INPUT items;
    component.items = dropDownList;
    component.changeSearchTerm('asddfasdfdsfsdf');

    expect(component.arrayAux.length).toEqual(0);
  });

  it('El arreglo arrayAux debe de volver a tener todos los items cuando se haya borrado el texto del buscador', () => {
    // DOCS: ESTABLECE VALORES DE @INPUT items;
    component.items = dropDownList;
    component.changeSearchTerm('');

    expect(component.arrayAux).toEqual(dropDownList);
  });
});
