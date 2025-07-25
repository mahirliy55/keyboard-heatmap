"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardTrackerImpl = void 0;
exports.createKeyboardTracker = createKeyboardTracker;
const KeyboardTracker_1 = require("./KeyboardTracker");
Object.defineProperty(exports, "KeyboardTrackerImpl", { enumerable: true, get: function () { return KeyboardTracker_1.KeyboardTrackerImpl; } });
/**
 * Creates a new keyboard tracker instance
 * @param options Configuration options for the tracker
 * @returns A new KeyboardTracker instance
 */
function createKeyboardTracker(options) {
    console.log('🏭 createKeyboardTracker factory function called with options:', options);
    const tracker = new KeyboardTracker_1.KeyboardTrackerImpl(options);
    console.log('✅ Keyboard tracker instance created successfully');
    return tracker;
}
__exportStar(require("../types"), exports);
