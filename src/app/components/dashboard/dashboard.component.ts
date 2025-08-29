import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">AvantPro Portal</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-gray-700">Olá, {{ currentUser?.name }}</span>
              <button
                (click)="logout()"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div class="text-center">
              <h2 class="text-3xl font-extrabold text-gray-900 mb-4">
                Bem-vindo ao AvantPro!
              </h2>
              <p class="text-lg text-gray-600 mb-8">
                Você está logado com sucesso no sistema.
              </p>
              
              <div class="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Informações do usuário</h3>
                <div class="space-y-2 text-left">
                  <div>
                    <span class="font-medium text-gray-700">Nome:</span>
                    <span class="ml-2 text-gray-900">{{ currentUser?.name }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Email:</span>
                    <span class="ml-2 text-gray-900">{{ currentUser?.username }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">ID:</span>
                    <span class="ml-2 text-gray-900 font-mono text-sm">{{ currentUser?.id }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Cadastro:</span>
                    <span class="ml-2 text-gray-900">{{ currentUser?.created_at | date:'short' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}