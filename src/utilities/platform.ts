/* global window */

declare var process: any;

const BROWSER_PLATFORM: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined';
// tslint:disable-next-line:max-line-length
const NODE_PLATFORM: boolean = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export {BROWSER_PLATFORM, NODE_PLATFORM};
