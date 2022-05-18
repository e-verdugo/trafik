import { View, Text, Button, ScrollView } from 'react-native';
import { Base, Typography } from '../styles';
import { useEffect, useState } from 'react';
import stationsModel from '../models/stations';
import delaysModel from '../models/delayed';
import Stations from '../interfaces/stations';

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
            // let newTime = new Date(delay.EstimatedTimeAtLocation).getTime(); // the new departure time
            let departureTime = new Date(delay.AdvertisedTimeAtLocation).toLocaleString(); // previous departure time
            let depTime = new Date(delay.AdvertisedTimeAtLocation).getTime(); // previous departure time
            let currentTime = new Date().getTime();
            let changedTime = Math.round((currentTime - depTime) / 1000 / 60); // time since it was supposed to depart

            try {
                if (changedTime > 0 && delay.FromLocation[0].LocationName === currentStation && delay.ToLocation[0].LocationName === targetStation) {
                    return <Text style={Typography.normal} key={index} onPress={() => {
                        navigation.navigate("Map", {
                            navigation: navigation,
                            station: delay.FromLocation[0].LocationName,
                        });
                    }}>
                        Tåg {delay.AdvertisedTrainIdent} {'\n'}
                        Avgångstid {departureTime} {'\n'}
                        Försenad {changedTime} minuter {'\n'}
                    </Text>
                }
            } catch {
                // do nothing
            }
        });

    return (
        <View style={Base.base}>
            <View style={Base.base}>
                <ScrollView>
                    <Text style={Typography.header2}>FÖRSENADE TÅG</Text>
                    {listOfDelays}
                </ScrollView>
            </View>
            <View style={Base.container}>
                <View style={Base.button1}>
                    <Button
                        title="Sök"
                        onPress={() => {
                            navigation.popToTop();
                        }}
                        color="grey"
                    />
                </View>
                <View style={Base.button2}>
                    <Button
                        title="Mer"
                        onPress={() => {
                            navigation.navigate("More");
                        }}
                        color="grey"
                    />
                </View>
            </View>
        </View>
    );
};
