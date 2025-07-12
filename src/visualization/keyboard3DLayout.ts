import { Keyboard3DLayout, Key3DPosition } from '../types';

/**
 * 3D QWERTY Keyboard Layout
 * Each key has x, y, z coordinates and dimensions
 */
const QWERTY_3D_KEYS: Key3DPosition[] = [
  // Number row (Row 0)
  { key: '`', x: 0, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 0 },
  { key: '1', x: 1.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 1 },
  { key: '2', x: 2.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 2 },
  { key: '3', x: 3.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 3 },
  { key: '4', x: 4.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 4 },
  { key: '5', x: 5.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 5 },
  { key: '6', x: 6.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 6 },
  { key: '7', x: 7.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 7 },
  { key: '8', x: 8.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 8 },
  { key: '9', x: 9.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 9 },
  { key: '0', x: 10.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 10 },
  { key: '-', x: 11.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 11 },
  { key: '=', x: 12.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 12 },
  { key: 'Backspace', x: 13.5, y: 0, z: 0, width: 2, height: 1, depth: 1, row: 0, col: 13 },

  // Top row (Row 1) - QWERTYUIOP
  { key: 'Tab', x: 0, y: -1.5, z: 0, width: 1.5, height: 1, depth: 1, row: 1, col: 0 },
  { key: 'q', x: 1.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 1 },
  { key: 'w', x: 2.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 2 },
  { key: 'e', x: 3.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 3 },
  { key: 'r', x: 4.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 4 },
  { key: 't', x: 5.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 5 },
  { key: 'y', x: 6.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 6 },
  { key: 'u', x: 7.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 7 },
  { key: 'i', x: 8.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 8 },
  { key: 'o', x: 9.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 9 },
  { key: 'p', x: 10.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 10 },
  { key: '[', x: 11.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 11 },
  { key: ']', x: 12.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 12 },
  { key: '\\', x: 13.75, y: -1.5, z: 0, width: 1.25, height: 1, depth: 1, row: 1, col: 13 },

  // Home row (Row 2) - ASDFGHJKL
  { key: 'CapsLock', x: 0, y: -3, z: 0, width: 1.75, height: 1, depth: 1, row: 2, col: 0 },
  { key: 'a', x: 2, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 1 },
  { key: 's', x: 3, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 2 },
  { key: 'd', x: 4, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 3 },
  { key: 'f', x: 5, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 4 },
  { key: 'g', x: 6, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 5 },
  { key: 'h', x: 7, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 6 },
  { key: 'j', x: 8, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 7 },
  { key: 'k', x: 9, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 8 },
  { key: 'l', x: 10, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 9 },
  { key: ';', x: 11, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 10 },
  { key: "'", x: 12, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 11 },
  { key: 'Enter', x: 13, y: -3, z: 0, width: 2.25, height: 1, depth: 1, row: 2, col: 12 },

  // Bottom row (Row 3) - ZXCVBNM
  { key: 'Shift', x: 0, y: -4.5, z: 0, width: 2.25, height: 1, depth: 1, row: 3, col: 0 },
  { key: 'z', x: 2.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 1 },
  { key: 'x', x: 3.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 2 },
  { key: 'c', x: 4.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 3 },
  { key: 'v', x: 5.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 4 },
  { key: 'b', x: 6.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 5 },
  { key: 'n', x: 7.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 6 },
  { key: 'm', x: 8.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 7 },
  { key: ',', x: 9.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 8 },
  { key: '.', x: 10.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 9 },
  { key: '/', x: 11.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 10 },
  { key: 'Shift', x: 12.5, y: -4.5, z: 0, width: 2.75, height: 1, depth: 1, row: 3, col: 11 },

  // Space row (Row 4)
  { key: 'Ctrl', x: 0, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 0 },
  { key: 'Alt', x: 1.5, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 1 },
  { key: 'Meta', x: 3, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 2 },
  { key: ' ', x: 4.5, y: -6, z: 0, width: 6.25, height: 1, depth: 1, row: 4, col: 3 },
  { key: 'Meta', x: 11, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 4 },
  { key: 'Alt', x: 12.5, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 5 },
  { key: 'Ctrl', x: 14, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 6 },
];

