import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email.validator';
import { phoneNumberValidator } from '../validators/phone-number.validator';
import { PlanType } from '../interfaces/plan_type.interface';
import { AddOn } from '../interfaces/add_on.interface';

@Injectable({
  providedIn: 'root'
})
export class MultiStepFormService {
  form: FormGroup;
  currentFormStep: number = 1;
  maxFormSteps: number = 4;

  selectedPlanType: PlanType | null = null;
  selectedAddOns: AddOn[] = [];

  nextBtnClicked: boolean = false;
  confirmBtnClicked: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, emailValidator]],
        phoneNumber: ['', [Validators.required, phoneNumberValidator]]
      }),
      planType: [null, [Validators.required]],
      billing: ['monthly'],
      addOns: ['']
    }, {
      updateOn: 'change'
    });
  }

  get personalInfo(): FormGroup {
    return this.form.get('personalInfo') as FormGroup;
  }

  get name(): AbstractControl | null {
    return this.personalInfo?.get('name');
  }

  get email(): AbstractControl | null {
    return this.personalInfo?.get('email');
  }

  get phoneNumber(): AbstractControl | null {
    return this.personalInfo?.get('phoneNumber');
  }

  get planType(): AbstractControl | null {
    return this.form.get('planType');
  }

  get billing(): AbstractControl | null {
    return this.form.get('billing');
  }

  get totalPrice(): string {
    let total: number = 0;

    if (this.selectedAddOns.length > 0) {
      total += this.selectedAddOns.reduce((x: number, y: any) => x + y.price[this.billing?.value], 0);
    }

    if (this.selectedPlanType) {
      total += this.selectedPlanType.price[this.billing?.value as 'monthly' | 'yearly'];
    }

    return `\$${total}/${this.billing?.value === 'monthly' ? 'mo' : 'yr'}`;
  }
}