import { View, Text, Button, ScrollView } from 'react-native';
import { Base, Typography } from '../styles';
import { useEffect, useState } from 'react';
import stationsModel from '../models/stations';
import delaysModel from '../models/delayed';
import Stations from '../interfaces/stations';
import { IconButton } from 'react-native-paper';

export default function Delays({ route, navigation }: any) {
    const { currentStation } = route.params;
    const { targetStation } = route.params;

    const [delays, setDelays] = useState([]);
    const [stations, setStations] = useState<Partial<Stations>>({});

    useEffect(() => {
        (async () => {
            setStations(await stationsModel.getStations());
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
                if (changedTime > 0 && delay.FromLocation[0].LocationName === currentStation && delay.ToLocation[0].LocationName === targetStation) {
                    return <View style={{backgroundColor: "white", margin: 12}}>
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
                    </View>
                }
            } catch {
                // do nothing
            }
        });

    return (
        <View style={Base.base}>
            <View style={Base.base}>
                <ScrollView>
                    <Text style={Typography.header3}>FÖRSENADE TÅG</Text>
                    <View style={Base.containerR}>
                        <Text style={Typography.header4}>Tåg</Text>
                        <Text style={Typography.header4}>Avgångstid</Text>
                        <Text style={Typography.header4}>Försenad</Text>
                    </View>
                    {listOfDelays}
                </ScrollView>
            </View>
            <View style={Base.container}>
                <View style={Base.containerB}>
                    <IconButton
                        icon="home"
                        onPress={() => {
                            navigation.popToTop();
                        }}
                    />
                    <IconButton
                        icon="dots-horizontal"
                        onPress={() => {
                            navigation.navigate("More", {
                                reload: true,
                            });
                        }}
                    />
                </View>
            </View>
        </View>
    );
};
