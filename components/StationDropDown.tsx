import { useEffect, useState } from "react";
import stationsModel from "../models/stations";
import { Picker } from '@react-native-picker/picker';

export default function StationDropDown(props) {
    const [stations, setStations] = useState([]);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);

    useEffect(() => {
        (async () => {
            setStations(await stationsModel.getStations());
        })()
    }, []);

    const sortedStations = stations.sort((a, b) => (a.AdvertisedLocationName < b.AdvertisedLocationName) ? -1 : ((b.AdvertisedLocationName > a.AdvertisedLocationName) ? 1 : 0));

    const stationsList = sortedStations.map((station, index) => {
        return <Picker.Item key={index} label={station.AdvertisedLocationName} value={station.LocationSignature} />;
    });

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
                props.setStations({ ...props.stations, AdvertisedLocationName: itemValue });
                props.setCurrentStation(itemValue);
                setSelectedValue(itemValue);
            }}>
            {stationsList}
        </Picker>
    );
}