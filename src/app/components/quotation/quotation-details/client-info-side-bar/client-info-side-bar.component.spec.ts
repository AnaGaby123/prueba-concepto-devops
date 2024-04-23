import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientInfoSideBarComponent} from './client-info-side-bar.component';

describe('GeneralDataQuotationComponent', () => {
  let component: ClientInfoSideBarComponent;
  let fixture: ComponentFixture<ClientInfoSideBarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientInfoSideBarComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInfoSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
