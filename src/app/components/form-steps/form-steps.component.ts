import { Component } from '@angular/core';
import { MultiStepFormService } from '../../services/multi-step-form.service';

@Component({
  selector: 'form-steps',
  standalone: true,
  imports: [],
  templateUrl: './form-steps.component.html',
  styleUrl: './form-steps.component.scss'
})
export class FormStepsComponent {
  formSteps: string[] = [
    'Your info',
    'Select plan',
    'Add-ons',
    'Summary'
  ];

  constructor(public multiStepFormService: MultiStepFormService) {}
}
