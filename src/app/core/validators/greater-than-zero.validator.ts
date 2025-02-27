import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validador personalizado para verificar que el valor sea mayor que 0
export function greaterThanZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value <= 0) {
      return { greaterThanZero: { value: control.value } };
    }
    return null; // El valor es válido
  };
}