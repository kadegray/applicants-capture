import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicants-form',
  templateUrl: './applicants-form.component.html',
  styleUrls: ['./applicants-form.component.css']
})
export class ApplicantsFormComponent {

  applicantsCount = 1;

  applicantsFormGroup: FormGroup = new FormGroup({
    applicant1: new FormControl(null, Validators.required),
  });

  constructor() {
    const firstPrimaryControl: AbstractControl = new FormControl(true);
    firstPrimaryControl.valueChanges.subscribe(value => this.primaryApplicantChange('applicant1', value));
  }

  applicantsFormGroupKeys(): Array<string> {
    return Object.keys(this.applicantsFormGroup.controls);
  }

  addAnotherApplicant() {
    const applicantControl: AbstractControl = new FormControl(null, Validators.required);
    this.applicantsCount += 1;
    this.applicantsFormGroup.addControl(`applicant${this.applicantsCount}`, applicantControl);
  }

  removeApplicantControl(controlKey: string) {
    this.applicantsFormGroup.removeControl(controlKey);

    // if there is only one applicant then check primary on it
    const allControls = this.applicantsFormGroupKeys();
    if (allControls.length === 1) {
      const onlyControl = allControls[0];
      this.setPrimaryValue(onlyControl, true);

      return;
    }

    // check the first one if none have primary checked
    const numChecked = allControls
      .map((control) => this.applicantsFormGroup.get(control)?.value?.primary)
      .filter(value => value)
      .length;
    if (numChecked === 0) {
      const firstControl = allControls[0];
      this.setPrimaryValue(firstControl, true);
    }
  }

  primaryApplicantChange(controlKey: string, value: any) {

    const values = this.applicantsFormGroup.getRawValue();
    for(let c of Object.keys(values)) {
      if (c === controlKey) {
        continue;
      }

      this.setPrimaryValue(c, false);
    }
  }

  setPrimaryValue(controlKey: string, value: boolean = false) {
    const control = this.applicantsFormGroup.get(controlKey);
    let controlValue = control?.value ?? {};
    controlValue.primary = value;
    control?.setValue(controlValue);
  }

  isOnlyOneApplicant(applicantControl: string) {
    const applicants = this.applicantsFormGroupKeys();

    return applicants.length == 1 && applicantControl === applicants[0];
  }

  submit() {

    const allApplicants = this.applicantsFormGroup.getRawValue();

    console.clear();

    const applicantKeys = Object.keys(allApplicants);
    for(let [index, applicantKey] of applicantKeys.entries()) {

      const applicantData = allApplicants[applicantKey];
      const isPrimary = applicantData.primary ? 'PRIMARY ' : '';

      console.log((index+1) + '/' + applicantKeys.length);
      console.log(`${isPrimary}Applicant Name: ${applicantData.firstName} ${applicantData.lastName}`);
      console.log(`Mobile Number: +61${applicantData.mobileNumber}`);
      console.log(`Email: ${applicantData.email}`);
      console.log('\n')
    }
  }

}
