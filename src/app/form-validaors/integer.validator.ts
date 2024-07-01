import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validInteger(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    const value = Number(control.value);

    if (Number.isInteger(value)) {
      return null;
    }

    return { notValidInteger: true };
  };
}