import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'toXMR'})
export class ToXMRPipe implements PipeTransform {
  transform(val, args) {
    /*
    if (args === undefined) {
      return val;
    }
    */
    return val / 1000000000000;
  }
}
