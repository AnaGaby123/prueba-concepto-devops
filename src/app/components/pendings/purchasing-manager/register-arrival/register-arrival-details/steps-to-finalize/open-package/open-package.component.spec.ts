import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OpenPackageComponent} from './open-package.component';

describe('OpenPackageComponent', () => {
  let component: OpenPackageComponent;
  let fixture: ComponentFixture<OpenPackageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OpenPackageComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
