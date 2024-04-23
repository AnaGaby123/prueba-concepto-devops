import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SendEmailDialogComponent} from './send-email-dialog.component';
import {Store} from '@ngrx/store';
import {TranslateModule} from '@ngx-translate/core';
import {provideMockStore} from '@ngrx/store/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PopUpGenericComponent} from '@appComponents/shared/pop-up-generic/pop-up-generic.component';
import {MultipleEmailsInputComponent} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.component';
import {DropListComponent} from '@appComponents/shared/drop-list/drop-list.component';
import {GenericTextAreaComponent} from '@appComponents/shared/generic-text-area/generic-text-area.component';
import {FormsModule} from '@angular/forms';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {DropListContactComponent} from '@appComponents/shared/drop-list-contact/drop-list-contact.component';
import {CheckBoxComponent} from '@appComponents/shared/check-box/check-box.component';

describe('SendEmailDialogComponent', () => {
  let component: SendEmailDialogComponent;
  let fixture: ComponentFixture<SendEmailDialogComponent>;
  let compiled: HTMLElement;
  const testItems: IDropListMulti[] = [
    {
      value: 'ad6c35df-7c66-435a-96ec-f58b2b421b80',
      labels: [
        {
          label: 'Pruebas Ryndem ',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'pruebasryndem@gmail.com',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
    {
      value: '05b9e79f-b4b0-4866-b2b8-0741e4ea5dde',
      labels: [
        {
          label: 'Pedro De León ',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'ryndempedro@gmail.com',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
    {
      value: 'e3e81100-d44b-4b4e-b13f-faa50b58391e',
      labels: [
        {
          label: 'Cotizando Vinculando Contacto nuevo',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'lbbmmoreno@laboratoriosbest.com.mx',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
    {
      value: 'cd10f1ad-2fb0-4a03-86f8-a061944f8df7',
      labels: [
        {
          label: 'Prueba Agregar Eliminar',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'pruebaaaaaaa@gmail.co',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
    {
      value: '238ef65a-f193-4580-a9b9-014798b1fa16',
      labels: [
        {
          label: 'jose chavez amador',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'jose.chavez@ryndem.mx',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SendEmailDialogComponent,
        PopUpGenericComponent,
        MultipleEmailsInputComponent,
        DropListComponent,
        DropListContactComponent,
        GenericTextAreaComponent,
        CheckBoxComponent,
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => {},
            dispatch: () => {},
            pipe: () => {},
          },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        provideMockStore({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailDialogComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('El componente debe ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar el componente app-pop-up-generic', () => {
    const popUpGeneric = compiled.querySelector('app-pop-up-generic');

    expect(popUpGeneric).toBeTruthy();
  });

  it('Debe tener el componente app-multiple-emails-input', () => {
    const multipleEmailsInput = compiled.querySelector('app-multiple-emails-input');

    expect(multipleEmailsInput).toBeTruthy();
  });

  it('No debe mostrar el componente app-drop-list-contact si el arreglo contacts está vacío', () => {
    const dropListContact = compiled.querySelector('app-drop-list-contact');

    expect(component.data.contacts.length).toEqual(0);
    expect(dropListContact).toBeFalsy();
  });

  it('Debe mostrar el componente app-drop-list-contact si el arreglo contacts tiene elementos', () => {
    component.data.contacts = testItems;
    fixture.detectChanges();

    const dropListContact = compiled.querySelector('app-drop-list-contact');

    expect(component.data.contacts.length).toBeGreaterThan(0);
    expect(dropListContact).toBeTruthy();
  });

  it('El arreglo mailList debe tener los elementos proporcionados por la propiedad data', () => {
    component.data.mailList = testItems;
    fixture.detectChanges();

    expect(component.data.mailList).toEqual(testItems);
  });

  it('El width del dialog debe ser de 795px si no se ha proporcionado por la propiedad data.width', () => {
    expect(component.data.width).toEqual('795px');
  });

  it('El height del dialog debe ser de 460px si no se ha proporcionado por la propiedad data.height', () => {
    expect(component.data.height).toEqual('460px');
  });

  it('No debe mostrarse los divs .item-contact, iterados del ngFor mailListAux si isEditAddressEmail es falso', () => {
    component.data.isEditAddressEmail = false;
    fixture.detectChanges();

    const itemContacts = compiled.querySelectorAll('.item-contact');

    expect(itemContacts.length).toEqual(0);
  });

  it('Debe inicializar mailListAux con los mismos datos de data?.mailList', () => {
    component.data.mailList = testItems;
    fixture.detectChanges();

    component.ngOnInit();

    expect(component.mailListAux).toEqual(testItems);
  });

  it('Deben mostrarse los divs .item-contact, iterados del ngFor mailListAux si isEditAddressEmail es verdadero y el arreglo tiene elementos', () => {
    component.data.isEditAddressEmail = false;
    component.data.mailList = testItems;
    component.ngOnInit();
    fixture.detectChanges();

    const itemContacts = compiled.querySelectorAll('.item-contact');

    expect(component.mailListAux.length).toBeGreaterThan(0);
    expect(itemContacts.length).toBeGreaterThan(0);
  });

  it('No debe mostrar el input de editar correo si isEditAddressEmail es falso', () => {
    component.data.isEditAddressEmail = true;
    fixture.detectChanges();

    const input: HTMLInputElement = compiled.querySelector('.contact-edit input');

    expect(input).toBeTruthy();
  });

  it('Debe mostrar el input de editar correo si isEditAddressEmail es verdadero', () => {
    component.data.isEditAddressEmail = false;
    fixture.detectChanges();

    const input: HTMLInputElement = compiled.querySelector('.contact-edit input');

    expect(input).toBeFalsy();
  });

  it('La función addComments debe cambiar valor de data.comment', () => {
    component.addComments('I AM A COMMENT');

    expect(component.data.comment).toEqual('I AM A COMMENT');
  });

  it('La función validate debe marcar el correo como inválido', () => {
    component.activeErrorEmail = true;
    component.validate('john@gm');

    expect(component.activeErrorEmail).toBe(true);
  });

  it('La función validate debe marcar el correo como valido', () => {
    component.activeErrorEmail = true;
    component.validate('john@gmail.com');

    expect(component.activeErrorEmail).toBe(false);
  });

  it('Debe guardar el valor de currentEmail', () => {
    component.data.isEditAddressEmail = true;
    fixture.detectChanges();

    const input: HTMLInputElement = compiled.querySelector('.contact-edit input');
    const text = 'john@gmail.com';

    expect(component.data.isEditAddressEmail).toBe(true);
    expect(input).toBeTruthy();

    input.value = text;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.currentEmail).toEqual(text);
  });
});
