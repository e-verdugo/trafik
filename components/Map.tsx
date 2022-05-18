import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Base } from "../styles";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import stationsModel from "../models/stations";

export default function ShipOrder({ navigation, route }: any) {
    const { station } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [stations, setStations] = useState([]);
    let lat = 0;
    let lon = 0;
    let stationName = "";

    useEffect(() => {
        (async () => {
            setStations(await stationsModel.getStations());
            const assignment = stations
            .map((place: any) => {
                if (place.LocationSignature === station) {
                    stationName = place.AdvertisedLocationName;
                    lat = parseFloat(place.Geometry.WGS84.split(' ')[2].slice(0, -1));
                    lon = parseFloat(place.Geometry.WGS84.split(' ')[1].slice(1));
                    return;
                }
            });
            if (lat != 0 && lon != 0) {
                await Map(setMarker, setErrorMessage, setLocationMarker, stationName, lat, lon);
            }
        })()
    }, []);

    return (
        <View style={Base.base}>
            <View style={Base.container}>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

async function Map(setMarker, setErrorMessage, setLocationMarker, stationName, lat, lon) {
    setMarker(<Marker
        coordinate={{
            latitude: lat,
            longitude: lon,
        }}
        title={stationName}
        pinColor="yellow"
    />);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMessage("Permission to access location was denied");
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
}
