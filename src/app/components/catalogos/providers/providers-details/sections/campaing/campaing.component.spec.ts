import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CampaingComponent} from './campaing.component';

describe('CampaingComponent', () => {
  let component: CampaingComponent;
  let fixture: ComponentFixture<CampaingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CampaingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
