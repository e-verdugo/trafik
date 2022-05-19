import { View, Text, Button } from "react-native";
import { Typography, Base } from '../styles';
import { useEffect, useState } from "react";
import authModel from "../models/auth";

export default function More({ navigation, route }: any) {
    const { reload } = route.params || false; 
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn())
        })()
    }, []);

    if (reload) {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn())
        })()
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>OM</Text>
            <Text style={Typography.normal}>
                -Detaljer
                -Detaljer
                -Detaljer
            </Text>
            <View style={Base.base}>
            </View>
            {isLoggedIn ?
                <Button
                    title="Profil"
                    onPress={() => {
                        navigation.navigate("Profile");
                    }}
                    color="lightgrey"
                /> :
                <Button
                    title="Login"
                    onPress={() => {
                        navigation.navigate("Login", {
                            setIsLoggedIn: setIsLoggedIn,
                        });
                    }}
                    color="lightgrey"
                />
            }
            <Button
                title="Log out"
                onPress={() => {
                    authModel.logout();
                }}
                color="lightgrey"
            />
            <Button
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
                color="lightgrey"
            />
        </View>
    );
};