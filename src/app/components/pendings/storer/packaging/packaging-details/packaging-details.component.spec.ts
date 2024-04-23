import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PackagingDetailsComponent} from './packaging-details.component.ts';

describe('PackingComponent', () => {
  let component: PackagingDetailsComponent;
  let fixture: ComponentFixture<PackagingDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PackagingDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
