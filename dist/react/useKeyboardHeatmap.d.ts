import { KeyboardTrackerOptions, HeatmapData } from '../types';
export interface UseKeyboardHeatmapOptions extends KeyboardTrackerOptions {
    /**
     * Whether to start tracking immediately on mount
     * @default true
     */
    autoStart?: boolean;
    /**
     * Interval (in milliseconds) to update the heatmap data
     * Set to 0 to disable live updates
     * @default 1000
     */
    updateInterval?: number;
    /**
     * Callback function called when heatmap data updates
     */
    onUpdate?: (data: HeatmapData) => void;
}
export interface UseKeyboardHeatmapReturn {
    /** Current heatmap data */
    data: HeatmapData | null;
    /** Whether tracking is currently active */
    isTracking: boolean;
    /** Start tracking keyboard events */
    startTracking: () => void;
    /** Stop tracking and get final data */
    stopTracking: () => HeatmapData | null;
    /** Reset all tracking data */
    reset: () => void;
    /** Get current heatmap data without stopping tracking */
    getCurrentData: () => HeatmapData | null;
}
/**
 * React hook for tracking keyboard heatmap data
 * @param options Configuration options for the hook
 * @returns Object containing heatmap data and control functions
 */
export declare function useKeyboardHeatmap(options?: UseKeyboardHeatmapOptions): UseKeyboardHeatmapReturn;
