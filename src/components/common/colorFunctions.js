export  function randomColor() {
    const randomColor = Math.floor(Math.random() * 16777215);
    const hexColor = randomColor.toString(16).padStart(6, '0');
    return `#${hexColor}`;
}


export function rgbColorValidator (str) {
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const match = str.match(rgbRegex);
    if (!match) {
        
        return false; 
    }
    const [, r, g, b] = match.map(Number);
    
    
    return (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255);
}

export function copyColorToClipBoard (color) {
    navigator.clipboard.writeText(color);
}


