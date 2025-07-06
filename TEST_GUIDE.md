# 🧪 Testing Guide for keyboard-heatmap

This guide covers all the different ways to test the `keyboard-heatmap` package.

## ✅ Test Results Summary

### Core Package Tests
- ✅ **Package builds successfully** (`npm run build`)
- ✅ **Core functionality works** (`node test-core.js`)
- ✅ **TypeScript types are correct**
- ✅ **SVG generation works**
- ✅ **QWERTY layout is complete**

### React Integration Tests
- ✅ **React hook can be imported**
- ✅ **Package links correctly** (`npm link`)
- ✅ **React test app runs** (`npm start`)

## 🚀 Testing Methods

### 1. Quick Browser Test
```bash
# Open the HTML demo
open example.html
```
- Click "Start Tracking"
- Type on your keyboard
- Click "Show Heatmap"
- Watch real-time updates

### 2. Core Package Test
```bash
# Test core functionality
node test-core.js
```
This tests:
- Package exports
- Tracker creation
- Data structure
- SVG generation
- QWERTY layout

### 3. React Hook Test
```bash
# Navigate to React test app
cd test-react-app
npm start
```
This tests:
- `useKeyboardHeatmap` hook
- Real-time data updates
- React component integration
- Visual heatmap rendering

### 4. Manual Integration Test
Create a new project and install the package:

```bash
# Create new project
mkdir my-test-project
cd my-test-project
npm init -y

# Install the package (after publishing)
npm install keyboard-heatmap

# Or link for local testing
npm link keyboard-heatmap
```

## 🔍 What to Test

### Core Functionality
- [ ] Tracker starts and stops correctly
- [ ] Key presses are recorded accurately
- [ ] Data structure is correct
- [ ] Options work (ignoreModifierKeys, etc.)
- [ ] Memory is cleaned up properly

### React Hook
- [ ] Hook mounts and unmounts correctly
- [ ] Auto-start works
- [ ] Live updates work
- [ ] Callback functions are called
- [ ] State updates correctly

### Visualization
- [ ] SVG is generated correctly
- [ ] Colors scale properly
- [ ] Labels are displayed
- [ ] Responsive sizing works
- [ ] Empty state is handled

### Edge Cases
- [ ] No data (empty frequencies)
- [ ] Single key press
- [ ] Very high frequencies
- [ ] Special characters
- [ ] Different keyboard layouts

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'react'"
**Solution**: This is expected when testing core functionality. Use `test-core.js` instead of `test.js`.

### Issue: SVG not displaying
**Solution**: Check that `dangerouslySetInnerHTML` is used correctly in React, or that the SVG string is valid.

### Issue: Hook not updating
**Solution**: Ensure `updateInterval` is set and greater than 0.

### Issue: Keys not being tracked
**Solution**: Check if the browser window has focus and keyboard events are being received.

## 📊 Performance Tests

### Memory Usage
```javascript
// Test for memory leaks
const tracker = createKeyboardTracker();
tracker.startTracking();
// ... simulate typing
tracker.destroy(); // Should clean up properly
```

### Bundle Size
```bash
# Check built package size
ls -la dist/
```

### Update Frequency
```javascript
// Test different update intervals
const { data } = useKeyboardHeatmap({ updateInterval: 100 });
// Should update every 100ms
```

## 🚀 Publishing Tests

Before publishing to npm:

1. **Build Test**
   ```bash
   npm run build
   ```

2. **Package Test**
   ```bash
   npm pack
   # Check the generated .tgz file
   ```

3. **Install Test**
   ```bash
   npm install ./keyboard-heatmap-1.0.0.tgz
   ```

## 🎯 Example Use Cases to Test

### 1. Analytics Dashboard
```javascript
const tracker = createKeyboardTracker();
tracker.startTracking();

setInterval(() => {
  const data = tracker.getHeatmapData();
  console.log('Analytics:', data);
}, 5000);
```

### 2. Typing Game
```javascript
const { data, isTracking, startTracking } = useKeyboardHeatmap({
  ignoreSpecialKeys: true,
  updateInterval: 500
});

// Show real-time typing speed and accuracy
```

### 3. Developer Tool
```javascript
const tracker = createKeyboardTracker({
  ignoreModifierKeys: true,
  caseSensitive: true
});

// Track coding patterns
```

## 📝 Test Checklist

Before releasing:
- [ ] All tests pass
- [ ] No console errors
- [ ] Memory usage is reasonable
- [ ] Works in different browsers
- [ ] TypeScript types are correct
- [ ] Documentation is accurate
- [ ] Examples work correctly

## 🌐 Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## 📱 Mobile Testing

Test on mobile devices:
- [ ] Touch events don't interfere
- [ ] Virtual keyboard works
- [ ] Responsive design works
- [ ] Performance is acceptable 