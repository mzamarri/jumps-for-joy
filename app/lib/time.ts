export function delay(milliseconds: number) {
    return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}
