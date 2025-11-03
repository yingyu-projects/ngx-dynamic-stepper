/**
 * Represents the loading status of an async operation
 */
export interface LoadStatus {
  /** Indicates if the operation is currently loading */
  loading: boolean;
  /** Optional error message if the operation failed */
  error?: string;
}
