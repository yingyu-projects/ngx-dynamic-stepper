import { Observable, combineLatest, switchMap, of } from 'rxjs';

/**
 * Combines multiple observables and switches to a new observable based on their values
 * Similar to combineLatest + switchMap, but with better type inference
 * 
 * @param sources Array of source observables
 * @param project Function that takes the combined values and returns a new observable
 * @returns Observable that emits values from the projected observable
 * 
 * @example
 * ```typescript
 * const result$ = combinedSwitchMap(
 *   [obs1$, obs2$, obs3$],
 *   ([val1, val2, val3]) => httpCall(val1, val2, val3)
 * );
 * ```
 */
export function combinedSwitchMap<T extends readonly unknown[], R>(
  sources: readonly [...{ [K in keyof T]: Observable<T[K]> }],
  project: (values: T) => Observable<R>
): Observable<R> {
  if (sources.length === 0) {
    return project([] as unknown as T);
  }

  return combineLatest(sources).pipe(
    switchMap((values) => project(values as T))
  );
}

/**
 * Alternative version that handles empty sources array
 */
export function safeCombinedSwitchMap<T extends readonly unknown[], R>(
  sources: readonly [...{ [K in keyof T]: Observable<T[K]> }],
  project: (values: T) => Observable<R>,
  defaultValue?: R
): Observable<R> {
  if (sources.length === 0) {
    return defaultValue !== undefined
      ? of(defaultValue)
      : project([] as unknown as T);
  }

  return combineLatest(sources).pipe(
    switchMap((values) => project(values as T))
  );
}
