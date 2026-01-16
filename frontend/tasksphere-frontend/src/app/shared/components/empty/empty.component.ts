import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'empty-component',
  standalone: true,
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  imports: [CommonModule],
})
export class EmptyComponent {
  constructor() {}
  title = input<string>('No Items Found');
}
