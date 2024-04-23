import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LinkAlternativeComplementaryComponent} from './link-alternative-complementary.component';

describe('LinkAlternativeComplementaryComponent', () => {
  let component: LinkAlternativeComplementaryComponent;
  let fixture: ComponentFixture<LinkAlternativeComplementaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LinkAlternativeComplementaryComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAlternativeComplementaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
