import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import stations from '../../script/data/stations.json';

function Map() {
  const filteredStations = stations.filter(
    (station) => (station['Complex ID'] === 610 || station['Complex ID'] === 611) && station["Daytime Routes"] === "S"
  );

  const filteredLatLong = filteredStations.map(station => [station['GTFS Latitude'], station['GTFS Longitude']])

  console.log(filteredStations);
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
              <p> Line: {station["Daytime Routes"]} ({station.Line})</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <Polyline pathOptions={{color: "#808183", weight: 8}} positions={filteredLatLong} />
    </MapContainer>
  );
}

export default Map;
