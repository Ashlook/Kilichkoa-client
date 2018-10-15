import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function compareValidator(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        const controlToCompare = c.root.get(controlNameToCompare);
        if ((controlToCompare === null || controlToCompare.value.length === 0) && (c.value === null || c.value.length) === 0) {
            return null;
        }
        return controlToCompare && controlToCompare.value !== c.value ? {'compare': true} : null;
    };
}
