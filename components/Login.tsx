import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../styles';
import { useState, useEffect } from "react";
import Auth from "../interfaces/auth";
import authModel from "../models/auth";

export default function Login({ navigation }: any) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn())
        })()
    }, []);

    async function submit() {
        if (auth.email && auth.password) {
            const result = await authModel.login(auth.email, auth.password);
        if (result.type === "success") {
            setIsLoggedIn(true);
            navigation.navigate("Profile");
            }
        }
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Logga in</Text>
            <View style={Base.base}>
                <Text style={Typography.label}>E-post</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, email: content })
                    }}
                    value={auth?.email}
                    keyboardType="email-address"
                />
                <Text style={Typography.label}>Lösenord</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, password: content })
                    }}
                    value={auth?.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Logga in"
                    onPress={() => {
                        submit();
                    }}
                    color="lightgrey"
                />
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    color="lightgrey"
                />
            </View>
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