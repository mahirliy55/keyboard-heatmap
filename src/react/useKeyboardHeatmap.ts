import { useState, useEffect, useRef, useCallback } from 'react';
import { createKeyboardTracker } from '../core';
import { KeyboardTrackerOptions, HeatmapData, KeyboardTracker } from '../types';

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
export function useKeyboardHeatmap(
  options: UseKeyboardHeatmapOptions = {}
): UseKeyboardHeatmapReturn {
  const {
    autoStart = true,
    updateInterval = 1000,
    onUpdate,
    ...trackerOptions
  } = options;

  const [data, setData] = useState<HeatmapData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  
  const trackerRef = useRef<KeyboardTracker | null>(null);
  const intervalRef = useRef<number | null>(null);
  const onUpdateRef = useRef(onUpdate);

  // Update the callback ref when onUpdate changes
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  // Initialize tracker
  useEffect(() => {
    trackerRef.current = createKeyboardTracker(trackerOptions);

    return () => {
      if (trackerRef.current) {
        trackerRef.current.destroy();
        trackerRef.current = null;
      }
    };
  }, []);

  // Update data periodically when tracking
  useEffect(() => {
    if (isTracking && updateInterval > 0) {
      intervalRef.current = window.setInterval(() => {
        if (trackerRef.current) {
          const currentData = trackerRef.current.getHeatmapData();
          setData(currentData);
          onUpdateRef.current?.(currentData);
        }
      }, updateInterval);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTracking, updateInterval]);

  // Auto-start tracking on mount
  useEffect(() => {
    if (autoStart && trackerRef.current) {
      startTracking();
    }

    // Cleanup on unmount
    return () => {
      if (trackerRef.current?.isTracking()) {
        trackerRef.current.destroy();
      }
    };
  }, [autoStart]);

  const startTracking = useCallback(() => {
    if (trackerRef.current && !trackerRef.current.isTracking()) {
      trackerRef.current.startTracking();
      setIsTracking(true);
    }
  }, []);

  const stopTracking = useCallback(() => {
    if (trackerRef.current && trackerRef.current.isTracking()) {
      const finalData = trackerRef.current.stopTracking();
      setData(finalData);
      setIsTracking(false);
      onUpdateRef.current?.(finalData);
      return finalData;
    }
    return null;
  }, []);

  const reset = useCallback(() => {
    if (trackerRef.current) {
      trackerRef.current.reset();
      setData(null);
      setIsTracking(false);
    }
  }, []);

  const getCurrentData = useCallback(() => {
    if (trackerRef.current) {
      return trackerRef.current.getHeatmapData();
    }
    return null;
  }, []);

  return {
    data,
    isTracking,
    startTracking,
    stopTracking,
    reset,
    getCurrentData
  };
} 