import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'formatImgUrl'
})
export class FormatImgUrlPipe implements PipeTransform {
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  transform(value: number): string {
    return `${this.imageUrl}${value}.png`;
  }
}