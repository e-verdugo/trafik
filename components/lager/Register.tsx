import Auth from '../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../models/lager/auth';
import AuthFields from './AuthFields';
import { View, ScrollView } from 'react-native';
import { Base } from '../styles';

export default function Register({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function register() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
        }
        navigation.navigate("Login");
    }

    return (
        <ScrollView>
            <View style={Base.scroll}>
            <AuthFields
                auth={auth}
                setAuth={setAuth}
                submit={register}
                title="Registrera"
                navigation={navigation}
            />
            </View>
        </ScrollView>
    );
};