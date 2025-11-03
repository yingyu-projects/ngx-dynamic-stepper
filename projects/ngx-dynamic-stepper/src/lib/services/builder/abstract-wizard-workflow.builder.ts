import { Type } from '@angular/core';
import { WizardWorkflow, WizardStepConfig } from '../../models/wizard.models';

/**
 * Abstract builder for creating wizard workflows
 * Implements the Builder pattern for flexible workflow construction
 */
export abstract class AbstractWizardWorkflowBuilder<T = any> {
  protected steps: WizardStepConfig[] = [];
  protected workflowData?: T;

  /**
   * Adds a step to the workflow
   * @param id Unique identifier for the step
   * @param label Display label for the step
   * @param component Angular component for the step
   * @param options Optional configuration for the step
   */
  addStep(
    id: string,
    label: string,
    component: Type<any>,
    options?: Partial<WizardStepConfig>
  ): this {
    this.steps.push({
      id,
      label,
      component,
      ...options,
    });
    return this;
  }

  /**
   * Sets the workflow data that will be passed to all steps
   */
  setWorkflowData(data: T): this {
    this.workflowData = data;
    return this;
  }

  /**
   * Builds and returns the configured workflow
   */
  build(): WizardWorkflow<T> {
    return {
      steps: [...this.steps],
      workflowData: this.workflowData,
    };
  }

  /**
   * Resets the builder to its initial state
   */
  reset(): void {
    this.steps = [];
    this.workflowData = undefined;
  }
}
