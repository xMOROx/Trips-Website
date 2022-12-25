import { Component, Input, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ISlide } from '../../Models/ISlide';

@Component({
  selector: 'app-imageSlider',
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.css']
})
export class ImageSliderComponent implements OnInit {

  @Input() slides: ISlide[] = [];

  public currentIndex: number = 0;
  public arrowLeft: IconDefinition = faAngleLeft;
  public arrowRight: IconDefinition = faAngleRight;

  constructor() { }

  ngOnInit() {
  }

  public getCurrentSlideUrl(): String {
    return `url('${this.slides[this.currentIndex].url}')`;
  }

  public goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  public goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slides.length - 1 : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  public goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
