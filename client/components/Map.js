import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  GeoJSON,
} from "react-leaflet";
//import stations from "../../script/data/stations.json";
import allLines from "../../script/data/subway_lines.geojson";

function Map() {
  // const filteredStations = stations.filter(
  //   (station) =>
  //     (station["Complex ID"] === 610 || station["Complex ID"] === 611) &&
  //     station["Daytime Routes"] === "S"
  // );

  // const filteredLatLong = filteredStations.map((station) => [
  //   station["GTFS Latitude"],
  //   station["GTFS Longitude"],
  // ]);

  // console.log(filteredStations);
  return (
    <MapContainer center={[40.7, -74]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {filteredStations.map((station) => (
        <Marker
          key={station["Station ID"]}
          position={[station["GTFS Latitude"], station["GTFS Longitude"]]}
        >
          <Popup
            position={[station["GTFS Latitude"], station["GTFS Longitude"]]}
          >
            {" "}
            <div>
              <p>{station["Stop Name"]}</p>
              <p>
                {" "}
                Line: {station["Daytime Routes"]} ({station.Line})
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      <Polyline
        pathOptions={{ color: "#808183", weight: 8 }}
        positions={filteredLatLong}
      /> */}

      <GeoJSON
        data={allLines}
        style={function (feature) {
          switch (feature.properties.rt_symbol) {
            case "1":
              return { color: "#BD0026", weight: 5 };
            case "2":
              return { color: "#BD0026", weight: 5 };
            case "3":
              return { color: "#BD0026", weight: 5 };
            case "4":
              return { color: "#008000", weight: 5 };
            case "5":
              return { color: "#008000", weight: 5 };
            case "6":
              return { color: "#008000", weight: 5 };
            case "7":
              return { color: "#710B37", weight: 5 };
            case "A":
              return { color: "#0057E7", weight: 5 };
            case "C":
              return { color: "#0057E7", weight: 5 };
            case "E":
              return { color: "#0057E7", weight: 5 };
            case "D":
              return { color: "#F37735", weight: 5 };
            case "B":
              return { color: "#F37735", weight: 5 };
            case "F":
              return { color: "#F37735", weight: 5 };
            case "M":
              return { color: "#F37735", weight: 5 };
            case "N":
              return { color: "#FFDD00", weight: 5 };
            case "Q":
              return { color: "#FFDD00", weight: 5 };
            case "R":
              return { color: "#FFDD00", weight: 5 };
            case "W":
              return { color: "#FFDD00", weight: 5 };
            case "L":
              return { color: "#808080", weight: 5 };
            case "S":
              return { color: "#808080", weight: 5 };
            case "G":
              return { color: "#6CBE45", weight: 5 };
            case "J":
              return { color: "#8D5524", weight: 5 };
            case "Z":
              return { color: "#8D5524", weight: 5 };
          }
        }}
      />
    </MapContainer>
  );
}

export default Map;
