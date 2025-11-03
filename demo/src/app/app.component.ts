import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DynamicStepperComponent, WizardWorkflow } from 'ngx-dynamic-stepper';
import { DemoWorkflowBuilder } from './workflows/demo-workflow.builder';
import { DemoWorkflowDirector } from './workflows/demo-workflow.director';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicStepperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  workflow!: WizardWorkflow;

  private readonly builder = new DemoWorkflowBuilder();
  private readonly director = new DemoWorkflowDirector(this.builder);

  ngOnInit(): void {
    this.workflow = this.director.construct();
  }

  onWizardCompleted(): void {
    console.log('Wizard completed!', this.workflow.workflowData);
  }

  onStepChanged(stepIndex: number): void {
    console.log('Step changed to:', stepIndex);
  }

  onWizardCancelled(): void {
    console.log('Wizard cancelled');
  }
}