import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  template: `
    <div>
      <label 
        [for]="fieldId" 
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      
      <input
        [id]="fieldId"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [class]="inputClasses"
      />
      
      <div *ngIf="hasErrors" class="mt-1">
        <p *ngFor="let error of errorMessages" class="text-sm text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
  `
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() control: AbstractControl | null = null;
  @Input() fieldId = '';

  value = '';
  disabled = false;
  touched = false;
  dirty = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get hasErrors(): boolean {
    return this.control ? this.control.invalid && (this.control.touched || this.control.dirty) : false;
  }

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors) {
      return [];
    }

    const errors: string[] = [];
    const controlErrors = this.control.errors;

    if (controlErrors['required']) {
      errors.push(`${this.label} é obrigatório`);
    }

    if (controlErrors['email']) {
      errors.push(`${this.label} deve ser um email válido`);
    }

    if (controlErrors['minlength']) {
      const requiredLength = controlErrors['minlength'].requiredLength;
      errors.push(`${this.label} deve ter pelo menos ${requiredLength} caracteres`);
    }

    if (controlErrors['maxlength']) {
      const requiredLength = controlErrors['maxlength'].requiredLength;
      errors.push(`${this.label} deve ter no máximo ${requiredLength} caracteres`);
    }

    if (controlErrors['passwordMismatch']) {
      errors.push('As senhas não conferem');
    }

    return errors;
  }

  get inputClasses(): string {
    const baseClasses = 'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm';
    
    if (this.hasErrors) {
      return `${baseClasses} border-red-500 focus:ring-red-500 focus:border-red-500`;
    }
    
    return `${baseClasses} border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dirty = true;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}