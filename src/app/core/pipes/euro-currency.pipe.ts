import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroCurrency',
  standalone: true
})
export class EuroCurrencyPipe implements PipeTransform {
  transform(value: number, decimals: number = 2): string {
    return `${value.toFixed(decimals).replace('.', ',')} €`;
  }
}
