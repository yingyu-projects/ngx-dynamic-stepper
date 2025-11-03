import { Type } from '@angular/core';

/**
 * Configuration for a wizard workflow
 */
export interface WizardWorkflow<T = any> {
  /** Array of wizard step configurations */
  steps: WizardStepConfig[];
  /** Optional workflow data passed to each step */
  workflowData?: T;
}

/**
 * Configuration for a single wizard step
 */
export interface WizardStepConfig {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Angular component to render for this step */
  component: Type<any>;
  /** Whether this step is optional (can be skipped) */
  optional?: boolean;
  /** Whether this step has been completed */
  completed?: boolean;
  /** Whether this step can be edited after completion */
  editable?: boolean;
}

/**
 * Navigation direction in the wizard
 */
export enum NavigationDirection {
  NEXT = 'next',
  PREVIOUS = 'previous'
}
