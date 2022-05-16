import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../styles';

export default function Profil({ navigation }: any) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Profil</Text>
            <Text style={Typography.normal}>
                Profilinfo
            </Text>
            <Button
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </View>
    );
};