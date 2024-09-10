import { Component } from '@angular/core';
import { MultiStepFormService } from '../../services/multi-step-form.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../validators/email.validator';
import { phoneNumberValidator } from '../../validators/phone-number.validator';
import { PlanType } from '../../interfaces/plan_type.interface';
import { AddOn } from '../../interfaces/add_on.interface';

@Component({
  selector: 'multi-step-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent {
  form: FormGroup;
  nextBtnClicked: boolean = false;
  confirmBtnClicked: boolean = false;
  selectedPlanType: PlanType | null = null;
  selectedAddOns: AddOn[] = [];

  planTypes: PlanType[] = [
    { name: 'Arcade', iconPath: '/images/icon-arcade.svg', price: { monthly: 9, yearly: 90 } },
    { name: 'Advanced', iconPath: '/images/icon-advanced.svg', price: { monthly: 12, yearly: 120 } },
    { name: 'Pro', iconPath: '/images/icon-pro.svg', price: { monthly: 15, yearly: 150 } }
  ];

  addOns: AddOn[] = [
    { name: 'Online service', description: 'Access to multiplayer games', price: { monthly: 1, yearly: 10 } },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', price: { monthly: 2, yearly: 20 } },
    { name: 'Customizable profile', description: 'Custom theme on your profile', price: { monthly: 2, yearly: 20 } }
  ];

  constructor(public multiStepFormService: MultiStepFormService, private fb: FormBuilder) {
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

  handleCurrentStep(btnType: 'back' | 'next'): void {
    if (btnType === 'back') {
      this.multiStepFormService.currentFormStep -= 1;
      if (this.multiStepFormService.currentFormStep < 1) this.multiStepFormService.currentFormStep = 1;
    }

    if (btnType === 'next') {
      this.nextBtnClicked = true;

      switch(this.multiStepFormService.currentFormStep) {
        case 1:
          if (this.personalInfo?.valid) {
            this.multiStepFormService.currentFormStep += 1;
            this.nextBtnClicked = false;
          }
          break;
        case 2:
          if (this.planType?.valid) {
            this.multiStepFormService.currentFormStep += 1;
          }
          break;
        case 3:
          this.multiStepFormService.currentFormStep += 1;
          break;
        case 4:
          this.multiStepFormService.currentFormStep = this.multiStepFormService.maxFormSteps;
          this.confirmBtnClicked = true;
          break;
      }
    }
  }

  handleBillingToggleBtn(monthlyBillingInput: HTMLInputElement, yearlyBillingInput: HTMLInputElement): void {
    if (monthlyBillingInput.checked) {
      monthlyBillingInput.checked = false;
      yearlyBillingInput.checked = true;
      this.billing?.setValue('yearly');
    } else {
      monthlyBillingInput.checked = true;
      yearlyBillingInput.checked = false;
      this.billing?.setValue('monthly');
    }
  }

  handleSelectedAddOns(addOn: any): void {
    if (this.selectedAddOns.indexOf(addOn) < 0) {
      this.selectedAddOns.push(addOn);
    } else {
      this.selectedAddOns = this.selectedAddOns.filter((addOnFromArray: any) => addOnFromArray !== addOn);
    }
  }

  goToSelectPlan(): void {
    this.multiStepFormService.currentFormStep = 2;
  }

  get personalInfo() {
    return this.form.get('personalInfo');
  }

  get name() {
    return this.personalInfo?.get('name');
  }

  get email() {
    return this.personalInfo?.get('email');
  }

  get phoneNumber() {
    return this.personalInfo?.get('phoneNumber');
  }

  get planType() {
    return this.form.get('planType');
  }

  get billing() {
    return this.form.get('billing');
  }

  get totalPrice() {
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
