import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProviderContactPopComponent} from './provider-contact-pop.component';

describe('ProviderContactPopComponent', () => {
  let component: ProviderContactPopComponent;
  let fixture: ComponentFixture<ProviderContactPopComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderContactPopComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderContactPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
