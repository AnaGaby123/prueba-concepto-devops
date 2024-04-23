import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientContactBarsCollapseComponent} from './client-contact-bars-collapse.component';

describe('ClientContactBarsCollapseComponent', () => {
  let component: ClientContactBarsCollapseComponent;
  let fixture: ComponentFixture<ClientContactBarsCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientContactBarsCollapseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContactBarsCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
