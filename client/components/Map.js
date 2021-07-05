import React, { useEffect, useState } from 'react';
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
import allStops from '../../script/data/subway_stops.geojson';

function deselectedColor(rgb, saturation) {
  // RGB is a cube, with r,g,b as coords
  // HSL is a cylinder, hue is angle, lightness is height, saturation is radius
  // https://css-tricks.com/converting-color-spaces-in-javascript/

  // get individual color channel values
  let r = Number('0x' + rgb.slice(1, 3)) / 255;
  let g = Number('0x' + rgb.slice(3, 5)) / 255;
  let b = Number('0x' + rgb.slice(5, 7)) / 255;

  // let r = Number('0x' + rgb.slice(1, 3));
  // let g = Number('0x' + rgb.slice(3, 5));
  // let b = Number('0x' + rgb.slice(5, 7));

  // find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue from max rgb channel delta
  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness, average of largest and smallest channel values
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // modify lightness and saturation

  // bright pale colors

  l = l * 1.5;
  if (l > 1) l = 1;

  s = s * 0.8;
  if (s > 1) s = 1;

  // pale desaturated colors
  // l = l * 1.2;
  // if (l > 1) l = 1;

  // s = s * 0.35;
  // if (s > 1) s = 1;

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  // const opacity = 0.75;
  // r = parseInt(r * opacity);
  // g = parseInt(g * opacity);
  // b = parseInt(b * opacity);

  // console.log(
  //   'Turned ' +
  //     rgb +
  //     ' to ' +
  //     '#' +
  //     r.toString(16) +
  //     g.toString(16) +
  //     b.toString(16)
  // );

  // return (
  //   '#' +
  //   r.toString(16).padStart(2, '0') +
  //   g.toString(16).padStart(2, '0') +
  //   b.toString(16).padStart(2, '0')
  // );
}

