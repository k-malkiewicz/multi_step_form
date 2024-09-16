import { Component, ViewEncapsulation } from '@angular/core';
import { AddOn } from '../../interfaces/add_on.interface';
import { MultiStepFormService } from '../../services/multi-step-form.service';

@Component({
  selector: 'form-part-3',
  standalone: true,
  imports: [],
  templateUrl: './form-part-3.component.html',
  styleUrl: './form-part-3.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormStep3Component {
  addOns: AddOn[] = [
    { name: 'Online service', description: 'Access to multiplayer games', price: { monthly: 1, yearly: 10 } },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', price: { monthly: 2, yearly: 20 } },
    { name: 'Customizable profile', description: 'Custom theme on your profile', price: { monthly: 2, yearly: 20 } }
  ];

  constructor(public formService: MultiStepFormService) { }

  handleSelectedAddOns(addOn: any): void {
    if (this.formService.selectedAddOns.indexOf(addOn) < 0) {
      this.formService.selectedAddOns.push(addOn);
    } else {
      this.formService.selectedAddOns = this.formService.selectedAddOns.filter((addOnFromArray: any) => addOnFromArray !== addOn);
    }
  }
}
