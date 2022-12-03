import { Component, Input, OnInit } from '@angular/core';
import { ISlide } from '../../Models/ISlide';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-imageSlider',
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.css']
})
export class ImageSliderComponent implements OnInit {

  @Input() slides: ISlide[] = [];

  public currentIndex: number = 0;
  public arrowLeft = faAngleLeft;
  public arrowRight = faAngleRight;

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
