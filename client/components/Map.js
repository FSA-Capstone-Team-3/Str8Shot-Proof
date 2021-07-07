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

import { trainColors, deselectedColor } from '../utils/trainColors';

function Map() {
  const trainStyle = (feature) => {
    // map GeoJSON features to their train styles
    // highlight selected line, otherwise draw base map

    const line = feature.properties.rt_symbol;

    if (feature.properties.name.split('-').includes(selectedLine)) {
      // this feature includes the selected line, return highlighted color and weight
      return { color: trainColors[line], weight: 10 };
    } else {
      // not selected, return base map style
      return {
        color: deselectedColor(trainColors[line]),
        weight: 5,
      };
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
          }}
        />

        {stations.features.map((station) => {
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
              }}
            ></Marker>
          );
        })}

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
