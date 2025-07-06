// Demo script showing real usage patterns of keyboard-heatmap
// This simulates how the package would be used in real applications

console.log('🎹 Keyboard Heatmap - Usage Demo\n');

// Import the package (in a real app, this would be: import { ... } from 'keyboard-heatmap')
const { createKeyboardTracker } = require('./dist/core/index.js');
const { generateHeatmapSVG, QWERTY_LAYOUT } = require('./dist/visualization/index.js');

// Demo 1: Basic Analytics Tool
console.log('📊 Demo 1: Basic Analytics Tool');
console.log('-----------------------------------');

const analyticsTracker = createKeyboardTracker({
  ignoreModifierKeys: true,
  ignoreSpecialKeys: true,
  caseSensitive: false
});

console.log('✅ Analytics tracker created');
console.log('📝 In a real app, this would track user typing patterns');
console.log('🔍 Use case: Understanding user behavior, keyboard preferences\n');

// Demo 2: Typing Practice Application
console.log('📚 Demo 2: Typing Practice Application');
console.log('--------------------------------------');

const typingTracker = createKeyboardTracker({
  ignoreModifierKeys: false,
  ignoreSpecialKeys: false,
  caseSensitive: true
});

console.log('✅ Typing practice tracker created');
console.log('📝 In a real app, this would help users improve their typing');
console.log('🔍 Use case: Typing tutors, speed tests, accuracy training\n');

// Demo 3: Developer Productivity Tool
console.log('💻 Demo 3: Developer Productivity Tool');
console.log('--------------------------------------');

const devTracker = createKeyboardTracker({
  ignoreModifierKeys: true,
  ignoreSpecialKeys: true,
  caseSensitive: true
});

console.log('✅ Developer tracker created');
console.log('📝 In a real app, this would track coding patterns');
console.log('🔍 Use case: Code editor plugins, productivity analytics\n');

// Demo 4: Accessibility Tool
console.log('♿ Demo 4: Accessibility Tool');
console.log('-----------------------------');

const accessibilityTracker = createKeyboardTracker({
  ignoreModifierKeys: false,
  ignoreSpecialKeys: false,
  caseSensitive: false
});

console.log('✅ Accessibility tracker created');
console.log('📝 In a real app, this would help users with motor difficulties');
console.log('🔍 Use case: Adaptive keyboards, difficulty analysis\n');

// Demo 5: Gaming Application
console.log('🎮 Demo 5: Gaming Application');
console.log('-----------------------------');

const gameTracker = createKeyboardTracker({
  ignoreModifierKeys: false,
  ignoreSpecialKeys: false,
  caseSensitive: true
});

console.log('✅ Gaming tracker created');
console.log('📝 In a real app, this would track gaming hotkeys');
console.log('🔍 Use case: Gaming analytics, hotkey optimization\n');

// Demo 6: Data Visualization
console.log('📈 Demo 6: Data Visualization');
console.log('-----------------------------');

// Simulate some typing data
const mockData = {
  frequencies: {
    'a': 25, 'e': 30, 'i': 20, 'o': 15, 'u': 10,
    'n': 22, 't': 28, 'r': 18, 's': 24, 'l': 16,
    'h': 12, 'd': 14, 'c': 8, 'f': 9, 'g': 7,
    'w': 6, 'y': 5, 'p': 4, 'b': 3, 'v': 2,
    'k': 1, 'j': 1, 'x': 1, 'q': 1, 'z': 1,
    ' ': 40, '.': 5, ',': 3, '!': 2, '?': 1
  },
  totalPresses: 500,
  startTime: Date.now() - 60000,
  endTime: Date.now()
};

console.log('📊 Mock data created with', mockData.totalPresses, 'key presses');

// Generate different heatmap styles
const styles = [
  { name: 'Blue Theme', colorScale: ['#e3f2fd', '#1976d2'] },
  { name: 'Green Theme', colorScale: ['#e8f5e8', '#2e7d32'] },
  { name: 'Red Theme', colorScale: ['#ffebee', '#d32f2f'] },
  { name: 'Purple Theme', colorScale: ['#f3e5f5', '#7b1fa2'] }
];

