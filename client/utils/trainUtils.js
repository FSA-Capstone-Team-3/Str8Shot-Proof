export const trainColors = {
  1: '#ee352e',
  2: '#ee352e',
  3: '#ee352e',
  4: '#00933c',
  5: '#00933c',
  6: '#00933c',
  7: '#b933ad',
  A: '#0039a6',
  C: '#0039a6',
  E: '#0039a6',
  D: '#ff6319',
  B: '#ff6319',
  F: '#ff6319',
  M: '#ff6319',
  N: '#fccc0a',
  Q: '#fccc0a',
  R: '#fccc0a',
  W: '#fccc0a',
  L: '#a7a9ac',
  S: '#808183',
  G: '#6cbe45',
  J: '#996633',
  Z: '#996633',
};

// helper array with same indexes as img files, to map line name to line image
export const lineOrder = [
  'A',
  'C',
  'E',
  'B',
  'D',
  'F',
  'M',
  'G',
  'L',
  'J',
  'Z',
  'N',
  'Q',
  'R',
  'W',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
];

// make array from all files in public/line_icons
function importAll(res) {
  const result = [];
  res.keys().forEach((key) => result.push(res(key)));
  return result;
}

export const lineIcons = importAll(
  require.context('../../public/line_icons', true, /\.svg$/)
);

export const deselectedColor = (rgb) => {
  // RGB is a cube, with r,g,b as coords
  // HSL is a cylinder, hue is angle, luminance is height, saturation is radius

  // almost all code stolen from below:
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

// line styling callback
export const trainStyle = (feature, selectedLine) => {
  // map GeoJSON features to their train styles
  // highlight selected line, otherwise draw base map

  const line = feature.properties.rt_symbol;

  if (selectedLine != '') {
    // this feature includes the selected line, return highlighted color and weight
    if (feature.properties.name.split('-').includes(selectedLine)) {
      return { color: trainColors[selectedLine], weight: 5, opacity: 100 };
    } else {
      // make other lines transparent
      return {
        opacity: 0,
      };
    }
  } else {
    // not selected, return base map style
    return { color: trainColors[line], weight: 3, opacity: 100 };
  }
};
