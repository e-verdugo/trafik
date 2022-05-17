import { View, Text, Button } from "react-native";
import { Typography, Base } from '../styles';
import stationsModel from "../models/stations";
import Stations from "../interfaces/stations";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';

export default function Search({ navigation }: any) {
    const [stations, setStations] = useState<Partial<Stations>>({});
    const [targetStations, setTargetStations] = useState<Partial<Stations>>({});
    const [currentStation, setCurrentStation] = useState({});
    const [targetStation, setTargetStation] = useState({});

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>För vilken sträcka vill du hitta försenade tåg?</Text>

            <StationDropDown
                stations={stations}
                setStations={setStations}
                setCurrentStation={setCurrentStation}
            />

            <StationDropDown
                stations={targetStations}
                setStations={setTargetStations}
                setCurrentStation={setTargetStation}
            />

            <Button
                title="Arrow up and down"
                onPress={() => {
                    const tempStation = currentStation;
                    setCurrentStation(targetStation)
                    setTargetStation(tempStation)
                }}
            />

            <Button
                title="Sök"
                onPress={() => {
                    navigation.navigate("Delays", {
                        navigation: navigation,
                        currentStation: currentStation,
                        targetStation: targetStation,
                    });
                }}
            />
        </View>
    );
};

function StationDropDown(props) {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        (async () => {
            setStations(await stationsModel.getStations());
        })()
    }, []);

    const stationsList = stations.map((station, index) => {
        return <Picker.Item key={index} label={station.AdvertisedLocationName} value={station.LocationSignature} />;
    });

    return (
        <Picker
            selectedValue={props.stations?.AdvertisedLocationName}
            onValueChange={(itemValue) => {
                props.setStations({ ...props.stations, AdvertisedLocationName: itemValue });
                props.setCurrentStation(itemValue);
            }}>
            {stationsList}
        </Picker>
    );
}
