export const homeStationsCheck = (homeStations, selectedStation) => {
  for (let i = 0; i < homeStations.length; i++) {
    let currentStation = homeStations[i];

    if (currentStation.code === selectedStation.properties['stop_id']) {
      return true;
    }
  }
  return false;
};
