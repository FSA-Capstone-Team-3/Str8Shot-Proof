import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  GeoJSON,
} from 'react-leaflet';
import stations from '../../script/data/stations.json';
import allLines from '../../script/data/subway_lines.geojson';

function saturate(rgb, saturation) {
  // https://css-tricks.com/converting-color-spaces-in-javascript/

  // get individual color channel values
  let r = Number('0x' + rgb.slice(1, 3)) / 255;
  let g = Number('0x' + rgb.slice(3, 5)) / 255;
  let b = Number('0x' + rgb.slice(5, 7)) / 255;

  // find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s * saturation + '%,' + l + '%)';
}

function Map() {
  const trainStyle = (feature) => {
    const line = feature.properties.rt_symbol;
    switch (line) {
      case '1':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#BD0026', weight: 10 };
        } else {
          return { color: saturate('#BD0026', 0.35), weight: 5 };
        }
      case '2':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#BD0026', weight: 10 };
        } else {
          return { color: saturate('#BD0026', 0.35), weight: 5 };
        }
      case '3':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#BD0026', weight: 10 };
        } else {
          return { color: saturate('#BD0026', 0.35), weight: 5 };
        }
      case '4':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#008000', weight: 10 };
        } else {
          return { color: saturate('#008000', 0.35), weight: 5 };
        }
      case '5':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#008000', weight: 10 };
        } else {
          return { color: saturate('#008000', 0.35), weight: 5 };
        }
      case '6':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#008000', weight: 10510 };
        } else {
          return { color: saturate('#008000', 0.35), weight: 5 };
        }
      case '7':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#710B37', weight: 10 };
        } else {
          return { color: saturate('#710B37', 0.35), weight: 5 };
        }
      case 'A':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#0057E7', weight: 10 };
        } else {
          return { color: saturate('#0057E7', 0.35), weight: 5 };
        }
      case 'C':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#0057E7', weight: 10 };
        } else {
          return { color: saturate('#0057E7', 0.35), weight: 5 };
        }
      case 'E':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#0057E7', weight: 10 };
        } else {
          return { color: saturate('#0057E7', 0.35), weight: 5 };
        }
      case 'D':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: saturate('#F37735', 0.35), weight: 5 };
        }
      case 'B':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: saturate('#F37735', 0.35), weight: 5 };
        }
      case 'F':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: saturate('#F37735', 0.35), weight: 5 };
        }
      case 'M':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: saturate('#F37735', 0.35), weight: 5 };
        }
      case 'N':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: saturate('#FFDD00', 0.35), weight: 5 };
        }
      case 'Q':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: saturate('#FFDD00', 0.35), weight: 5 };
        }
      case 'R':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: saturate('#FFDD00', 0.35), weight: 5 };
        }
      case 'W':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: saturate('#FFDD00', 0.35), weight: 5 };
        }
      case 'L':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#808080', weight: 10 };
        } else {
          return { color: saturate('#808080', 0.35), weight: 5 };
        }
      case 'S':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#808080', weight: 10 };
        } else {
          return { color: saturate('#808080', 0.35), weight: 5 };
        }
      case 'G':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#6CBE45', weight: 10 };
        } else {
          return { color: saturate('#6CBE45', 0.35), weight: 5 };
        }
      case 'J':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#8D5524', weight: 10 };
        } else {
          return { color: saturate('#8D5524', 0.35), weight: 5 };
        }
      case 'Z':
        if (line === selectedLine || line === hoverLine) {
          return { color: '#8D5524', weight: 10 };
        } else {
          return { color: saturate('#8D5524', 0.35), weight: 5 };
        }
    }
  };
  // } : (feature) => {
  //   switch (feature.properties.rt_symbol) {
  //     case "1":
  //       return { color: "#ffb3b3", weight: 5 };
  //     case "2":
  //       return { color: "#ffb3b3", weight: 5 };
  //     case "3":
  //       return { color: "#ffb3b3", weight: 5 };
  //     case "4":
  //       return { color: "#008000", weight: 5 };
  //     case "5":
  //       return { color: "#008000", weight: 5 };
  //     case "6":
  //       return { color: "#008000", weight: 5 };
  //     case "7":
  //       return { color: "#710B37", weight: 5 };
  //     case "A":
  //       return { color: "#0057E7", weight: 5 };
  //     case "C":
  //       return { color: "#0057E7", weight: 5 };
  //     case "E":
  //       return { color: "#0057E7", weight: 5 };
  //     case "D":
  //       return { color: "#F37735", weight: 5 };
  //     case "B":
  //       return { color: "#F37735", weight: 5 };
  //     case "F":
  //       return { color: "#F37735", weight: 5 };
  //     case "M":
  //       return { color: "#F37735", weight: 5 };
  //     case "N":
  //       return { color: "#FFDD00", weight: 5 };
  //     case "Q":
  //       return { color: "#FFDD00", weight: 5 };
  //     case "R":
  //       return { color: "#FFDD00", weight: 5 };
  //     case "W":
  //       return { color: "#FFDD00", weight: 5 };
  //     case "L":
  //       return { color: "#808080", weight: 5 };
  //     case "S":
  //       return { color: "#808080", weight: 5 };
  //     case "G":
  //       return { color: "#6CBE45", weight: 5 };
  //     case "J":
  //       return { color: "#8D5524", weight: 5 };
  //     case "Z":
  //       return { color: "#8D5524", weight: 5 };
  //   }
  // }

  // const filteredStations = stations.filter(
  //   (station) =>
  //     (station['Complex ID'] === 610 || station['Complex ID'] === 611) &&
  //     station['Daytime Routes'] === 'S'
  // );

  // const filteredLatLong = filteredStations.map((station) => [
  //   station['GTFS Latitude'],
  //   station['GTFS Longitude'],
  // ]);

  // state below
  const [selectedStation, setSelectedStation] = useState({
    'Stop Name': 'No station selected',
  });

  const [hoverStation, setHoverStation] = useState('');

  const [selectedLine, setSelectedLine] = useState('');

  const [hoverLine, setHoverLine] = useState('');

  // end state

  return (
    <>
      {/* <p>Your selected station: {selectedStation['Stop Name']}</p>
      <p>
        You are hovering over:{' '}
        {hoverStation ? hoverStation['Stop Name'] : 'None'}
      </p> */}
      <MapContainer
        center={[40.785091, -73.968285]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/">&COPY; MapTiler</a> '
          url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=481HF56KCNL52f9yp3TR"
        />

        <GeoJSON
          data={allLines}
          style={trainStyle}
          onEachFeature={(feature, layer) => {
            layer.on('click', (event) => {
              setSelectedLine(feature.properties.rt_symbol);
              console.log('Feature: ', feature);
              console.log('Event: ', event);
            });
            layer.on('mouseover', (event) => {
              setHoverLine(feature.properties.rt_symbol);
            });
            layer.on('mouseout', (event) => {
              setHoverLine('');
            });
          }}
          // eventHandlers={{
          //   click: (event) => {
          //     console.log('Line clicked', event);
          //   },
          //   mouseover: (event) => {
          //     console.log('Hovered over line');
          //   },
          // }}
        />

        {/* {filteredStations.map((station) => (
          <Marker
            key={station['Station ID']}
            position={[station['GTFS Latitude'], station['GTFS Longitude']]}
            eventHandlers={{
              mouseover: () => {
                setHoverStation(station);
              },

              mouseout: () => {
                setHoverStation(false);
              },

              click: () => {
                setSelectedStation(station);
              },
            }}
          >
            <Popup
              position={[station['GTFS Latitude'], station['GTFS Longitude']]}
            >
              {' '}
              <div>
                <p>{station['Stop Name']}</p>
                <p>
                  {' '}
                  Line: {station['Daytime Routes']} ({station.Line})
                </p>
              </div>
            </Popup>
          </Marker>
        ))} */}
        {/* <Polyline
          pathOptions={{ color: '#808183', weight: 8 }}
          positions={filteredLatLong}
          disabled={true}
          eventHandlers={{
            click: (event) => {
              console.log('Line clicked');
            },
            mouseover: (event) => {
              console.log('Hovered over line');
            },
          }}
        /> */}

        <Marker
          position={[40.785091, -73.968285]}
          title="A title"
          eventHandlers={{
            click: (e) => {
              console.log('marker clicked', e);
            },
          }}
        ></Marker>
      </MapContainer>
    </>
  );
}

export default Map;
