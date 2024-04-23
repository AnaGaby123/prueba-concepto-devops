import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FeatureGroupItemComponent} from './feature-group-item.component';

describe('FeatureGroupItemComponent', () => {
  let component: FeatureGroupItemComponent;
  let fixture: ComponentFixture<FeatureGroupItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FeatureGroupItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
