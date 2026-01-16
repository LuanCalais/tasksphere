import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'list-card-component',
  standalone: true,
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  imports: [CommonModule],
})
export class ListCardComponent {
  @Input() description: string | null = null;
  onClick = output<void>();
  title = input<string>('Sem titulo');

  descriptionEmptyPlaceholder = input<string>('Sem descrição');
  color = input<string>('');
}
