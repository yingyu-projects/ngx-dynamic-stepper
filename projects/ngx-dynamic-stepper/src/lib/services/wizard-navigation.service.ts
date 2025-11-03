import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationDirection, WizardStepConfig } from '../models/wizard.models';

/**
 * Service for managing wizard navigation state and transitions
 */
@Injectable()
export class WizardNavigationService {
  private currentStepIndexSubject = new BehaviorSubject<number>(0);
  private stepsSubject = new BehaviorSubject<WizardStepConfig[]>([]);
  private workflowDataSubject = new BehaviorSubject<any>(null);

  /** Observable of the current step index */
  public readonly currentStepIndex$: Observable<number> =
    this.currentStepIndexSubject.asObservable();

  /** Observable of the wizard steps configuration */
  public readonly steps$: Observable<WizardStepConfig[]> =
    this.stepsSubject.asObservable();

  /** Observable of the workflow data */
  public readonly workflowData$: Observable<any> =
    this.workflowDataSubject.asObservable();

  /** Gets the current step index */
  get currentStepIndex(): number {
    return this.currentStepIndexSubject.value;
  }

  /** Gets the current steps configuration */
  get steps(): WizardStepConfig[] {
    return this.stepsSubject.value;
  }

  /** Gets the current workflow data */
  get workflowData(): any {
    return this.workflowDataSubject.value;
  }

  /**
   * Initializes the wizard with steps and optional workflow data
   */
  initialize(steps: WizardStepConfig[], workflowData?: any): void {
    this.stepsSubject.next(steps);
    this.workflowDataSubject.next(workflowData);
    this.currentStepIndexSubject.next(0);
  }

  /**
   * Navigates to the next step
   * @returns true if navigation was successful
   */
  next(): boolean {
    const nextIndex = this.currentStepIndex + 1;
    if (nextIndex < this.steps.length) {
      this.currentStepIndexSubject.next(nextIndex);
      return true;
    }
    return false;
  }

  /**
   * Navigates to the previous step
   * @returns true if navigation was successful
   */
  previous(): boolean {
    const prevIndex = this.currentStepIndex - 1;
    if (prevIndex >= 0) {
      this.currentStepIndexSubject.next(prevIndex);
      return true;
    }
    return false;
  }

  /**
   * Navigates to a specific step by index
   */
  goToStep(index: number): boolean {
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndexSubject.next(index);
      return true;
    }
    return false;
  }

  /**
   * Marks a step as completed
   */
  markStepCompleted(stepId: string, completed: boolean = true): void {
    const steps = [...this.steps];
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      step.completed = completed;
      this.stepsSubject.next(steps);
    }
  }

  /**
   * Updates the workflow data
   */
  updateWorkflowData(data: any): void {
    this.workflowDataSubject.next(data);
  }

  /**
   * Checks if the current step is the first step
   */
  isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  /**
   * Checks if the current step is the last step
   */
  isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }

  /**
   * Resets the wizard to its initial state
   */
  reset(): void {
    this.currentStepIndexSubject.next(0);
    const resetSteps = this.steps.map((step) => ({
      ...step,
      completed: false,
    }));
    this.stepsSubject.next(resetSteps);
  }
}
