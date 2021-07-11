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

import { fetchStations } from '../store/stations';
import HomeStationButtons from './HomeStationButtons';
import {
  trainStyle,
  lineIcons,
  lineOrder,
  allStations,
} from '../utils/trainUtils';

import { greenIcon } from '../utils/markerIcons';

function MyStations() {
  // access dispatch
  const dispatch = useDispatch();

  // state below
  const [selectedStation, setSelectedStation] = useState('');

  const [selectedLine, setSelectedLine] = useState('');

  const [stations, setStations] = useState([]);

  const homeStations = useSelector((state) => state.stations);

  // end state

  // select which stations and line to draw based on selected line
  useEffect(() => {
    setStations(
      allStations.filter((station) => {
        return station.lines.includes(selectedLine);
      })
    );
  }, [selectedLine]);

  // Loads homeStations on initial render
  useEffect(() => {
    dispatch(fetchStations());
  }, []);

  return (
    <div>
      <p>Choose your line:</p>
      <div id="line-picker">
        {Object.keys(lineIcons).map((lineName, idx) => {
          // const lineName = lineOrder[idx];
          return (
            <img
              key={lineName}
              src={lineIcons[lineName]}
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
      {selectedStation !== '' ? (
        <HomeStationButtons
          selectedStation={selectedStation}
          homeStations={homeStations}
        />
      ) : null}
      <MapContainer
        center={[40.785091, -73.968285]}
        zoom={14}
        scrollWheelZoom={true}
      >
        {/* <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/">&COPY; MapTiler</a> '
          url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${process.env.MAPTILER_API_KEY}`}
        /> */}
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

        {stations.map((station) => {
          return (
            <Marker
              key={station.code}
              position={[station.latitude, station.longitude]}
              alt={station.name}
              title={station.name}
              eventHandlers={{
                click: (event) => {
                  // are we clicking on an already selected station? If so, deselect it
                  if (
                    selectedStation != '' &&
                    selectedStation.name === station.name
                  ) {
                    setSelectedStation('');
                  } else {
                    // else make new selected station
                    setSelectedStation(station);
                  }
                },
              }}
            />
          );
        })}

        {homeStations.map((station) => {
          return (
            <Marker
              icon={greenIcon}
              key={station.code}
              position={[station.latitude, station.longitude]}
              alt={station.name}
              title={station.name}
              eventHandlers={{
                click: (event) => {
                  // are we clicking on an already selected station? If so, deselect it
                  if (
                    selectedStation != '' &&
                    selectedStation.name === station.name
                  ) {
                    setSelectedStation('');
                  } else {
                    // else make new selected station
                    setSelectedStation(station);
                  }
                },
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MyStations;
