function getRandomColor() {
  var minBrightness = 50;
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);

  if (brightness < minBrightness) {
    var brightnessDifference = minBrightness - brightness;
    r += brightnessDifference;
    g += brightnessDifference;
    r = Math.min(r, 255);
    g = Math.min(g, 255);
  }


  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}

function getContrastColor(bgColor: string) {
  var r = parseInt(bgColor.substring(1, 2), 16);
  var g = parseInt(bgColor.substring(3, 2), 16);
  var b = parseInt(bgColor.substring(5, 2), 16);

  var contrastIndex = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  var brightnessThreshold = 128;

  var lightColor = '#ffffff';
  var darkColor = '#333333';


  return (contrastIndex >= brightnessThreshold) ? darkColor : lightColor;
}

export {
  getRandomColor,
  getContrastColor
}