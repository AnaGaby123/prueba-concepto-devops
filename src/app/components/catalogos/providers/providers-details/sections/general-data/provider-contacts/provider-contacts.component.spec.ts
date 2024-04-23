import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProviderContactsComponent} from './provider-contacts.component';

describe('ProviderContactsComponent', () => {
  let component: ProviderContactsComponent;
  let fixture: ComponentFixture<ProviderContactsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderContactsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
