import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Base } from "../styles";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import stationsModel from "../models/stations";

export default function Map({ route }: any) {
    const [marker, setMarker] = useState();
    const [locationMarker, setLocationMarker] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [stations, setStations] = useState([]);
    let lat = 0;
    let lon = 0;
    let stationName = "";
    const { station } = route.params;

    useEffect(() => {
        (async () => {
            console.log("1");
            setStations(await stationsModel.getStations());
            console.log(stations, "2");
            const assignment = stations
            .map((place) => {
                console.log("3");
                if (place.LocationSignature == station) {
                    console.log("4");
                    stationName = place.AdvertisedLocationName;
                    lat = parseFloat(place.Geometry.WGS84.split(' ')[2].slice(0, -1));
                    lon = parseFloat(place.Geometry.WGS84.split(' ')[1].slice(1));
                }
            });
            console.log(assignment, "4");
            if (lat != 0 && lon != 0) {
                setMarker(<Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lon,
                    }}
                    title={stationName}
                    pinColor="yellow"
                />);
            }
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
        })()
    }, [stations]);

    return (
        <View style={Base.base}>
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
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
