// Global type definitions for Jest test environment

declare global {
  // eslint-disable-next-line no-var
  var debugLog: (data: {
    location?: string;
    message?: string;
    data?: unknown;
    sessionId?: string;
    runId?: string;
    hypothesisId?: string;
  }) => void;
}

export {};



