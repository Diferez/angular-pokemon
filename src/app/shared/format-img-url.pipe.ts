import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatImgUrl'
})
export class FormatImgUrlPipe implements PipeTransform {
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  transform(value: string): string {
    return `${this.imageUrl}${value}.png`;
  }
}