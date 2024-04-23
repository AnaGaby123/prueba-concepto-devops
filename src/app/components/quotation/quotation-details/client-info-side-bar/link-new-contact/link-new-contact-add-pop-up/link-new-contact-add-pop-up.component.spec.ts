import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkNewContactAddPopUpComponent} from './link-new-contact-add-pop-up.component';

describe('LinkNewContactAddPopUpComponent', () => {
  let component: LinkNewContactAddPopUpComponent;
  let fixture: ComponentFixture<LinkNewContactAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNewContactAddPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkNewContactAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
