import { WizardWorkflow } from 'ngx-dynamic-stepper';
import { AbstractWizardWorkflowDirector } from 'ngx-dynamic-stepper';
import { DemoWorkflowBuilder } from './demo-workflow.builder';

/**
 * Director for orchestrating the demo workflow construction
 * Implements the Director pattern to coordinate builder operations
 */
export class DemoWorkflowDirector extends AbstractWizardWorkflowDirector {
  constructor(builder: DemoWorkflowBuilder) {
    super(builder);
  }

  /**
   * Constructs the demo workflow using the builder
   * This defines the order and structure of the wizard steps
   */
  override construct(): WizardWorkflow {
    const builder = this.builder as DemoWorkflowBuilder;
    
    builder.reset();
    builder.setWorkflowData({});
    
    builder
      .addStepOne()
      .addStepTwo()
      .addStepThree();
    
    return builder.build();
  }
}