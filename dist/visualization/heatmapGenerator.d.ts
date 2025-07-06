import { HeatmapData, HeatmapVisualizationOptions } from '../types';
/**
 * Generates an SVG representation of a keyboard heatmap
 * @param data The heatmap data containing key frequencies
 * @param options Visualization options
 * @returns SVG string representing the keyboard heatmap
 */
export declare function generateHeatmapSVG(data: HeatmapData, options?: HeatmapVisualizationOptions): string;
