import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientsDetailsComponent} from './clients-details.component';

describe('ClientsDetailsComponent', () => {
  let component: ClientsDetailsComponent;
  let fixture: ComponentFixture<ClientsDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientsDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
