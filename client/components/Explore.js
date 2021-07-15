import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  Polyline,
  GeoJSON,
} from 'react-leaflet';
import stations from '../../script/data/stations.json';
import allLines from '../../script/data/subway_lines.geojson';
import allStops from '../../script/data/subway_stops.geojson';
import { postStation, deleteStation } from '../store/stations';
import { fetchConnections, createMatch } from '../store/exploreUsers';
import {
  allStations,
  trainStyle,
  lineIcons,
  lineOrder,
} from '../utils/trainUtils';
import { fetchLocations } from '../store/yelpLocations';
import ExploreUsers from './ExploreUsers';
import { blueIcon, greenIcon, orangeIcon } from '../utils/markerIcons';
import { smallerBlueIcon, smallerRedIcon } from '../utils/smallerMarkerIcons';
import Loader from './Loader';
function Explore() {
  // access dispatch
  const dispatch = useDispatch();
  const myConnections = useSelector((state) => state.exploreUsers);
  const activities = useSelector((state) => state.yelpLocations);
  const myStations = useSelector((state) => state.stations);
  // state below
  const [isLoaded, setIsLoaded] = useState(false);
  const [myLines, setMyLines] = useState([]);
  const [sharedLines, setSharedLines] = useState([]);
  const [stationsOnLine, setStationsOnLine] = useState([]);
  const [stations, setStations] = useState([]);
  const [clickedCoordinates, setClickedCoordinates] = useState([]);

  useEffect(() => {
    setStations(
      allStations.filter((station) => {
        return station.lines.includes(sharedLines);
      })
    );
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, [sharedLines]);

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
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, [myStations]); // do this on every change to my stations

  useEffect(() => {
    dispatch(fetchConnections());
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const renderMyStations = () => {
    return myStations.map((station) => {
      return (
        <Marker
          key={station.code}
          icon={greenIcon}
          position={[station.latitude, station.longitude]}
          alt={station.name}
          title={station.name}
        >
          <Tooltip>{station.name}</Tooltip>
        </Marker>
      );
    });
  };

  const renderConnectionsStations = () => {
    return stationsOnLine.map((station) => {
      return (
        <Marker
          key={station.code}
          icon={orangeIcon}
          position={[station.latitude, station.longitude]}
          alt={station.name}
          title={station.name}
        >
          <Tooltip>{station.name}</Tooltip>
        </Marker>
      );
    });
  };

  const renderRemainingStations = () => {
    return stations.map((station) => {
      return (
        <Marker
          icon={iconColor(station)}
          key={station.code}
          position={[station.latitude, station.longitude]}
          alt={station.name}
          title={station.name}
          eventHandlers={{
            click: (e) => {
              dispatch(fetchLocations(station.latitude, station.longitude));
              setClickedCoordinates([station.latitude, station.longitude]);
            },
          }}
        >
          <Tooltip>{station.name}</Tooltip>
        </Marker>
      );
    });
  };

  const renderNearbyActivities = () => {
    const filteredActivities = activities.filter((activity) => {
      const xDistance = Math.abs(
        activity.coordinates.latitude - clickedCoordinates[0]
      );
      const yDistance = Math.abs(
        activity.coordinates.longitude - clickedCoordinates[1]
      );
      return xDistance <= 0.01 && yDistance <= 0.01;
    });
    return filteredActivities.map((activity) => {
      return (
        <Marker
          icon={smallerRedIcon}
          key={activity.id}
          position={[
            activity.coordinates.latitude,
            activity.coordinates.longitude,
          ]}
        >
          <Popup>
            <p>name: {activity.name} </p>
            <p>
              categories:{' '}
              {activity.categories
                .map((category, idx) => {
                  return category.title;
                })
                .join(', ')}{' '}
            </p>
          </Popup>
        </Marker>
      );
    });
  };

  const iconColor = (station) => {
    if (
      myStations.filter((myStation) => myStation.name === station.name).length
    ) {
      return greenIcon;
    } else if (
      stationsOnLine.filter(
        (stationOnLine) => stationOnLine.name === station.name
      ).length
    ) {
      return orangeIcon;
    } else {
      return smallerBlueIcon;
    }
  };

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <div className="columns is-mobile">
          <section className="section">
            <h1 className="title">A Str8Shot Away</h1>
            <h2 className="subtitle">Connect with users on your lines</h2>

            <ExploreUsers
              setSharedLines={setSharedLines}
              setStationsOnLine={setStationsOnLine}
              myConnections={myConnections}
              createMatch={createMatch}
            />
          </section>
          <section className="section">
            <h1 className="title">Explore Users</h1>
            <h2 className="subtitle display-flex">
              <div style={{ marginRight: '.5rem' }}>My lines:</div>
              {Object.keys(lineIcons)
                .filter((line) => myLines.includes(line))
                .map((line) => {
                  return (
                    <img
                      className="line-icon-small"
                      key={line}
                      src={lineIcons[line]}
                      name={line}
                      alt={line + ' train'}
                    />
                  );
                })}
            </h2>
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
                style={(feature) => trainStyle(feature, sharedLines)}
              />
              {renderMyStations()}
              {renderConnectionsStations()}
              {renderRemainingStations()}
              {renderNearbyActivities()}
            </MapContainer>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
export default Explore;
