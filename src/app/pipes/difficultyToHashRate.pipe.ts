import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'difficultyToHashRate'})
export class DifficultyToHashRatePipe implements PipeTransform {
  transform(val, args) {
    /*
    if (args === undefined) {
      return val;
    }
    */
    return Math.floor(val / 120);
  }
}
