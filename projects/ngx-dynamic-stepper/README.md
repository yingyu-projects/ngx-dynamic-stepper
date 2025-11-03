# ngx-dynamic-stepper

A powerful Angular library for creating dynamic multi-step wizards built on Angular Material Stepper.

## Installation

```bash
npm install ngx-dynamic-stepper
```

## Quick Start

```typescript
import { DynamicStepperComponent, WizardWorkflow, AbstractWizardStep } from 'ngx-dynamic-stepper';

// Define your workflow
const workflow: WizardWorkflow = {
  steps: [
    { id: 'step1', label: 'Step 1', component: Step1Component },
    { id: 'step2', label: 'Step 2', component: Step2Component }
  ]
};

// Use in template
<ngx-dynamic-stepper [workflow]="workflow"></ngx-dynamic-stepper>
```

## Documentation

For full documentation, examples, and API reference, see the [main README](https://github.com/yingyu-projects/ngx-dynamic-stepper).

## Library Development

This library was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ngx-dynamic-stepper
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ngx-dynamic-stepper
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
