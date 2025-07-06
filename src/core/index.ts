import { KeyboardTrackerImpl } from './KeyboardTracker';
import { KeyboardTrackerOptions, KeyboardTracker } from '../types';

/**
 * Creates a new keyboard tracker instance
 * @param options Configuration options for the tracker
 * @returns A new KeyboardTracker instance
 */
export function createKeyboardTracker(options?: KeyboardTrackerOptions): KeyboardTracker {
  return new KeyboardTrackerImpl(options);
}

export { KeyboardTrackerImpl };
export * from '../types'; 