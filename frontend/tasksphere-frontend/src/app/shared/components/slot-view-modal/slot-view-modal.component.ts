import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'slot-view-modal',
  standalone: true,
  templateUrl: './slot-view-modal.component.html',
  styleUrl: './slot-view-modal.component.scss',
  imports: [CommonModule, LucideAngularModule],
})
export class SlotViewModalComponent {
  readonly XIcon = X;
  confirm = output<void>();
  cancel = output<void>();
  title = input<string>('');
  label = input<string>('');

  onCancel() {
    this.cancel.emit();
  }
}
