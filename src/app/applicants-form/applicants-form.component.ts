import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicants-form',
  templateUrl: './applicants-form.component.html',
  styleUrls: ['./applicants-form.component.css']
})
export class ApplicantsFormComponent {

  numApplicants = 1;

  applicantsFormGroup: FormGroup = new FormGroup({
    applicant1: new FormControl(null, Validators.required),
  });

  primaryApplicantFormGroup: FormGroup = new FormGroup({});

  constructor(private cdr: ChangeDetectorRef) {
    const firstPrimaryControl: AbstractControl = new FormControl(true);
    this.primaryApplicantFormGroup.addControl('applicant1', firstPrimaryControl);
    firstPrimaryControl.valueChanges.subscribe(value => this.primaryApplicantChange('applicant1', value));
  }

  applicantsFormGroupKeys(): Array<string> {
    return Object.keys(this.applicantsFormGroup.controls);
  }

  addAnotherApplicants() {
    const applicantControl: AbstractControl = new FormControl({}, Validators.required);
    const primaryControl: AbstractControl = new FormControl(false);

    const num = this.numApplicants+1;
    this.applicantsFormGroup.addControl(`applicant${num}`, applicantControl);

    this.primaryApplicantFormGroup.addControl(`applicant${num}`, primaryControl);
    primaryControl.valueChanges.subscribe(value => this.primaryApplicantChange(`applicant${num}`, value));
    this.numApplicants = this.applicantsFormGroupKeys().length;
  }

  removeApplicantControl(controlKey: string) {
    this.applicantsFormGroup.removeControl(controlKey);
    this.numApplicants = this.applicantsFormGroupKeys().length;

    const primary = this.primaryApplicantFormGroup.get(controlKey)?.getRawValue();
    if (primary) {
      const firstApplicantPrimaryControl = Object.keys(this.primaryApplicantFormGroup.getRawValue())?.[0];
      this.primaryApplicantFormGroup.get(firstApplicantPrimaryControl)?.setValue(true);
      this.cdr.markForCheck();
    }
  }

  primaryApplicantChange(control: string, value: boolean) {

    // only if true, checked
    if (!value) {
      return;
    }

    // uncheck all the others
    const values = this.primaryApplicantFormGroup.getRawValue();
    for(let c of Object.keys(values)) {
      if (c !== control) {
        this.primaryApplicantFormGroup.get(c)?.setValue(false);
      }
    }

    this.cdr.markForCheck();
  }

  submit() {

    const allApplicants = this.applicantsFormGroup.getRawValue();

    console.clear();

    const applicantKeys = Object.keys(allApplicants);
    for(let [index, applicantKey] of applicantKeys.entries()) {

      const applicantData = allApplicants[applicantKey];

      const isPrimary = this.primaryApplicantFormGroup.get(applicantKey)?.value ? 'PRIMARY ' : '';

      console.log((index+1) + '/' + applicantKeys.length);
      console.log(`${isPrimary}Applicant Name: ${applicantData.firstName} ${applicantData.lastName}`);
      console.log(`Mobile Number: ${applicantData.mobileNumber}`);
      console.log(`Email: ${applicantData.email}`);
      console.log('\n')
    }
  }

}
