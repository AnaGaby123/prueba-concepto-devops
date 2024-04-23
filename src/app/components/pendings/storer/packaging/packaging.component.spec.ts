import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PackagingComponent} from './packaging.component';

describe('PackagingComponent', () => {
  let component: PackagingComponent;
  let fixture: ComponentFixture<PackagingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PackagingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
