import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'formatImgUrl'
})
export class FormatImgUrlPipe implements PipeTransform {
  imageUrl = environment.POKEMONIMAGEAPI;
  transform(value: string): string {
    return `${this.imageUrl}${value}.png`;
  }
}
