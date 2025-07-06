<div align="center">

# 🎹 keyboard-heatmap

### *A beautiful, lightweight TypeScript package for tracking keyboard usage and generating stunning heatmap visualizations*

[![npm version](https://img.shields.io/npm/v/keyboard-heatmap?style=for-the-badge&color=blue)](https://www.npmjs.com/package/keyboard-heatmap)
[![npm downloads](https://img.shields.io/npm/dm/keyboard-heatmap?style=for-the-badge&color=green)](https://www.npmjs.com/package/keyboard-heatmap)
[![bundle size](https://img.shields.io/bundlephobia/minzip/keyboard-heatmap?style=for-the-badge&color=orange)](https://bundlephobia.com/package/keyboard-heatmap)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

[🚀 **Live Demo**](https://your-demo-url.com) • [📖 **Documentation**](#-documentation) • [💻 **Examples**](#-examples) • [🤝 **Contributing**](#-contributing)

![Keyboard Heatmap Demo](https://via.placeholder.com/800x400/1976d2/ffffff?text=🎹+Keyboard+Heatmap+Demo)

</div>

---

## ✨ **Features**

<table>
<tr>
<td>

🎯 **Minimal API**
- Simple, intuitive interface
- Just 3 core functions
- Works out of the box

</td>
<td>

🔐 **Privacy First**
- No sensitive data stored
- Only key frequencies tracked
- Local processing only

</td>
</tr>
<tr>
<td>

⚛️ **React Ready**
- Built-in React hook
- Auto cleanup on unmount
- Real-time updates

</td>
<td>

🎨 **Beautiful Visuals**
- SVG heatmap generation
- Customizable colors
- Responsive design

</td>
</tr>
<tr>
<td>

🪶 **Lightweight**
- Zero dependencies
- < 50KB bundle size
- Tree-shakeable

</td>
<td>

📱 **Cross Platform**
- Works everywhere
- Desktop & mobile
- All modern browsers

</td>
</tr>
</table>

---

## 🚀 **Quick Start**

### Installation

```bash
npm install keyboard-heatmap
```

### Basic Usage

```typescript
import { createKeyboardTracker } from 'keyboard-heatmap';

// 🎯 Create and start tracking
const tracker = createKeyboardTracker();
tracker.startTracking();

// 📊 Get real-time data
const data = tracker.getHeatmapData();
console.log(`Total presses: ${data.totalPresses}`);

// 🛑 Stop and get final results
const finalData = tracker.stopTracking();
```

### React Hook

```tsx
import { useKeyboardHeatmap } from 'keyboard-heatmap';

function MyComponent() {
  const { data, isTracking, startTracking, stopTracking } = useKeyboardHeatmap({
    autoStart: true,
    updateInterval: 1000
  });

  return (
    <div>
      <h2>Keyboard Stats</h2>
      <p>Status: {isTracking ? '🟢 Tracking' : '🔴 Stopped'}</p>
      <p>Total Presses: {data?.totalPresses || 0}</p>
      
      <button onClick={startTracking} disabled={isTracking}>
        Start Tracking
      </button>
      <button onClick={stopTracking} disabled={!isTracking}>
        Stop Tracking
      </button>
    </div>
  );
}
```

### Generate Beautiful Heatmaps

```typescript
import { generateHeatmapSVG } from 'keyboard-heatmap';

const svgString = generateHeatmapSVG(data, {
  width: 800,
  height: 300,
  colorScale: ['#e3f2fd', '#1976d2'],
  showLabels: true
});

// Use in React
<div dangerouslySetInnerHTML={{ __html: svgString }} />
```

---

## 💡 **Use Cases**

<div align="center">

| 📊 **Analytics** | 🎮 **Gaming** | 📚 **Education** | ♿ **Accessibility** |
|:---:|:---:|:---:|:---:|
| User behavior tracking | Hotkey optimization | Typing practice | Motor difficulty analysis |
| Website analytics | Gaming performance | Speed training | Adaptive keyboards |
| UX research | Macro analysis | Learning progress | Usage patterns |

</div>

---

## 📖 **Documentation**

### Core API

#### `createKeyboardTracker(options?)`

Creates a new keyboard tracker instance.

```typescript
const tracker = createKeyboardTracker({
  ignoreModifierKeys: false,  // Ignore Ctrl, Alt, Shift, etc.
  ignoreSpecialKeys: false,   // Ignore F1-F12, Escape, etc.
  caseSensitive: false        // Treat 'A' and 'a' as different
});
```

#### Tracker Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `startTracking()` | Begin listening to keyboard events | `void` |
| `stopTracking()` | Stop tracking and return final data | `HeatmapData` |
| `getHeatmapData()` | Get current data without stopping | `HeatmapData` |
| `isTracking()` | Check if currently tracking | `boolean` |
| `reset()` | Clear all data and stop tracking | `void` |

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
  // ... other tracker options
});
```

### Visualization

#### `generateHeatmapSVG(data, options?)`

```typescript
const svg = generateHeatmapSVG(heatmapData, {
  width: 800,                    // SVG width
  height: 300,                   // SVG height
  colorScale: ['#fff', '#000'],  // [min color, max color]
  showLabels: true,              // Show key labels and counts
  minOpacity: 0.1,               // Minimum color intensity
  maxOpacity: 1.0                // Maximum color intensity
});
```

### Data Structure

```typescript
interface HeatmapData {
  frequencies: { [key: string]: number };  // Key press counts
  totalPresses: number;                    // Total number of key presses
  startTime: number;                       // Tracking start timestamp
  endTime?: number;                        // Tracking end timestamp
}
```

---

## 💻 **Examples**

### Real-time Analytics Dashboard

```typescript
import { createKeyboardTracker, generateHeatmapSVG } from 'keyboard-heatmap';

class KeyboardAnalytics {
  private tracker = createKeyboardTracker({
    ignoreModifierKeys: true
  });
  
  start() {
    this.tracker.startTracking();
    
    // Update dashboard every 5 seconds
    setInterval(() => {
      const data = this.tracker.getHeatmapData();
      this.updateDashboard(data);
    }, 5000);
  }
  
  updateDashboard(data: HeatmapData) {
    const svg = generateHeatmapSVG(data, {
      colorScale: ['#e8f5e8', '#2e7d32']
    });
    
    document.getElementById('heatmap')!.innerHTML = svg;
    document.getElementById('total')!.textContent = `${data.totalPresses}`;
  }
}
```

### Typing Practice App

```tsx
import React, { useState } from 'react';
import { useKeyboardHeatmap, generateHeatmapSVG } from 'keyboard-heatmap';

function TypingPractice() {
  const [showResults, setShowResults] = useState(false);
  
  const { data, isTracking, startTracking, stopTracking, reset } = useKeyboardHeatmap({
    ignoreSpecialKeys: true,
    updateInterval: 500,
    onUpdate: (data) => {
      // Calculate typing speed, accuracy, etc.
      const wpm = calculateWPM(data);
      updateStats(wpm);
    }
  });

  const handleFinish = () => {
    stopTracking();
    setShowResults(true);
  };

  return (
    <div className="typing-practice">
      <h1>⌨️ Typing Practice</h1>
      
      {!isTracking ? (
        <button onClick={startTracking}>Start Practice</button>
      ) : (
        <button onClick={handleFinish}>Finish</button>
      )}
      
      {showResults && (
        <div className="results">
          <h2>📊 Your Results</h2>
          <p>Total Key Presses: {data?.totalPresses}</p>
          <div dangerouslySetInnerHTML={{ 
            __html: generateHeatmapSVG(data!, {
              colorScale: ['#fff3cd', '#dc3545']
            })
          }} />
        </div>
      )}
    </div>
  );
}
```

### Gaming Hotkey Analyzer

```typescript
const gameTracker = createKeyboardTracker({
  caseSensitive: true,
  ignoreModifierKeys: false
});

// Track gaming session
gameTracker.startTracking();

// After gaming session
const gameData = gameTracker.stopTracking();
const topKeys = Object.entries(gameData.frequencies)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10);

console.log('🎮 Most used gaming keys:', topKeys);
```

---

## 🎨 **Customization**

### Color Themes

```typescript
const themes = {
  ocean: ['#e3f2fd', '#1976d2'],
  forest: ['#e8f5e8', '#2e7d32'],
  sunset: ['#fff3e0', '#f57c00'],
  cherry: ['#fce4ec', '#c2185b'],
  night: ['#263238', '#37474f']
};

const svg = generateHeatmapSVG(data, {
  colorScale: themes.ocean,
  showLabels: true
});
```

### Custom Layouts

```typescript
// Create your own keyboard layout
const customLayout = {
  width: 600,
  height: 200,
  keys: [
    { key: 'w', x: 50, y: 50, width: 40, height: 40 },
    { key: 'a', x: 10, y: 90, width: 40, height: 40 },
    { key: 's', x: 50, y: 90, width: 40, height: 40 },
    { key: 'd', x: 90, y: 90, width: 40, height: 40 },
    // ... more keys
  ]
};
```

---

## 🛠️ **Browser Compatibility**

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 12+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| Mobile | iOS 12+, Android 7+ | ✅ Full Support |

---

## 📦 **Bundle Size**

```
keyboard-heatmap
├── Core (gzipped): ~15KB
├── React Hook: ~5KB
├── Visualization: ~25KB
└── Total: ~45KB
```

**Tree-shakeable:** Import only what you need!

```typescript
// Import only core functionality
import { createKeyboardTracker } from 'keyboard-heatmap/core';

// Import only React hook
import { useKeyboardHeatmap } from 'keyboard-heatmap/react';

// Import only visualization
import { generateHeatmapSVG } from 'keyboard-heatmap/visualization';
```

---

## 🔒 **Privacy & Security**

<div align="center">

| 🔐 **What We Track** | ❌ **What We DON'T Track** |
|:---:|:---:|
| Key press frequencies | Actual text content |
| Timing data | Personal information |
| Key combinations | Passwords or sensitive data |
| Session duration | Keystrokes outside your app |

</div>

- ✅ **Local Processing**: All data stays in your browser
- ✅ **No Network Calls**: Package doesn't make external requests
- ✅ **Clean Cleanup**: Proper event listener removal
- ✅ **GDPR Compliant**: No personal data collection

---

## 🚧 **Roadmap**

- [ ] 🌐 **Multiple Language Support** (QWERTZ, AZERTY, etc.)
- [ ] 📱 **Mobile Optimizations** (Touch-friendly heatmaps)
- [ ] 🎨 **More Visualization Types** (3D heatmaps, charts)
- [ ] 🔌 **Framework Integrations** (Vue, Angular, Svelte)
- [ ] 📊 **Advanced Analytics** (Typing speed, patterns)
- [ ] 🎮 **Gaming Features** (APM tracking, combo detection)
- [ ] ♿ **Accessibility Tools** (Screen reader support)
- [ ] 🌙 **Dark Mode** (Built-in dark theme)

---

## 🤝 **Contributing**

We love contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

```bash
# Clone the repo
git clone https://github.com/yourusername/keyboard-heatmap.git
cd keyboard-heatmap

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Start development
npm run dev
```

### Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? [Open an issue](https://github.com/yourusername/keyboard-heatmap/issues)
- ✨ **Feature Requests**: Have an idea? [Start a discussion](https://github.com/yourusername/keyboard-heatmap/discussions)
- 📖 **Documentation**: Improve our docs
- 🌍 **Translations**: Help us support more languages
- 💻 **Code**: Submit a pull request

---

## 👥 **Community**

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/keyboard-heatmap?style=social)](https://github.com/yourusername/keyboard-heatmap/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/keyboard-heatmap?style=social)](https://github.com/yourusername/keyboard-heatmap/network/members)
[![Twitter Follow](https://img.shields.io/twitter/follow/yourusername?style=social)](https://twitter.com/yourusername)

[💬 **Discord**](https://discord.gg/yourlink) • [🐦 **Twitter**](https://twitter.com/yourusername) • [📧 **Email**](mailto:your@email.com)

</div>

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- 🎨 Inspired by heat map visualizations
- ⌨️ Built for the developer community
- 🌟 Thanks to all our contributors!

---

<div align="center">

**Made with ❤️ by [Yusif Jabrayilov](https://github.com/mahirliy55)**

*Star ⭐ this repo if you find it useful!*

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/yourusername)

</div> 