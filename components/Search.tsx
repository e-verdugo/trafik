import { View, Text, Button } from "react-native";
import { Typography, Base } from '../styles';
import stationsModel from "../models/stations";
import Stations from "../interfaces/stations";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { IconButton } from 'react-native-paper';

export default function Search({ navigation }: any) {
    const [stations, setStations] = useState<Partial<Stations>>({});
    const [targetStations, setTargetStations] = useState<Partial<Stations>>({});
    const [currentStation, setCurrentStation] = useState({});
    const [targetStation, setTargetStation] = useState({});

    return (
        <View style={Base.base}>
            <View style={Base.container}>
            </View>

            <View style={Base.containerC}>
                <View style={Base.containerW}>
                    <Text style={Typography.header3}>För vilken sträcka vill du hitta försenade tåg?</Text>
                </View>
                <View style={Base.container}>
                    <View style={Base.containerC}>
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
                    </View>
                    <View style={Base.containerR}>
                        <View style={Base.colour}>
                            <IconButton
                                icon="arrow-up-down-bold"
                                onPress={() => {
                                    const tempStation = currentStation;
                                    setCurrentStation(targetStation)
                                    setTargetStation(tempStation)
                                }}
                            />
                        </View>
                        <Button
                            title="Sök"
                            onPress={() => {
                                navigation.navigate("Delays", {
                                    navigation: navigation,
                                    currentStation: currentStation,
                                    targetStation: targetStation,
                                });
                            }}
                            color="lightgrey"
                        />
                    </View>
                </View>
            </View>

            <View style={Base.container}>
            </View>
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

    const sortedStations = stations.sort((a, b) => (a.AdvertisedLocationName < b.AdvertisedLocationName) ? -1 : ((b.AdvertisedLocationName > a.AdvertisedLocationName) ? 1 : 0));

    const stationsList = sortedStations.map((station, index) => {
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
