import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientPricesPanelComponent} from './client-prices-panel.component';

describe('ClientPricesPanelComponent', () => {
  let component: ClientPricesPanelComponent;
  let fixture: ComponentFixture<ClientPricesPanelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientPricesPanelComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPricesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
