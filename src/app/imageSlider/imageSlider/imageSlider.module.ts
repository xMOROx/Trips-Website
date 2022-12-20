import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageSliderComponent } from '../components/imageSlider/imageSlider.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [ImageSliderComponent],
  exports: [ImageSliderComponent]
})
export class ImageSliderModule { }
