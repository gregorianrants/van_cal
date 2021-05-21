

export function getNumPixels(str) {
    return String(str).slice(0, str.length - 2) * 1
}

export function addToPixels(withPx, num) {
    return (getNumPixels(withPx) * 1 + num) + 'px'
}
