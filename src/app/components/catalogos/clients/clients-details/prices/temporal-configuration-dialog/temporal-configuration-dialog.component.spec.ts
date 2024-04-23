import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TemporalConfigurationDialogComponent} from './temporal-configuration-dialog.component';

describe('TemporalConfigurationDialogComponent', () => {
  let component: TemporalConfigurationDialogComponent;
  let fixture: ComponentFixture<TemporalConfigurationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemporalConfigurationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemporalConfigurationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
