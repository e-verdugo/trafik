import { View, Text, Button } from 'react-native';
import { Base, Typography } from '../styles';

export default function Delays({ navigation }: any) {
    return (
        <View style={Base.base}>
        <Text style={Typography.header2}>FÖRSENADE TÅG</Text>
        <Text style={Typography.normal}>
            -Detaljer
            -Detaljer
            -Detaljer
        </Text>
        <Button
            title="Sök"
            onPress={() => {
                navigation.goBack();
            }}
        />
        <Button
            title="Mer"
            onPress={() => {
                navigation.navigate("More");
            }}
        />
    </View>
    );
};