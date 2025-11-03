# ngx-dynamic-stepper

A powerful, flexible Angular library for creating dynamic wizard-style steppers built on top of Angular Material Stepper. This library provides an enterprise-ready solution for building multi-step workflows with form validation, dynamic step loading, and workflow data management.

## Features

✨ **Dynamic Step Loading** - Load and render steps dynamically based on configuration  
🔄 **Form Validation** - Built-in integration with Angular Reactive Forms  
🎯 **Workflow Management** - Pass data between steps seamlessly  
🏗️ **Builder Pattern** - Flexible workflow construction using builder and director patterns  
📦 **Standalone Components** - Built with Angular standalone components (v20+)  
🎨 **Material Design** - Built on Angular Material Stepper  
🔧 **TypeScript** - Full TypeScript support with comprehensive type definitions  
♻️ **RxJS Integration** - Reactive state management throughout

## Installation

```bash
npm install ngx-dynamic-stepper
```

### Peer Dependencies

```bash
npm install @angular/common @angular/core @angular/forms @angular/material @angular/cdk rxjs
```

## Quick Start

### 1. Create a Step Component

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractWizardStep } from 'ngx-dynamic-stepper';

@Component({
  selector: 'app-user-step',
  template: `
    <form [formGroup]="form">
      <input formControlName="name" placeholder="Name">
    </form>
  `
})
export class UserStepComponent extends AbstractWizardStep {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  getFormGroup() { return this.form; }
}
```

### 2. Configure the Workflow

```typescript
import { Component } from '@angular/core';
import { DynamicStepperComponent, WizardWorkflow } from 'ngx-dynamic-stepper';

@Component({
  selector: 'app-wizard',
  imports: [DynamicStepperComponent],
  template: `
    <ngx-dynamic-stepper
      [workflow]="workflow"
      (wizardCompleted)="onComplete()">
    </ngx-dynamic-stepper>
  `
})
export class WizardComponent {
  workflow: WizardWorkflow = {
    steps: [
      { id: 'user', label: 'User', component: UserStepComponent },
      { id: 'confirm', label: 'Confirm', component: ConfirmStepComponent }
    ]
  };
  
  onComplete() {
    console.log('Completed!');
  }
}
```

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (installed globally or via npm scripts)

### Building the Library

To build the library, run:

```bash
npm run build
```

This will:
1. Compile the TypeScript source code
2. Bundle the library using ng-packagr
3. Generate distribution files in `dist/ngx-dynamic-stepper/`

The build artifacts include:
- Compiled JavaScript files (ESM format)
- TypeScript definition files (`.d.ts`)
- Package metadata (`package.json`)

### Running the Demo Project

The repository includes a demo application in the `demo/` folder that demonstrates how to use the library.

#### Step 1: Build the Library

First, you need to build the library so the demo can reference it:

```bash
npm run build
```

This creates the built library in `dist/ngx-dynamic-stepper/` that the demo project references via TypeScript path mapping.

#### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

#### Step 3: Run the Demo

You have several options to run the demo:

**Option A: Build library once and serve demo**
```bash
npm run build
npm run demo
```

**Option B: Build library in watch mode and serve demo (for development)**
```bash
npm run demo:serve
```

This will:
- Build the library in watch mode (rebuilds on changes)
- Serve the demo application on `http://localhost:4200`

**Option C: Build both library and demo**
```bash
npm run demo:build
```

This builds both the library and the demo application.

#### Step 4: View the Demo

Once the demo server is running, open your browser and navigate to:

```
http://localhost:4200
```

The demo showcases:
- ✅ Three-step wizard workflow (User Info → Address → Review)
- ✅ Form validation using Reactive Forms
- ✅ Data sharing between steps via `workflowData`
- ✅ Integration with Angular Material components
- ✅ Builder/Director pattern for workflow construction
- ✅ Step lifecycle hooks (`onStepEnter`, `onStepExit`)

### Understanding the Demo Setup

The demo project uses **TypeScript path mapping** to reference the local library:

1. **Path Mapping** (`tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "paths": {
         "ngx-dynamic-stepper": ["./dist/ngx-dynamic-stepper"]
       }
     }
   }
   ```

2. **Import Statements**: The demo imports from `'ngx-dynamic-stepper'` as if it were an npm package:
   ```typescript
   import { DynamicStepperComponent, WizardWorkflow } from 'ngx-dynamic-stepper';
   ```

3. **Build Requirement**: The library must be built before the demo can run, as the demo references the built output in `dist/ngx-dynamic-stepper/`.

## Library Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

### Available Scripts

- `npm run build` - Build the library (defaults to `ngx-dynamic-stepper`)
- `npm run watch` - Build the library in watch mode with development configuration
- `npm run demo` - Serve the demo application
- `npm run demo:build` - Build both library and demo
- `npm run demo:serve` - Build library in watch mode and serve demo

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
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
