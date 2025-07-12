export interface KeyFrequency {
  [key: string]: number;
}

export interface HeatmapData {
  frequencies: KeyFrequency;
  totalPresses: number;
  startTime: number;
  endTime?: number;
}

export interface KeyboardTrackerOptions {
  ignoreModifierKeys?: boolean;
  ignoreSpecialKeys?: boolean;
  caseSensitive?: boolean;
}

export interface HeatmapVisualizationOptions {
  width?: number;
  height?: number;
  colorScale?: [string, string]; // [min color, max color]
  showLabels?: boolean;
  minOpacity?: number;
  maxOpacity?: number;
}

export interface KeyboardTracker {
  startTracking(): void;
  stopTracking(): HeatmapData;
  getHeatmapData(): HeatmapData;
  isTracking(): boolean;
  reset(): void;
  destroy(): void;
}

// 3D Heatmap Types
export interface Heatmap3DOptions {
  width?: number;
  height?: number;
  depth?: number;
  colorScale?: [string, string];
  showLabels?: boolean;
  minHeight?: number;
  maxHeight?: number;
  keySpacing?: number;
  backgroundColor?: string;
  lightIntensity?: number;
  cameraPosition?: [number, number, number];
  enableAnimation?: boolean;
  animationDuration?: number;
  wireframe?: boolean;
  enableInteraction?: boolean;
  enableOrbitControls?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export interface Key3DPosition {
  key: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  row: number;
  col: number;
}

export interface Keyboard3DLayout {
  name: string;
  width: number;
  height: number;
  depth: number;
  keys: Key3DPosition[];
  baseHeight: number;
  keyDepth: number;
}

export interface Heatmap3DData extends HeatmapData {
  maxFrequency: number;
  normalizedFrequencies: { [key: string]: number };
  heatmapIntensities: { [key: string]: number };
}

export interface ThreeJSHeatmap {
  scene: any; // THREE.Scene
  camera: any; // THREE.Camera
  renderer: any; // THREE.Renderer
  controls?: any; // THREE.OrbitControls
  mesh: any; // THREE.Mesh
  update: (data: Heatmap3DData) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
  animate: () => void;
  setTheme: (colorScale: [string, string]) => void;
  toggleWireframe: () => void;
  resetCamera: () => void;
} 