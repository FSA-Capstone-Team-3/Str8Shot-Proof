import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  GeoJSON,
} from "react-leaflet";
import stations from "../../script/data/stations.json";
import allLines from "../../script/data/subway_lines.geojson";
import allStops from "../../script/data/subway_stops.geojson";
import { postStation, deleteStation } from "../store/stations";
import { fetchConnections, createMatch } from "../store/exploreUsers";

import { trainStyle, lineIcons, lineOrder } from "../utils/trainUtils";
import ExploreUsers from "./ExploreUsers";
import { greenIcon, orangeIcon } from "../utils/markerIcons";

function Explore() {
  // access dispatch
  const dispatch = useDispatch();
  const myConnections = useSelector((state) => state.exploreUsers);

  // state below
  const [myLines, setMyLines] = useState([]);
  const [sharedLines, setSharedLines] = useState([]);
  const [stationsOnLine, setStationsOnLine] = useState([]);

  const myStations = useSelector((state) => state.stations);

  useEffect(() => {
    // gather list of lines to draw given some stations
    const lines = [];
    // walk through list of stations
    myStations.forEach((station) => {
      // on each station, walk through list of lines that go through that station
      station.lines.forEach((line) => {
        // if the line isn't in our list, add it
        if (lines.includes(line) === false) {
          lines.push(line);
        }
      });
    });
    // store the list of lines in local state
    setMyLines(lines);
  }, [myStations]); // do this on every change to my stations

  useEffect(() => {
    dispatch(fetchConnections());
  }, []);

  const renderMyStations = () => {
    if (myStations.length === 0) {
      return null;
    }
    return myStations.map((station) => {
      return (
        <Marker
          key={station.code}
          icon={greenIcon}
          position={[station.latitude, station.longitude]}
          alt={station.name}
          title={station.name}
          eventHandlers={{}}
        ></Marker>
      );
    });
  };

  const renderConnectionsStations = () => {
    console.log("stationsOnLine-->", stationsOnLine);
    return stationsOnLine.map((station) => {
      return (
        <Marker
          key={station.code}
          icon={orangeIcon}
          position={[station.latitude, station.longitude]}
          alt={station.name}
          title={station.name}
          eventHandlers={{}}
        ></Marker>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="columns is-mobile">
        <div className="column is-8"></div>
        <div className="column">
          <p>My lines</p>
          {Object.keys(lineIcons)
            .filter((line) => myLines.includes(line))
            .map((line) => {
              return (
                <img
                  className="line-icon-small"
                  key={line}
                  src={lineIcons[line]}
                  name={line}
                  alt={line + " train"}
                />
              );
            })}
        </div>
      </div>

      <div className="columns is-mobile">
        <section className="section">
          <h1 className="title">Who's a Str8Shot Away?</h1>
          <ExploreUsers
            setSharedLines={setSharedLines}
            setStationsOnLine={setStationsOnLine}
            myConnections={myConnections}
          />
        </section>
        <section className="section">
          <h1 className="title">Explore Stations and Nearby Activities</h1>
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
              style={(feature) => trainStyle(feature, sharedLines)}
              onEachFeature={(feature, layer) => {
                // layer.on('click', (event) => {
                //   setSelectedLine(feature.properties.rt_symbol);
                // });
              }}
            />
            {renderMyStations()}
            {renderConnectionsStations()}
          </MapContainer>
        </section>
      </div>
    </React.Fragment>
  );
}

export default Explore;
