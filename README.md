# AvantPro Frontend

AvantPro Frontend é uma aplicação Angular moderna construída com as melhores práticas e tecnologias atuais.

## 🚀 Tecnologias

- **Angular 20.2.0** - Framework principal
- **TypeScript 5.9.2** - Linguagem de programação
- **TailwindCSS 3.4.1** - Framework CSS utilitário
- **RxJS 7.8.0** - Programação reativa
- **Karma & Jasmine** - Testes unitários

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd avantpro-frontend
```

2. Instale as dependências:
```bash
npm install
```

## 🚀 Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou
ng serve
```

Abra seu navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente quando você modificar os arquivos fonte.

## 🏗️ Build

Para fazer o build do projeto:

```bash
npm run build
# ou
ng build
```

Os artefatos do build serão armazenados no diretório `dist/`. Por padrão, o build de produção otimiza sua aplicação para performance e velocidade.

## 🧪 Testes

### Testes Unitários

Para executar os testes unitários com [Karma](https://karma-runner.github.io):

```bash
npm test
# ou
ng test
```

### Testes E2E

Para testes end-to-end:

```bash
ng e2e
```

> **Nota:** O Angular CLI não vem com um framework de testes e2e por padrão. Você pode escolher um que atenda às suas necessidades.

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Faz o build da aplicação
- `npm run watch` - Build em modo watch para desenvolvimento
- `npm test` - Executa os testes unitários

## 🎨 Estilo de Código

Este projeto utiliza Prettier com configurações customizadas:
- Print width: 100 caracteres
- Single quotes
- Parser Angular para arquivos HTML

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📚 Recursos Adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
