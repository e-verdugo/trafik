import { View, Text, Button, ScrollView } from "react-native";
import { Typography, Base } from '../styles';
import authModel from "../models/auth";
import { useEffect, useState } from "react";
import StationDropDown from "./StationDropDown";
import Stations from "../interfaces/stations";
import ListOfDelays from "./ListOfDelays";
import Map from "./Map";

export default function Profile({ navigation }: any) {
    let starterValue = [];
    const [stations, setStations] = useState<Partial<Stations>>({});
    const [userData, setUserData] = useState({});
    const [favStations, setFavStations] = useState("Cst");

    useEffect(() => {
        (async () => {
            setUserData(await authModel.getData())
        })()
    }, []);

    try {
        for (let i = 0; i < userData.data.length; i++) {
            if (userData.data[i].artefact != {}) {
                starterValue.push([userData.data[i].artefact, userData.data[i].id]);
            };
        }
    } catch {
        //do nothing
    }

    const listOfDelays = starterValue
        .map((value, index) => {
            return <View>
                <Text style={Typography.header4}>{value[0]}</Text>
                <ListOfDelays
                    station={value[0]}
                />
                <View style={Base.container}>
                    <View style={Base.scroll}>
                        <Map
                            station={favStations}
                        />
                    </View>
                </View>
                <Button
                    title="Ta bort station från favoriter"
                    onPress={() => {
                        authModel.deleteData(value[1])
                        alert("Station " + favStations + " borttagen.")
                    }}
                    color="lightgrey"
                />
            </View>
        });

    return (
        <View style={Base.base}>
            <Text style={Typography.header3}>Profil</Text>
            <View style={Base.base}>
                <ScrollView>
                    <Text style={{ ...Typography.label }}>Välj favoritstation att lägga till</Text>
                    <StationDropDown
                        stations={stations}
                        setStations={setStations}
                        setCurrentStation={setFavStations}
                        selectedValue="Cst"
                    />
                    {listOfDelays}
                </ScrollView>
            </View>
            <View style={Base.containerR}>
                <Button
                    title="Tillbaka"
                    onPress={() => {
                        navigation.navigate("More", {
                            reload: true,
                        });
                    }}
                    color="lightgrey"
                />
                <Button
                    title="Spara"
                    onPress={() => {
                        authModel.saveData(favStations),
                            alert("Station " + favStations + " sparad!")
                    }}
                    color="lightgrey"
                />
            </View>
        </View>
    );
};