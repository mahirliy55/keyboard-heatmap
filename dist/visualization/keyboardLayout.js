"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QWERTY_LAYOUT = void 0;
// Standard QWERTY keyboard layout
exports.QWERTY_LAYOUT = {
    width: 800,
    height: 300,
    keys: [
        // Number row
        { key: '`', x: 10, y: 10, width: 50, height: 50, displayKey: '`' },
        { key: '1', x: 70, y: 10, width: 50, height: 50 },
        { key: '2', x: 130, y: 10, width: 50, height: 50 },
        { key: '3', x: 190, y: 10, width: 50, height: 50 },
        { key: '4', x: 250, y: 10, width: 50, height: 50 },
        { key: '5', x: 310, y: 10, width: 50, height: 50 },
        { key: '6', x: 370, y: 10, width: 50, height: 50 },
        { key: '7', x: 430, y: 10, width: 50, height: 50 },
        { key: '8', x: 490, y: 10, width: 50, height: 50 },
        { key: '9', x: 550, y: 10, width: 50, height: 50 },
        { key: '0', x: 610, y: 10, width: 50, height: 50 },
        { key: '-', x: 670, y: 10, width: 50, height: 50 },
        { key: '=', x: 730, y: 10, width: 50, height: 50 },
        // QWERTY row
        { key: 'q', x: 85, y: 70, width: 50, height: 50 },
        { key: 'w', x: 145, y: 70, width: 50, height: 50 },
        { key: 'e', x: 205, y: 70, width: 50, height: 50 },
        { key: 'r', x: 265, y: 70, width: 50, height: 50 },
        { key: 't', x: 325, y: 70, width: 50, height: 50 },
        { key: 'y', x: 385, y: 70, width: 50, height: 50 },
        { key: 'u', x: 445, y: 70, width: 50, height: 50 },
        { key: 'i', x: 505, y: 70, width: 50, height: 50 },
        { key: 'o', x: 565, y: 70, width: 50, height: 50 },
        { key: 'p', x: 625, y: 70, width: 50, height: 50 },
        { key: '[', x: 685, y: 70, width: 50, height: 50 },
        { key: ']', x: 745, y: 70, width: 50, height: 50 },
        // ASDF row
        { key: 'a', x: 100, y: 130, width: 50, height: 50 },
        { key: 's', x: 160, y: 130, width: 50, height: 50 },
        { key: 'd', x: 220, y: 130, width: 50, height: 50 },
        { key: 'f', x: 280, y: 130, width: 50, height: 50 },
        { key: 'g', x: 340, y: 130, width: 50, height: 50 },
        { key: 'h', x: 400, y: 130, width: 50, height: 50 },
        { key: 'j', x: 460, y: 130, width: 50, height: 50 },
        { key: 'k', x: 520, y: 130, width: 50, height: 50 },
        { key: 'l', x: 580, y: 130, width: 50, height: 50 },
        { key: ';', x: 640, y: 130, width: 50, height: 50 },
        { key: "'", x: 700, y: 130, width: 50, height: 50 },
        // ZXCV row
        { key: 'z', x: 130, y: 190, width: 50, height: 50 },
        { key: 'x', x: 190, y: 190, width: 50, height: 50 },
        { key: 'c', x: 250, y: 190, width: 50, height: 50 },
        { key: 'v', x: 310, y: 190, width: 50, height: 50 },
        { key: 'b', x: 370, y: 190, width: 50, height: 50 },
        { key: 'n', x: 430, y: 190, width: 50, height: 50 },
        { key: 'm', x: 490, y: 190, width: 50, height: 50 },
        { key: ',', x: 550, y: 190, width: 50, height: 50 },
        { key: '.', x: 610, y: 190, width: 50, height: 50 },
        { key: '/', x: 670, y: 190, width: 50, height: 50 },
        // Space bar
        { key: ' ', x: 200, y: 250, width: 300, height: 40, displayKey: 'Space' },
        // Common special keys
        { key: 'backspace', x: 10, y: 70, width: 65, height: 50, displayKey: '⌫' },
        { key: 'tab', x: 10, y: 130, width: 80, height: 50, displayKey: 'Tab' },
        { key: 'enter', x: 760, y: 130, width: 30, height: 110, displayKey: '↵' },
        { key: 'shift', x: 10, y: 190, width: 110, height: 50, displayKey: 'Shift' },
        { key: 'shift', x: 730, y: 190, width: 60, height: 50, displayKey: 'Shift' }, // Right shift
    ]
};
