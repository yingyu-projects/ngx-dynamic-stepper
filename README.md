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

## Library Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

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
