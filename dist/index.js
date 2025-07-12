"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeKey = exports.prepare3DData = exports.interpolateColor = exports.calculateKeyHeight = exports.findKeyPosition = exports.TURKISH_F_3D_LAYOUT = exports.QWERTY_3D_LAYOUT = exports.HEATMAP_3D_THEMES = exports.ThreeJSHeatmapImpl = exports.generate3DTurkishFHeatmap = exports.generate3DHeatmap = exports.QWERTY_LAYOUT = exports.generateHeatmapSVG = exports.useKeyboardHeatmap = exports.createKeyboardTracker = void 0;
// Core exports
var core_1 = require("./core");
Object.defineProperty(exports, "createKeyboardTracker", { enumerable: true, get: function () { return core_1.createKeyboardTracker; } });
// React exports
var react_1 = require("./react");
Object.defineProperty(exports, "useKeyboardHeatmap", { enumerable: true, get: function () { return react_1.useKeyboardHeatmap; } });
// 2D Visualization exports
var visualization_1 = require("./visualization");
Object.defineProperty(exports, "generateHeatmapSVG", { enumerable: true, get: function () { return visualization_1.generateHeatmapSVG; } });
Object.defineProperty(exports, "QWERTY_LAYOUT", { enumerable: true, get: function () { return visualization_1.QWERTY_LAYOUT; } });
// 3D Visualization exports
var visualization_2 = require("./visualization");
Object.defineProperty(exports, "generate3DHeatmap", { enumerable: true, get: function () { return visualization_2.generate3DHeatmap; } });
Object.defineProperty(exports, "generate3DTurkishFHeatmap", { enumerable: true, get: function () { return visualization_2.generate3DTurkishFHeatmap; } });
Object.defineProperty(exports, "ThreeJSHeatmapImpl", { enumerable: true, get: function () { return visualization_2.ThreeJSHeatmapImpl; } });
Object.defineProperty(exports, "HEATMAP_3D_THEMES", { enumerable: true, get: function () { return visualization_2.HEATMAP_3D_THEMES; } });
Object.defineProperty(exports, "QWERTY_3D_LAYOUT", { enumerable: true, get: function () { return visualization_2.QWERTY_3D_LAYOUT; } });
Object.defineProperty(exports, "TURKISH_F_3D_LAYOUT", { enumerable: true, get: function () { return visualization_2.TURKISH_F_3D_LAYOUT; } });
Object.defineProperty(exports, "findKeyPosition", { enumerable: true, get: function () { return visualization_2.findKeyPosition; } });
Object.defineProperty(exports, "calculateKeyHeight", { enumerable: true, get: function () { return visualization_2.calculateKeyHeight; } });
Object.defineProperty(exports, "interpolateColor", { enumerable: true, get: function () { return visualization_2.interpolateColor; } });
Object.defineProperty(exports, "prepare3DData", { enumerable: true, get: function () { return visualization_2.prepare3DData; } });
Object.defineProperty(exports, "normalizeKey", { enumerable: true, get: function () { return visualization_2.normalizeKey; } });
