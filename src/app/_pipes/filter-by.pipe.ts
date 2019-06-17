import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(arr: Array<object>, value: string, fields: Array<string> = undefined): any {
    if(!arr || !value) return arr;

    value = this.normalize(value);

    return arr.filter(o => {
      for (const key in o) {
        if (o.hasOwnProperty(key) && typeof o[key] === 'string' && (fields === undefined || fields.indexOf(key) != -1)) {

          if (this.normalize(o[key]).indexOf(value) != -1) return true;
        }
      }
      return false;
    });
  }

  private normalize(str:any){

    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

}
