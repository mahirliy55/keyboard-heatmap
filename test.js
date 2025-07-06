// Simple test to verify the package exports work correctly
const keyboardHeatmap = require('./dist/index.js');

console.log('🧪 Testing keyboard-heatmap package...\n');

// Test 1: Check exports
console.log('✅ Available exports:');
console.log('- createKeyboardTracker:', typeof keyboardHeatmap.createKeyboardTracker);
console.log('- KeyboardTrackerImpl:', typeof keyboardHeatmap.KeyboardTrackerImpl);
console.log('- useKeyboardHeatmap:', typeof keyboardHeatmap.useKeyboardHeatmap);
console.log('- generateHeatmapSVG:', typeof keyboardHeatmap.generateHeatmapSVG);
console.log('- QWERTY_LAYOUT:', typeof keyboardHeatmap.QWERTY_LAYOUT);

// Test 2: Create tracker instance
console.log('\n✅ Testing tracker creation...');
try {
    const tracker = keyboardHeatmap.createKeyboardTracker();
    console.log('- Tracker created successfully');
    console.log('- isTracking():', tracker.isTracking());
    
    // Test methods exist
    console.log('- startTracking:', typeof tracker.startTracking);
    console.log('- stopTracking:', typeof tracker.stopTracking);
    console.log('- getHeatmapData:', typeof tracker.getHeatmapData);
    console.log('- reset:', typeof tracker.reset);
    console.log('- destroy:', typeof tracker.destroy);
    
} catch (error) {
    console.error('❌ Error creating tracker:', error.message);
}

// Test 3: Test heatmap data structure
console.log('\n✅ Testing heatmap data structure...');
try {
    const tracker = keyboardHeatmap.createKeyboardTracker();
    const data = tracker.getHeatmapData();
    
    console.log('- Data structure:', {
        frequencies: typeof data.frequencies,
        totalPresses: typeof data.totalPresses,
        startTime: typeof data.startTime,
        endTime: typeof data.endTime
    });
    
    console.log('- Initial values:', {
        totalPresses: data.totalPresses,
        frequenciesEmpty: Object.keys(data.frequencies).length === 0
    });
    
} catch (error) {
    console.error('❌ Error testing data structure:', error.message);
}

// Test 4: Test SVG generation
console.log('\n✅ Testing SVG generation...');
try {
    const mockData = {
        frequencies: { 'a': 5, 'b': 3, 'c': 1 },
        totalPresses: 9,
        startTime: Date.now(),
        endTime: Date.now() + 1000
    };
    
    const svg = keyboardHeatmap.generateHeatmapSVG(mockData, {
        width: 400,
        height: 150
    });
    
    console.log('- SVG generated successfully');
    console.log('- SVG length:', svg.length, 'characters');
    console.log('- Contains <svg> tag:', svg.includes('<svg'));
    console.log('- Contains keyboard elements:', svg.includes('rect'));
    
} catch (error) {
    console.error('❌ Error generating SVG:', error.message);
}

// Test 5: Test QWERTY layout
console.log('\n✅ Testing QWERTY layout...');
try {
    const layout = keyboardHeatmap.QWERTY_LAYOUT;
    console.log('- Layout dimensions:', layout.width, 'x', layout.height);
    console.log('- Number of keys:', layout.keys.length);
    console.log('- Sample keys:', layout.keys.slice(0, 5).map(k => k.key));
    
} catch (error) {
    console.error('❌ Error testing QWERTY layout:', error.message);
}

console.log('\n🎉 Package test completed!');
console.log('\nTo test in browser, open example.html');
console.log('To test with React, create a test React app and import the hook.'); 