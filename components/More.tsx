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
            <Text style={Typography.header3}>OM</Text>
            <Text style={Typography.normal}>
                -Appen jag har valt att efterlikna heter Tågförseningar och den vill hjälpa dig som resenär att få en överblick över vilka tåg som varit försenade under dagen.{'\n'}
            </Text>
            <Text style={Typography.normal}>
                -Om du trycker på ett tåg så får du upp en karta som visar vart stationen ligger och vart du är.{'\n'}
            </Text>
            <Text style={Typography.normal}>
                -Tågförseningar vill förenkla processen att få ersättning är försenade resor, men jag tror att den är lite av en phishingscam. Jag skulle inte lita på att skriva in mitt personnummer och kortnummer för att göra processen enklare.{'\n'}
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