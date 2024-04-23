import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientRequestPanelComponent} from './client-request-panel.component';

describe('RequestQuotationComponent', () => {
  let component: ClientRequestPanelComponent;
  let fixture: ComponentFixture<ClientRequestPanelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientRequestPanelComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRequestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
