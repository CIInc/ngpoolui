import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'abbreviatedNumber'})
export class AbbreviatedNumberPipe implements PipeTransform {
  transform(val, args) {
    /*
    if (args === undefined) {
      return val;
    }
    */
    let dec = 1;
    if (args !== undefined && args.length > 0) {
      dec = args[0];
    }
    if (val > 1000000000000) {
      return Math.floor(val / 1000000000000) + '.' + (val % 1000000000000).toString().substring(0, dec) + ' T';
    }
    if (val > 1000000000) {
      return Math.floor(val / 1000000000) + '.' + (val % 1000000000).toString().substring(0, dec) + ' B';
    }
    if (val > 1000000) {
      return Math.floor(val / 1000000) + '.' + (val % 1000000).toString().substring(0, dec) + ' M';
    }
    if (val > 1000) {
      return Math.floor(val / 1000) + '.' + (val % 1000).toString().substring(0, dec) + ' K';
    }
    return ( val || 0 );
  }
}
