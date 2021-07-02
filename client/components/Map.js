import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import stations from '../../script/data/stations.json';

function Map() {
  const filteredStations = stations.filter(
    (station) => station['Complex ID'] === 610 || station['Complex ID'] === 611
  );

  return (
    <MapContainer center={[40.7, -74]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {filteredStations.map((station) => (
        <Marker
          key={station['Station ID']}
          position={[station['GTFS Latitude'], station['GTFS Longitude']]}
        >
          <Popup
            position={[station['GTFS Latitude'], station['GTFS Longitude']]}
          >
            {' '}
            <div>
              <p>{station['Stop Name']}</p>
              <p>{station.Line}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
