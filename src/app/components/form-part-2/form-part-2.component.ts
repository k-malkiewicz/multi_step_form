import { Component, ViewEncapsulation } from '@angular/core';
import { PlanType } from '../../interfaces/plan_type.interface';
import { MultiStepFormService } from '../../services/multi-step-form.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-part-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-part-2.component.html',
  styleUrl: './form-part-2.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormStep2Component {
  planTypes: PlanType[] = [
    { name: 'Arcade', iconPath: '/images/icon-arcade.svg', price: { monthly: 9, yearly: 90 } },
    { name: 'Advanced', iconPath: '/images/icon-advanced.svg', price: { monthly: 12, yearly: 120 } },
    { name: 'Pro', iconPath: '/images/icon-pro.svg', price: { monthly: 15, yearly: 150 } }
  ];

  constructor(public formService: MultiStepFormService) { }

  handleBillingToggleBtn(monthlyBillingInput: HTMLInputElement, yearlyBillingInput: HTMLInputElement): void {
    if (monthlyBillingInput.checked) {
      monthlyBillingInput.checked = false;
      yearlyBillingInput.checked = true;
      this.formService.billing?.setValue('yearly');
    } else {
      monthlyBillingInput.checked = true;
      yearlyBillingInput.checked = false;
      this.formService.billing?.setValue('monthly');
    }
  }
}
