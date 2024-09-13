import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiStepFormService {
  currentFormStep: number = 1;
  maxFormSteps: number = 4;

  constructor() { }
}