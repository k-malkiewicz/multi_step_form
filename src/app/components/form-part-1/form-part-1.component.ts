import { Component, ViewEncapsulation } from '@angular/core';
import { MultiStepFormService } from '../../services/multi-step-form.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-part-1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-part-1.component.html',
  styleUrl: './form-part-1.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormStep1Component {
  constructor(public formService: MultiStepFormService) { }
}
