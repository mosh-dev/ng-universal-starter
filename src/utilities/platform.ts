declare var process: any;
const BROWSER_PLATFORM = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const NODE_PLATFORM = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
export {BROWSER_PLATFORM, NODE_PLATFORM};
