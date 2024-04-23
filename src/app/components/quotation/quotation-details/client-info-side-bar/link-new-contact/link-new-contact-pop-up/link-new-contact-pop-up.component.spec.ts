import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkNewContactPopUpComponent} from './link-new-contact-pop-up.component';

describe('LinkNewContactPopUpComponent', () => {
  let component: LinkNewContactPopUpComponent;
  let fixture: ComponentFixture<LinkNewContactPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNewContactPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkNewContactPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
