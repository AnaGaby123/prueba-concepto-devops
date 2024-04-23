import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientInfoComponent} from './client-info.component';

describe('ClientInfoComponent', () => {
  let component: ClientInfoComponent;
  let fixture: ComponentFixture<ClientInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientInfoComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
