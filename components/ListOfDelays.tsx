import { View, Text, } from "react-native";
import { Typography, Base } from '../styles';
import { useEffect, useState } from "react";
import delaysModel from "../models/delayed";
import Map from "./Map";

export default function ListOfDelays({ navigation, station }: any) {
    const [delays, setDelays] = useState([]);

    useEffect(() => {
        (async () => {
            setDelays(await delaysModel.getDelays());
        })()
    }, []);

    const listOfDelays = delays
        .map((delay, index) => {
            let departureTime = new Date(delay.AdvertisedTimeAtLocation).toLocaleTimeString(); // previous departure time
            let depTime = new Date(delay.AdvertisedTimeAtLocation).getTime(); // previous departure time
            let currentTime = new Date().getTime();
            let changedTime = Math.round((currentTime - depTime) / 1000 / 60); // time since it was supposed to depart

            try {
                if (changedTime > 0 && delay.FromLocation[0].LocationName === station) {
                    return <View style={{ backgroundColor: "white", margin: 12 }}>
                        <Text style={Typography.normal}>{delay.AdvertisedLocationName}</Text>
                        <View style={Base.containerR}>
                            <Text style={Typography.header4}>Tåg</Text>
                            <Text style={Typography.header4}>Avgångstid</Text>
                            <Text style={Typography.header4}>Försenad</Text>
                        </View>
                        <View style={Base.containerR}>
                            <Text style={Typography.normal} key={index} onPress={() => {
                                navigation.navigate("Map", {
                                    navigation: navigation,
                                    station: delay.FromLocation[0].LocationName,
                                });
                            }}>
                                {delay.AdvertisedTrainIdent}
                            </Text>
                            <Text style={Typography.normal} key={index} onPress={() => {
                                navigation.navigate("Map", {
                                    navigation: navigation,
                                    station: delay.FromLocation[0].LocationName,
                                });
                            }}>
                                {departureTime}
                            </Text>
                            <Text style={Typography.normal} key={index} onPress={() => {
                                navigation.navigate("Map", {
                                    navigation: navigation,
                                    station: delay.FromLocation[0].LocationName,
                                });
                            }}>
                                {changedTime} min
                            </Text>
                        </View>
                        <Map
                            station={delay.FromLocation[0].LocationName}
                        />
                    </View>
                }
            } catch {
                // do nothing
            }
        });

    return <View>{listOfDelays}</View>;
}
