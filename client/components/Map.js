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

  console.log(filteredStations);
  return (
    <>
      <p>Your selected station: {selectedStation['Stop Name']}</p>
      <MapContainer
        center={[40.785091, -73.968285]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e'
          url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=481HF56KCNL52f9yp3TR"
        />
        {filteredStations.map((station) => (
          <Marker
            key={station['Station ID']}
            position={[station['GTFS Latitude'], station['GTFS Longitude']]}
            eventHandlers={{
              mouseover: () => {
                setSelectedStation(station);
              },

              mouseout: () => {
                setSelectedStation({
                  'Stop Name': 'No station selected',
                });
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