export const QWERTY_3D_LAYOUT: Keyboard3DLayout = {
  name: 'QWERTY 3D',
  width: 15.5,
  height: 7,
  depth: 1,
  keys: QWERTY_3D_KEYS,
  baseHeight: 0.1,
  keyDepth: 0.8,
};

/**
 * Turkish F 3D Keyboard Layout
 * F-G-Ğ-I-O-D-R-N-H-P-Q-W layout
 */
const TURKISH_F_3D_KEYS: Key3DPosition[] = [
  // Number row (Row 0)
  { key: '+', x: 0, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 0 },
  { key: '1', x: 1.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 1 },
  { key: '2', x: 2.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 2 },
  { key: '3', x: 3.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 3 },
  { key: '4', x: 4.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 4 },
  { key: '5', x: 5.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 5 },
  { key: '6', x: 6.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 6 },
  { key: '7', x: 7.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 7 },
  { key: '8', x: 8.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 8 },
  { key: '9', x: 9.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 9 },
  { key: '0', x: 10.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 10 },
  { key: '/', x: 11.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 11 },
  { key: '-', x: 12.5, y: 0, z: 0, width: 1, height: 1, depth: 1, row: 0, col: 12 },
  { key: 'Backspace', x: 13.5, y: 0, z: 0, width: 2, height: 1, depth: 1, row: 0, col: 13 },

  // Top row (Row 1) - FGĞIOD
  { key: 'Tab', x: 0, y: -1.5, z: 0, width: 1.5, height: 1, depth: 1, row: 1, col: 0 },
  { key: 'f', x: 1.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 1 },
  { key: 'g', x: 2.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 2 },
  { key: 'ğ', x: 3.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 3 },
  { key: 'ı', x: 4.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 4 },
  { key: 'o', x: 5.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 5 },
  { key: 'd', x: 6.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 6 },
  { key: 'r', x: 7.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 7 },
  { key: 'n', x: 8.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 8 },
  { key: 'h', x: 9.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 9 },
  { key: 'p', x: 10.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 10 },
  { key: 'q', x: 11.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 11 },
  { key: 'w', x: 12.75, y: -1.5, z: 0, width: 1, height: 1, depth: 1, row: 1, col: 12 },
  { key: 'x', x: 13.75, y: -1.5, z: 0, width: 1.25, height: 1, depth: 1, row: 1, col: 13 },

  // Home row (Row 2) - UİEAÜT
  { key: 'CapsLock', x: 0, y: -3, z: 0, width: 1.75, height: 1, depth: 1, row: 2, col: 0 },
  { key: 'u', x: 2, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 1 },
  { key: 'i', x: 3, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 2 },
  { key: 'e', x: 4, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 3 },
  { key: 'a', x: 5, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 4 },
  { key: 'ü', x: 6, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 5 },
  { key: 't', x: 7, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 6 },
  { key: 'k', x: 8, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 7 },
  { key: 'm', x: 9, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 8 },
  { key: 'l', x: 10, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 9 },
  { key: 'y', x: 11, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 10 },
  { key: 'ş', x: 12, y: -3, z: 0, width: 1, height: 1, depth: 1, row: 2, col: 11 },
  { key: 'Enter', x: 13, y: -3, z: 0, width: 2.25, height: 1, depth: 1, row: 2, col: 12 },

  // Bottom row (Row 3) - ÖÇVZBSÇ
  { key: 'Shift', x: 0, y: -4.5, z: 0, width: 2.25, height: 1, depth: 1, row: 3, col: 0 },
  { key: 'ö', x: 2.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 1 },
  { key: 'ç', x: 3.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 2 },
  { key: 'v', x: 4.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 3 },
  { key: 'z', x: 5.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 4 },
  { key: 'b', x: 6.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 5 },
  { key: 's', x: 7.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 6 },
  { key: 'c', x: 8.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 7 },
  { key: 'j', x: 9.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 8 },
  { key: '.', x: 10.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 9 },
  { key: ',', x: 11.5, y: -4.5, z: 0, width: 1, height: 1, depth: 1, row: 3, col: 10 },
  { key: 'Shift', x: 12.5, y: -4.5, z: 0, width: 2.75, height: 1, depth: 1, row: 3, col: 11 },

  // Space row (Row 4)
  { key: 'Ctrl', x: 0, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 0 },
  { key: 'Alt', x: 1.5, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 1 },
  { key: 'Meta', x: 3, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 2 },
  { key: ' ', x: 4.5, y: -6, z: 0, width: 6.25, height: 1, depth: 1, row: 4, col: 3 },
  { key: 'Meta', x: 11, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 4 },
  { key: 'Alt', x: 12.5, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 5 },
  { key: 'Ctrl', x: 14, y: -6, z: 0, width: 1.25, height: 1, depth: 1, row: 4, col: 6 },
];

