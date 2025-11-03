import { WizardWorkflow } from '../../models/wizard.models';
import { AbstractWizardWorkflowBuilder } from './abstract-wizard-workflow.builder';

/**
 * Abstract director for orchestrating workflow construction
 * Implements the Director pattern to coordinate builder operations
 */
export abstract class AbstractWizardWorkflowDirector<T = any> {
  constructor(protected builder: AbstractWizardWorkflowBuilder<T>) {}

  /**
   * Constructs the workflow using the builder
   * Override this method to define the workflow construction logic
   */
  abstract construct(params?: any): WizardWorkflow<T>;

  /**
   * Changes the builder instance
   */
  setBuilder(builder: AbstractWizardWorkflowBuilder<T>): void {
    this.builder = builder;
  }
}
