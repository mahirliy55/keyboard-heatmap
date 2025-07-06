# keyboard-heatmap

A lightweight TypeScript package for tracking keyboard key presses and generating beautiful heatmap visualizations. Perfect for analytics, typing practice tools, or developer utilities.

## Features

- 🎯 **Minimal API** - Simple and intuitive interface
- 🔐 **Privacy-focused** - Only tracks key frequencies, not actual input content
- ⚛️ **React Integration** - Easy-to-use React hook included
- 📊 **Visual Heatmaps** - Generate SVG keyboard heatmaps
- 🎨 **Customizable** - Configurable colors, layouts, and options
- 📱 **Responsive** - Works on both desktop and mobile
- 🪶 **Lightweight** - No external dependencies for core functionality

## Installation

```bash
npm install keyboard-heatmap
```

## Quick Start

### Basic Usage (Vanilla JavaScript/TypeScript)

```typescript
import { createKeyboardTracker } from 'keyboard-heatmap';

// Create a tracker instance
const tracker = createKeyboardTracker();

// Start tracking
tracker.startTracking();

// Get data anytime
const currentData = tracker.getHeatmapData();
console.log(currentData);

// Stop tracking and get final results
const finalData = tracker.stopTracking();
console.log('Final results:', finalData);
```

### React Hook Usage

```tsx
import React from 'react';
import { useKeyboardHeatmap } from 'keyboard-heatmap';

function MyComponent() {
  const { data, isTracking, startTracking, stopTracking, reset } = useKeyboardHeatmap({
    autoStart: true,
    updateInterval: 1000,
    onUpdate: (data) => console.log('Updated:', data)
  });

  return (
    <div>
      <h2>Keyboard Heatmap Tracker</h2>
      <p>Status: {isTracking ? 'Tracking' : 'Not tracking'}</p>
      
      {data && (
        <div>
          <p>Total key presses: {data.totalPresses}</p>
          <p>Most pressed keys:</p>
          <ul>
            {Object.entries(data.frequencies)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([key, count]) => (
                <li key={key}>{key}: {count}</li>
              ))
            }
          </ul>
        </div>
      )}
      
      <button onClick={startTracking} disabled={isTracking}>
        Start Tracking
      </button>
      <button onClick={stopTracking} disabled={!isTracking}>
        Stop Tracking
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Generating Visual Heatmaps

```typescript
import { generateHeatmapSVG } from 'keyboard-heatmap';

// After collecting some data
const heatmapData = tracker.getHeatmapData();

// Generate SVG heatmap
const svgString = generateHeatmapSVG(heatmapData, {
  width: 800,
  height: 300,
  colorScale: ['#e6f3ff', '#0066cc'], // Light blue to dark blue
  showLabels: true,
  minOpacity: 0.1,
  maxOpacity: 1.0
});

// Use the SVG (e.g., in React)
function HeatmapDisplay() {
  return (
    <div dangerouslySetInnerHTML={{ __html: svgString }} />
  );
}
```

## API Reference

### Core Functions

#### `createKeyboardTracker(options?)`

Creates a new keyboard tracker instance.

```typescript
const tracker = createKeyboardTracker({
  ignoreModifierKeys: false,  // Ignore Ctrl, Alt, Shift, etc.
  ignoreSpecialKeys: false,   // Ignore F1-F12, Escape, etc.
  caseSensitive: false        // Treat 'A' and 'a' as the same key
});
```

#### Tracker Methods

- `startTracking()` - Begin listening to keydown events
- `stopTracking()` - Stop tracking and return final data
- `getHeatmapData()` - Get current data without stopping
- `isTracking()` - Check if currently tracking
- `reset()` - Clear all data and stop tracking
- `destroy()` - Clean up event listeners

### React Hook

#### `useKeyboardHeatmap(options?)`

```typescript
const {
  data,           // Current heatmap data
  isTracking,     // Whether tracking is active
  startTracking,  // Function to start tracking
  stopTracking,   // Function to stop tracking
  reset,          // Function to reset all data
  getCurrentData  // Function to get current data
} = useKeyboardHeatmap({
  autoStart: true,        // Start tracking on mount
  updateInterval: 1000,   // Update frequency in milliseconds
  onUpdate: (data) => {}, // Callback for data updates
  ignoreModifierKeys: false,
  ignoreSpecialKeys: false,
  caseSensitive: false
});
```

### Visualization

#### `generateHeatmapSVG(data, options?)`

Generates an SVG representation of the keyboard heatmap.

```typescript
const svgString = generateHeatmapSVG(heatmapData, {
  width: 800,                    // SVG width
  height: 300,                   // SVG height
  colorScale: ['#fff', '#000'],  // [min color, max color]
  showLabels: true,              // Show key labels and counts
  minOpacity: 0.1,               // Minimum color intensity
  maxOpacity: 1.0                // Maximum color intensity
});
```

## Data Structure

The heatmap data follows this structure:

```typescript
interface HeatmapData {
  frequencies: { [key: string]: number };  // Key press counts
  totalPresses: number;                    // Total number of key presses
  startTime: number;                       // Tracking start timestamp
  endTime?: number;                        // Tracking end timestamp (if stopped)
}
```

## Examples

### Example 1: Simple Analytics Dashboard

```typescript
import { createKeyboardTracker, generateHeatmapSVG } from 'keyboard-heatmap';

class KeyboardAnalytics {
  private tracker = createKeyboardTracker();
  
  start() {
    this.tracker.startTracking();
  }
  
  getReport() {
    const data = this.tracker.getHeatmapData();
    return {
      totalPresses: data.totalPresses,
      sessionDuration: Date.now() - data.startTime,
      topKeys: Object.entries(data.frequencies)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      heatmapSVG: generateHeatmapSVG(data)
    };
  }
}
```

### Example 2: Typing Practice Tool

```tsx
import React, { useState, useEffect } from 'react';
import { useKeyboardHeatmap, generateHeatmapSVG } from 'keyboard-heatmap';

function TypingPractice() {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const { data, isTracking, startTracking, stopTracking, reset } = useKeyboardHeatmap({
    autoStart: true,
    ignoreSpecialKeys: true,
    updateInterval: 2000
  });

  const getSVG = () => {
    if (!data) return '';
    return generateHeatmapSVG(data, {
      width: 600,
      height: 200,
      colorScale: ['#fff3cd', '#dc3545']
    });
  };

  return (
    <div>
      <h1>Typing Practice</h1>
      <div className="controls">
        <button onClick={() => setShowHeatmap(!showHeatmap)}>
          {showHeatmap ? 'Hide' : 'Show'} Heatmap
        </button>
        <button onClick={reset}>Reset Stats</button>
      </div>
      
      {data && (
        <div className="stats">
          <p>Keys pressed: {data.totalPresses}</p>
          <p>Session time: {Math.round((Date.now() - data.startTime) / 1000)}s</p>
        </div>
      )}
      
      {showHeatmap && (
        <div dangerouslySetInnerHTML={{ __html: getSVG() }} />
      )}
    </div>
  );
}
```

## Browser Compatibility

This package works in all modern browsers that support:
- `KeyboardEvent.key` property
- `document.addEventListener`
- ES2017+ features

## Privacy & Security

- **No sensitive data collection**: Only key frequencies are tracked, not actual input content
- **Local processing**: All data stays in the browser
- **No network requests**: Package doesn't make any external calls
- **Clean event handling**: Proper cleanup prevents memory leaks

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see LICENSE file for details. 