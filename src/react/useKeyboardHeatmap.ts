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
  console.log('🎣 useKeyboardHeatmap hook called with options:', options);
  
  const {
    autoStart = true,
    updateInterval = 1000,
    onUpdate,
    ...trackerOptions
  } = options;

  console.log('📋 Hook options processed:', {
    autoStart,
    updateInterval,
    hasOnUpdate: !!onUpdate,
    trackerOptions
  });

  const [data, setData] = useState<HeatmapData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  
  const trackerRef = useRef<KeyboardTracker | null>(null);
  const intervalRef = useRef<number | null>(null);
  const onUpdateRef = useRef(onUpdate);

  // Update the callback ref when onUpdate changes
  useEffect(() => {
    console.log('🔄 onUpdate callback updated');
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  // Initialize tracker
  useEffect(() => {
    console.log('🚀 Initializing tracker with options:', trackerOptions);
    trackerRef.current = createKeyboardTracker(trackerOptions);
    console.log('✅ Tracker initialized successfully');

    return () => {
      console.log('🧹 Cleaning up tracker on unmount');
      if (trackerRef.current) {
        trackerRef.current.destroy();
        trackerRef.current = null;
        console.log('💥 Tracker destroyed during cleanup');
      }
    };
  }, []);

  // Update data periodically when tracking
  useEffect(() => {
    console.log('⏰ Setting up interval timer. isTracking:', isTracking, 'updateInterval:', updateInterval);
    
    if (isTracking && updateInterval > 0) {
      console.log('⏱️ Starting interval with', updateInterval, 'ms');
      intervalRef.current = window.setInterval(() => {
        console.log('⏱️ Interval tick - updating data');
        if (trackerRef.current) {
          const currentData = trackerRef.current.getHeatmapData();
          setData(currentData);
          onUpdateRef.current?.(currentData);
          console.log('📊 Data updated via interval');
        }
      }, updateInterval);
    } else {
      if (intervalRef.current) {
        console.log('⏹️ Clearing existing interval');
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        console.log('🧹 Cleaning up interval on effect cleanup');
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTracking, updateInterval]);

  // Auto-start tracking on mount
  useEffect(() => {
    console.log('🎬 Auto-start effect. autoStart:', autoStart, 'trackerExists:', !!trackerRef.current);
    
    if (autoStart && trackerRef.current) {
      console.log('🚀 Auto-starting tracking');
      startTracking();
    }

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleanup on unmount - checking if tracking is active');
      if (trackerRef.current?.isTracking()) {
        console.log('🛑 Destroying active tracker on unmount');
        trackerRef.current.destroy();
      }
    };
  }, [autoStart]);

  const startTracking = useCallback(() => {
    console.log('▶️ startTracking callback called');
    
    if (trackerRef.current && !trackerRef.current.isTracking()) {
      console.log('🚀 Starting tracker');
      trackerRef.current.startTracking();
      setIsTracking(true);
      console.log('✅ Tracking started, state updated');
    } else {
      console.log('⚠️ Cannot start tracking - tracker not available or already tracking');
    }
  }, []);

  const stopTracking = useCallback(() => {
    console.log('⏹️ stopTracking callback called');
    
    if (trackerRef.current && trackerRef.current.isTracking()) {
      console.log('🛑 Stopping tracker');
      const finalData = trackerRef.current.stopTracking();
      setData(finalData);
      setIsTracking(false);
      onUpdateRef.current?.(finalData);
      console.log('✅ Tracking stopped, final data set');
      return finalData;
    }
    console.log('⚠️ Cannot stop tracking - tracker not available or not tracking');
    return null;
  }, []);

  const reset = useCallback(() => {
    console.log('🔄 reset callback called');
    
    if (trackerRef.current) {
      console.log('🧹 Resetting tracker');
      trackerRef.current.reset();
      setData(null);
      setIsTracking(false);
      console.log('✅ Tracker reset, state cleared');
    } else {
      console.log('⚠️ Cannot reset - tracker not available');
    }
  }, []);

  const getCurrentData = useCallback(() => {
    console.log('📊 getCurrentData callback called');
    
    if (trackerRef.current) {
      const currentData = trackerRef.current.getHeatmapData();
      console.log('📊 Current data retrieved');
      return currentData;
    }
    console.log('⚠️ Cannot get current data - tracker not available');
    return null;
  }, []);

  console.log('🎣 useKeyboardHeatmap hook returning state:', {
    hasData: !!data,
    isTracking,
    totalPresses: data?.totalPresses || 0
  });

  return {
    data,
    isTracking,
    startTracking,
    stopTracking,
    reset,
    getCurrentData
  };
} 