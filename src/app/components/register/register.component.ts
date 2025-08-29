import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormFieldComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Ou
            <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              entre na sua conta existente
            </a>
          </p>
        </div>
        
        <form class="mt-8 space-y-6" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <app-form-field
              label="Nome completo"
              type="text"
              fieldId="name"
              placeholder="Digite seu nome completo"
              [required]="true"
              [control]="registerForm.get('name')"
              formControlName="name">
            </app-form-field>
            
            <app-form-field
              label="Email"
              type="email"
              fieldId="email"
              placeholder="Digite seu email"
              [required]="true"
              [control]="registerForm.get('email')"
              formControlName="email">
            </app-form-field>
            
            <app-form-field
              label="Senha"
              type="password"
              fieldId="password"
              placeholder="Digite sua senha"
              [required]="true"
              [control]="registerForm.get('password')"
              formControlName="password">
            </app-form-field>

            <app-form-field
              label="Confirmar senha"
              type="password"
              fieldId="confirmPassword"
              placeholder="Confirme sua senha"
              [required]="true"
              [control]="registerForm.get('confirmPassword')"
              formControlName="confirmPassword">
            </app-form-field>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      if (Object.keys(confirmPassword.errors!).length === 0) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;

      const userData: RegisterRequest = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.loading = false;
          this.messageService.showSuccess('Conta criada com sucesso! Faça login para continuar.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Register error:', error);
          
          let errorMessage = 'Erro ao criar conta. Tente novamente.';
          if (error.status === 409) {
            errorMessage = 'Este email já está em uso';
          } else if (error.status === 0) {
            errorMessage = 'Erro de conexão com o servidor';
          } else if (error.error?.detail) {
            errorMessage = error.error.detail;
          }
          
          this.messageService.showError(errorMessage);
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}