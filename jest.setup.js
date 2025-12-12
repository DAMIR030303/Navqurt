/* eslint-disable @typescript-eslint/no-require-imports */
/* global jest, expect */
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() { }
  unobserve() { }
  disconnect() { }
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() { }
  unobserve() { }
  disconnect() { }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Debug logging utility for Jest
const fs = require('fs');
const path = require('path');
global.debugLog = (data) => {
  try {
    const logPath = path.join(process.cwd(), '.cursor', 'debug.log');
    const logEntry = JSON.stringify({ ...data, timestamp: Date.now() }) + '\n';
    fs.appendFileSync(logPath, logEntry, 'utf8');
  } catch {
    // Silently fail if logging doesn't work
  }
};

// Accessibility matchers
expect.extend({
  toHaveAccessibleName(element, expectedName) {
    const actualName = element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim();
    const pass = actualName === expectedName;
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have accessible name "${expectedName}"`
          : `Expected element to have accessible name "${expectedName}", but got "${actualName}"`,
    };
  },
  toHaveRole(element, expectedRole) {
    const actualRole = element.getAttribute('role');
    const pass = actualRole === expectedRole;
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have role "${expectedRole}"`
          : `Expected element to have role "${expectedRole}", but got "${actualRole}"`,
    };
  },
});
