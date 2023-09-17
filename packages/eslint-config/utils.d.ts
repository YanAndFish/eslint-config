/**
 * Whether the current eslint runtime environment is an editor or not.
 */
export declare const isInEditor: boolean

/**
 * @param params default is 'off'
 */
export declare function errorWithoutEditor(params?: 'off' | 'warn'): string
