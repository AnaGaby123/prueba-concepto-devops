import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ProvidersDetailsComponent} from '@appComponents/catalogos/providers/providers-details/providers-details.component';

describe('AddEditProvidersComponent', () => {
  let component: ProvidersDetailsComponent;
  let fixture: ComponentFixture<ProvidersDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProvidersDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
