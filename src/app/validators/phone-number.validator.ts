import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const phoneNumberTest = /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/gi.test(control.value);
    return !phoneNumberTest && control.value.length > 0 ? { invalidPhoneNumberFormat: true } : null;
}