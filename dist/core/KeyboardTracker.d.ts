import { HeatmapData, KeyboardTrackerOptions, KeyboardTracker } from '../types';
export declare class KeyboardTrackerImpl implements KeyboardTracker {
    private frequencies;
    private totalPresses;
    private startTime;
    private isCurrentlyTracking;
    private options;
    private handleKeyDown;
    private readonly modifierKeys;
    private readonly specialKeys;
    constructor(options?: KeyboardTrackerOptions);
    private onKeyDown;
    private shouldIgnoreKey;
    startTracking(): void;
    stopTracking(): HeatmapData;
    getHeatmapData(): HeatmapData;
    isTracking(): boolean;
    reset(): void;
    destroy(): void;
}
