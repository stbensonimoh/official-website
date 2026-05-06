import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
(globalThis as any).document = dom.window.document;
(globalThis as any).window = dom.window;
(globalThis as any).navigator = dom.window.navigator;
(globalThis as any).MutationObserver = dom.window.MutationObserver;
(globalThis as any).getComputedStyle = dom.window.getComputedStyle;
