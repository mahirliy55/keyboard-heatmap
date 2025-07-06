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