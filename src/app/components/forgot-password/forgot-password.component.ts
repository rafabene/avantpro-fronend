import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { PasswordResetRequest } from '../../models/user.model';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormFieldComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recuperar senha
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Digite seu email para receber instruções de recuperação
          </p>
        </div>
        
        <div *ngIf="success" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Email enviado com sucesso!
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>
                  Verifique sua caixa de entrada e siga as instruções para recuperar sua senha.
                </p>
              </div>
              <div class="mt-4">
                <a routerLink="/login" class="text-sm font-medium text-green-800 hover:text-green-700">
                  Voltar para o login
                </a>
              </div>
            </div>
          </div>
        </div>

        <form *ngIf="!success" class="mt-8 space-y-6" [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <app-form-field
              label="Email"
              type="email"
              fieldId="email"
              placeholder="Digite seu email"
              [required]="true"
              [control]="forgotPasswordForm.get('email')"
              formControlName="email">
            </app-form-field>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                Voltar para o login
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? 'Enviando...' : 'Enviar instruções' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;

      const request: PasswordResetRequest = {
        email: this.forgotPasswordForm.value.email
      };

      this.authService.requestPasswordReset(request).subscribe({
        next: (response) => {
          this.loading = false;
          this.success = true;
          this.messageService.showSuccess('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
        },
        error: (error) => {
          this.loading = false;
          console.error('Password reset error:', error);
          
          let errorMessage = 'Erro ao enviar email de recuperação. Tente novamente.';
          if (error.status === 404) {
            errorMessage = 'Email não encontrado';
          } else if (error.status === 0) {
            errorMessage = 'Erro de conexão com o servidor';
          } else if (error.error?.detail) {
            errorMessage = error.error.detail;
          }
          
          this.messageService.showError(errorMessage);
        }
      });
    } else {
      Object.keys(this.forgotPasswordForm.controls).forEach(key => {
        this.forgotPasswordForm.get(key)?.markAsTouched();
      });
    }
  }
}