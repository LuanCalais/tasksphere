import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  Input,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'carousel-component',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  imports: [CommonModule],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLDivElement>;

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() ariaLabel = 'Carrossel';

  @Input() itemsPerPage = 1;
  @Input() gap = 12;
  @Input() trackPadding = 0;
  @Input() showDots = true;
  @Input() showControls = true;
  @Input() loop = false;

  private _currentPage = signal(0);
  currentPage = this._currentPage;

  private viewportWidth = signal(0);

  private isPointerDown = false;
  private startX = 0;
  private lastX = 0;
  private moved = false;

  @Input() totalItems = 0;

  pageCount = computed(() => {
    const perPage = Math.max(1, this.itemsPerPage);
    return Math.max(1, Math.ceil(this.totalItems / perPage));
  });

  transform = computed(() => {
    const page = this.currentPage();
    const w = this.viewportWidth();
    return `translate3d(${-page * w}px, 0, 0)`;
  });

  isPrevDisabled = computed(() => !this.loop && this.currentPage() <= 0);
  isNextDisabled = computed(() => !this.loop && this.currentPage() >= this.pageCount() - 1);

  ngAfterViewInit(): void {
    this.measure();
  }

  @HostListener('window:resize')
  measure() {
    const el = this.viewportRef?.nativeElement;
    if (!el) return;
    this.viewportWidth.set(el.clientWidth);
  }

  dotsArray(): unknown[] {
    return Array.from({ length: this.pageCount() });
  }

  prev() {
    const pc = this.pageCount();
    const cur = this.currentPage();

    if (this.loop) {
      this._currentPage.set((cur - 1 + pc) % pc);
      return;
    }
    this._currentPage.set(Math.max(0, cur - 1));
  }

  next() {
    const pc = this.pageCount();
    const cur = this.currentPage();

    if (this.loop) {
      this._currentPage.set((cur + 1) % pc);
      return;
    }
    this._currentPage.set(Math.min(pc - 1, cur + 1));
  }

  goTo(page: number) {
    const pc = this.pageCount();
    if (page < 0 || page > pc - 1) return;
    this._currentPage.set(page);
  }

  onPointerDown(ev: PointerEvent) {
    if (ev.button !== 0) return;

    this.isPointerDown = true;
    this.moved = false;
    this.startX = ev.clientX;
    this.lastX = ev.clientX;

    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.isPointerDown) return;

    this.lastX = ev.clientX;
    const dx = this.lastX - this.startX;
    if (Math.abs(dx) > 6) this.moved = true;
  }

  onPointerUp(ev: PointerEvent) {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;

    if (!this.moved) return;

    const dx = this.lastX - this.startX;
    const threshold = Math.max(40, this.viewportWidth() * 0.12);

    if (dx > threshold) this.prev();
    else if (dx < -threshold) this.next();
  }
}
