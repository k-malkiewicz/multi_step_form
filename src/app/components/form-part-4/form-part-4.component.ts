import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiStepFormService } from '../../services/multi-step-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-part-4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-part-4.component.html',
  styleUrl: './form-part-4.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormStep4Component {
  constructor(public formService: MultiStepFormService) { }

  goToSelectPlan(): void {
    this.formService.currentFormStep = 2;
  }
}
