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

import { trainStyle, lineIcons, lineOrder } from '../utils/trainUtils';

function Explore() {
  // access dispatch
  const dispatch = useDispatch();

  // make array from all files in public/line_icons
  function importAll(res) {
    const result = [];
    res.keys().forEach((key) => result.push(res(key)));
    return result;
  }

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
          style={(feature) => trainStyle(feature, selectedLine)}
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
              alt={station.properties.stop_name}
              title={station.properties.stop_name}
              eventHandlers={{
                click: (event) => {
                  // are we clicking on an already selected station? If so, deselect it
                  if (
                    selectedStation != '' &&
                    selectedStation.properties.stop_name ===
                      station.properties.stop_name
                  ) {
                    setSelectedStation('');
                  } else {
                    // else make new selected station
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

export default Explore;
