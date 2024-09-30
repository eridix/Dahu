import { AbstractControl } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn
{ 
    return (control: AbstractControl): ValidationErrors | null => {
const forbidden = nameRe.test(control.value);
    return forbidden ?
    {forbiddenName: {value: control.value}} : null;
};
}
