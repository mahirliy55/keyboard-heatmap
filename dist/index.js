"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QWERTY_LAYOUT = exports.generateHeatmapSVG = exports.useKeyboardHeatmap = exports.KeyboardTrackerImpl = exports.createKeyboardTracker = void 0;
// Core tracking functionality
var core_1 = require("./core");
Object.defineProperty(exports, "createKeyboardTracker", { enumerable: true, get: function () { return core_1.createKeyboardTracker; } });
var KeyboardTracker_1 = require("./core/KeyboardTracker");
Object.defineProperty(exports, "KeyboardTrackerImpl", { enumerable: true, get: function () { return KeyboardTracker_1.KeyboardTrackerImpl; } });
// React integration
var react_1 = require("./react");
Object.defineProperty(exports, "useKeyboardHeatmap", { enumerable: true, get: function () { return react_1.useKeyboardHeatmap; } });
// Visualization
var visualization_1 = require("./visualization");
Object.defineProperty(exports, "generateHeatmapSVG", { enumerable: true, get: function () { return visualization_1.generateHeatmapSVG; } });
Object.defineProperty(exports, "QWERTY_LAYOUT", { enumerable: true, get: function () { return visualization_1.QWERTY_LAYOUT; } });
