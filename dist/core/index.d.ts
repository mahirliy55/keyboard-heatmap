import { KeyboardTrackerImpl } from './KeyboardTracker';
import { KeyboardTrackerOptions, KeyboardTracker } from '../types';
/**
 * Creates a new keyboard tracker instance
 * @param options Configuration options for the tracker
 * @returns A new KeyboardTracker instance
 */
export declare function createKeyboardTracker(options?: KeyboardTrackerOptions): KeyboardTracker;
export { KeyboardTrackerImpl };
export * from '../types';
