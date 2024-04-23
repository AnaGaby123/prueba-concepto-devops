import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CheckBoxComponent} from '@appComponents/shared/check-box/check-box.component';

describe('CheckBoxComponent', () => {
  let component: CheckBoxComponent;
  let fixture: ComponentFixture<CheckBoxComponent>;
  let compiled: HTMLElement;
  const imgDirectory = 'http://localhost/assets/Images';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckBoxComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Parent div should exist when disabled property is false', () => {
    component.disabled = false;
    fixture.detectChanges();

    const enabledDiv = compiled.querySelector('#enabled-parent');

    expect(enabledDiv).toBeTruthy();
  });

  it('Parent div should be disabled when disabled property is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    // DOCS: SE VALIDA SI EL PRIMER DIV ESTÁ OCULTO
    const enabledDiv = compiled.querySelector('#enabled-parent');
    expect(enabledDiv).toBeFalsy();

    const disabledDiv = compiled.querySelector('#disabled-parent');

    expect(disabledDiv).toBeTruthy();
  });

  it('Enabled parent div should call the function selected() with click event', () => {
    const event = new Event('click');
    const div: HTMLDivElement = compiled.querySelector('#enabled-parent');

    jest.spyOn(component, 'selected');

    div.dispatchEvent(event);

    expect(component.selected).toHaveBeenCalled();
  });

  it('The function selected() should emit the "ckeck" event with value true', () => {
    jest.spyOn(component.event, 'emit');

    component.check = false;
    component.selected();
    fixture.detectChanges();

    expect(component.event.emit).toHaveBeenCalledWith(true);
  });

  it('The function selected() should emit the check event with value false', () => {
    jest.spyOn(component.event, 'emit');

    component.check = true;
    component.selected();
    fixture.detectChanges();

    expect(component.event.emit).toHaveBeenCalledWith(false);
  });

  it('Enabled check img should exist', () => {
    component.disabled = false;
    component.isMulticolor = false;
    component.enableEdit = true;
    component.check = true;
    component.labelFontStyle = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#enabledImgCheck');

    expect(img).toBeTruthy();
  });

  it('Check img should have src property with check-red.svg when labelFontStyle is robotoRegular15Red', () => {
    component.disabled = false;
    component.isMulticolor = false;
    component.enableEdit = true;
    component.check = true;
    component.labelFontStyle = 'robotoRegular15Red';
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#enabledImgCheck');

    expect(img.src).toEqual(`${imgDirectory}/check-red.svg`);
  });

  it('Check img should have src property with check2.svg', () => {
    component.disabled = false;
    component.isMulticolor = false;
    component.enableEdit = true;
    component.check = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#enabledImgCheck');

    expect(img.src).toEqual(`${imgDirectory}/check2.svg`);
  });

  it('Check img should have src property with check1.svg', () => {
    component.disabled = false;
    component.isMulticolor = false;
    component.enableEdit = true;
    component.check = false;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#enabledImgCheck');

    expect(img.src).toEqual(`${imgDirectory}/check1.svg`);
  });

  it('The disabled check img should exist', () => {
    component.disabled = true;
    component.check = true;
    component.enableEdit = false;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#disabledCheckImg');

    expect(img).toBeTruthy();
  });

  it('The disabled check img should have src property with check_disabled.svg when check is true and enableEdit is false', () => {
    component.disabled = true;
    component.check = true;
    component.enableEdit = false;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#disabledCheckImg');

    expect(img.src).toEqual(`${imgDirectory}/check_disabled.svg`);
  });

  it('The disabled check img should have src property with check_disabled.svg when check is false and enableEdit is true', () => {
    component.disabled = true;
    component.check = false;
    component.enableEdit = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#rectangleDisabledCheck');

    expect(img.src).toEqual(`${imgDirectory}/check_rectangle_disabled.svg`);
  });
});
