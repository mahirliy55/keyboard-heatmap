import { KeyFrequency, HeatmapData, KeyboardTrackerOptions, KeyboardTracker } from '../types';

export class KeyboardTrackerImpl implements KeyboardTracker {
  private frequencies: KeyFrequency = {};
  private totalPresses: number = 0;
  private startTime: number = 0;
  private isCurrentlyTracking: boolean = false;
  private options: KeyboardTrackerOptions;
  private handleKeyDown: (event: KeyboardEvent) => void;

  // Keys to ignore when ignoreModifierKeys is true
  private readonly modifierKeys = new Set([
    'Control', 'Alt', 'Shift', 'Meta', 'ControlLeft', 'ControlRight',
    'AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight', 'MetaLeft', 'MetaRight'
  ]);

  // Keys to ignore when ignoreSpecialKeys is true
  private readonly specialKeys = new Set([
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'Escape', 'Tab', 'CapsLock', 'NumLock', 'ScrollLock', 'Insert', 'Delete',
    'Home', 'End', 'PageUp', 'PageDown', 'PrintScreen', 'Pause', 'ContextMenu'
  ]);

  constructor(options: KeyboardTrackerOptions = {}) {
    console.log('🎯 KeyboardTrackerImpl constructor called with options:', options);
    
    this.options = {
      ignoreModifierKeys: false,
      ignoreSpecialKeys: false,
      caseSensitive: false,
      ...options
    };

    console.log('📋 Final options:', this.options);

    // Bind the event handler to maintain proper 'this' context
    this.handleKeyDown = this.onKeyDown.bind(this);
    
    console.log('✅ KeyboardTrackerImpl constructor completed');
  }

  private onKeyDown(event: KeyboardEvent): void {
    console.log('⌨️ Key pressed:', event.key, 'Code:', event.code);
    
    // Get the key to track
    let key = event.key;

    // Skip if we should ignore this key
    if (this.shouldIgnoreKey(key)) {
      console.log('🚫 Key ignored:', key);
      return;
    }

    // Handle case sensitivity
    if (!this.options.caseSensitive) {
      key = key.toLowerCase();
      console.log('🔄 Key normalized to lowercase:', key);
    }

    // Update frequencies
    const oldCount = this.frequencies[key] || 0;
    this.frequencies[key] = oldCount + 1;
    this.totalPresses++;
    
    console.log('📈 Key frequency updated:', {
      key,
      oldCount,
      newCount: this.frequencies[key],
      totalPresses: this.totalPresses
    });
  }

  private shouldIgnoreKey(key: string): boolean {
    console.log('🔍 Checking if key should be ignored:', key);
    
    // Check modifier keys
    if (this.options.ignoreModifierKeys && this.modifierKeys.has(key)) {
      console.log('🚫 Modifier key ignored:', key);
      return true;
    }

    // Check special keys
    if (this.options.ignoreSpecialKeys && this.specialKeys.has(key)) {
      console.log('🚫 Special key ignored:', key);
      return true;
    }

    console.log('✅ Key will be tracked:', key);
    return false;
  }

  startTracking(): void {
    console.log('🚀 Starting keyboard tracking...');
    
    if (this.isCurrentlyTracking) {
      console.log('⚠️ Already tracking, ignoring start request');
      return; // Already tracking
    }

    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.error('❌ Not in browser environment');
      throw new Error('KeyboardTracker can only be used in a browser environment');
    }

    this.startTime = Date.now();
    this.isCurrentlyTracking = true;
    
    // Add the event listener
    document.addEventListener('keydown', this.handleKeyDown, true);
    
    console.log('✅ Keyboard tracking started at:', new Date(this.startTime).toISOString());
  }

  stopTracking(): HeatmapData {
    console.log('🛑 Stopping keyboard tracking...');
    
    if (!this.isCurrentlyTracking) {
      console.error('❌ Tracking is not currently active');
      throw new Error('Tracking is not currently active');
    }

    const endTime = Date.now();
    this.isCurrentlyTracking = false;

    // Remove the event listener
    document.removeEventListener('keydown', this.handleKeyDown, true);

    const result = {
      frequencies: { ...this.frequencies },
      totalPresses: this.totalPresses,
      startTime: this.startTime,
      endTime
    };

    console.log('✅ Tracking stopped. Final data:', {
      duration: endTime - this.startTime,
      totalPresses: this.totalPresses,
      uniqueKeys: Object.keys(this.frequencies).length,
      endTime: new Date(endTime).toISOString()
    });

    return result;
  }

  getHeatmapData(): HeatmapData {
    console.log('📊 Getting current heatmap data...');
    
    const result = {
      frequencies: { ...this.frequencies },
      totalPresses: this.totalPresses,
      startTime: this.startTime,
      endTime: this.isCurrentlyTracking ? undefined : Date.now()
    };

    console.log('📊 Current heatmap data:', {
      totalPresses: this.totalPresses,
      uniqueKeys: Object.keys(this.frequencies).length,
      isTracking: this.isCurrentlyTracking
    });

    return result;
  }

  isTracking(): boolean {
    console.log('❓ Checking tracking status:', this.isCurrentlyTracking);
    return this.isCurrentlyTracking;
  }

  reset(): void {
    console.log('🔄 Resetting tracker...');
    
    // Stop tracking if active
    if (this.isCurrentlyTracking) {
      console.log('🛑 Stopping active tracking before reset');
      document.removeEventListener('keydown', this.handleKeyDown, true);
      this.isCurrentlyTracking = false;
    }

    // Reset all data
    const oldTotal = this.totalPresses;
    const oldKeyCount = Object.keys(this.frequencies).length;
    
    this.frequencies = {};
    this.totalPresses = 0;
    this.startTime = 0;
    
    console.log('✅ Tracker reset completed. Cleared:', {
      oldTotalPresses: oldTotal,
      oldUniqueKeys: oldKeyCount
    });
  }

  // Cleanup method to ensure event listeners are removed
  destroy(): void {
    console.log('💥 Destroying tracker...');
    
    if (this.isCurrentlyTracking) {
      console.log('🛑 Removing event listeners during destroy');
      document.removeEventListener('keydown', this.handleKeyDown, true);
      this.isCurrentlyTracking = false;
    }
    
    console.log('✅ Tracker destroyed successfully');
  }
} 