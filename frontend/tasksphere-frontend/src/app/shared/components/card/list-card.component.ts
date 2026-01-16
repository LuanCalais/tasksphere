import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'list-card-component',
  standalone: true,
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  imports: [CommonModule],
})
export class ListCardComponent {
  onClick = output<void>();
  title = input<string>('Sem titulo');
  description = input<string>('Sem descrição');
  color = input<string>('');
}
