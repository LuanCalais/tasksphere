import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  imports: [CommonModule, LucideAngularModule],
})
export class ConfirmModalComponent {
  readonly XIcon = X;
  confirm = output<void>();
  cancel = output<void>();
  label = input<string>('');

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
