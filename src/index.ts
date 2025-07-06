// Core tracking functionality
export { createKeyboardTracker } from './core';
export { KeyboardTrackerImpl } from './core/KeyboardTracker';

// React integration
export { useKeyboardHeatmap } from './react';

// Visualization
export { generateHeatmapSVG, QWERTY_LAYOUT } from './visualization';

// Types
export type {
  KeyFrequency,
  HeatmapData,
  KeyboardTrackerOptions,
  KeyboardTracker,
  HeatmapVisualizationOptions
} from './types';

export type {
  UseKeyboardHeatmapOptions,
  UseKeyboardHeatmapReturn
} from './react';

export type {
  KeyPosition,
  KeyboardLayout
} from './visualization'; 