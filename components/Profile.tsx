import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../styles';
import authModel from "../models/auth";
import { useEffect, useState } from "react";

export default function Profile({ navigation }: any) {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn())
        })()
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Profil</Text>
            <Text style={Typography.normal}>
                Profilinfo
            </Text>
            <View style={Base.base}>
            </View>
            <Button
                title="Log out"
                onPress={() => {
                    authModel.logout();
                    navigation.navigate("More", {
                        reload: true,
                    });
                }}
                color="lightgrey"
            />
            <Button
                title="Back"
                onPress={() => {
                    navigation.navigate("More", {
                        reload: true,
                    });
                }}
                color="lightgrey"
            />
        </View>
    );
};