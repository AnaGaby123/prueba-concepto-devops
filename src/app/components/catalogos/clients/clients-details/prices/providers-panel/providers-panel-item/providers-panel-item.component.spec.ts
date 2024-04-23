import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProvidersPanelItemComponent} from './providers-panel-item.component';

describe('ProvidersPanelItemComponent', () => {
  let component: ProvidersPanelItemComponent;
  let fixture: ComponentFixture<ProvidersPanelItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProvidersPanelItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersPanelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
