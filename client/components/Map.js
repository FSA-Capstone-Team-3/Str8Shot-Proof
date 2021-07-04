import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import stations from '../../script/data/stations.json';

function Map() {
  const filteredStations = stations.filter(
    (station) =>
      (station['Complex ID'] === 610 || station['Complex ID'] === 611) &&
      station['Daytime Routes'] === 'S'
  );

  const filteredLatLong = filteredStations.map((station) => [
    station['GTFS Latitude'],
    station['GTFS Longitude'],
  ]);

  const [selectedStation, setSelectedStation] = useState({
    'Stop Name': 'No station selected',
  });

  const [hoverStation, setHoverStation] = useState(false);

  // const [selectedLine, setSelectedStation] = useState({
  //   'Stop Name': 'No station selected',
  // });

  return (
    <>
      <p>Your selected station: {selectedStation['Stop Name']}</p>
      <p>
        You are hovering over:{' '}
        {hoverStation ? hoverStation['Stop Name'] : 'None'}
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
        {filteredStations.map((station) => (
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
        ))}
        <Polyline
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
        />

        <Marker
          position={[40.785091, -73.968285]}
          title="A title"
          eventHandlers={{
            click: (e) => {
              console.log('marker clicked', e);
            },
          }}
        >
          {/* <Popup
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
          </Popup> */}
        </Marker>
      </MapContainer>
    </>
  );
}

export default Map;
