export const trainColors = {
  1: '#BD0026',
  2: '#BD0026',
  3: '#BD0026',
  4: '#008000',
  5: '#008000',
  6: '#008000',
  7: '#710B37',
  A: '#0057E7',
  C: '#0057E7',
  E: '#0057E7',
  D: '#F37735',
  B: '#F37735',
  F: '#F37735',
  M: '#F37735',
  N: '#FFDD00',
  Q: '#FFDD00',
  R: '#FFDD00',
  W: '#FFDD00',
  L: '#808080',
  S: '#808080',
  G: '#6CBE45',
  J: '#8D5524',
  Z: '#8D5524',
};

export const deselectedColor = (rgb) => {
  // RGB is a cube, with r,g,b as coords
  // HSL is a cylinder, hue is angle, luminance is height, saturation is radius
  // https://css-tricks.com/converting-color-spaces-in-javascript/

  // get individual color channel values
  let red = Number('0x' + rgb.slice(1, 3)) / 255;
  let green = Number('0x' + rgb.slice(3, 5)) / 255;
  let blue = Number('0x' + rgb.slice(5, 7)) / 255;

  // find greatest and smallest channel values
  let minChannel = Math.min(red, green, blue),
    maxChannel = Math.max(red, green, blue),
    delta = maxChannel - minChannel,
    hue = 0,
    saturation = 0,
    luminance = 0;

  // Calculate hue from max rgb channel delta
  if (delta == 0) hue = 0;
  else if (maxChannel == red) hue = ((green - blue) / delta) % 6;
  else if (maxChannel == green) hue = (blue - red) / delta + 2;
  else hue = (red - green) / delta + 4;

  hue = Math.round(hue * 60);

  // Make negative hues positive behind 360°
  if (hue < 0) hue += 360;

  // Calculate lightness, average of largest and smallest channel values
  luminance = (maxChannel + minChannel) / 2;

  // Calculate saturation
  saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * luminance - 1));

  // modify lightness and saturation

  luminance = luminance * 1.5;
  if (luminance > 1) luminance = 1;

  saturation = saturation * 0.8;
  if (saturation > 1) saturation = 1;

  // Convert sat and lum to percentage
  saturation = +(saturation * 100).toFixed(1);
  luminance = +(luminance * 100).toFixed(1);

  // return hsl CSS color code
  return 'hsl(' + hue + ',' + saturation + '%,' + luminance + '%)';
};