export const TURKISH_F_3D_LAYOUT: Keyboard3DLayout = {
  name: 'Turkish F 3D',
  width: 15.5,
  height: 7,
  depth: 1,
  keys: TURKISH_F_3D_KEYS,
  baseHeight: 0.1,
  keyDepth: 0.8,
};

/**
 * Utility functions for 3D keyboard layouts
 */
export function normalizeKey(key: string): string {
  console.log('🔧 normalizeKey called with:', key);
  const normalized = key.toLowerCase().trim();
  console.log('🔧 normalizeKey result:', normalized);
  return normalized;
}

export function findKeyPosition(layout: Keyboard3DLayout, key: string): Key3DPosition | null {
  console.log('🔍 findKeyPosition called with layout:', layout.name, 'key:', key);
  const normalizedKey = normalizeKey(key);
  const result = layout.keys.find(k => normalizeKey(k.key) === normalizedKey) || null;
  console.log('🔍 findKeyPosition result:', result ? `Found key at (${result.x}, ${result.y})` : 'Key not found');
  return result;
}

export function calculateKeyHeight(frequency: number, maxFrequency: number, minHeight: number = 0.1, maxHeight: number = 3): number {
  console.log('📏 calculateKeyHeight called with:', { frequency, maxFrequency, minHeight, maxHeight });
  if (maxFrequency === 0) {
    console.log('📏 calculateKeyHeight: maxFrequency is 0, returning minHeight:', minHeight);
    return minHeight;
  }
  const ratio = frequency / maxFrequency;
  const height = minHeight + (maxHeight - minHeight) * ratio;
  console.log('📏 calculateKeyHeight result:', { ratio, height });
  return height;
}

export function interpolateColor(color1: string, color2: string, ratio: number): string {
  console.log('🎨 interpolateColor called with:', { color1, color2, ratio });
  
  // Convert hex colors to RGB
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  const result = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  console.log('🎨 interpolateColor result:', result);
  return result;
}

export function prepare3DData(heatmapData: any): any {
  console.log('📊 prepare3DData called with data:', heatmapData);
  
  if (!heatmapData || !heatmapData.frequencies) {
    console.log('📊 prepare3DData: Invalid data, returning empty object');
    return { frequencies: {}, maxFrequency: 0, totalPresses: 0 };
  }

  const frequencies = heatmapData.frequencies;
  const maxFrequency = Math.max(...Object.values(frequencies) as number[]);
  const totalPresses = heatmapData.totalPresses || Object.values(frequencies).reduce((sum: number, freq: any) => sum + freq, 0);

  const result = {
    frequencies,
    maxFrequency,
    totalPresses,
    startTime: heatmapData.startTime,
    endTime: heatmapData.endTime
  };

  console.log('📊 prepare3DData result:', {
    keyCount: Object.keys(frequencies).length,
    maxFrequency,
    totalPresses
  });

  return result;
} 