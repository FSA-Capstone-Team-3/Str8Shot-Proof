import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import stations from '../../script/data/stations.json';

function Map() {
  // const filteredStations = stations.filter(
  //   (station) => station['Complex ID'] === 610 || station['Complex ID'] === 611
  // );

  return (
    <MapContainer center={[40.7, -74]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* {filteredStations.map((station) => (
        <Marker>

      ))} */}
    </MapContainer>
  );
}

export default Map;
