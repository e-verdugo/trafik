import { View, Text, Button } from "react-native";
import { Typography, Base } from '../styles';

export default function More({ navigation }: any) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>OM</Text>
            <Text style={Typography.normal}>
                -Detaljer
                -Detaljer
                -Detaljer
            </Text>
            <Button
                title="Profil"
                onPress={() => {
                    navigation.navigate("Profile");
                }}
            />
            <Button
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </View>
    );
};