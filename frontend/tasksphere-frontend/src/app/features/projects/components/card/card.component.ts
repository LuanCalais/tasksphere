import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
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
  name = input<string>('');
  description = input<string>('');
  ownerName = input<string>('');
  ownerEmail = input<string>('');
  isVariant = input<boolean>(false);
  readonly XIcon = X;

  showConfirmModal = false;

  openModal() {
    this.showConfirmModal = true;
  }

  closeModal() {
    this.showConfirmModal = false;
  }

  confirmDelete() {
    alert('Projeto deletado!');
    this.showConfirmModal = false;
  }
}
