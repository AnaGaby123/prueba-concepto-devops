import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpConfiguracionComponent} from '@appComponents/shared/pop-up-configuracion/pop-up-configuracion.component';

describe('PopUpConfiguracionComponent', () => {
  let component: PopUpConfiguracionComponent;
  let fixture: ComponentFixture<PopUpConfiguracionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpConfiguracionComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
