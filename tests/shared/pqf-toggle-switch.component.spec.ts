import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PqfToggleSwitchComponent} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.component';

describe('PqfToggleSwitchComponent', () => {
  let component: PqfToggleSwitchComponent;
  let fixture: ComponentFixture<PqfToggleSwitchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PqfToggleSwitchComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
