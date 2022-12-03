import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from '../components/imageSlider/imageSlider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [ImageSliderComponent],
  exports: [ImageSliderComponent]
})
export class ImageSliderModule { }
