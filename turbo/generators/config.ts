import type { PlopTypes } from '@turbo/gen';

interface Answers {
  name: string;
  description: string;
  directory: string;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('toLowerCase', (text: string) => text.toLowerCase());

  plop.setGenerator('typescript-package', {
    description: 'Create a new TypeScript library (lint, test and build)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Library name (e.g. @monorepo/utils):',
        default: '@monorepo/utils',
        validate: (input: string) => {
          if (input.length === 0) {
            return 'Library name is required';
          }
          if (!/^[@a-z0-9-_/]+$/.test(input)) {
            return 'Library name must contain only lowercase letters, numbers, dashes and underscores';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Library description:',
        default: 'A TypeScript library',
      },
      {
        type: 'input',
        name: 'directory',
        message: 'Destination directory (packages/[name]):',
        default: (answers: any) => {
          const packageName = answers.name;
          const name = packageName.includes('/') ? packageName.split('/').pop() : packageName;
          return `packages/${name}`;
        },
      },
    ],
    actions: [
      // Create package.json
      {
        type: 'add',
        path: '{{directory}}/package.json',
        templateFile: 'templates/library-typescript/package.json.hbs',
      },
      // Create .gitignore
      {
        type: 'add',
        path: '{{directory}}/.gitignore',
        templateFile: 'templates/library-typescript/.gitignore.hbs',
      },
      // Create ESLint configuration
      {
        type: 'add',
        path: '{{directory}}/eslint.config.mjs',
        templateFile: 'templates/library-typescript/eslint.config.mjs.hbs',
      },
      // Create tsconfig.json
      {
        type: 'add',
        path: '{{directory}}/tsconfig.json',
        templateFile: 'templates/library-typescript/tsconfig.json.hbs',
      },
      // Create build configuration
      {
        type: 'add',
        path: '{{directory}}/tsup.config.ts',
        templateFile: 'templates/library-typescript/tsup.config.ts.hbs',
      },
      // Create main file
      {
        type: 'add',
        path: '{{directory}}/src/index.ts',
        templateFile: 'templates/library-typescript/src/index.ts.hbs',
      },
      // Create tests
      {
        type: 'add',
        path: '{{directory}}/src/index.test.ts',
        templateFile: 'templates/library-typescript/src/index.test.ts.hbs',
      },
      // Create vitest.config.ts
      {
        type: 'add',
        path: '{{directory}}/vitest.config.ts',
        templateFile: 'templates/library-typescript/vitest.config.ts.hbs',
      },
      // Custom action to display instructions
      function customAction(answers: Answers) {
        const packageName = answers.name;
        const directory = answers.directory;

        console.log(`\n✅ Library ${packageName} created successfully in ${directory}/`);
        console.log('\nNext steps:');
        console.log('   1. pnpm i');
        console.log(`   2. pnpm build --filter ${packageName}`);
        console.log('\nYour library is now ready to be developed!');

        return 'Library created successfully';
      },
    ],
  });
}
