import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
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

  @Input() hideCloseIcon: boolean = false;
  @Input() primaryDefault: boolean = false;

  @Output() primaryChanged = new EventEmitter<string>();
  @Output() removeApplicant = new EventEmitter<string>();

  form = new FormGroup({
    primary: new FormControl(),
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

    const primaryControl = this.form.get('primary');
    primaryControl?.valueChanges.subscribe(value => {
      if (value) {
        this.primaryChanged.emit(value);
      } else {
        primaryControl?.setValue(true, { emitEvent: false });
      }
    });

    if (this.primaryDefault === true) {
      primaryControl?.setValue(this.primaryDefault);
    }
  }

  set value(v: object | null) {
    this.internalValue = v;
    this.onChange(this.internalValue);
    this.onTouch(this.internalValue);
  }

  writeValue(value: any){ 

    if (value === null) {
      return;
    }

    for(let key of Object.keys(value)) {
      const val = value[key];
      this.form.get(key)?.setValue(val, { emitEvent: false });
    }

    this.internalValue = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

  removeClicked() {
    this.removeApplicant.emit();
  }
}
