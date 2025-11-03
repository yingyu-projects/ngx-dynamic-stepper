import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HasFormGroup } from './has-form-group';
import { FormGroup } from '@angular/forms';

/**
 * Abstract base class for wizard step components
 * Provides common functionality for step lifecycle and form management
 */
@Directive()
export abstract class AbstractWizardStep implements OnInit, OnDestroy, HasFormGroup {
  /** Subject for managing subscriptions */
  protected destroy$ = new Subject<void>();

  /** Optional workflow data passed from the wizard */
  workflowData?: any;

  ngOnInit(): void {
    this.onStepInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Called when the step is initialized
   * Override to implement custom initialization logic
   */
  protected onStepInit(): void {
    // Override in subclass if needed
  }

  /**
   * Returns the form group for validation
   * Override to provide form validation for the step
   */
  getFormGroup(): FormGroup | null {
    return null;
  }

  /**
   * Called when navigating away from this step
   * Override to implement custom cleanup or validation
   * @returns true if navigation should proceed, false to cancel
   */
  onStepExit(): boolean {
    return true;
  }

  /**
   * Called when entering this step
   * Override to implement custom logic when step becomes active
   */
  onStepEnter(): void {
    // Override in subclass if needed
  }
}
