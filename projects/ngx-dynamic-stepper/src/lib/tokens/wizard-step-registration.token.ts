import { InjectionToken } from '@angular/core';

/**
 * Injection token for registering wizard step components
 * Use this token to provide step components in a module or component
 * 
 * @example
 * ```typescript
 * providers: [
 *   {
 *     provide: WIZARD_STEP_REGISTRATION,
 *     useValue: MyStepComponent,
 *     multi: true
 *   }
 * ]
 * ```
 */
export const WIZARD_STEP_REGISTRATION = new InjectionToken<any>(
  'WIZARD_STEP_REGISTRATION'
);
