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
    const { autoStart = true, updateInterval = 1000, onUpdate } = options, trackerOptions = __rest(options, ["autoStart", "updateInterval", "onUpdate"]);
    const [data, setData] = (0, react_1.useState)(null);
    const [isTracking, setIsTracking] = (0, react_1.useState)(false);
    const trackerRef = (0, react_1.useRef)(null);
    const intervalRef = (0, react_1.useRef)(null);
    const onUpdateRef = (0, react_1.useRef)(onUpdate);
    // Update the callback ref when onUpdate changes
    (0, react_1.useEffect)(() => {
        onUpdateRef.current = onUpdate;
    }, [onUpdate]);
    // Initialize tracker
    (0, react_1.useEffect)(() => {
        trackerRef.current = (0, core_1.createKeyboardTracker)(trackerOptions);
        return () => {
            if (trackerRef.current) {
                trackerRef.current.destroy();
                trackerRef.current = null;
            }
        };
    }, []);
    // Update data periodically when tracking
    (0, react_1.useEffect)(() => {
        if (isTracking && updateInterval > 0) {
            intervalRef.current = window.setInterval(() => {
                var _a;
                if (trackerRef.current) {
                    const currentData = trackerRef.current.getHeatmapData();
                    setData(currentData);
                    (_a = onUpdateRef.current) === null || _a === void 0 ? void 0 : _a.call(onUpdateRef, currentData);
                }
            }, updateInterval);
        }
        else {
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
    (0, react_1.useEffect)(() => {
        if (autoStart && trackerRef.current) {
            startTracking();
        }
        // Cleanup on unmount
        return () => {
            var _a;
            if ((_a = trackerRef.current) === null || _a === void 0 ? void 0 : _a.isTracking()) {
                trackerRef.current.destroy();
            }
        };
    }, [autoStart]);
    const startTracking = (0, react_1.useCallback)(() => {
        if (trackerRef.current && !trackerRef.current.isTracking()) {
            trackerRef.current.startTracking();
            setIsTracking(true);
        }
    }, []);
    const stopTracking = (0, react_1.useCallback)(() => {
        var _a;
        if (trackerRef.current && trackerRef.current.isTracking()) {
            const finalData = trackerRef.current.stopTracking();
            setData(finalData);
            setIsTracking(false);
            (_a = onUpdateRef.current) === null || _a === void 0 ? void 0 : _a.call(onUpdateRef, finalData);
            return finalData;
        }
        return null;
    }, []);
    const reset = (0, react_1.useCallback)(() => {
        if (trackerRef.current) {
            trackerRef.current.reset();
            setData(null);
            setIsTracking(false);
        }
    }, []);
    const getCurrentData = (0, react_1.useCallback)(() => {
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
