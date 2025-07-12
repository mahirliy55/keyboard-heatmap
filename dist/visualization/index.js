"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeKey = exports.prepare3DData = exports.interpolateColor = exports.calculateKeyHeight = exports.findKeyPosition = exports.TURKISH_F_3D_LAYOUT = exports.QWERTY_3D_LAYOUT = exports.HEATMAP_3D_THEMES = exports.ThreeJSHeatmapImpl = exports.generate3DTurkishFHeatmap = exports.generate3DHeatmap = exports.QWERTY_LAYOUT = exports.generateHeatmapSVG = void 0;
// 2D SVG Heatmap exports
var heatmapGenerator_1 = require("./heatmapGenerator");
Object.defineProperty(exports, "generateHeatmapSVG", { enumerable: true, get: function () { return heatmapGenerator_1.generateHeatmapSVG; } });
var keyboardLayout_1 = require("./keyboardLayout");
Object.defineProperty(exports, "QWERTY_LAYOUT", { enumerable: true, get: function () { return keyboardLayout_1.QWERTY_LAYOUT; } });
// 3D Heatmap exports
var heatmap3DGenerator_1 = require("./heatmap3DGenerator");
Object.defineProperty(exports, "generate3DHeatmap", { enumerable: true, get: function () { return heatmap3DGenerator_1.generate3DHeatmap; } });
Object.defineProperty(exports, "generate3DTurkishFHeatmap", { enumerable: true, get: function () { return heatmap3DGenerator_1.generate3DTurkishFHeatmap; } });
Object.defineProperty(exports, "ThreeJSHeatmapImpl", { enumerable: true, get: function () { return heatmap3DGenerator_1.ThreeJSHeatmapImpl; } });
Object.defineProperty(exports, "HEATMAP_3D_THEMES", { enumerable: true, get: function () { return heatmap3DGenerator_1.HEATMAP_3D_THEMES; } });
var keyboard3DLayout_1 = require("./keyboard3DLayout");
Object.defineProperty(exports, "QWERTY_3D_LAYOUT", { enumerable: true, get: function () { return keyboard3DLayout_1.QWERTY_3D_LAYOUT; } });
Object.defineProperty(exports, "TURKISH_F_3D_LAYOUT", { enumerable: true, get: function () { return keyboard3DLayout_1.TURKISH_F_3D_LAYOUT; } });
Object.defineProperty(exports, "findKeyPosition", { enumerable: true, get: function () { return keyboard3DLayout_1.findKeyPosition; } });
Object.defineProperty(exports, "calculateKeyHeight", { enumerable: true, get: function () { return keyboard3DLayout_1.calculateKeyHeight; } });
Object.defineProperty(exports, "interpolateColor", { enumerable: true, get: function () { return keyboard3DLayout_1.interpolateColor; } });
Object.defineProperty(exports, "prepare3DData", { enumerable: true, get: function () { return keyboard3DLayout_1.prepare3DData; } });
Object.defineProperty(exports, "normalizeKey", { enumerable: true, get: function () { return keyboard3DLayout_1.normalizeKey; } });