function Map() {
  const trainStyle = (feature) => {
    const line = feature.properties.rt_symbol;
    switch (line) {
      case '1':
        if (line === selectedLine) {
          return { color: '#BD0026', weight: 10 };
        } else {
          return { color: deselectedColor('#BD0026'), weight: 5 };
        }
      case '2':
        if (line === selectedLine) {
          return { color: '#BD0026', weight: 10 };
        } else {
          return { color: deselectedColor('#BD0026'), weight: 5 };
        }
      case '3':
        if (line === selectedLine) {
          return { color: '#BD0026', weight: 10 };
        } else {
          return { color: deselectedColor('#BD0026'), weight: 5 };
        }
      case '4':
        if (line === selectedLine) {
          return { color: '#008000', weight: 10 };
        } else {
          return { color: deselectedColor('#008000'), weight: 5 };
        }
      case '5':
        if (line === selectedLine) {
          return { color: '#008000', weight: 10 };
        } else {
          return { color: deselectedColor('#008000'), weight: 5 };
        }
      case '6':
        if (line === selectedLine) {
          return { color: '#008000', weight: 10510 };
        } else {
          return { color: deselectedColor('#008000'), weight: 5 };
        }
      case '7':
        if (line === selectedLine) {
          return { color: '#710B37', weight: 10 };
        } else {
          return { color: deselectedColor('#710B37'), weight: 5 };
        }
      case 'A':
        if (line === selectedLine) {
          return { color: '#0057E7', weight: 10 };
        } else {
          return { color: deselectedColor('#0057E7'), weight: 5 };
        }
      case 'C':
        if (line === selectedLine) {
          return { color: '#0057E7', weight: 10 };
        } else {
          return { color: deselectedColor('#0057E7'), weight: 5 };
        }
      case 'E':
        if (line === selectedLine) {
          return { color: '#0057E7', weight: 10 };
        } else {
          return { color: deselectedColor('#0057E7'), weight: 5 };
        }
      case 'D':
        if (line === selectedLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: deselectedColor('#F37735'), weight: 5 };
        }
      case 'B':
        if (line === selectedLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: deselectedColor('#F37735'), weight: 5 };
        }
      case 'F':
        if (line === selectedLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: deselectedColor('#F37735'), weight: 5 };
        }
      case 'M':
        if (line === selectedLine) {
          return { color: '#F37735', weight: 10 };
        } else {
          return { color: deselectedColor('#F37735'), weight: 5 };
        }
      case 'N':
        if (line === selectedLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: deselectedColor('#FFDD00'), weight: 5 };
        }
      case 'Q':
        if (line === selectedLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: deselectedColor('#FFDD00'), weight: 5 };
        }
      case 'R':
        if (line === selectedLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: deselectedColor('#FFDD00'), weight: 5 };
        }
      case 'W':
        if (line === selectedLine) {
          return { color: '#FFDD00', weight: 10 };
        } else {
          return { color: deselectedColor('#FFDD00'), weight: 5 };
        }
      case 'L':
        if (line === selectedLine) {
          return { color: '#808080', weight: 10 };
        } else {
          return { color: deselectedColor('#808080'), weight: 5 };
        }
      case 'S':
        if (line === selectedLine) {
          return { color: '#808080', weight: 10 };
        } else {
          return { color: deselectedColor('#808080'), weight: 5 };
        }
      case 'G':
        if (line === selectedLine) {
          return { color: '#6CBE45', weight: 10 };
        } else {
          return { color: deselectedColor('#6CBE45'), weight: 5 };
        }
      case 'J':
        if (line === selectedLine) {
          return { color: '#8D5524', weight: 10 };
        } else {
          return { color: deselectedColor('#8D5524'), weight: 5 };
        }
      case 'Z':
        if (line === selectedLine) {
          return { color: '#8D5524', weight: 10 };
        } else {
          return { color: deselectedColor('#8D5524'), weight: 5 };
        }
    }
  };

  // state below
  const [selectedStation, setSelectedStation] = useState(false);

  const [selectedLine, setSelectedLine] = useState('');

  const [stations, setStations] = useState({
    type: 'FeatureCollection',
    name: 'all_stops_nyc_2017',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: [],
  });

  // end state

  // select which stations to draw based on selected line
  useEffect(() => {
    setStations({
      type: 'FeatureCollection',
      name: 'all_stops_nyc_2017',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
      },
      features: allStops.features.filter((station) => {
        return station.properties.trains.split(' ').includes(selectedLine);
      }),
    });
  }, [selectedLine]);

  return (
    <div>
      {/* <p>
        You are hovering over:{' '}
        {hoverStation ? hoverStation.properties.stop_name : 'None'}
      </p> */}
      {/* <p>You are hovering over: {hoverLine !== '' ? hoverLine : 'None'}</p> */}
      <label htmlFor="line-select">Choose your line:</label>
      <select
        name="line"
        id="line-select"
        onChange={(evt) => setSelectedLine(evt.target.value)}
      >
        <option value="">--Select your line--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="J">J</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="N">N</option>
        <option value="Q">Q</option>
        <option value="R">R</option>
        <option value="S">S</option>
        <option value="W">W</option>
        <option value="Z">Z</option>
      </select>
      <p>Your selected line: {selectedLine}</p>
      <p>
        Your selected station:{' '}
        {selectedStation ? selectedStation.properties.stop_name : 'None'}
      </p>

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
            // layer.on('mouseover', (event) => {
            //   setHoverLine(feature.properties.rt_symbol);
            // });
            // layer.on('mouseout', (event) => {
            //   setHoverLine('');
            // });
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

        {stations.features.map((station) => {
          // {allStops.features.map((station) => {
          return (
            <Marker
              key={station.properties.stop_id}
              position={[
                station.properties.stop_lat,
                station.properties.stop_lon,
              ]}
              title={station.properties.stop_name}
              eventHandlers={{
                click: (event) => {
                  setSelectedStation(station);
                },
                // mouseover: (event) => {
                //   console.log('HOVERED OVER ' + station.properties.stop_name);
                //   setHoverStation(station);
                // },
                // mouseout: (event) => {
                //   setHoverStation(false);
                // },
              }}
            ></Marker>
          );
        })}

        {/* <GeoJSON
          key={stations.features.length} // important!
          data={stations}
          style={function (feature, latlng) {
            return L.circleMarker(latlng, {
              color: '#ffffff',
              radius: 7,
              pane: 'ALL',
            })
              .bindPopup(feature.properties.stop_name)
              .openPopup()
              .on('click', nada_stops)
              .on('mouseover', function (e) {
                this.openPopup();
              })
              .on('mouseout', function (e) {
                this.closePopup();
              });
          }}
        /> */}

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
    </div>
  );
}

export default Map;
