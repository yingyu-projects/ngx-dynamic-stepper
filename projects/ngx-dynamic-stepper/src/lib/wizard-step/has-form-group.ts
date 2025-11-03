import { FormGroup } from '@angular/forms';

/**
 * Interface for wizard steps that contain a form
 */
export interface HasFormGroup {
  /**
   * Returns the form group for this step
   * Used for validation before navigation
   */
  getFormGroup(): FormGroup | null;
}

/**
 * Type guard to check if a component implements HasFormGroup
 */
export function hasFormGroup(component: any): component is HasFormGroup {
  return component && typeof component.getFormGroup === 'function';
}
