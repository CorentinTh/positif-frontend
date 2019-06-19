import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'talent'
})
export class TalentPipe implements PipeTransform {

  transform(talent: string): string {

    switch (talent) {
      case 'FORTUNE_TELLER':
        return 'voyant';
      case 'TAROT_READER':
        return 'tarologue';
      case 'ASTROLOGIST':
        return 'astrologue';
    }

    return '';
  }

}
