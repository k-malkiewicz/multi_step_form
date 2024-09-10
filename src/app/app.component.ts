import { Component } from '@angular/core';
import { FormStepsComponent } from "./components/form-steps/form-steps.component";
import { MultiStepFormComponent } from "./components/multi-step-form/multi-step-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormStepsComponent, MultiStepFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
