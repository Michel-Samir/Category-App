import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, filterItem: string): any {
    if(value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for(let item of value) {
      if( item[filterItem].toLowerCase().includes(filterString) ) {
        resultArray.push(item);
      } else {
        resultArray.push(0);
      }
    }
    return resultArray;
  }

}
