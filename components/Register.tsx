import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../styles';
import Auth from "../interfaces/auth";
import authModel from "../models/auth";
import { useState } from "react";

export default function Register({ navigation }: any) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function submit() {
        if (auth.email && auth.password) {
            const result = await authModel.register(auth.email, auth.password);
        }
        navigation.navigate("Profile");
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Profil</Text>
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
                    title="Registrera"
                    onPress={() => {
                        submit();
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