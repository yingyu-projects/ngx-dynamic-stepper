import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ComponentRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { WizardWorkflow, WizardStepConfig } from '../models/wizard.models';
import { WizardNavigationService } from '../services/wizard-navigation.service';
import { hasFormGroup } from '../wizard-step/has-form-group';
import { AbstractWizardStep } from '../wizard-step/abstract-wizard-step';

/**
 * Dynamic stepper component that renders wizard steps using Angular Material Stepper
 * Supports form validation, dynamic step loading, and workflow data management
 */
@Component({
  selector: 'ngx-dynamic-stepper',
  imports: [CommonModule, MatStepperModule, MatButtonModule],
  templateUrl: './dynamic-stepper.component.html',
  styleUrls: ['./dynamic-stepper.component.scss'],
  providers: [WizardNavigationService],
})
export class DynamicStepperComponent implements OnInit, OnDestroy {
  /** Wizard workflow configuration */
  @Input() workflow!: WizardWorkflow;

  /** Whether to show linear progression (must complete steps in order) */
  @Input() linear = true;

  /** Label for the previous button */
  @Input() previousButtonLabel = 'Previous';

  /** Label for the next button */
  @Input() nextButtonLabel = 'Next';

  /** Label for the finish button */
  @Input() finishButtonLabel = 'Finish';

  /** Emitted when the wizard is completed */
  @Output() wizardCompleted = new EventEmitter<void>();

  /** Emitted when a step is changed */
  @Output() stepChanged = new EventEmitter<number>();

  /** Emitted when the wizard is cancelled */
  @Output() wizardCancelled = new EventEmitter<void>();

  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild('stepContainer', { read: ViewContainerRef }) stepContainer!: ViewContainerRef;

  /** Map of step components indexed by step index */
  stepComponentRefs = new Map<number, ComponentRef<any>>();

  private destroy$ = new Subject<void>();

  constructor(
    public navigationService: WizardNavigationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.workflow) {
      throw new Error('Workflow configuration is required');
    }

    this.navigationService.initialize(
      this.workflow.steps,
      this.workflow.workflowData
    );

    // Subscribe to step changes
    this.navigationService.currentStepIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe((index) => {
        this.stepChanged.emit(index);
        if (this.stepper) {
          this.stepper.selectedIndex = index;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearAllStepComponents();
  }

  /**
   * Handles step selection change from the stepper
   */
  onStepChange(event: any): void {
    const newIndex = event.selectedIndex;
    const oldIndex = event.previouslySelectedIndex;

    // Validate current step before allowing navigation
    if (newIndex > oldIndex) {
      const currentStepComponent = this.stepComponentRefs.get(oldIndex);
      if (currentStepComponent && !this.validateStep(currentStepComponent.instance)) {
        // Prevent navigation if validation fails
        setTimeout(() => {
          this.stepper.selectedIndex = oldIndex;
        });
        return;
      }
    }

    this.navigationService.goToStep(newIndex);
  }

  /**
   * Creates a step component dynamically
   */
  createStepComponent(step: WizardStepConfig, container: ViewContainerRef): void {
    const componentRef = container.createComponent(step.component);

    // Pass workflow data to the component if it's an AbstractWizardStep
    if (componentRef.instance instanceof AbstractWizardStep) {
      componentRef.instance.workflowData = this.workflow.workflowData;
      componentRef.instance.onStepEnter();
    }

    this.cdr.detectChanges();
  }

  /**
   * Validates a step component before navigation
   */
  private validateStep(component: any): boolean {
    if (hasFormGroup(component)) {
      const formGroup = component.getFormGroup();
      if (formGroup && !formGroup.valid) {
        formGroup.markAllAsTouched();
        return false;
      }
    }

    if (component instanceof AbstractWizardStep) {
      return component.onStepExit();
    }

    return true;
  }

  /**
   * Handles next button click
   */
  onNext(): void {
    const currentComponent = this.stepComponentRefs.get(
      this.navigationService.currentStepIndex
    );

    if (currentComponent && !this.validateStep(currentComponent.instance)) {
      return;
    }

    if (this.navigationService.isLastStep()) {
      this.onFinish();
    } else {
      this.navigationService.next();
    }
  }

  /**
   * Handles previous button click
   */
  onPrevious(): void {
    this.navigationService.previous();
  }

  /**
   * Handles wizard completion
   */
  onFinish(): void {
    const currentComponent = this.stepComponentRefs.get(
      this.navigationService.currentStepIndex
    );

    if (currentComponent && !this.validateStep(currentComponent.instance)) {
      return;
    }

    this.wizardCompleted.emit();
  }

  /**
   * Handles wizard cancellation
   */
  onCancel(): void {
    this.wizardCancelled.emit();
  }

  /**
   * Clears all step component instances
   */
  private clearAllStepComponents(): void {
    this.stepComponentRefs.forEach((ref) => ref.destroy());
    this.stepComponentRefs.clear();
  }

  /**
   * Gets the current step configuration
   */
  get currentStep(): WizardStepConfig | null {
    return this.workflow?.steps[this.navigationService.currentStepIndex] || null;
  }

  /**
   * Checks if a step is valid
   */
  isStepValid(index: number): boolean {
    const componentRef = this.stepComponentRefs.get(index);
    if (!componentRef) return true;

    const component = componentRef.instance;
    if (hasFormGroup(component)) {
      const formGroup = component.getFormGroup();
      return formGroup ? formGroup.valid : true;
    }

    return true;
  }
}
