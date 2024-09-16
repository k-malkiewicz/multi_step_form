import { Component, ViewEncapsulation } from '@angular/core';
import { MultiStepFormService } from '../../services/multi-step-form.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStep1Component } from "../form-part-1/form-part-1.component";
import { FormStep2Component } from "../form-part-2/form-part-2.component";
import { FormStep3Component } from "../form-part-3/form-part-3.component";
import { FormStep4Component } from "../form-part-4/form-part-4.component";

@Component({
  selector: 'multi-step-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormStep1Component, FormStep2Component, FormStep3Component, FormStep4Component],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MultiStepFormComponent {
  constructor(public multiStepFormService: MultiStepFormService) { }

  handleCurrentStep(btnType: 'back' | 'next'): void {
    if (btnType === 'back') {
      this.multiStepFormService.currentFormStep -= 1;
      if (this.multiStepFormService.currentFormStep < 1) this.multiStepFormService.currentFormStep = 1;
    }

    if (btnType === 'next') {
      this.multiStepFormService.nextBtnClicked = true;

      switch (this.multiStepFormService.currentFormStep) {
        case 1:
          if (this.multiStepFormService.personalInfo?.valid) {
            this.multiStepFormService.currentFormStep += 1;
            this.multiStepFormService.nextBtnClicked = false;
          }
          break;
        case 2:
          if (this.multiStepFormService.planType?.valid) {
            this.multiStepFormService.currentFormStep += 1;
          }
          break;
        case 3:
          this.multiStepFormService.currentFormStep += 1;
          break;
        case 4:
          this.multiStepFormService.currentFormStep = this.multiStepFormService.maxFormSteps;
          this.multiStepFormService.confirmBtnClicked = true;
          break;
      }
    }
  }
}
