import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientsContactComponent} from './clients-contact.component';

describe('ClientsContactComponent', () => {
  let component: ClientsContactComponent;
  let fixture: ComponentFixture<ClientsContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsContactComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