styles.forEach(style => {
  const svg = generateHeatmapSVG(mockData, {
    width: 600,
    height: 200,
    colorScale: style.colorScale,
    showLabels: true
  });
  
  console.log(`✅ ${style.name} heatmap generated (${svg.length} chars)`);
});

console.log('\n🎨 In a real app, these SVGs would be displayed to users');
console.log('🔍 Use case: Visual feedback, progress tracking, data export\n');

// Demo 7: Performance Considerations
console.log('⚡ Demo 7: Performance Considerations');
console.log('------------------------------------');

const performanceTracker = createKeyboardTracker();
const startTime = process.hrtime.bigint();

// Simulate rapid data access
for (let i = 0; i < 1000; i++) {
  performanceTracker.getHeatmapData();
}

const endTime = process.hrtime.bigint();
const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds

console.log(`✅ 1000 data accesses completed in ${duration.toFixed(2)}ms`);
console.log('📝 Performance is suitable for real-time applications');
console.log('🔍 Use case: Live dashboards, real-time feedback\n');

// Demo 8: Integration Examples
console.log('🔌 Demo 8: Integration Examples');
console.log('--------------------------------');

console.log('📱 React Integration:');
console.log('```jsx');
console.log('const { data, isTracking, startTracking } = useKeyboardHeatmap({');
console.log('  autoStart: true,');
console.log('  updateInterval: 1000,');
console.log('  onUpdate: (data) => console.log(data)');
console.log('});');
console.log('```\n');

console.log('🌐 Vanilla JavaScript:');
console.log('```javascript');
console.log('const tracker = createKeyboardTracker();');
console.log('tracker.startTracking();');
console.log('const data = tracker.getHeatmapData();');
console.log('const svg = generateHeatmapSVG(data);');
console.log('```\n');

console.log('📊 Node.js Analytics:');
console.log('```javascript');
console.log('// Server-side data processing');
console.log('const processedData = analyzeKeyboardData(rawData);');
console.log('const report = generateReport(processedData);');
console.log('```\n');

// Demo 9: Real-world Statistics
console.log('📈 Demo 9: Real-world Statistics');
console.log('--------------------------------');

const topKeys = Object.entries(mockData.frequencies)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10);

console.log('🔥 Top 10 Most Pressed Keys:');
topKeys.forEach(([key, count], index) => {
  const keyDisplay = key === ' ' ? 'Space' : key;
  const percentage = ((count / mockData.totalPresses) * 100).toFixed(1);
  console.log(`${index + 1}. ${keyDisplay}: ${count} presses (${percentage}%)`);
});

console.log('\n📊 Statistics:');
console.log(`- Total unique keys: ${Object.keys(mockData.frequencies).length}`);
console.log(`- Average presses per key: ${(mockData.totalPresses / Object.keys(mockData.frequencies).length).toFixed(1)}`);
console.log(`- Session duration: ${((mockData.endTime - mockData.startTime) / 1000).toFixed(1)}s`);
console.log(`- Typing rate: ${(mockData.totalPresses / ((mockData.endTime - mockData.startTime) / 1000)).toFixed(1)} keys/sec`);

console.log('\n🎉 Demo completed!');
console.log('📋 Summary of what was demonstrated:');
console.log('- ✅ Multiple use cases and configurations');
console.log('- ✅ Data visualization with different themes');
console.log('- ✅ Performance characteristics');
console.log('- ✅ Integration patterns');
console.log('- ✅ Real-world data analysis');
console.log('\n💡 Next steps:');
console.log('1. Open example.html to see the interactive demo');
console.log('2. Run the React test app: cd test-react-app && npm start');
console.log('3. Install in your own project: npm install keyboard-heatmap');
console.log('4. Check the documentation in README.md');
console.log('5. Run the test suite: node test-core.js'); 