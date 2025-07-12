import { KeyboardTrackerImpl } from './KeyboardTracker';
import { KeyboardTrackerOptions, KeyboardTracker } from '../types';

/**
 * Creates a new keyboard tracker instance
 * @param options Configuration options for the tracker
 * @returns A new KeyboardTracker instance
 */
export function createKeyboardTracker(options?: KeyboardTrackerOptions): KeyboardTracker {
  console.log('🏭 createKeyboardTracker factory function called with options:', options);
  const tracker = new KeyboardTrackerImpl(options);
  console.log('✅ Keyboard tracker instance created successfully');
  return tracker;
}

export { KeyboardTrackerImpl };
export * from '../types'; 