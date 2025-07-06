"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardTrackerImpl = void 0;
class KeyboardTrackerImpl {
    constructor(options = {}) {
        this.frequencies = {};
        this.totalPresses = 0;
        this.startTime = 0;
        this.isCurrentlyTracking = false;
        // Keys to ignore when ignoreModifierKeys is true
        this.modifierKeys = new Set([
            'Control', 'Alt', 'Shift', 'Meta', 'ControlLeft', 'ControlRight',
            'AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight', 'MetaLeft', 'MetaRight'
        ]);
        // Keys to ignore when ignoreSpecialKeys is true
        this.specialKeys = new Set([
            'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
            'Escape', 'Tab', 'CapsLock', 'NumLock', 'ScrollLock', 'Insert', 'Delete',
            'Home', 'End', 'PageUp', 'PageDown', 'PrintScreen', 'Pause', 'ContextMenu'
        ]);
        this.options = Object.assign({ ignoreModifierKeys: false, ignoreSpecialKeys: false, caseSensitive: false }, options);
        // Bind the event handler to maintain proper 'this' context
        this.handleKeyDown = this.onKeyDown.bind(this);
    }
    onKeyDown(event) {
        // Get the key to track
        let key = event.key;
        // Skip if we should ignore this key
        if (this.shouldIgnoreKey(key)) {
            return;
        }
        // Handle case sensitivity
        if (!this.options.caseSensitive) {
            key = key.toLowerCase();
        }
        // Update frequencies
        this.frequencies[key] = (this.frequencies[key] || 0) + 1;
        this.totalPresses++;
    }
    shouldIgnoreKey(key) {
        // Check modifier keys
        if (this.options.ignoreModifierKeys && this.modifierKeys.has(key)) {
            return true;
        }
        // Check special keys
        if (this.options.ignoreSpecialKeys && this.specialKeys.has(key)) {
            return true;
        }
        return false;
    }
    startTracking() {
        if (this.isCurrentlyTracking) {
            return; // Already tracking
        }
        // Check if we're in a browser environment
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            throw new Error('KeyboardTracker can only be used in a browser environment');
        }
        this.startTime = Date.now();
        this.isCurrentlyTracking = true;
        // Add the event listener
        document.addEventListener('keydown', this.handleKeyDown, true);
    }
    stopTracking() {
        if (!this.isCurrentlyTracking) {
            throw new Error('Tracking is not currently active');
        }
        const endTime = Date.now();
        this.isCurrentlyTracking = false;
        // Remove the event listener
        document.removeEventListener('keydown', this.handleKeyDown, true);
        return {
            frequencies: Object.assign({}, this.frequencies),
            totalPresses: this.totalPresses,
            startTime: this.startTime,
            endTime
        };
    }
    getHeatmapData() {
        return {
            frequencies: Object.assign({}, this.frequencies),
            totalPresses: this.totalPresses,
            startTime: this.startTime,
            endTime: this.isCurrentlyTracking ? undefined : Date.now()
        };
    }
    isTracking() {
        return this.isCurrentlyTracking;
    }
    reset() {
        // Stop tracking if active
        if (this.isCurrentlyTracking) {
            document.removeEventListener('keydown', this.handleKeyDown, true);
            this.isCurrentlyTracking = false;
        }
        // Reset all data
        this.frequencies = {};
        this.totalPresses = 0;
        this.startTime = 0;
    }
    // Cleanup method to ensure event listeners are removed
    destroy() {
        if (this.isCurrentlyTracking) {
            document.removeEventListener('keydown', this.handleKeyDown, true);
            this.isCurrentlyTracking = false;
        }
    }
}
exports.KeyboardTrackerImpl = KeyboardTrackerImpl;
