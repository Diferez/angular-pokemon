import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
  ]
})
export class HomeModule { }
