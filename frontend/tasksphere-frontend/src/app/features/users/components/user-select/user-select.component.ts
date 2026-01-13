import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AVATAR_DEFAULT_IMAGE } from '@shared/constants';
import { UserOption } from '@core/types/user';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UserSelectComponent,
      multi: true,
    },
  ],
})
export class UserSelectComponent implements ControlValueAccessor {
  @Input() label = 'Owner';
  @Input() placeholder = 'Selecione um usuário';
  @Input() options: UserOption[] = [];
  @Input() disabled = false;

  @Output() selectedChange = new EventEmitter<UserOption | null>();

  open = false;
  value: UserOption['id'] | null = null;
  readonly avatarDefaultPath = AVATAR_DEFAULT_IMAGE.src;

  private onChange: (value: UserOption['id'] | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private host: ElementRef<HTMLElement>) {}

  get selected(): UserOption | null {
    return this.options.find((o) => String(o.id) === String(this.value)) ?? null;
  }

  writeValue(value: UserOption['id'] | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: UserOption['id'] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    this.onTouched();
  }

  select(option: UserOption) {
    if (this.disabled) return;
    this.value = option.id;
    this.onChange(this.value);
    this.onTouched();
    this.selectedChange.emit(option);
    this.open = false;
  }

  clear(ev?: MouseEvent) {
    ev?.stopPropagation();
    if (this.disabled) return;

    this.value = null;
    this.onChange(null);
    this.onTouched();
    this.selectedChange.emit(null);
    this.open = false;
  }

  initials(name: string) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join('');
  }
  // Abre no mousedown
  @HostListener('document:mousedown', ['$event'])
  onDocMouseDown(ev: MouseEvent) {
    if (!this.open) return;
    const target = ev.target as Node | null;
    if (!target) return;

    if (!this.host.nativeElement.contains(target)) {
      this.open = false;
    }
  }

  // Fecha no esc
  @HostListener('document:keydown.escape')
  onEsc() {
    this.open = false;
  }
}
