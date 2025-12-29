import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'project-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [CommonModule, LucideAngularModule, ConfirmModalComponent],
})
export class CardComponent {
  id = input<number | undefined>();
  name = input<string>('');
  description = input<string>('');
  ownerName = input<string>('');
  ownerEmail = input<string>('');
  isVariant = input<boolean>(false);
  confirmAction = output<number | undefined>();
  readonly XIcon = X;

  showConfirmModal = false;

  openModal() {
    this.showConfirmModal = true;
  }

  closeModal() {
    this.showConfirmModal = false;
  }

  confirmDelete() {
    if (!this.id()) return;
    this.showConfirmModal = false;
    this.confirmAction.emit(this.id());
  }
}
