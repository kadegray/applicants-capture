import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFormComponent } from './applicant-form.component';

describe('ApplicantFormComponent', () => {
  let component: ApplicantFormComponent;
  let fixture: ComponentFixture<ApplicantFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantFormComponent]
    });
    fixture = TestBed.createComponent(ApplicantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
