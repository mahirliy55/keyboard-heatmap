"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboardHeatmap = useKeyboardHeatmap;
const react_1 = require("react");
const core_1 = require("../core");
/**
 * React hook for tracking keyboard heatmap data
 * @param options Configuration options for the hook
 * @returns Object containing heatmap data and control functions
 */
function useKeyboardHeatmap(options = {}) {
    console.log('🎣 useKeyboardHeatmap hook called with options:', options);
    const { autoStart = true, updateInterval = 1000, onUpdate } = options, trackerOptions = __rest(options, ["autoStart", "updateInterval", "onUpdate"]);
    console.log('📋 Hook options processed:', {
        autoStart,
        updateInterval,
        hasOnUpdate: !!onUpdate,
        trackerOptions
    });
    const [data, setData] = (0, react_1.useState)(null);
    const [isTracking, setIsTracking] = (0, react_1.useState)(false);
    const trackerRef = (0, react_1.useRef)(null);
    const intervalRef = (0, react_1.useRef)(null);
    const onUpdateRef = (0, react_1.useRef)(onUpdate);
    // Update the callback ref when onUpdate changes
    (0, react_1.useEffect)(() => {
        console.log('🔄 onUpdate callback updated');
        onUpdateRef.current = onUpdate;
    }, [onUpdate]);
    // Initialize tracker
    (0, react_1.useEffect)(() => {
        console.log('🚀 Initializing tracker with options:', trackerOptions);
        trackerRef.current = (0, core_1.createKeyboardTracker)(trackerOptions);
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
    (0, react_1.useEffect)(() => {
        console.log('⏰ Setting up interval timer. isTracking:', isTracking, 'updateInterval:', updateInterval);
        if (isTracking && updateInterval > 0) {
            console.log('⏱️ Starting interval with', updateInterval, 'ms');
            intervalRef.current = window.setInterval(() => {
                var _a;
                console.log('⏱️ Interval tick - updating data');
                if (trackerRef.current) {
                    const currentData = trackerRef.current.getHeatmapData();
                    setData(currentData);
                    (_a = onUpdateRef.current) === null || _a === void 0 ? void 0 : _a.call(onUpdateRef, currentData);
                    console.log('📊 Data updated via interval');
                }
            }, updateInterval);
        }
        else {
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
    (0, react_1.useEffect)(() => {
        console.log('🎬 Auto-start effect. autoStart:', autoStart, 'trackerExists:', !!trackerRef.current);
        if (autoStart && trackerRef.current) {
            console.log('🚀 Auto-starting tracking');
            startTracking();
        }
        // Cleanup on unmount
        return () => {
            var _a;
            console.log('🧹 Cleanup on unmount - checking if tracking is active');
            if ((_a = trackerRef.current) === null || _a === void 0 ? void 0 : _a.isTracking()) {
                console.log('🛑 Destroying active tracker on unmount');
                trackerRef.current.destroy();
            }
        };
    }, [autoStart]);
    const startTracking = (0, react_1.useCallback)(() => {
        console.log('▶️ startTracking callback called');
        if (trackerRef.current && !trackerRef.current.isTracking()) {
            console.log('🚀 Starting tracker');
            trackerRef.current.startTracking();
            setIsTracking(true);
            console.log('✅ Tracking started, state updated');
        }
        else {
            console.log('⚠️ Cannot start tracking - tracker not available or already tracking');
        }
    }, []);
    const stopTracking = (0, react_1.useCallback)(() => {
        var _a;
        console.log('⏹️ stopTracking callback called');
        if (trackerRef.current && trackerRef.current.isTracking()) {
            console.log('🛑 Stopping tracker');
            const finalData = trackerRef.current.stopTracking();
            setData(finalData);
            setIsTracking(false);
            (_a = onUpdateRef.current) === null || _a === void 0 ? void 0 : _a.call(onUpdateRef, finalData);
            console.log('✅ Tracking stopped, final data set');
            return finalData;
        }
        console.log('⚠️ Cannot stop tracking - tracker not available or not tracking');
        return null;
    }, []);
    const reset = (0, react_1.useCallback)(() => {
        console.log('🔄 reset callback called');
        if (trackerRef.current) {
            console.log('🧹 Resetting tracker');
            trackerRef.current.reset();
            setData(null);
            setIsTracking(false);
            console.log('✅ Tracker reset, state cleared');
        }
        else {
            console.log('⚠️ Cannot reset - tracker not available');
        }
    }, []);
    const getCurrentData = (0, react_1.useCallback)(() => {
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
        totalPresses: (data === null || data === void 0 ? void 0 : data.totalPresses) || 0
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
