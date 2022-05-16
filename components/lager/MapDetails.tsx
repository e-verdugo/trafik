import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Base, Typography } from "../styles";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import getCoordinates from "../models/nominatim";
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);
            setMarker(<Marker
                coordinate={{
                    latitude: parseFloat(results[0].lat),
                    longitude: parseFloat(results[0].lon)
                }}
                title={results[0].display_name}
                pinColor="yellow"
            />);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    const orderinfo = order.order_items.map((item: object, index: number) => {
        return <ScrollView key={index}><View style={Base.scroll}><Text style={Typography.normal}>
                Kund: {order.name}{"\n"}
                Adress: {order.address}{"\n"}
                Zip: {order.zip}{"\n"}
                Stad: {order.city}{"\n"}
                Land: {order.country}{"\n"}{"\n"}
                Ordernummer: {order.id}{"\n"}{"\n"}
                Produkt(er):{"\n"}
                Namn: {item.name}{"\n"}
                Artikelnummer: {item.article_number}{"\n"}
                Beskrivning: {item.description}{"\n"}
                Mängd: {item.amount}{"\n"}
            </Text></View></ScrollView>;
    });

    return (
        <View style={Base.base}>
            <View style={{flex:1}}>
                <Text style={Typography.header2}>Skicka order</Text>
                {orderinfo}
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 60,
                        longitude: 15,
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});