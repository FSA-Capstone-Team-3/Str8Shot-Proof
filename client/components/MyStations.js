import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { postStation, deleteStation } from '../store/stations';

import { trainColors, deselectedColor } from '../utils/trainColors';

function Map() {
  // access dispatch
  const dispatch = useDispatch();
  // line styling callback
  const trainStyle = (feature) => {
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

  // make array from all files in public/line_icons
  function importAll(res) {
    const result = [];
    res.keys().forEach((key) => result.push(res(key)));
    return result;
  }
  const lineIcons = importAll(
    require.context('../../public/line_icons', true, /\.svg$/)
  );
  // helper array with same indexes as img files, to map line name to line image
  const lineHelper = [
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

  // state below
  const [selectedStation, setSelectedStation] = useState('');

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

  // select which stations and line to draw based on selected line
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
      <p>Choose your line:</p>
      <div id="line-picker">
        {lineIcons.map((line, idx) => {
          const lineName = lineHelper[idx];
          return (
            <img
              key={line}
              src={line}
              name={lineName}
              alt={lineName + ' train'}
              className={selectedLine === lineName ? 'highlight' : ''}
              onClick={(event) => {
                if (selectedLine === lineName) {
                  setSelectedLine('');
                } else {
                  setSelectedLine(lineName);
                }
              }}
            />
          );
        })}
      </div>
      <p>Your selected line: {selectedLine}</p>
      <p>
        Your selected station:{' '}
        {selectedStation.properties
          ? selectedStation.properties.stop_name
          : 'None'}
      </p>
      <button
        type="button"
        onClick={() => {
          dispatch(postStation(selectedStation.properties['stop_id']));
        }}
      >
        Add Station
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(deleteStation(selectedStation.properties['stop_id']));
        }}
      >
        Remove Station
      </button>
      <MapContainer
        center={[40.785091, -73.968285]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/">&COPY; MapTiler</a> '
          url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${process.env.MAPTILER_API_KEY}`}
        />

        <GeoJSON
          data={allLines}
          style={trainStyle}
          onEachFeature={(feature, layer) => {
            // layer.on('click', (event) => {
            //   setSelectedLine(feature.properties.rt_symbol);
            // });
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
                  if (
                    selectedStation != '' &&
                    selectedStation.properties.stop_name ===
                      station.properties.stop_name
                  ) {
                    setSelectedStation('');
                  } else {
                    setSelectedStation(station);
                  }
                },
              }}
            ></Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
