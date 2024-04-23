import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GenericGridItemComponent} from '@appComponents/shared/generic-grid-item/generic-grid-item.component';

describe('CustomsAgentsItemComponent', () => {
  let component: GenericGridItemComponent;
  let fixture: ComponentFixture<GenericGridItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenericGridItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
