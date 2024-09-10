import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const emailTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(control.value);
    return !emailTest && control.value.length > 0 ? { invalidEmailFormat: true } : null;
}