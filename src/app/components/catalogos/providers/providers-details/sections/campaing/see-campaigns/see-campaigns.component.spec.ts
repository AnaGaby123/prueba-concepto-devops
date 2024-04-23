import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SeeCampaignsComponent} from './see-campaigns.component';

describe('SeeCampaingsComponent', () => {
  let component: SeeCampaignsComponent;
  let fixture: ComponentFixture<SeeCampaignsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SeeCampaignsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
