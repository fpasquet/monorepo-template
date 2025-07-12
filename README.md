# Monorepo Template

This project provides a template to bootstrap a modern TypeScript monorepo using [Turborepo](https://turbo.build/), with shared configurations for ESLint, Prettier, and TypeScript. The goal is to offer an extensible foundation for scalable development, including custom generators for new TypeScript libraries.

> **Note:** This repository is a work in progress. Additional shared configurations (such as for Vitest) will be added in the future.

## Features

- **Shared Configurations:**  
  Includes reusable and versioned packages for ESLint (`@monorepo/eslint-config`), Prettier (`@monorepo/prettier-config`), and TypeScript (`@monorepo/typescript-config`).
- **Code Quality:**  
  Pre-configured with lint-staged, commitlint, Prettier, and Husky for robust code formatting and commit standards.
- **Monorepo Management:**  
  Uses [Turborepo](https://turbo.build/) for fast, cacheable monorepo workflows.
- **Generator:**  
  Integrated with [Plop](https://plopjs.com/) and Turbo to scaffold new TypeScript libraries with ease (see the `turbo` directory for generator specifics).
- **Ready for Expansion:**  
  Future shared configurations (e.g., for testing with Vitest) are planned.

## Structure

```text
/
├── apps/                  # Application projects (optional)
├── packages/
│   ├── eslint-config/     # Shared ESLint config package
│   └── prettier-config/   # Shared Prettier config package
│   └── typescript-config/ # Shared TypeScript config package
├── turbo/                 # Custom generators (Plop, etc.)
├── pnpm-workspace.yaml    # Workspace configuration for pnpm
├── turbo.json             # Turborepo pipeline configuration
├── package.json           # Root dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) (configured as package manager)
- [Turborepo](https://turbo.build/)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/fpasquet/monorepo-template.git
cd monorepo-template
pnpm install
```

### Core Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm prepare`    | Set up Husky git hooks               |
| `pnpm clean`      | Clean all build artifacts            |
| `pnpm format`     | Format codebase with Prettier        |
| `pnpm lint`       | Lint all packages with shared config |
| `pnpm type-check` | Type check all packages              |
| `pnpm test`       | Run all tests (future: with Vitest)  |
| `pnpm build`      | Build all packages                   |
| `pnpm dev`        | Start development environment        |

### Using the Generator

To scaffold a new TypeScript library using the generator:

```sh
pnpm turbo gen
```

Follow the prompts to generate a new library in the `packages/` directory.

## Shared Config Packages

- [`@monorepo/eslint-config`](./packages/eslint-config):  
  Shared, extensible ESLint configuration for JavaScript/TypeScript/React/Next.js.

- [`@monorepo/prettier-config`](./packages/prettier-config):
  Opinionated Prettier configuration.

## Infrastructure

Terraform files live in the [`infra`](./infra) directory. Copy
`terraform.tfvars.example` to `terraform.tfvars`, update the values, then run
`terraform init` followed by `terraform apply` to provision AWS resources.

## Configuration Files

- `.commitlintrc.mjs` - Conventional commit rules
- `.prettierrc.mjs` - Prettier configuration
- `lint-staged.config.mjs` - Lint-staged setup

## Roadmap

- [ ] Add shared Vitest configuration
- [ ] Expand generators for different project types
- [ ] Improve documentation and usage examples

## License

[MIT](LICENSE)

---

For more information, browse the [repository on GitHub](https://github.com/fpasquet/monorepo-template).
