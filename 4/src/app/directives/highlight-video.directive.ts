import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightVideo]'
})
export class HighlightVideoDirective {
  @Input() date: string;

  private readonly periodInDays = 60;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  millisecondsToDays(milliseconds: number): number {
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    return days;
  }

  stringDateToMilliseconds(date: string): number {
    return new Date(this.date).getTime();
  }

  ngOnInit() {
    if (this.millisecondsToDays(Date.now() - this.stringDateToMilliseconds(this.date)) < this.periodInDays) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid rgba(85, 85, 85, 0.4)');
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '10px');
      this.renderer.setStyle(this.el.nativeElement, 'background', 'rgba(139, 139, 139, 0.1)');
    }
  }
}
