// 2D SVG Heatmap exports
export { generateHeatmapSVG } from './heatmapGenerator';
export { QWERTY_LAYOUT } from './keyboardLayout';

// 3D Heatmap exports
export { 
  generate3DHeatmap, 
  generate3DTurkishFHeatmap, 
  ThreeJSHeatmapImpl,
  HEATMAP_3D_THEMES
} from './heatmap3DGenerator';

export { 
  QWERTY_3D_LAYOUT, 
  TURKISH_F_3D_LAYOUT,
  findKeyPosition,
  calculateKeyHeight,
  interpolateColor,
  prepare3DData,
  normalizeKey
} from './keyboard3DLayout';

// Re-export types for convenience
export type { 
  Heatmap3DOptions, 
  Heatmap3DData, 
  ThreeJSHeatmap, 
  Keyboard3DLayout, 
  Key3DPosition 
} from '../types'; 