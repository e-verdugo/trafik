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
        .filter(delays => delays.FromLocation[0].LocationName === currentStation)
        .filter(delays => delays.ToLocation[0].LocationName === targetStation)
        .map((delays, index) => {
            let newTime = new Date(delays.EstimatedTimeAtLocation).getTime();
            let departureTime = new Date(delays.AdvertisedTimeAtLocation).toLocaleString();
            let depTime = new Date(delays.AdvertisedTimeAtLocation).getTime();
            let changedTime = (newTime-depTime)/60/60/60;
            return <Text style={Typography.normal} key={index}>Tåg {delays.AdvertisedTrainIdent} Avgångstid {departureTime} Försenad {changedTime}</Text>
        });

    return (
        <ScrollView>
            <View style={Base.base}>
                <Text style={Typography.header2}>FÖRSENADE TÅG</Text>
                {listOfDelays}
                <Button
                    title="Sök"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Button
                    title="Mer"
                    onPress={() => {
                        navigation.navigate("More");
                    }}
                />
            </View>
        </ScrollView>
    );
};