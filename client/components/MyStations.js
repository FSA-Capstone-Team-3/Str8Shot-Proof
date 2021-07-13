import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  GeoJSON,
  Tooltip
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
  allStations
} from '../utils/trainUtils';
import Loader from './Loader';
import { blueIcon, greenIcon } from '../utils/markerIcons';

function MyStations() {
  // access dispatch
  const dispatch = useDispatch();

  // state below
  const [isLoaded, setIsLoaded] = useState(false);
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
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, [selectedLine]);

  // Loads homeStations on initial render
  useEffect(() => {
    dispatch(fetchStations());
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div>
        <section className='section'>
          <h1 className='title'>Choose Your Lines and Stations</h1>
          <h2 className='subtitle'>
            First, select a line first. Then, select a station on that line on
            the map below.
          </h2>
          <br />
          <div id='line-picker'>
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
          <br />
          <p className='title is-5 display-flex'>
            {selectedStation
              ? Object.keys(lineIcons)
                  .filter((line) => selectedStation.lines.includes(line))
                  .map((line, idx) => {
                    if (idx === 0) {
                      return (
                        <React.Fragment>
                          <div style={{ marginRight: '.5rem' }}>
                            You've selected {selectedStation.name}
                          </div>
                          <img
                            className='line-icon-small'
                            key={line}
                            src={lineIcons[line]}
                            name={line}
                            alt={line + ' train'}
                          />
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <img
                          className='line-icon-small'
                          key={line}
                          src={lineIcons[line]}
                          name={line}
                          alt={line + ' train'}
                        />
                      );
                    }
                  })
              : ''}
          </p>

          {selectedStation !== '' ? (
            <HomeStationButtons
              selectedStation={selectedStation}
              homeStations={homeStations}
              setSelectedLine={setSelectedLine}
              setSelectedStation={setSelectedStation}
            />
          ) : null}
        </section>

        <MapContainer
          center={[40.758845, -73.983382]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright/">&COPY; MapTiler</a> '
            url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${process.env.MAPTILER_API_KEY}`}
          />

          <GeoJSON
            data={allLines}
            style={(feature) => trainStyle(feature, selectedLine)}
          />

          {stations.map((station) => {
            return (
              <Marker
                icon={
                  homeStations.filter(
                    (homeStation) => homeStation.name === station.name
                  ).length
                    ? greenIcon
                    : blueIcon
                }
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
                      console.log(selectedStation);
                    }
                  }
                }}
              >
                <Tooltip>{station.name}</Tooltip>
              </Marker>
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
                  }
                }}
              >
                <Tooltip>{station.name}</Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    );
  }
}
export default MyStations;
