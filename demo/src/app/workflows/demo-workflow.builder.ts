import { AbstractWizardWorkflowBuilder } from 'ngx-dynamic-stepper';
import { StepOneComponent } from '../steps/step-one.component';
import { StepTwoComponent } from '../steps/step-two.component';
import { StepThreeComponent } from '../steps/step-three.component';

/**
 * Builder for creating the demo wizard workflow
 * Implements the Builder pattern to construct the workflow step by step
 */
export class DemoWorkflowBuilder extends AbstractWizardWorkflowBuilder {
  /**
   * Adds step one to the workflow
   */
  addStepOne(): this {
    return this.addStep('step1', 'Step 1', StepOneComponent);
  }

  /**
   * Adds step two to the workflow
   */
  addStepTwo(): this {
    return this.addStep('step2', 'Step 2', StepTwoComponent);
  }

  /**
   * Adds step three to the workflow
   */
  addStepThree(): this {
    return this.addStep('step3', 'Step 3', StepThreeComponent);
  }
}
