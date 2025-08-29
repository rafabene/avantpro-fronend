import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-simple-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormFieldComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            AvantPro - Portal de Autenticação
          </p>
        </div>
        
        <form class="mt-8 space-y-6" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <app-form-field
              label="Email"
              type="email"
              fieldId="email"
              placeholder="Digite seu email"
              [required]="true"
              [control]="loginForm.get('email')"
              formControlName="email">
            </app-form-field>
            
            <app-form-field
              label="Senha"
              type="password"
              fieldId="password"
              placeholder="Digite sua senha"
              [required]="true"
              [control]="loginForm.get('password')"
              formControlName="password">
            </app-form-field>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>

          <div class="text-center space-y-2">
            <p class="text-sm text-gray-600">
              <a routerLink="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
                Esqueceu sua senha?
              </a>
            </p>
            <p class="text-sm text-gray-600">
              Não tem conta? 
              <a routerLink="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                Cadastre-se gratuitamente
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SimpleLoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      const credentials: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.loading = false;
          // Navegue para dashboard ou página inicial
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Login error:', error);
          
          let errorMessage = 'Erro ao fazer login. Tente novamente.';
          if (error.status === 401) {
            errorMessage = 'Email ou senha incorretos';
          } else if (error.status === 0) {
            errorMessage = 'Erro de conexão com o servidor';
          } else if (error.error?.detail) {
            errorMessage = error.error.detail;
          }
          
          this.messageService.showError(errorMessage);
        }
      });
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}