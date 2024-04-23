import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {AlertSuccesComponent} from '@appComponents/shared/alert-succes/alert-succes.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateTestingModule} from 'ngx-translate-testing';

describe('AlertSuccesComponent', () => {
  let component: AlertSuccesComponent;
  let fixture: ComponentFixture<AlertSuccesComponent>;
  let compiled: HTMLElement;

  // DOCS: TRADUCCIONES A PROBAR
  const translations = {
    common: {
      youSaved: 'Has guardado',
      successfully: 'Exitosamente',
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlertSuccesComponent],
        imports: [
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: TranslateFakeLoader,
            },
          }),
          TranslateTestingModule.withTranslations({es: translations}),
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSuccesComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar la función close después de 3000 ms', fakeAsync(() => {
    const closeSpy = jest.spyOn(component, 'close');

    tick(3000);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(closeSpy).toHaveBeenCalledWith(true);
    });
  }));

  it('Debe emitir el evento de confirmación al llamar el método close', () => {
    const confirmationSpy = jest.spyOn(component.confirmation, 'emit');

    component.close(true);

    expect(confirmationSpy).toHaveBeenCalledWith(true);
  });

  it('El elemento pop debe tener la propiedad display con el valor none', () => {
    const pop: HTMLDivElement = compiled.querySelector('#pop');

    expect(pop).toBeTruthy(); // DOCS: VALIDAR QUE SE ENCONTRÓ EL ELEMENTO

    component.close(true);

    expect(pop.style.display).toEqual('none');
  });

  it('Debe cambiar la información extra al pasar valores por @Input extraText', () => {
    const text = 'I AM A EXTRA INFO';
    const extraInfo: HTMLParagraphElement = compiled.querySelector('#extra-info');

    expect(extraInfo).toBeTruthy(); // DOCS: VALIDAR SI SE ENCONTRÓ EL ELEMENTO;

    component.extraText = text; // DOCS: ASIGNAMOS VALORES AL @Input extraTest

    fixture.detectChanges();
    // DOCS: VALIDAMOS SI EL TEXTO DE LA ETIQUETA P DE LA INFO EXTRA ES IGUAL AL TEXTO PROPOCIOINADO POR EL @Input
    expect(extraInfo.textContent).toEqual(text);
  });

  it('La info debe de tener el texto por defecto "¡Has guardado Exitosamente"', () => {
    const infoElement = compiled.querySelector('#info');

    fixture.detectChanges();

    expect(infoElement.textContent).toContain('¡Has guardado Exitosamente');
  });

  it('La info debe cambiar por los valores ingresados por los @Input text y successText', () => {
    const infoElement = compiled.querySelector('#info');

    component.text = 'DATA SAVED';
    component.successText = 'CORRECTLY';
    fixture.detectChanges();

    expect(infoElement.textContent).toContain('¡DATA SAVED CORRECTLY');
  });
});
