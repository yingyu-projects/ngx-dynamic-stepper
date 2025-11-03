import { Type } from '@angular/core';
import { HasFormGroup } from './has-form-group';

/**
 * Type definition for a wizard step component
 * Can optionally implement HasFormGroup for form validation
 */
export type WizardStepType = Type<any> & {
  prototype: Partial<HasFormGroup>;
};
