import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  // state below
  // const [selectedStation, setSelectedStation] = useState('');

  const [myLines, setMyLines] = useState([]);

  const myStations = useSelector((state) => state.stations);

  // const [myStations, setMyStations] = useState({
  //   type: 'FeatureCollection',
  //   name: 'all_stops_nyc_2017',
  //   crs: {
  //     type: 'name',
  //     properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
  //   },
  //   features: [],
  // });

  // end state

  // select which stations and line to draw based on selected line
  // useEffect(() => {
  //   setMyStations({
  //     type: 'FeatureCollection',
  //     name: 'all_stops_nyc_2017',
  //     crs: {
  //       type: 'name',
  //       properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
  //     },
  //     features: allStops.features.filter((station) => {
  //       return station.properties.trains.split(' ').includes(selectedLine);
  //     }),
  //   });
  // }, [myLines]);
  useEffect(() => {
    // gather list of lines to draw given some stations
    const lines = [];
    myStations.forEach((station) => {
      station.lines.forEach((line) => {
        if (lines.includes(line.name) === false) {
          lines.push(line.name);
        }
      });
    });
    setMyLines(lines);
  }, [myStations]);

  console.log('My lines:', myLines);

  const renderMyStations = () => {
    if (myStations.length === 0) {
      return null;
    }
    return myStations.map((station) => {
      return (
        <Marker
          key={station.code}
          position={[station.latitude, station.longitude]}
          alt={station.name}
          title={station.name}
          eventHandlers={{}}
        ></Marker>
      );
    });
  };

  // const renderMyLines = () => {
  //   if (myStations.length === 0) {
  //     return null;
  //   }

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
          style={(feature) => trainStyle(feature, myLines)}
          onEachFeature={(feature, layer) => {
            // layer.on('click', (event) => {
            //   setSelectedLine(feature.properties.rt_symbol);
            // });
          }}
        />
        {renderMyStations()}
        {/* {renderMyLines()} */}
      </MapContainer>
    </div>
  );
}

export default Explore;
