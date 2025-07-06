export interface KeyPosition {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
    displayKey?: string;
}
export interface KeyboardLayout {
    keys: KeyPosition[];
    width: number;
    height: number;
}
export declare const QWERTY_LAYOUT: KeyboardLayout;
