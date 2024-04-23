import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkNewContactAddPopUpSuccessComponent} from './link-new-contact-add-pop-up-success.component';

describe('LinkNewContactAddPopUpSuccessComponent', () => {
  let component: LinkNewContactAddPopUpSuccessComponent;
  let fixture: ComponentFixture<LinkNewContactAddPopUpSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNewContactAddPopUpSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkNewContactAddPopUpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
