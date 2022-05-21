import { View, Text, Button } from "react-native";
import { Typography, Base } from '../styles';
import Stations from "../interfaces/stations";
import { useState } from "react";
import StationDropDown from "./StationDropDown";

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
                <View style={Base.containerS}>
                    <View style={Base.containerC}>
                        <StationDropDown
                            stations={stations}
                            setStations={setStations}
                            setCurrentStation={setCurrentStation}
                            selectedValue="Cst"
                        />
                        <StationDropDown
                            stations={targetStations}
                            setStations={setTargetStations}
                            setCurrentStation={setTargetStation}
                            selectedValue="M"
                        />
                    </View>
                    <View style={Base.containerR}>
                        <Button
                            title="  ↕  "
                            onPress={() => {
                                const tempStation = currentStation;
                                setCurrentStation(targetStation)
                                setTargetStation(tempStation)
                            }}
                            color="lightgrey"
                        />
                        <Button
                            title="   Sök   "
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
            <View style={Base.containerL}>
            </View>
        </View>
    );
};
