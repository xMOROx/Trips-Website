import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[ClickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() public ClickOutside: any = new EventEmitter<void>();

  private documentClickSubscription: Subscription | undefined;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(filter((event) => {
      return !this.isInside(event.target as HTMLElement);
    })).subscribe(() => {
      this.ClickOutside.emit();
    });
  }

  isInside(target: HTMLElement): boolean {
    return target === this.element.nativeElement || this.element.nativeElement.contains(target);
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
