import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'abbreviatedNumber'})
export class AbbreviatedNumberPipe implements PipeTransform {
  transform(val, args) {
    /*
    if (args === undefined) {
      return val;
    }
    */
    if (val > 1000000000000) {
      return Math.floor(val / 1000000000000) + "." + (val % 1000000000000).toString().substring(0, 2) + " T"
    }
    if (val > 1000000000) {
      return Math.floor(val / 1000000000) + "." + (val % 1000000000).toString().substring(0, 2) + " B"
    }
    if (val > 1000000) {
      return Math.floor(val / 1000000) + "." + (val % 1000000).toString().substring(0, 1) + " M"
    }
    if (val > 1000) {
      return Math.floor(val / 1000) + "." + (val % 1000).toString().substring(0, 1) + " K"
    }
    return ( val || 0 );
  }
}
