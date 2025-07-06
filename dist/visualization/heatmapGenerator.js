"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeatmapSVG = generateHeatmapSVG;
const keyboardLayout_1 = require("./keyboardLayout");
const colorUtils = {
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    interpolateColor(color1, color2, factor) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        if (!c1 || !c2)
            return color1;
        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);
        return this.rgbToHex(r, g, b);
    },
    rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
};
/**
 * Generates an SVG representation of a keyboard heatmap
 * @param data The heatmap data containing key frequencies
 * @param options Visualization options
 * @returns SVG string representing the keyboard heatmap
 */
function generateHeatmapSVG(data, options = {}) {
    const { width = 800, height = 300, colorScale = ['#e6f3ff', '#0066cc'], showLabels = true, minOpacity = 0.1, maxOpacity = 1.0 } = options;
    // Calculate the maximum frequency for normalization
    const maxFrequency = Math.max(...Object.values(data.frequencies));
    if (maxFrequency === 0) {
        return generateEmptyKeyboard(width, height, showLabels);
    }
    // Create SVG elements
    const svgElements = [];
    // Add background
    svgElements.push(`<rect width="${width}" height="${height}" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>`);
    // Generate keys
    for (const keyPos of keyboardLayout_1.QWERTY_LAYOUT.keys) {
        const frequency = data.frequencies[keyPos.key] || 0;
        const normalizedFreq = frequency / maxFrequency;
        // Calculate color intensity
        const intensity = Math.max(minOpacity, normalizedFreq * maxOpacity);
        const keyColor = frequency > 0
            ? colorUtils.interpolateColor(colorScale[0], colorScale[1], intensity)
            : '#ffffff';
        // Scale position and size
        const scaleX = width / keyboardLayout_1.QWERTY_LAYOUT.width;
        const scaleY = height / keyboardLayout_1.QWERTY_LAYOUT.height;
        const scaledX = keyPos.x * scaleX;
        const scaledY = keyPos.y * scaleY;
        const scaledWidth = keyPos.width * scaleX;
        const scaledHeight = keyPos.height * scaleY;
        // Create key rectangle
        svgElements.push(`<rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" ` +
            `fill="${keyColor}" stroke="#333" stroke-width="1" rx="4" ry="4"/>`);
        // Add key label if enabled
        if (showLabels) {
            const displayKey = keyPos.displayKey || keyPos.key.toUpperCase();
            const textX = scaledX + scaledWidth / 2;
            const textY = scaledY + scaledHeight / 2;
            const fontSize = Math.min(scaledWidth / 3, scaledHeight / 3, 12);
            // Add frequency count
            if (frequency > 0) {
                svgElements.push(`<text x="${textX}" y="${textY - 2}" text-anchor="middle" dominant-baseline="middle" ` +
                    `font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#333">${displayKey}</text>`);
                svgElements.push(`<text x="${textX}" y="${textY + fontSize}" text-anchor="middle" dominant-baseline="middle" ` +
                    `font-family="Arial, sans-serif" font-size="${fontSize * 0.7}" fill="#666">${frequency}</text>`);
            }
            else {
                svgElements.push(`<text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle" ` +
                    `font-family="Arial, sans-serif" font-size="${fontSize}" fill="#999">${displayKey}</text>`);
            }
        }
    }
    // Add legend
    svgElements.push(generateLegend(width, height, maxFrequency, colorScale));
    // Combine all elements
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${svgElements.join('\n    ')}
  </svg>`;
}
/**
 * Generates an empty keyboard layout
 */
function generateEmptyKeyboard(width, height, showLabels) {
    const svgElements = [];
    // Add background
    svgElements.push(`<rect width="${width}" height="${height}" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>`);
    // Generate empty keys
    for (const keyPos of keyboardLayout_1.QWERTY_LAYOUT.keys) {
        const scaleX = width / keyboardLayout_1.QWERTY_LAYOUT.width;
        const scaleY = height / keyboardLayout_1.QWERTY_LAYOUT.height;
        const scaledX = keyPos.x * scaleX;
        const scaledY = keyPos.y * scaleY;
        const scaledWidth = keyPos.width * scaleX;
        const scaledHeight = keyPos.height * scaleY;
        // Create empty key rectangle
        svgElements.push(`<rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" ` +
            `fill="#ffffff" stroke="#ccc" stroke-width="1" rx="4" ry="4"/>`);
        // Add key label if enabled
        if (showLabels) {
            const displayKey = keyPos.displayKey || keyPos.key.toUpperCase();
            const textX = scaledX + scaledWidth / 2;
            const textY = scaledY + scaledHeight / 2;
            const fontSize = Math.min(scaledWidth / 3, scaledHeight / 3, 12);
            svgElements.push(`<text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle" ` +
                `font-family="Arial, sans-serif" font-size="${fontSize}" fill="#999">${displayKey}</text>`);
        }
    }
    // Add "No data" message
    svgElements.push(`<text x="${width / 2}" y="${height - 20}" text-anchor="middle" ` +
        `font-family="Arial, sans-serif" font-size="14" fill="#666">No tracking data available</text>`);
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${svgElements.join('\n    ')}
  </svg>`;
}
/**
 * Generates a legend for the heatmap
 */
function generateLegend(width, height, maxFrequency, colorScale) {
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - legendWidth - 20;
    const legendY = 20;
    const gradientId = 'heatmapGradient';
    return `
    <defs>
      <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${colorScale[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colorScale[1]};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="${legendX}" y="${legendY}" width="${legendWidth}" height="${legendHeight}" fill="url(#${gradientId})" stroke="#333" stroke-width="1"/>
    <text x="${legendX}" y="${legendY - 5}" font-family="Arial, sans-serif" font-size="12" fill="#333">0</text>
    <text x="${legendX + legendWidth}" y="${legendY - 5}" text-anchor="end" font-family="Arial, sans-serif" font-size="12" fill="#333">${maxFrequency}</text>
    <text x="${legendX + legendWidth / 2}" y="${legendY + legendHeight + 15}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#333">Key Press Frequency</text>
  `;
}
