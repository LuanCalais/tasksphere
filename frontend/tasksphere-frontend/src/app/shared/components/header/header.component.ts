import { CommonModule } from '@angular/common';
import { Component,  input } from '@angular/core';

@Component({
  selector: 'header-component',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule],
})
export class HeaderComponent {
  title = input<string>('TaskSphere');
  subtitle = input<string>('');
  iconPath = input<string>('');
  iconAlt = input<string>('');
}
