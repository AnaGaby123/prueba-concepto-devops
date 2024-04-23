import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProvidersPanelComponent} from './providers-panel.component';

describe('ProvidersPanelComponent', () => {
  let component: ProvidersPanelComponent;
  let fixture: ComponentFixture<ProvidersPanelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProvidersPanelComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
