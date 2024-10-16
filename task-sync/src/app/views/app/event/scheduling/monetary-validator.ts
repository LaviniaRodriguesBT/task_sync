import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
export function monetaryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = /^\d+(,\d{1,2})?$/; 
        return value && !regex.test(value) ? { invalidMonetary: true } : null;
    };
}
