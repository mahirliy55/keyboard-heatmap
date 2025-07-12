// Core exports
export { createKeyboardTracker } from './core';
export type { KeyboardTracker, KeyboardTrackerOptions, HeatmapData } from './types';

// React exports
export { useKeyboardHeatmap } from './react';
export type { UseKeyboardHeatmapOptions, UseKeyboardHeatmapReturn } from './react';

// 2D Visualization exports
export { generateHeatmapSVG, QWERTY_LAYOUT } from './visualization';
export type { HeatmapVisualizationOptions } from './types';

// 3D Visualization exports
export { 
  generate3DHeatmap, 
  generate3DTurkishFHeatmap, 
  ThreeJSHeatmapImpl,
  HEATMAP_3D_THEMES,
  QWERTY_3D_LAYOUT, 
  TURKISH_F_3D_LAYOUT,
  findKeyPosition,
  calculateKeyHeight,
  interpolateColor,
  prepare3DData,
  normalizeKey
} from './visualization';

export type { 
  Heatmap3DOptions, 
  Heatmap3DData, 
  ThreeJSHeatmap, 
  Keyboard3DLayout, 
  Key3DPosition 
} from './types'; 