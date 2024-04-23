import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ContactItemComponent} from '@appComponents/shared/contact-item/contact-item.component';
import {StoreModule} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {IContactItem} from '@appModels/shared-components/contact-item.models';

describe('ContactsCustomsAgentsComponent', () => {
  let component: ContactItemComponent;
  let fixture: ComponentFixture<ContactItemComponent>;
  let compiled: HTMLElement;

  const testContact: IContactItem = {
    department: 'department',
    job: 'job',
    mSurName: 'mSurName',
    name: 'John',
    surName: 'surName',
    mail: {
      Correo: 'test@gmail.com',
    },
    phone: {
      Numero: '77737473737',
    },
  };

  const emptyTestContact: IContactItem = {
    department: '',
    job: '',
    mSurName: '',
    name: '',
    surName: '',
    mail: {
      Correo: '',
    },
    phone: {
      Numero: '',
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContactItemComponent],
        imports: [StoreModule.forRoot(provideMockStore)],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactItemComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have contact container if @Input contact has value', () => {
    component.contact = testContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-name');

    expect(label).toBeTruthy();
  });

  it('Should have contact container if @Input contact do not have value', () => {
    component.contact = null;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-name');

    expect(label).toBeFalsy();
  });

  it('Should show the container to add contact', () => {
    component.contact = null;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#add-contact-container');

    expect(label).toBeTruthy();
  });

  it('Should have contact name label if @Input contact has value', () => {
    component.contact = testContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-name');

    expect(label).toBeTruthy();
  });

  it('Contact name should be equal to values from @Input contact', () => {
    component.contact = testContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-name');

    expect(label.textContent).toEqual(
      `${testContact.name} ${testContact.surName} ${testContact.mSurName}`,
    );
  });

  it('Should have contact department label', () => {
    component.contact = testContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-department');

    expect(label);
  });

  it('Should show contact department and job', () => {
    component.contact = testContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-department');

    expect(label.textContent).toEqual(`${testContact.department} · ${testContact.job}`);
  });

  it('Should show contact department and job as N/D', () => {
    component.contact = emptyTestContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-department');

    expect(label.textContent).toEqual('N/D · N/D');
  });

  it("Should not show contact email if it's empty", () => {
    component.contact = emptyTestContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-email');

    expect(label.textContent).toBeFalsy();
  });

  it('Should  show contact phone', () => {
    component.contact = testContact;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#contact-phone');

    expect(label.textContent).toBeTruthy();
  });

  it('Should have image to delete contact if the property "enableEdit" is true', () => {
    component.contact = testContact;
    component.enableEdit = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#disabled-contact');

    expect(img).toBeTruthy();
  });

  it('Disable contact image should call the function "handleDisableContact()"', () => {
    component.contact = testContact;
    component.enableEdit = true;
    fixture.detectChanges();

    jest.spyOn(component, 'handleDisableContact');

    const img: HTMLImageElement = compiled.querySelector('#disabled-contact');
    img.dispatchEvent(new Event('click'));

    expect(component.handleDisableContact).toHaveBeenCalled();
  });

  it('The function "handleDisableContact()" should emit the property "disableContact"', () => {
    const mockEvent = Object.create(null, {
      stopPropagation: {
        value: jest.fn(),
        writable: true,
      },
    }) as Event;

    jest.spyOn(component.disableContact, 'emit');

    component.handleDisableContact(testContact, mockEvent);

    expect(component.disableContact.emit).toHaveBeenCalled();
  });

  it('The function "handleDisableContact()" should emit the property "disableContact" with the contact to be delete', () => {
    const mockEvent = Object.create(null, {
      stopPropagation: {
        value: jest.fn(),
        writable: true,
      },
    }) as Event;

    jest.spyOn(component.disableContact, 'emit');

    component.handleDisableContact(testContact, mockEvent);

    expect(component.disableContact.emit).toHaveBeenCalledWith(testContact);
  });

  it('Add contact container should call function "handleClickOnPlus()" if the property "enableEdit" is true', () => {
    component.contact = null;
    component.enableEdit = true;
    fixture.detectChanges();

    jest.spyOn(component, 'handleClickOnPlus');

    const label: HTMLLabelElement = compiled.querySelector('#add-contact-container');

    label.dispatchEvent(new Event('click'));

    expect(component.handleClickOnPlus).toHaveBeenCalled();
  });

  it('The function "handleClickOnPlus()" should emit the property "clickOnPlus"', () => {
    jest.spyOn(component.clickOnPlus, 'emit');

    component.handleClickOnPlus();

    expect(component.clickOnPlus.emit).toHaveBeenCalled();
  });
});
