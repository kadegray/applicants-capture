import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApplicantFormComponent),
      multi: true
    }
  ]
})
export class ApplicantFormComponent implements ControlValueAccessor {

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  onChange: any = () => {};
  onTouch: any = () => {};

  internalValue: object | null = null;

  ngOnInit() {
    this.value = null;
    this.form.valueChanges.subscribe(values => {
      this.value = this.form.valid ? values : null;
    });
  }

  set value(v: object | null) {
    this.internalValue = v;
    this.onChange(this.internalValue);
    this.onTouch(this.internalValue);
  }

  writeValue(value: any){ 
    this.internalValue = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }
}
